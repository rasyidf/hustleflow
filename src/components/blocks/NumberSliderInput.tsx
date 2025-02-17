import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ProjectParameter } from "@/lib/projectParameters"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { InfoIcon } from "lucide-react"

interface NumberSliderInputProps {
  parameter: ProjectParameter
  value: number
  onChange: (value: number) => void
}

export function NumberSliderInput({ parameter, value, onChange }: NumberSliderInputProps) {
  const [localValue, setLocalValue] = useState(value.toString())

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setLocalValue(val)
    const num = parseFloat(val)
    if (!isNaN(num)) {
      onChange(num)
    }
  }

  const handleSliderChange = (val: number[]) => {
    const newValue = val[0]
    setLocalValue(newValue.toString())
    onChange(newValue)
  }

  return (
    <div className="space-y-4 mb-2">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Label htmlFor={parameter.id}>{parameter.name}</Label>
            {
              parameter.description && (
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{
                      parameter.description}
                    </p>
                  </TooltipContent>
                </Tooltip>
              )
            }
          </div>

          <div className="flex items-center gap-2">
            <Input
              id={parameter.id}
              type="number"
              value={localValue}
              onChange={handleNumberChange}
              min={parameter.min ?? 0}
              max={parameter.max ?? undefined}
              step={parameter.step ?? 1}
            />
            {parameter.unit && (
              <span className="text-sm text-muted-foreground">
                {parameter.unit}
              </span>
            )}
          </div>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={handleSliderChange}
        min={parameter.min ?? 0}
        max={parameter.max ?? 100}
        step={parameter.step ?? 1}
      />
    </div>
  )
}