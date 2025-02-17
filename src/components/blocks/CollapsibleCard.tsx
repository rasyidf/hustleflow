"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface CollapsibleCardProps {
  title: string
  price: string
  isChecked: boolean
  onCheckedChange?: (checked: boolean) => void
  children?: React.ReactNode
}

export function CollapsibleCard({
  title,
  price,
  isChecked,
  onCheckedChange,
  children
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="mb-2">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="p-3">
          <div className="flex items-center space-x-4">{
            onCheckedChange && <Checkbox
              checked={isChecked}
              onCheckedChange={onCheckedChange}
              onClick={(e) => e.stopPropagation()}
            />}
            <div className="flex-1 flex justify-between items-center">
              <span className="font-medium">{title}</span>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">{price}</span>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
