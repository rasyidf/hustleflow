"use client";

import { convertCurrency } from "./currencyUtils"
import { ParameterType, ProjectParameter } from "./projectParameters"
import { useSettingsStore } from "./store"

// Helper function to calculate parameter effects
export function calculateParameterEffect(
    parameterValue: number,
    param: ProjectParameter,
    allValues: Record<string, number | boolean | string>,
    biasValues: {
        complexityBias: number,
        urgencyBias: number
    }
): number {
    let effect = parameterValue

    // Convert currency values if needed
    if (param.unit?.includes('USD')) {
        const { currency } = useSettingsStore.getState()
        effect = convertCurrency(effect, 'USD', currency)
    }

    // Apply bias based on parameter type
    if (param.id === 'complexity') {
        effect *= (1 + biasValues.complexityBias)
    } else if (param.id === 'urgency') {
        effect *= (1 + biasValues.urgencyBias)
    } else {
        effect *= (1 + param.bias)
    }

    if (param.affects) {
        for (const affect of param.affects) {
            const targetValue = allValues[affect.paramId]
            if (typeof targetValue === 'number') {
                effect += targetValue * affect.weight
            }
        }
    }

    return effect
}

// Helper type for parameter value normalization
export type ParameterValueNormalizer = (value: number | boolean | string | string[]) => number

export const parameterNormalizers: Record<ParameterType, ParameterValueNormalizer> = {
    number: (value: number | boolean | string | string[]) => typeof value === 'number' ? value : 0,
    select: (value: number | boolean | string | string[]) => {
        if (typeof value !== 'string') return 1
        switch (value) {
            case 'low': return 0.5
            case 'medium': return 1
            case 'high': return 1.5
            default: return 1
        }
    },
    options: (value: number | boolean | string | string[]) => {
        if (!Array.isArray(value)) {
            if (typeof value !== 'string') return 1
            switch (value) {
                case 'low': return 0.7
                case 'normal': return 1
                case 'high': return 1.3
                case 'urgent': return 1.6
                default: return 1
            }
        }
        // For multi-select options, average the values
        return value.length > 0 ? 1 + (value.length * 0.2) : 1
    },
    toggle: (value: number | boolean | string | string[]) => typeof value === 'boolean' ? (value ? 1 : 0) : 0,
    custom: (value: number | boolean | string | string[]) => typeof value === 'number' ? value : 0
}

// Helper function to normalize parameter values
export function normalizeParameterValue(
    value: number | boolean | string | string[],
    parameter: ProjectParameter
): number {
    const normalizer = parameterNormalizers[parameter.type]
    const normalizedValue = normalizer(value)

    if (parameter.type === 'number' && typeof value === 'number') {
        // Scale number values between 0 and 1 based on min/max
        return (value - (parameter.min || 0)) / ((parameter.max || 1) - (parameter.min || 0))
    }

    return normalizedValue
}

// Calculate the weighted impact of one parameter on another
export function calculateWeightedEffect(
    sourceParam: ProjectParameter,
    sourceValue: string | number | boolean,
    targetParamId: string
): number {
    const affect = sourceParam.affects?.find(a => a.paramId === targetParamId)
    if (!affect) return 0

    const normalizedValue = normalizeParameterValue(sourceValue, sourceParam)
    return normalizedValue * affect.weight
}

// Calculate combined effects of all parameters
export function calculateCombinedEffects(
    parameters: ProjectParameter[],
    values: Record<string, string | number | boolean>,
    targetParamId: string
): number {
    return parameters.reduce((total, param) => {
        if (param.id === targetParamId) return total
        const effect = calculateWeightedEffect(param, values[param.id], targetParamId)
        return total + effect
    }, 0)
}
