"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

interface AgentConfigurationPanelProps {
  onConfigComplete: (cfg: Record<string, unknown>) => void
  config: Record<string, unknown>
}

export default function AgentConfigurationPanel({ onConfigComplete, config }: AgentConfigurationPanelProps) {
  // 🔧 For now, just pass a dummy config forward
  const handleContinue = () => {
    onConfigComplete({
      tools: ["calculator", "web-search"],
      memory: { enabled: true },
      reasoning: "chain-of-thought",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-orbitron text-xl flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Agent Configuration (Placeholder)
        </CardTitle>
        <CardDescription className="font-space-mono">
          Configure tools, memory, and reasoning strategy. (Full UI coming soon)
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

export { AgentConfigurationPanel }
