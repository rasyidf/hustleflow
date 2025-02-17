import { Currency } from "@/lib/store"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SettingsSection } from "./SettingsLayout"
import { cn } from "@/lib/utils"

interface ExchangeRatesProps {
  exchangeRates: Record<Currency, number>
  baseCurrency?: Currency
  onExchangeRateChange: (currency: string, value: number) => void
}

const currencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  IDR: "Rp",
}

export function ExchangeRates({ 
  exchangeRates, 
  baseCurrency = "USD",
  onExchangeRateChange 
}: ExchangeRatesProps) {
  const validateRate = (value: number) => {
    return value > 0 && isFinite(value)
  }

  const handleRateChange = (currency: string, value: number) => {
    if (validateRate(value)) {
      onExchangeRateChange(currency, value)
    }
  }

  return (
    <SettingsSection
      title="Exchange Rates"
      description={`Set exchange rates relative to ${baseCurrency} (1 ${baseCurrency} = X Currency)`}
    >
      <div className="grid gap-4">
        {Object.entries(exchangeRates).map(([cur, rate]) => (
          cur !== baseCurrency && (
            <div key={cur} className="space-y-2">
              <Label htmlFor={`rate-${cur}`} className="flex items-center justify-between">
                <span>1 {baseCurrency} to {cur}</span>
                <span className="text-sm text-muted-foreground">
                  {currencySymbols[cur as Currency]}
                </span>
              </Label>
              <Input
                id={`rate-${cur}`}
                type="number"
                step="0.0001"
                min="0"
                value={rate}
                onChange={(e) => handleRateChange(cur, Number(e.target.value))}
                className={cn(
                  !validateRate(rate) && "border-red-500"
                )}
              />
            </div>
          )
        ))}
      </div>
    </SettingsSection>
  )
}