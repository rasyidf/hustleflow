"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartConfiguration } from "chart.js/auto" 
import { ModuleItem } from "@/lib/ModuleItem"
interface PriceDisplayProps {
  totalPrice: number
  baseRate: number
  duration: number
  complexity: number
  urgency: number
  selectedItems: ModuleItem[]
  discount: number
  currency: string
  complexityBias: number
  urgencyBias: number
}

export default function PriceDisplay({
  totalPrice,
  baseRate,
  duration,
  complexity,
  urgency,
  selectedItems,
  discount,
  currency,
  complexityBias,
  urgencyBias,
}: PriceDisplayProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        const basePrice = baseRate * duration * 8
        const complexityPrice = basePrice * (complexity - 1) * complexityBias
        const urgencyPrice = basePrice * (urgency - 1) * urgencyBias
        const itemsPrice = selectedItems.reduce((sum, item) => sum + item.basePrice, 0)
        const discountAmount = (basePrice + complexityPrice + urgencyPrice + itemsPrice) * (discount / 100)

        const config: ChartConfiguration = {
          type: "doughnut",
          data: {
            labels: ["Base Price", "Complexity", "Urgency", "Modules & Services", "Discount"],
            datasets: [
              {
                data: [basePrice, complexityPrice, urgencyPrice, itemsPrice, -discountAmount],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.8)",
                  "rgba(54, 162, 235, 0.8)",
                  "rgba(255, 206, 86, 0.8)",
                  "rgba(75, 192, 192, 0.8)",
                  "rgba(153, 102, 255, 0.8)",
                ],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
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
  }, [baseRate, duration, complexity, urgency, selectedItems, discount, complexityBias, urgencyBias])

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-2">Total Price</h2>
      <p className="text-5xl font-bold text-primary mb-4">
        {currency}
        {totalPrice}
      </p>
      <canvas ref={chartRef} width={300} height={300}></canvas>
    </div>
  )
}

