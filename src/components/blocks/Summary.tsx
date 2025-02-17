import type { ModuleItem } from "@/lib/ModuleItem"
import { formatCurrency } from "@/lib/currencyUtils"
import { ProjectParameter } from "@/lib/projectParameters"
import { normalizeParameterValue } from "@/lib/projectUtils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileDown, PrinterIcon } from "lucide-react"
import html2pdf from 'html2pdf.js'
import { Currency } from "@/lib/store"

interface SummaryProps {
  baseRate: number
  parameters: ProjectParameter[]
  parameterValues: Record<string, number | boolean | string | string[]>
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
  const basePrice = baseRate * (parameterValues.duration as number) * 8

  const formatParameterValue = (param: ProjectParameter, value: number | boolean | string | string[]) => {
    if (param.type === 'toggle') return value ? 'Yes' : 'No'
    if (param.type === 'select' || param.type === 'options') {
      if (Array.isArray(value)) {
        return value.map(v => param.options?.find(o => o.value.toString() === v)?.label).join(', ')
      }
      return param.options?.find(o => o.value.toString() === value)?.label || value
    }
    return `${value}${param.unit ? ` ${param.unit}` : ''}`
  }

  const parameterAdjustments = parameters
    .filter(param => param.id !== 'duration')
    .map(param => {
      const value = parameterValues[param.id]
      const normalizedValue = normalizeParameterValue(value, param)
      return {
        name: param.name,
        value: basePrice * normalizedValue * param.bias
      }
    })

  const itemsPrice = selectedItems.reduce((sum, item) => sum + item.basePrice, 0)
  const subtotal = basePrice + parameterAdjustments.reduce((sum, p) => sum + p.value, 0) + itemsPrice
  const discountAmount = subtotal * (discount / 100)

  const handlePrint = () => {
    window.print()
  }

  const handleExportPDF = () => {
    const element = document.getElementById('project-summary')
    const opt = {
      margin: 1,
      filename: 'project-summary.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }
    html2pdf().set(opt).from(element).save()
  }

  return (
    <Card className="relative print:shadow-none print:border-none" >
      <CardHeader className="sticky inset-0 bg-white flex flex-row items-center justify-between border-b p-4">
        <CardTitle className="text-xl font-bold">Project Summary</CardTitle>
        <div className="flex gap-2 print:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPDF}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
          >
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6" id="project-summary" data-print="true">
        <div className="space-y-3">
          <h3 className="text-base font-semibold">Basic Information</h3>
          <div className="rounded-lg border bg-muted/30 p-3">
            <div className="space-y-2">
              <p className="flex justify-between text-sm">
                <span className="text-muted-foreground">Base Rate:</span>
                <span className="font-medium">{formatCurrency(baseRate, currency as Currency)}/hour</span>
              </p>
              {parameters.map(param => (
                <p key={param.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{param.name}:</span>
                  <span className="font-medium">{formatParameterValue(param, parameterValues[param.id])}</span>
                </p>
              ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-semibold">Price Breakdown</h3>
        <div className="rounded-lg border bg-muted/30 p-3">
          <div className="space-y-2">
            <p className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Price:</span>
              <span className="font-medium">{formatCurrency(basePrice, currency as Currency)}</span>
            </p>
            {parameterAdjustments.map(adj => (
              <p key={adj.name} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{adj.name} Adjustment:</span>
                <span className="font-medium">{formatCurrency(adj.value, currency as Currency)}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-semibold">Selected Items</h3>
          <div className="rounded-lg border bg-muted/30 p-3">
            <div className="space-y-2">
              {selectedItems.map((item) => (
                <p key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium">{formatCurrency(item.basePrice, currency as Currency)}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      <Separator className="my-4" />

      <div className="rounded-lg border bg-muted/30 p-3">
        <div className="space-y-2">
          <p className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium">{formatCurrency(subtotal, currency as Currency)}</span>
          </p>
          <p className="flex justify-between text-sm text-muted-foreground">
            <span>Discount ({discount}%):</span>
            <span>-{formatCurrency(discountAmount, currency as Currency)}</span>
          </p>
          <Separator className="my-2" />
          <p className="flex justify-between">
            <span className="text-base font-semibold">Total Price:</span>
            <span className="text-base font-bold">{formatCurrency(totalPrice, currency as Currency)}</span>
          </p>
        </div>
      </div>
    </CardContent>
    </Card >
  )
}

