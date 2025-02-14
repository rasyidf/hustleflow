import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BaseRateInputProps {
  value: number
  onChange: (value: number) => void
  currency: string
}

export default function BaseRateInput({ value, onChange, currency }: BaseRateInputProps) {
  return (
    <div>
      <Label htmlFor="base-rate">Base Hourly Rate ({currency})</Label>
      <Input
        id="base-rate"
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={1}
        className="mt-1"
      />
    </div>
  )
}

