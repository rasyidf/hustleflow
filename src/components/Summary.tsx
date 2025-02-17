import type { ModuleItem } from "@/lib/ModuleItem"
import { formatCurrency } from "@/lib/currencyUtils"
import { ProjectParameter } from "@/lib/projectParameters"

interface SummaryProps {
  baseRate: number
  parameters: ProjectParameter[]
  parameterValues: Record<string, number>
  selectedItems: ModuleItem[]
  totalPrice: number
  discount: number
  currency: string
}

export default function Summary({
  baseRate,
  parameters,
  parameterValues,
  selectedItems,
  totalPrice,
  discount,
  currency,
}: SummaryProps) {
  const basePrice = baseRate * parameterValues.duration * 8

  const parameterAdjustments = parameters
    .filter(param => param.id !== 'duration')
    .map(param => {
      const value = parameterValues[param.id]
      const normalizedValue = (value - param.min) / (param.max - param.min)
      return {
        name: param.name,
        value: basePrice * normalizedValue * param.bias
      }
    })

  const itemsPrice = selectedItems.reduce((sum, item) => sum + item.basePrice, 0)
  const subtotal = basePrice + parameterAdjustments.reduce((sum, p) => sum + p.value, 0) + itemsPrice
  const discountAmount = subtotal * (discount / 100)

  return (
    <div className="p-4 text-sm">
      <h2 className="text-xl font-bold mb-2">Project Summary</h2>
      <div className="space-y-1">
        <p>
          <strong>Base Rate:</strong> {formatCurrency(baseRate, currency)}/hour
        </p>
        {parameters.map(param => (
          <p key={param.id}>
            <strong>{param.name}:</strong> {parameterValues[param.id]}
            {param.unit ? ` ${param.unit}` : ''}
          </p>
        ))}
        <p>
          <strong>Base Price:</strong> {formatCurrency(basePrice, currency)}
        </p>
        {parameterAdjustments.map(adj => (
          <p key={adj.name}>
            <strong>{adj.name} Adjustment:</strong> {formatCurrency(adj.value, currency)}
          </p>
        ))}
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

