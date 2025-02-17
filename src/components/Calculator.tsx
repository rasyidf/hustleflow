"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCalculatorHooks } from "@/hooks/useCalculatorHooks"
import ModuleSelection from "./blocks/ModuleSelection"
import PriceDisplay from "./blocks/PriceDisplay"
import { ProjectParameters } from "./blocks/ProjectParameters"
import Summary from "./blocks/Summary"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import { ScrollArea } from "./ui/scroll-area"

export default function Calculator() {
  const {
    currency,
    baseRate,
    parameters,
    parameterValues,
    handleParameterChange,
    selectedItems,
    setSelectedItems,
    totalPrice,
    discount,
  } = useCalculatorHooks()

  return (
    <ResizablePanelGroup className="w-full h-full p-2 space-x-2" direction="horizontal">
      <ResizablePanel defaultSize={65} minSize={50}>
        <ScrollArea className="h-screen "  >
          <Card>
            <CardHeader>
              <CardTitle>Project Basics</CardTitle>
              <CardDescription>Enter the basic details of your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProjectParameters
                parameters={parameters}
                values={parameterValues}
                onChange={handleParameterChange}
              />
            </CardContent>
          </Card>
          <Card className="mt-2">
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
        </ScrollArea>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={35} minSize={30}>
        <ResizablePanelGroup direction="vertical" className="space-y-2">
          <ResizablePanel defaultSize={50} minSize={40}>
            <PriceDisplay
              totalPrice={totalPrice}
              baseRate={baseRate}
              parameters={parameters}
              parameterValues={parameterValues}
              selectedItems={selectedItems}
              discount={discount}
              currency={currency}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ScrollArea className="h-full">
              <Summary
                baseRate={baseRate}
                parameters={parameters}
                parameterValues={parameterValues}
                selectedItems={selectedItems}
                totalPrice={totalPrice}
                discount={discount}
                currency={currency}
              />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

