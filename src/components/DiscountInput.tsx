import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DiscountInputProps {
  value: number
  onChange: (value: number) => void
}

export default function DiscountInput({ value, onChange }: DiscountInputProps) {
  return (
    <div>
      <Label htmlFor="discount">Discount (%)</Label>
      <Input
        id="discount"
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={0}
        max={100}
        className="mt-1"
      />
    </div>
  )
}

