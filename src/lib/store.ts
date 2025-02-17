"use client";

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Currency = "USD" | "EUR" | "GBP" | "IDR"
export type UnitType = "hours" | "days" | "weeks" | "months"

export interface ExchangeRates {
  USD: number
  EUR: number
  GBP: number
  IDR: number
}

const defaultExchangeRates: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  IDR: 15600,
}

interface RateState {
  amount: number
  currency: Currency
}

interface SettingsState {
  // Currency and Exchange Rates
  currency: Currency
  exchangeRates: ExchangeRates
  rates: Record<Currency, RateState>
  
  // Project Calculation Settings
  complexityBias: number
  urgencyBias: number
  defaultBaseRate: number
  defaultDuration: number
  defaultUnit: UnitType
  
  // Parameter Biases
  parameterBiases: Record<string, number>
  parameterDefaults: Record<string, unknown>

  // Appearance Settings
  isDarkMode: boolean
  isHighContrast: boolean
  
  // Actions
  setCurrency: (currency: Currency) => void
  setComplexityBias: (bias: number) => void
  setUrgencyBias: (bias: number) => void
  setDefaultBaseRate: (rate: number) => void
  setDefaultDuration: (duration: number) => void
  setExchangeRates: (rates: ExchangeRates) => void
  setDefaultUnit: (unit: UnitType) => void
  setRate: (currency: Currency, amount: number) => void
  setParameterBias: (parameterId: string, bias: number) => void
  setParameterDefault: (parameterId: string, value: unknown) => void
  setIsDarkMode: (isDarkMode: boolean) => void
  setIsHighContrast: (isHighContrast: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Initial state
      currency: "USD",
      exchangeRates: defaultExchangeRates,
      rates: Object.keys(defaultExchangeRates).reduce((acc, curr) => ({
        ...acc,
        [curr]: { amount: 50, currency: curr as Currency }
      }), {} as Record<Currency, RateState>),
      complexityBias: 0.1,
      urgencyBias: 0.2,
      defaultBaseRate: 50,
      defaultDuration: 5,
      defaultUnit: "days",
      parameterBiases: {},
      parameterDefaults: {},
      isDarkMode: false,
      isHighContrast: false,

      // Actions
      setCurrency: (currency) => set({ currency }),
      setComplexityBias: (bias) => set({ complexityBias: Math.max(0, Math.min(1, bias)) }),
      setUrgencyBias: (bias) => set({ urgencyBias: Math.max(0, Math.min(1, bias)) }),
      setDefaultBaseRate: (rate) => set({ defaultBaseRate: Math.max(0, rate) }),
      setDefaultDuration: (duration) => set({ defaultDuration: Math.max(1, duration) }),
      setExchangeRates: (rates) => set({ exchangeRates: rates }),
      setDefaultUnit: (unit) => set({ defaultUnit: unit }),
      setRate: (currency, amount) => set((state) => ({
        rates: {
          ...state.rates,
          [currency]: { amount, currency }
        }
      })),
      setParameterBias: (parameterId, bias) => set((state) => ({
        parameterBiases: {
          ...state.parameterBiases,
          [parameterId]: Math.max(0, Math.min(1, bias))
        }
      })),
      setParameterDefault: (parameterId, value) => set((state) => ({
        parameterDefaults: {
          ...state.parameterDefaults,
          [parameterId]: value
        }
      })),
      setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
      setIsHighContrast: (isHighContrast) => set({ isHighContrast }),
    }),
    {
      name: "hustleflow-settings",
    },
  ),
)

export const convertPrice = (price: number, from: Currency, to: Currency, rates: ExchangeRates): number => {
  if (from === to) return price
  const usdAmount = price / rates[from]
  return usdAmount * rates[to]
}

export const convertDuration = (value: number, from: UnitType, to: UnitType): number => {
  const hourConversions: Record<UnitType, number> = {
    hours: 1,
    days: 8,
    weeks: 40,
    months: 160,
  }
  
  const hours = value * hourConversions[from]
  return hours / hourConversions[to]
}

