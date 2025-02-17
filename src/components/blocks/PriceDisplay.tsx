"use client"
import { useEffect, useRef } from "react"
import { Chart, type ChartConfiguration } from "chart.js/auto"
import { ModuleItem } from "@/lib/ModuleItem"
import { ProjectParameter } from "@/lib/projectParameters"
import { normalizeParameterValue } from "@/lib/projectUtils"
import { formatCurrency } from "@/lib/currencyUtils"
import { Card, CardContent } from "../ui/card"
import { Currency } from "@/lib/store"

interface PriceDisplayProps {
  totalPrice: number
  baseRate: number
  parameters: ProjectParameter[]
  parameterValues: Record<string, number | boolean | string | string[]>
  selectedItems: ModuleItem[]
  discount: number
  currency: string
}

export default function PriceDisplay({
  totalPrice,
  baseRate,
  parameters,
  parameterValues,
  selectedItems,
  discount,
  currency,
}: PriceDisplayProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        const basePrice = baseRate * (parameterValues.duration as number) * 8
        const parameterPrices = parameters
          .filter(param => param.id !== 'duration')
          .map(param => {
            const value = parameterValues[param.id]
            const normalizedValue = normalizeParameterValue(value, param)
            return {
              name: param.name,
              value: basePrice * normalizedValue * param.bias
            }
          })
          .filter(p => p.value !== 0) // Only show non-zero adjustments

        const itemsPrice = selectedItems.reduce((sum, item) => sum + item.basePrice, 0)
        const discountAmount = (basePrice + parameterPrices.reduce((sum, p) => sum + p.value, 0) + itemsPrice) * (discount / 100)

        const colors = [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(201, 203, 207, 0.8)",
        ]

        const config: ChartConfiguration = {
          type: "doughnut",
          data: {
            labels: [
              "Base Price",
              ...parameterPrices.map(p => p.name),
              ...(itemsPrice > 0 ? ["Modules & Services"] : []),
              ...(discountAmount > 0 ? ["Discount"] : [])
            ],
            datasets: [
              {
                data: [
                  basePrice,
                  ...parameterPrices.map(p => p.value),
                  ...(itemsPrice > 0 ? [itemsPrice] : []),
                  ...(discountAmount > 0 ? [-discountAmount] : [])
                ],
                backgroundColor: colors.slice(0, parameterPrices.length + 3),
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                display: true,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const value = context.raw as number;
                    return ` ${context.label}: ${formatCurrency(Math.abs(value), currency as Currency)}`;
                  }
                }
              },
              title: {
                display: true,
                text: "Price Breakdown",
              },
            },
          },
        }
        chartInstance.current = new Chart(ctx, config)
      }
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [baseRate, parameters, parameterValues, selectedItems, discount, currency])

  return (
    <Card className="h-full">
      <CardContent ref={containerRef} className="text-center w-full h-full min-h-[200px] py-4">
        <h2 className="text-3xl font-bold mb-2">Total Price</h2>
        <p className="text-5xl font-bold text-primary mb-4">
          {formatCurrency(totalPrice, currency as Currency)}
        </p>
        <div className="flex-1 relative">
          <canvas ref={chartRef}></canvas>
        </div>
      </CardContent>
    </Card>
  )
}

