"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSettingsStore } from "@/lib/store"

export default function SettingsPage() {
  const {
    currency,
    exchangeRates,
    complexityBias,
    urgencyBias,
    defaultBaseRate,
    defaultDuration,
    setCurrency,
    setExchangeRates,
    setComplexityBias,
    setUrgencyBias,
    setDefaultBaseRate,
    setDefaultDuration,
  } = useSettingsStore()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleExchangeRateChange = (currency: string, value: string) => {
    setExchangeRates({
      ...exchangeRates,
      [currency]: Number(value),
    })
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Adjust the general settings for the calculator</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={(value: "USD" | "EUR" | "GBP" | "IDR") => setCurrency(value)}>
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
              <Label htmlFor="defaultBaseRate">Default Base Rate</Label>
              <Input
                id="defaultBaseRate"
                type="number"
                value={defaultBaseRate}
                onChange={(e) => setDefaultBaseRate(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultDuration">Default Duration (days)</Label>
              <Input
                id="defaultDuration"
                type="number"
                value={defaultDuration}
                onChange={(e) => setDefaultDuration(Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exchange Rates</CardTitle>
            <CardDescription>Set exchange rates relative to USD (1 USD = X Currency)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(exchangeRates).map(([cur, rate]) => (
              <div key={cur} className="space-y-2">
                <Label htmlFor={`rate-${cur}`}>1 USD to {cur}</Label>
                <Input
                  id={`rate-${cur}`}
                  type="number"
                  step="0.0001"
                  value={rate}
                  onChange={(e) => handleExchangeRateChange(cur, e.target.value)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calculation Biases</CardTitle>
            <CardDescription>Adjust the biases for complexity and urgency calculations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="complexityBias">Complexity Bias</Label>
              <Input
                id="complexityBias"
                type="number"
                step="0.01"
                value={complexityBias}
                onChange={(e) => setComplexityBias(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgencyBias">Urgency Bias</Label>
              <Input
                id="urgencyBias"
                type="number"
                step="0.01"
                value={urgencyBias}
                onChange={(e) => setUrgencyBias(Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

