import { useSettingsStore, convertPrice } from "@/lib/store"
import { useEffect, useState } from "react"
import { ModuleItem } from "@/lib/ModuleItem"

export function useCalculatorHooks() {
  const { currency, complexityBias, urgencyBias, defaultBaseRate, defaultDuration, exchangeRates } = useSettingsStore()
  const [baseRate, setBaseRate] = useState(defaultBaseRate)
  const [duration, setDuration] = useState(defaultDuration)
  const [complexity, setComplexity] = useState(3)
  const [urgency, setUrgency] = useState(1)
  const [selectedItems, setSelectedItems] = useState<ModuleItem[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    // Calculate total price based on inputs
    const basePrice = baseRate * duration * 8 // Assuming 8 working hours per day
    const complexityFactor = 1 + (complexity - 1) * complexityBias
    const urgencyFactor = 1 + (urgency - 1) * urgencyBias
    const itemsPrice = selectedItems.reduce((sum, item) => sum + convertPrice(item.basePrice, "USD", currency, exchangeRates), 0)

    let calculatedPrice = basePrice * complexityFactor * urgencyFactor + itemsPrice
    calculatedPrice = calculatedPrice * (1 - discount / 100) // Apply discount
    setTotalPrice(Math.round(calculatedPrice))
  }, [baseRate, duration, complexity, urgency, selectedItems, discount, complexityBias, urgencyBias, currency, exchangeRates])

  return {
    currency,
    complexityBias,
    urgencyBias,
    baseRate,
    setBaseRate,
    duration,
    setDuration,
    complexity,
    setComplexity,
    urgency,
    setUrgency,
    selectedItems,
    setSelectedItems,
    totalPrice,
    discount,
    setDiscount
  }
}
