import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface ProjectParametersProps {
  duration: number
  complexity: number
  urgency: number
  onDurationChange: (value: number) => void
  onComplexityChange: (value: number) => void
  onUrgencyChange: (value: number) => void
}

export default function ProjectParameters({
  duration,
  complexity,
  urgency,
  onDurationChange,
  onComplexityChange,
  onUrgencyChange,
}: ProjectParametersProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="duration">Project Duration (days)</Label>
        <Slider
          id="duration"
          min={1}
          max={30}
          step={1}
          value={[duration]}
          onValueChange={(value) => onDurationChange(value[0])}
          className="mt-1"
        />
        <span className="text-sm text-gray-500">{duration} days</span>
      </div>
      <div>
        <Label htmlFor="complexity">Project Complexity</Label>
        <Slider
          id="complexity"
          min={1}
          max={5}
          step={1}
          value={[complexity]}
          onValueChange={(value) => onComplexityChange(value[0])}
          className="mt-1"
        />
        <span className="text-sm text-gray-500">{complexity} / 5</span>
      </div>
      <div>
        <Label htmlFor="urgency">Project Urgency</Label>
        <Slider
          id="urgency"
          min={1}
          max={5}
          step={1}
          value={[urgency]}
          onValueChange={(value) => onUrgencyChange(value[0])}
          className="mt-1"
        />
        <span className="text-sm text-gray-500">{urgency} / 5</span>
      </div>
    </div>
  )
}

