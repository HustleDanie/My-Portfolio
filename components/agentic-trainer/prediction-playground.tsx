"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface PredictionPlaygroundProps {
  onPlaygroundComplete: (out: Record<string, unknown>) => void
  config: Record<string, unknown>
}

export default function PredictionPlayground({ onPlaygroundComplete, config }: PredictionPlaygroundProps) {
  const handleContinue = () => {
    onPlaygroundComplete({ grade: "👍" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-orbitron text-xl flex items-center gap-2">
          <Play className="h-5 w-5" />
          Prediction Playground (Placeholder)
        </CardTitle>
        <CardDescription className="font-space-mono">
          Inspect outputs and give feedback. (Interactive UI coming soon)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleContinue} className="font-space-mono w-full">
          Continue
        </Button>
      </CardContent>
    </Card>
  )
}

export { PredictionPlayground }
