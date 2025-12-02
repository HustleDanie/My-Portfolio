"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart } from "lucide-react"

interface PerformanceDashboardProps {
  config: Record<string, unknown>
}

export default function PerformanceDashboard({ config }: PerformanceDashboardProps) {
  const handleExport = () => {
    // stub export
    const data = { successRate: 1, toolCalls: 0 }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "agent-performance.json"
    a.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-orbitron text-xl flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          Performance Dashboard (Placeholder)
        </CardTitle>
        <CardDescription className="font-space-mono">
          Metrics and export tools will show here. (Charts coming soon)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleExport} className="font-space-mono w-full">
          Export JSON Report
        </Button>
      </CardContent>
    </Card>
  )
}

export { PerformanceDashboard }
