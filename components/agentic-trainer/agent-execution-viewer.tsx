"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity } from "lucide-react"

interface AgentExecutionViewerProps {
  onExecutionComplete: (exec: Record<string, unknown>) => void
  config: Record<string, unknown>
}

export default function AgentExecutionViewer({ onExecutionComplete, config }: AgentExecutionViewerProps) {
  const handleContinue = () => {
    onExecutionComplete({ log: "demo-run" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-orbitron text-xl flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Agent Execution (Placeholder)
        </CardTitle>
        <CardDescription className="font-space-mono">
          Step-by-step agent run will appear here. (Visualization coming soon)
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

export { AgentExecutionViewer }
