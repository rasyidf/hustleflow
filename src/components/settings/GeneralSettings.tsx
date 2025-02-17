import { Currency, UnitType } from "@/lib/store"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { SettingsSection } from "./SettingsLayout"

interface GeneralSettingsProps {
  currency: Currency
  defaultBaseRate: number
  defaultDuration: number
  defaultUnit: UnitType
  onCurrencyChange: (value: Currency) => void
  onBaseRateChange: (value: number) => void
  onDurationChange: (value: number) => void
  onUnitChange: (value: UnitType) => void
}

export function GeneralSettings({
  currency,
  defaultBaseRate,
  defaultDuration,
  defaultUnit,
  onCurrencyChange,
  onBaseRateChange,
  onDurationChange,
  onUnitChange,
}: GeneralSettingsProps) {
  return (
    <SettingsSection
      title="General Settings"
      description="Adjust the general settings for the calculator"
    >
      <div className="space-y-2">
        <Label htmlFor="currency">Currency</Label>
        <Select value={currency} onValueChange={onCurrencyChange}>
          <SelectTrigger id="currency">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD ($)</SelectItem>
            <SelectItem value="EUR">EUR (€)</SelectItem>
            <SelectItem value="GBP">GBP (£)</SelectItem>
            <SelectItem value="IDR">IDR (Rp)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="defaultBaseRate">Default Base Rate (per {defaultUnit})</Label>
        <Input
          id="defaultBaseRate"
          type="number"
          min="0"
          value={defaultBaseRate}
          onChange={(e) => onBaseRateChange(Number(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="defaultDuration">Default Duration</Label>
          <Input
            id="defaultDuration"
            type="number"
            min="1"
            value={defaultDuration}
            onChange={(e) => onDurationChange(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="defaultUnit">Time Unit</Label>
          <Select value={defaultUnit} onValueChange={onUnitChange}>
            <SelectTrigger id="defaultUnit">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hours">Hours</SelectItem>
              <SelectItem value="days">Days</SelectItem>
              <SelectItem value="weeks">Weeks</SelectItem>
              <SelectItem value="months">Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </SettingsSection>
  )
}