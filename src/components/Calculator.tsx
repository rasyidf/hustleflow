"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" 
import { useCalculatorHooks } from "@/hooks/useCalculatorHooks"
import BaseRateInput from "./BaseRateInput"
import DiscountInput from "./DiscountInput"
import ModuleSelection from "./ModuleSelection"
import PriceDisplay from "./PriceDisplay"
import ProjectParameters from "./ProjectParameters"
import Summary from "./Summary"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"

export default function Calculator() {
  const {
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
  } = useCalculatorHooks()

  return (
    <div className="w-full h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="space-y-6">
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
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

