import type { ModuleItem } from "@/lib/ModuleItem"
import { formatCurrency } from "@/lib/currencyUtils"

interface SummaryProps {
  baseRate: number
  duration: number
  complexity: number
  urgency: number
  selectedItems: ModuleItem[]
  totalPrice: number
  discount: number
  currency: string
  complexityBias: number
  urgencyBias: number
}

export default function Summary({
  baseRate,
  duration,
  complexity,
  urgency,
  selectedItems,
  totalPrice,
  discount,
  currency,
}: SummaryProps) {
  const basePrice = baseRate * duration * 8
  const complexityPrice = basePrice * (complexity - 1) * 0.1
  const urgencyPrice = basePrice * (urgency - 1) * 0.2
  const itemsPrice = selectedItems.reduce((sum, item) => sum + item.basePrice, 0)
  const subtotal = basePrice + complexityPrice + urgencyPrice + itemsPrice
  const discountAmount = subtotal * (discount / 100)

  return (
    <div className="p-4 text-sm">
      <h2 className="text-xl font-bold mb-2">Project Summary</h2>
      <div className="space-y-1">
        <p>
          <strong>Base Rate:</strong> {formatCurrency(baseRate, currency)}/hour
        </p>
        <p>
          <strong>Duration:</strong> {duration} days
        </p>
        <p>
          <strong>Complexity:</strong> {complexity}/5
        </p>
        <p>
          <strong>Urgency:</strong> {urgency}/5
        </p>
        <p>
          <strong>Base Price:</strong> {formatCurrency(basePrice, currency)}
        </p>
        <p>
          <strong>Complexity Adjustment:</strong> {formatCurrency(complexityPrice, currency)}
        </p>
        <p>
          <strong>Urgency Adjustment:</strong> {formatCurrency(urgencyPrice, currency)}
        </p>
        <p>
          <strong>Selected Items:</strong>
        </p>
        <ul className="list-disc list-inside pl-2">
          {selectedItems.map((item) => (
            <li key={item.id}>
              {item.name} - {formatCurrency(item.basePrice, currency)}
            </li>
          ))}
        </ul>
        <p>
          <strong>Subtotal:</strong> {formatCurrency(subtotal, currency)}
        </p>
        <p>
          <strong>Discount ({discount}%):</strong> -{formatCurrency(discountAmount, currency)}
        </p>
        <p className="text-lg font-bold mt-2">
          Total Price: {formatCurrency(totalPrice, currency)}
        </p>
      </div>
    </div>
  )
}

