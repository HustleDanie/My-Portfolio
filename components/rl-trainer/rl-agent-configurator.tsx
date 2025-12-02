"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Settings, Zap, Target } from "lucide-react"

interface RlAgentConfiguratorProps {
  onConfigComplete: (config: any) => void
  config: any
}

export default function RlAgentConfigurator({ onConfigComplete, config }: RlAgentConfiguratorProps) {
  const [agentConfig, setAgentConfig] = useState({
    learningRate: [0.001],
    discountFactor: [0.99],
    explorationRate: [0.1],
    explorationDecay: [0.995],
    episodes: [1000],
    batchSize: [32],
    memorySize: [10000],
    updateFrequency: [4],
    targetUpdateFreq: [100],
    optimizer: "adam",
    lossFunction: "mse",
    networkArchitecture: "simple",
  })

  const [warnings, setWarnings] = useState<string[]>([])

  const updateConfig = (key: string, value: any) => {
    const newConfig = { ...agentConfig, [key]: value }
    setAgentConfig(newConfig)
    validateConfig(newConfig)
  }

  const validateConfig = (config: any) => {
    const newWarnings: string[] = []

    if (config.learningRate[0] > 0.01) {
      newWarnings.push("High learning rate may cause unstable training")
    }
    if (config.learningRate[0] < 0.0001) {
      newWarnings.push("Very low learning rate may slow convergence")
    }
    if (config.explorationRate[0] < 0.01) {
      newWarnings.push("Low exploration may lead to suboptimal policies")
    }
    if (config.batchSize[0] > 128) {
      newWarnings.push("Large batch size may require more memory")
    }
    if (config.episodes[0] < 100) {
      newWarnings.push("Few episodes may not be enough for convergence")
    }

    setWarnings(newWarnings)
  }

  const getPresetConfig = (preset: string) => {
    const presets = {
      conservative: {
        learningRate: [0.0001],
        discountFactor: [0.99],
        explorationRate: [0.05],
        explorationDecay: [0.999],
        episodes: [2000],
        batchSize: [16],
      },
      balanced: {
        learningRate: [0.001],
        discountFactor: [0.95],
        explorationRate: [0.1],
        explorationDecay: [0.995],
        episodes: [1000],
        batchSize: [32],
      },
      aggressive: {
        learningRate: [0.01],
        discountFactor: [0.9],
        explorationRate: [0.2],
        explorationDecay: [0.99],
        episodes: [500],
        batchSize: [64],
      },
    }
    return presets[preset as keyof typeof presets] || presets.balanced
  }

  const applyPreset = (preset: string) => {
    const presetConfig = getPresetConfig(preset)
    setAgentConfig({ ...agentConfig, ...presetConfig })
    validateConfig({ ...agentConfig, ...presetConfig })
  }

  return (
    <div className="space-y-8">
      {/* Educational Introduction */}
      <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-orange-900 dark:text-orange-100">
            ⚙️ Configure Your RL Agent
          </CardTitle>
          <CardDescription className="font-space-mono text-orange-700 dark:text-orange-300">
            Fine-tune hyperparameters for your {config.algorithm} agent on {config.task}. Use presets for quick setup or
            customize each parameter for optimal performance.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preset Configurations */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron text-lg flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Presets
              </CardTitle>
              <CardDescription className="font-space-mono">
                Choose a preset configuration or customize parameters below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" onClick={() => applyPreset("conservative")} className="font-space-mono">
                  Conservative
                  <Badge variant="secondary" className="ml-2">
                    Safe
                  </Badge>
                </Button>
                <Button variant="outline" onClick={() => applyPreset("balanced")} className="font-space-mono">
                  Balanced
                  <Badge variant="secondary" className="ml-2">
                    Default
                  </Badge>
                </Button>
                <Button variant="outline" onClick={() => applyPreset("aggressive")} className="font-space-mono">
                  Aggressive
                  <Badge variant="secondary" className="ml-2">
                    Fast
                  </Badge>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Core Hyperparameters */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Core Hyperparameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Learning Rate */}
              <div className="space-y-2">
                <Label className="font-space-mono">Learning Rate (α): {agentConfig.learningRate[0]}</Label>
                <Slider
                  value={agentConfig.learningRate}
                  onValueChange={(value) => updateConfig("learningRate", value)}
                  min={0.0001}
                  max={0.1}
                  step={0.0001}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 font-space-mono">
                  Controls how quickly the agent learns from new experiences
                </p>
              </div>

              {/* Discount Factor */}
              <div className="space-y-2">
                <Label className="font-space-mono">Discount Factor (γ): {agentConfig.discountFactor[0]}</Label>
                <Slider
                  value={agentConfig.discountFactor}
                  onValueChange={(value) => updateConfig("discountFactor", value)}
                  min={0.8}
                  max={0.999}
                  step={0.001}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 font-space-mono">
                  How much the agent values future rewards vs immediate rewards
                </p>
              </div>

              {/* Exploration Rate */}
              <div className="space-y-2">
                <Label className="font-space-mono">Exploration Rate (ε): {agentConfig.explorationRate[0]}</Label>
                <Slider
                  value={agentConfig.explorationRate}
                  onValueChange={(value) => updateConfig("explorationRate", value)}
                  min={0.01}
                  max={0.5}
                  step={0.01}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 font-space-mono">
                  Probability of taking random actions for exploration
                </p>
              </div>

              {/* Exploration Decay */}
              <div className="space-y-2">
                <Label className="font-space-mono">Exploration Decay: {agentConfig.explorationDecay[0]}</Label>
                <Slider
                  value={agentConfig.explorationDecay}
                  onValueChange={(value) => updateConfig("explorationDecay", value)}
                  min={0.99}
                  max={0.9999}
                  step={0.0001}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 font-space-mono">
                  How quickly exploration rate decreases over time
                </p>
              </div>

              {/* Episodes */}
              <div className="space-y-2">
                <Label className="font-space-mono">Training Episodes: {agentConfig.episodes[0]}</Label>
                <Slider
                  value={agentConfig.episodes}
                  onValueChange={(value) => updateConfig("episodes", value)}
                  min={100}
                  max={5000}
                  step={100}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 font-space-mono">
                  Number of episodes to train the agent
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Parameters */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron text-lg flex items-center gap-2">
                <Target className="h-5 w-5" />
                Advanced Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Batch Size */}
              <div className="space-y-2">
                <Label className="font-space-mono">Batch Size: {agentConfig.batchSize[0]}</Label>
                <Slider
                  value={agentConfig.batchSize}
                  onValueChange={(value) => updateConfig("batchSize", value)}
                  min={8}
                  max={256}
                  step={8}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 font-space-mono">
                  Number of experiences used in each training update
                </p>
              </div>

              {/* Memory Size */}
              <div className="space-y-2">
                <Label className="font-space-mono">Memory Size: {agentConfig.memorySize[0]}</Label>
                <Slider
                  value={agentConfig.memorySize}
                  onValueChange={(value) => updateConfig("memorySize", value)}
                  min={1000}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 font-space-mono">
                  Size of experience replay buffer
                </p>
              </div>

              {/* Optimizer */}
              <div className="space-y-2">
                <Label className="font-space-mono">Optimizer</Label>
                <Select value={agentConfig.optimizer} onValueChange={(value) => updateConfig("optimizer", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adam">Adam</SelectItem>
                    <SelectItem value="rmsprop">RMSprop</SelectItem>
                    <SelectItem value="sgd">SGD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Network Architecture */}
              <div className="space-y-2">
                <Label className="font-space-mono">Network Architecture</Label>
                <Select
                  value={agentConfig.networkArchitecture}
                  onValueChange={(value) => updateConfig("networkArchitecture", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple (64-64)</SelectItem>
                    <SelectItem value="medium">Medium (128-128)</SelectItem>
                    <SelectItem value="large">Large (256-256-128)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Summary & Warnings */}
        <div className="space-y-6">
          {/* Warnings */}
          {warnings.length > 0 && (
            <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30">
              <CardHeader>
                <CardTitle className="font-orbitron text-lg text-yellow-900 dark:text-yellow-100 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Configuration Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {warnings.map((warning, idx) => (
                    <li
                      key={idx}
                      className="text-sm font-space-mono text-yellow-800 dark:text-yellow-200 flex items-start gap-2"
                    >
                      <span className="text-yellow-600 dark:text-yellow-400">•</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Configuration Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron text-lg">Configuration Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm font-space-mono space-y-1">
                <div>
                  <strong>Task:</strong> {config.task}
                </div>
                <div>
                  <strong>Algorithm:</strong> {config.algorithm}
                </div>
                <div>
                  <strong>Learning Rate:</strong> {agentConfig.learningRate[0]}
                </div>
                <div>
                  <strong>Discount Factor:</strong> {agentConfig.discountFactor[0]}
                </div>
                <div>
                  <strong>Exploration:</strong> {agentConfig.explorationRate[0]}
                </div>
                <div>
                  <strong>Episodes:</strong> {agentConfig.episodes[0]}
                </div>
                <div>
                  <strong>Batch Size:</strong> {agentConfig.batchSize[0]}
                </div>
                <div>
                  <strong>Optimizer:</strong> {agentConfig.optimizer}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estimated Training Time */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron text-lg">Training Estimates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm font-space-mono">
              <div>
                <strong>Estimated Time:</strong> ~{Math.ceil(agentConfig.episodes[0] / 100)} minutes
              </div>
              <div>
                <strong>Memory Usage:</strong> ~{Math.ceil(agentConfig.memorySize[0] / 1000)}MB
              </div>
              <div>
                <strong>Updates:</strong> ~{Math.ceil((agentConfig.episodes[0] * 200) / agentConfig.batchSize[0])}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center pt-8">
        <Button onClick={() => onConfigComplete(agentConfig)} size="lg" className="font-space-mono">
          Start Training with This Configuration
        </Button>
      </div>
    </div>
  )
}

export { RlAgentConfigurator }
