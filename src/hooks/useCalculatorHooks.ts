import { ModuleItem } from "@/lib/ModuleItem"
import { ProjectParameter, defaultParameters } from "@/lib/projectParameters"
import { calculateProjectCost } from "@/lib/projectParameters"
import { convertWithRates, getBaseRate } from "@/lib/currencyUtils"
import { useSettingsStore } from "@/lib/store"
import { useEffect, useState } from "react"

export interface ParameterValues {
  [key: string]: number | boolean | string | string[]
}

export function useCalculatorHooks() {
  const { 
    currency, 
    exchangeRates,
    parameterBiases,
    parameterDefaults
  } = useSettingsStore()
  
  const [baseRate, setBaseRate] = useState(getBaseRate(currency))
  const [parameters, setParameters] = useState<ProjectParameter[]>(defaultParameters)
  const [parameterValues, setParameterValues] = useState<ParameterValues>(() => {
    // Initialize with stored defaults if available, otherwise use parameter defaults
    return defaultParameters.reduce((acc, param) => ({
      ...acc,
      [param.id]: parameterDefaults[param.id] ?? param.defaultValue
    }), {})
  })
  const [selectedItems, setSelectedItems] = useState<ModuleItem[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [discount, setDiscount] = useState(0)

  const handleParameterChange = (parameterId: string, value: number | boolean | string | string[]) => {
    setParameterValues(prev => ({
      ...prev,
      [parameterId]: value
    }))
  }

  // Update base rate when currency changes
  useEffect(() => {
    setBaseRate(getBaseRate(currency))
  }, [currency])

  useEffect(() => {
    // Reset parameter values when defaults change
    setParameterValues(prev => {
      const newValues = { ...prev }
      for (const [id, value] of Object.entries(parameterDefaults)) {
        if (newValues[id] !== undefined) {
          newValues[id] = value
        }
      }
      return newValues
    })
  }, [parameterDefaults])

  useEffect(() => {
    // Calculate price using the new pricing model
    const params = parameters.map(param => ({
      ...param,
      defaultValue: parameterValues[param.id]
    }))

    let calculatedPrice = calculateProjectCost(baseRate, params)

    // Add module items prices
    const itemsPrice = selectedItems.reduce((sum, item) => {
      const itemPrice = convertWithRates(item.basePrice, 'USD', currency, exchangeRates)
      return sum + itemPrice
    }, 0)

    calculatedPrice += itemsPrice

    // Apply discount
    calculatedPrice = calculatedPrice * (1 - discount / 100)

    setTotalPrice(Math.round(calculatedPrice))
  }, [
    baseRate,
    parameterValues,
    parameters,
    selectedItems,
    discount,
    currency,
    exchangeRates,
    parameterBiases
  ])

  return {
    currency,
    baseRate,
    setBaseRate,
    parameters,
    setParameters,
    parameterValues,
    handleParameterChange,
    selectedItems,
    setSelectedItems,
    totalPrice,
    discount,
    setDiscount
  }
}
