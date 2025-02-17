"use client";


import { UnitType, useSettingsStore } from './store'

export type ParameterType = 'number' | 'select' | 'toggle' | 'options' | 'custom'

export interface ParameterOption {
    value: string | number
    label: string
}

export interface ProjectParameter {
    id: string
    name: string
    type: ParameterType
    description?: string
    min?: number
    max?: number
    step?: number
    defaultValue: number | boolean | string | string[]
    bias: number
    unit?: string
    options?: ParameterOption[]
    formula?: (basePrice: number, params: ProjectParameter[]) => number
    customComponent?: string // Identifies a custom component to render for this parameter
    affects?: {
        paramId: string
        weight: number // -1 to 1, negative means inverse relationship
    }[]
}

export const defaultParameters: ProjectParameter[] = [
    {
        id: 'baseRate',
        name: 'Base Rate',
        type: 'number',
        description: 'Standard hourly rate for development services.',
        defaultValue: 50,
        bias: 0.1,
        unit: 'USD/hour',
        customComponent: 'BaseRateInput', // This component will handle currency display
        formula: (basePrice) => basePrice
    },
    {
        id: 'discount',
        name: 'Discount',
        type: 'number',
        description: 'Discount percentage applied to the final price.',
        min: 0,
        max: 100,
        defaultValue: 0,
        bias: -0.5,
        formula: (basePrice, params) => basePrice * (1 - (params.find(p => p.id === 'discount')?.defaultValue as number) / 100)
    },
    {
        id: 'duration',
        name: 'Project Duration',
        type: 'number',
        description: 'Number of days required to complete the project.',
        min: 1,
        max: 180,
        step: 1,
        defaultValue: 30,
        bias: 0,
        unit: 'days',
        affects: [
            { paramId: 'teamSize', weight: 0.3 },
            { paramId: 'urgency', weight: -0.5 },
            { paramId: 'complexity', weight: 0.2 }
        ],
        formula: (basePrice, params) => {
            const duration = params.find(p => p.id === 'duration')?.defaultValue as number;
            return basePrice * (1 + Math.log(duration) * 0.05);
        }
    },
    {
        id: 'complexity',
        name: 'Project Complexity',
        type: 'select',
        description: 'Determines how intricate the project is.',
        defaultValue: 'medium',
        bias: 0.2,
        options: [
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
            { value: 'advanced', label: 'Advanced' }
        ],
        affects: [
            { paramId: 'teamSize', weight: 0.6 },
            { paramId: 'duration', weight: 0.3 },
            { paramId: 'qualityLevel', weight: 0.4 }
        ],
        formula: (basePrice, params) => {
            const complexityLevels: Record<string, number> = { low: 1.0, medium: 1.3, high: 1.6, advanced: 2.2 };
            const complexity = params.find(p => p.id === 'complexity')?.defaultValue as string;
            return basePrice * complexityLevels[complexity];
        }
    },
    {
        id: 'urgency',
        name: 'Project Urgency',
        type: 'select',
        description: 'Urgent projects require more resources and increase costs.',
        defaultValue: 'normal',
        bias: 0.4,
        options: [
            { value: 'low', label: 'Low Priority' },
            { value: 'normal', label: 'Normal' },
            { value: 'high', label: 'High Priority' },
            { value: 'urgent', label: 'Urgent' }
        ],
        affects: [
            { paramId: 'teamSize', weight: 0.7 },
            { paramId: 'duration', weight: -0.6 }
        ],
        formula: (basePrice, params) => {
            const urgencyLevels: Record<string, number> = { low: 1.0, normal: 1.2, high: 1.6, urgent: 2.5 };
            const urgency = params.find(p => p.id === 'urgency')?.defaultValue as string;
            return basePrice * urgencyLevels[urgency];
        }
    },
    {
        id: 'teamSize',
        name: 'Team Size',
        type: 'number',
        description: 'Number of developers working on the project.',
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 1,
        bias: 0.2,
        unit: 'developers',
        formula: (basePrice, params) => {
            const teamSize = params.find(p => p.id === 'teamSize')?.defaultValue as number;
            return basePrice * (1 + Math.log(teamSize + 1) * 0.1); // Diminishing return scaling
        }
    },
    {
        id: 'needsDeployment',
        name: 'Includes Deployment',
        type: 'toggle',
        description: 'Adds deployment and server setup costs.',
        defaultValue: false,
        bias: 0.15,
        affects: [{ paramId: 'duration', weight: 0.2 }],
        formula: (basePrice, params) =>
            params.find(p => p.id === 'needsDeployment')?.defaultValue ? basePrice * 1.1 : basePrice
    },
    {
        id: 'needsTesting',
        name: 'Includes Testing',
        type: 'toggle',
        description: 'Adds quality assurance and bug testing costs.',
        defaultValue: false,
        bias: 0.1,
        affects: [
            { paramId: 'duration', weight: 0.15 },
            { paramId: 'qualityLevel', weight: 0.25 }
        ],
        formula: (basePrice, params) =>
            params.find(p => p.id === 'needsTesting')?.defaultValue ? basePrice * 1.08 : basePrice
    },
    {
        id: 'qualityLevel',
        name: 'Quality Requirements',
        type: 'select',
        description: 'Determines code robustness, QA standards, and performance expectations.',
        defaultValue: 'standard',
        bias: 0.4,
        options: [
            { value: 'mvp', label: 'MVP' },
            { value: 'standard', label: 'Standard' },
            { value: 'enterprise', label: 'Enterprise Grade' }
        ],
        affects: [
            { paramId: 'duration', weight: 0.5 },
            { paramId: 'teamSize', weight: 0.4 },
            { paramId: 'complexity', weight: 0.6 }
        ],
        formula: (basePrice, params) => {
            const qualityLevels: Record<string, number> = { mvp: 1.0, standard: 1.25, enterprise: 1.8 };
            const quality = params.find(p => p.id === 'qualityLevel')?.defaultValue as string;
            return basePrice * qualityLevels[quality];
        }
    }
];

