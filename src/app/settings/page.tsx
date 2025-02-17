"use client"
import { Layout } from "@/components/Layout"
import { AppearanceSettings } from "@/components/settings/AppearanceSettings"
import { BiasSettings } from "@/components/settings/BiasSettings"
import { ExchangeRates } from "@/components/settings/ExchangeRates"
import { GeneralSettings } from "@/components/settings/GeneralSettings"
import { SettingsTabs } from "@/components/settings/SettingsLayout"
import { useSettingsStore } from "@/lib/store"
import { useEffect, useState } from "react"

export default function SettingsPage() {
  const {
    currency,
    exchangeRates,
    defaultBaseRate,
    defaultDuration,
    defaultUnit,
    isDarkMode,
    isHighContrast,
    setCurrency,
    setExchangeRates,
    setDefaultBaseRate,
    setDefaultDuration,
    setDefaultUnit,
    setIsDarkMode,
    setIsHighContrast,
  } = useSettingsStore()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleExchangeRateChange = (currency: string, value: number) => {
    setExchangeRates({
      ...exchangeRates,
      [currency]: value,
    })
  }

  const tabs = [
    {
      value: "general",
      label: "General",
      content: (
        <GeneralSettings
          currency={currency}
          defaultBaseRate={defaultBaseRate}
          defaultDuration={defaultDuration}
          defaultUnit={defaultUnit}
          onCurrencyChange={setCurrency}
          onBaseRateChange={setDefaultBaseRate}
          onDurationChange={setDefaultDuration}
          onUnitChange={setDefaultUnit}
        />
      ),
    },
    {
      value: "appearance",
      label: "Appearance",
      content: (
        <AppearanceSettings
          isDarkMode={isDarkMode}
          isHighContrast={isHighContrast}
          onDarkModeChange={setIsDarkMode}
          onHighContrastChange={setIsHighContrast}
        />
      ),
    },
    {
      value: "exchange-rates",
      label: "Exchange Rates",
      content: (
        <ExchangeRates
          exchangeRates={exchangeRates}
          baseCurrency={currency}
          onExchangeRateChange={handleExchangeRateChange}
        />
      ),
    },
    {
      value: "biases",
      label: "Parameter Biases",
      content: <BiasSettings />,
    },
  ]

  return (

    <Layout>
      <div className="container max-w-4xl py-8">
        <SettingsTabs tabs={tabs} defaultValue="general" />
      </div>
    </Layout>
  )
}

