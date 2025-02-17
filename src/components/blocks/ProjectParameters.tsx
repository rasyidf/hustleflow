import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ProjectParameter } from "@/lib/projectParameters"
import { NumberSliderInput } from "./NumberSliderInput"

interface ProjectParametersProps {
  parameters: ProjectParameter[]
  values: Record<string, string | number | boolean | string[]>
  onChange: (id: string, value: number | boolean | string | string[]) => void
}

export function ProjectParameters({ parameters, values, onChange }: ProjectParametersProps) {
  const renderParameter = (param: ProjectParameter) => {
    switch (param.type) {
      case 'number':
        return (
          <NumberSliderInput
            key={param.id}
            parameter={param}
            value={values[param.id] as number}
            onChange={(value) => onChange(param.id, value)}
          />
        )
      case 'select':
        return (
          <div key={param.id} className="space-y-2">
            <Label htmlFor={param.id}>{param.name}</Label>
            <Select
              value={values[param.id] as unknown as string}
              onValueChange={(value) => onChange(param.id, value)}
            >
              <SelectTrigger id={param.id}>
                <SelectValue placeholder={`Select ${param.name}`} />
              </SelectTrigger>
              <SelectContent>
                {param.options?.map((option) => (
                  <SelectItem key={option.value.toString()} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      case 'toggle':
        return (
          <div key={param.id} className="flex items-center justify-between">
            <Label htmlFor={param.id}>{param.name}</Label>
            <Switch
              id={param.id}
              checked={values[param.id] as boolean}
              onCheckedChange={(checked) => onChange(param.id, checked)}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {parameters.map(renderParameter)}
    </div>
  )
}