// Utility function for function composition
const pipe = <T>(...fns: Array<(x: T) => T>) => (x: T) => fns.reduce((v, f) => f(v), x);


// New pricing calculation functions
const applyBasePrice = (base: number) => (price: number) => price + base;
const applyWorkload = (hours: number, rate: number, team: number) =>
    (price: number) => price + (hours * rate * team);

const applyModifiers = (parameters: ProjectParameter[], state: {
    teamSize: number,
    workHours: number
}) => (price: number) => {
    return parameters.reduce((total, param) => {
        let modifier = 0;

        // Handle team size affects
        if (param.affects?.some(a => a.paramId === 'teamSize')) {
            const weight = param.affects.find(a => a.paramId === 'teamSize')?.weight || 0;
            if (param.defaultValue === true || typeof param.defaultValue === 'number') {
                state.teamSize += Number(param.defaultValue) * weight;
            }
        }

        // Handle duration/hours affects
        if (param.affects?.some(a => a.paramId === 'duration')) {
            const weight = param.affects.find(a => a.paramId === 'duration')?.weight || 0;
            if (param.defaultValue === true || typeof param.defaultValue === 'number') {
                state.workHours += Number(param.defaultValue) * weight * 8; // Convert to hours
            }
        }

        // Apply parameter-specific formula if it exists
        if (param.formula) {
            modifier = param.formula(total, parameters) - total;
        }

        return total + modifier;
    }, price);
};

export function calculateProjectCost(basePrice: number, parameters: ProjectParameter[]): number {
    const workHours = convertDurationToHours(
        parameters.find(p => p.id === 'duration')?.defaultValue as number || 0,
        useSettingsStore.getState().defaultUnit
    );

    const hourlyRate = parameters.find(p => p.id === 'baseRate')?.defaultValue as number || 0;
    const initialTeamSize = parameters.find(p => p.id === 'teamSize')?.defaultValue as number || 1;

    const state = {
        teamSize: initialTeamSize,
        workHours: workHours
    };

    const finalPrice = pipe(
        applyBasePrice(basePrice),
        applyWorkload(state.workHours, hourlyRate, state.teamSize),
        applyModifiers(parameters, state)
    )(0);

    return Math.max(finalPrice, basePrice);
}

export function getParametersWithSettings(settings = useSettingsStore.getState()): ProjectParameter[] {
    return defaultParameters.map(param => {
        const newParam = { ...param };

        // Apply stored parameter bias if it exists
        if (settings.parameterBiases[param.id] !== undefined) {
            newParam.bias = settings.parameterBiases[param.id];
        }

        // Apply stored default value if it exists
        if (settings.parameterDefaults[param.id] !== undefined) {
            newParam.defaultValue = settings.parameterDefaults[param.id] as number | boolean | string | string[];
        }

        // Special handling for base rate and duration
        if (param.id === 'baseRate') {
            newParam.defaultValue = settings.defaultBaseRate;
        }

        if (param.id === 'duration') {
            newParam.defaultValue = settings.defaultDuration;
            newParam.unit = settings.defaultUnit;
        }

        return newParam;
    });
}

export function convertDurationToHours(duration: number, unit: UnitType): number {
    const conversions: Record<UnitType, number> = {
        hours: 1,
        days: 8,
        weeks: 40,
        months: 160
    };
    return duration * conversions[unit];
}
