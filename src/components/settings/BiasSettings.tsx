import { Label } from "@/components/ui/label"
import { NumberSliderInput } from "@/components/blocks/NumberSliderInput"
import { SettingsSection } from "./SettingsLayout"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"
import { ProjectParameter, defaultParameters } from "@/lib/projectParameters"
import { useSettingsStore } from "@/lib/store"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Switch } from "../ui/switch"

export function BiasSettings() {
    const { parameterBiases, setParameterBias, parameterDefaults, setParameterDefault } = useSettingsStore()
    const biasableParams = defaultParameters.filter(param => param.bias > 0)

    const renderDefaultValueInput = (param: ProjectParameter) => {
        const currentValue = parameterDefaults[param.id] ?? param.defaultValue;

        switch (param.type) {
            case 'number':
                return (
                    <NumberSliderInput
                        parameter={{
                            ...param,
                            id: `default_${param.id}`,
                            name: `Default ${param.name}`
                        }}
                        value={currentValue as number}
                        onChange={(value) => setParameterDefault(param.id, value)}
                    />
                );
            case 'select':
                return (
                    <Select
                        value={currentValue as string}
                        onValueChange={(value) => setParameterDefault(param.id, value)}
                    >
                        <SelectTrigger>
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
                );
            case 'toggle':
                return (
                    <Switch
                        checked={currentValue as boolean}
                        onCheckedChange={(checked) => setParameterDefault(param.id, checked)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <SettingsSection
            title="Parameter Settings"
            description="Configure parameter biases and default values"
        >
            <ScrollArea className="h-[400px] pr-4">
                <TooltipProvider>
                    <div className="space-y-4">
                        {biasableParams.map((param) => (
                            <div key={param.id} className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">
                                        {param.name}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <InfoIcon className="h-4 w-4 ml-1 inline-block opacity-70" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Default bias: {(param.bias * 100).toFixed(0)}%</p>
                                                {param.description}
                                            </TooltipContent>
                                        </Tooltip>
                                    </Label>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <NumberSliderInput
                                            parameter={{
                                                ...param,
                                                id: `bias_${param.id}`,
                                                name: `${param.name} Bias`,
                                                min: 0,
                                                max: 1,
                                                step: 0.01,
                                                defaultValue: parameterBiases[param.id] ?? param.bias
                                            }}
                                            value={parameterBiases[param.id] ?? param.bias}
                                            onChange={(value) => setParameterBias(param.id, value)}
                                        />
                                        <div className="text-sm text-muted-foreground mt-1">
                                            Current impact: {((parameterBiases[param.id] ?? param.bias) * 100).toFixed(0)}%
                                        </div>
                                    </div>

                                    <div>
                                        {renderDefaultValueInput(param)}
                                    </div>
                                </div>

                                <Separator className="my-4" />
                            </div>
                        ))}
                    </div>
                </TooltipProvider>
            </ScrollArea>
        </SettingsSection>
    )
}