"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { allItems, subcomponents } from "@/lib/initialItems"
import { ModuleItem } from "@/lib/ModuleItem"
import { useState } from "react"
import { CollapsibleCard } from "./CollapsibleCard"
import { Checkbox } from "./ui/checkbox"

interface ModuleSelectionProps {
  selectedItems: ModuleItem[]
  onItemsChange: (items: ModuleItem[]) => void
  currency: string
}

export default function ModuleSelection({ selectedItems, onItemsChange, currency }: ModuleSelectionProps) {
  const [availableItems, setAvailableItems] = useState(
    allItems.filter((item) => !selectedItems.some((selected) => selected.id === item.id))
  )
  const [checkedAvailable, setCheckedAvailable] = useState<string[]>([])
  const [checkedSelected, setCheckedSelected] = useState<string[]>([])
  const [selectedSubcomponents, setSelectedSubcomponents] = useState<Record<string, string[]>>({})

  const moveToSelected = () => {
    const itemsToMove = availableItems.filter(item => checkedAvailable.includes(item.id))
    setAvailableItems(availableItems.filter(item => !checkedAvailable.includes(item.id)))
    onItemsChange([...selectedItems, ...itemsToMove])
    setCheckedAvailable([])
  }

  const moveToAvailable = () => {
    const itemsToMove = selectedItems.filter(item => checkedSelected.includes(item.id))
    setAvailableItems([ ...availableItems, ...itemsToMove ])
    onItemsChange(selectedItems.filter(item => !checkedSelected.includes(item.id)))
    setCheckedSelected([])
    // Clear subcomponent selections for removed items
    const newSelectedSubcomponents = { ...selectedSubcomponents }
    itemsToMove.forEach(item => delete newSelectedSubcomponents[item.id])
    setSelectedSubcomponents(newSelectedSubcomponents)
  }

  const handleSubcomponentToggle = (moduleId: string, subcomponentId: string, checked: boolean) => {
    const currentSubs = selectedSubcomponents[moduleId] || []
    const newSubs = checked
      ? [...currentSubs, subcomponentId]
      : currentSubs.filter(id => id !== subcomponentId)

    setSelectedSubcomponents({
      ...selectedSubcomponents,
      [moduleId]: newSubs
    })
  }

  const calculateModulePrice = (item: ModuleItem): number => {
    if (!item.subcomponents.length) return item.basePrice

    const selectedSubs = selectedSubcomponents[item.id] || []
    const subcomponentItems = subcomponents.filter(sub =>
      item.subcomponents.includes(sub.id) && selectedSubs.includes(sub.id)
    )

    const subTotal = subcomponentItems.reduce((sum, sub) => sum + sub.basePrice, 0)
    return Math.max(item.basePrice, subTotal)
  }

  const renderSubcomponents = (item: ModuleItem) => {
    if (!item.subcomponents.length) return null

    const subs = subcomponents.filter(sub => item.subcomponents.includes(sub.id))
    const selectedSubs = selectedSubcomponents[item.id] || []

    return (
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-medium mb-2">Subcomponents:</h4>
        <div className="pl-4 space-y-2">
          {subs.map(sub => (
            <div key={sub.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedSubs.includes(sub.id)}
                  onCheckedChange={(checked) =>
                    handleSubcomponentToggle(item.id, sub.id, checked as boolean)
                  }
                />
                <span className="text-sm">{sub.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {currency}{sub.basePrice}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderItem = (item: ModuleItem, isSelected: boolean) => (
    <CollapsibleCard
      key={item.id}
      title={item.name}
      price={`${currency}${calculateModulePrice(item)}`}
      isChecked={isSelected ? checkedSelected.includes(item.id) : checkedAvailable.includes(item.id)}
      onCheckedChange={(checked) => {
        if (isSelected) {
          setCheckedSelected(checked
            ? [...checkedSelected, item.id]
            : checkedSelected.filter(id => id !== item.id)
          )
        } else {
          setCheckedAvailable(checked
            ? [...checkedAvailable, item.id]
            : checkedAvailable.filter(id => id !== item.id)
          )
        }
      }}
    >
      <div className="text-sm text-muted-foreground mb-4">{item.description}</div>
      {isSelected && renderSubcomponents(item)}
    </CollapsibleCard>
  )

  // Rest of the component remains the same, just update the render section:
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Available Items</h3>
          <Button
            size="sm"
            onClick={moveToSelected}
            disabled={checkedAvailable.length === 0}
          >
            Add →
          </Button>
        </div>
        <Card>
          <CardContent className="p-2">
            {availableItems.map((item) => renderItem(item, false))}
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Selected Items</h3>
          <Button
            size="sm"
            onClick={moveToAvailable}
            disabled={checkedSelected.length === 0}
          >
            ← Remove
          </Button>
        </div>
        <Card>
          <CardContent className="p-2">
            {selectedItems.map((item) => renderItem(item, true))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

