import { create } from "zustand"
import { persist } from "zustand/middleware"

type Currency = "USD" | "EUR" | "GBP" | "IDR"

const exchangeRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  IDR: 15600,
}

interface SettingsState {
  currency: Currency
  exchangeRates: Record<Currency, number>
  complexityBias: number
  urgencyBias: number
  defaultBaseRate: number
  defaultDuration: number
  setCurrency: (currency: Currency) => void
  setComplexityBias: (bias: number) => void
  setUrgencyBias: (bias: number) => void
  setDefaultBaseRate: (rate: number) => void
  setDefaultDuration: (duration: number) => void
  setExchangeRates: (rates: Record<Currency, number>) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      currency: "USD",
      exchangeRates,
      complexityBias: 0.1,
      urgencyBias: 0.2,
      defaultBaseRate: 50,
      defaultDuration: 5,
      setCurrency: (currency) => set({ currency }),
      setComplexityBias: (bias) => set({ complexityBias: bias }),
      setUrgencyBias: (bias) => set({ urgencyBias: bias }),
      setDefaultBaseRate: (rate) => set({ defaultBaseRate: rate }),
      setDefaultDuration: (duration) => set({ defaultDuration: duration }),
      setExchangeRates: (rates) => set({ exchangeRates: rates }),
    }),
    {
      name: "freelancer-calculator-settings",
    },
  ),
)

export const convertPrice = (price: number, from: Currency, to: Currency, rates: Record<Currency, number>): number => {
  const usdAmount = price / rates[from]
  return usdAmount * rates[to]
}

