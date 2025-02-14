"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModuleItem } from "@/lib/ModuleItem"
import { useSettingsStore, convertPrice } from "@/lib/store"
import { useEffect, useState } from "react"
import BaseRateInput from "./BaseRateInput"
import DiscountInput from "./DiscountInput"
import ModuleSelection from "./ModuleSelection"
import PriceDisplay from "./PriceDisplay"
import ProjectParameters from "./ProjectParameters"
import Summary from "./Summary"

export default function Calculator() {
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

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Basics</CardTitle>
            <CardDescription>Enter the basic details of your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <BaseRateInput value={baseRate} onChange={setBaseRate} currency={currency} />
            <ProjectParameters
              duration={duration}
              complexity={complexity}
              urgency={urgency}
              onDurationChange={setDuration}
              onComplexityChange={setComplexity}
              onUrgencyChange={setUrgency}
            />
            <DiscountInput value={discount} onChange={setDiscount} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Modules and Services</CardTitle>
            <CardDescription>Select the modules and services for your project</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ModuleSelection
              selectedItems={selectedItems}
              onItemsChange={setSelectedItems}
              currency={currency}
            />
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <PriceDisplay
              totalPrice={totalPrice}
              baseRate={baseRate}
              duration={duration}
              complexity={complexity}
              urgency={urgency}
              selectedItems={selectedItems}
              discount={discount}
              currency={currency}
              complexityBias={complexityBias}
              urgencyBias={urgencyBias}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Summary
              baseRate={baseRate}
              duration={duration}
              complexity={complexity}
              urgency={urgency}
              selectedItems={selectedItems}
              totalPrice={totalPrice}
              discount={discount}
              currency={currency}
              complexityBias={complexityBias}
              urgencyBias={urgencyBias}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

