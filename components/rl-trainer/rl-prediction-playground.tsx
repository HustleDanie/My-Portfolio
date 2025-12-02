"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Brain, Target, Zap, RotateCcw } from "lucide-react"

interface RlPredictionPlaygroundProps {
  onModelTrained: (model: any) => void
  config: any
}

export default function RlPredictionPlayground({ onModelTrained, config }: RlPredictionPlaygroundProps) {
  const [currentState, setCurrentState] = useState("")
  const [prediction, setPrediction] = useState<any>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [stepHistory, setStepHistory] = useState<any[]>([])
  const [selectedMode, setSelectedMode] = useState<"single" | "episode">("single")

  const sampleStates = {
    cartpole: ["[0.1, 0.2, 0.05, -0.1]", "[0.0, 0.0, 0.0, 0.0]", "[-0.2, 0.1, -0.05, 0.2]"],
    mountaincar: ["[-0.5, 0.0]", "[0.0, 0.0]", "[0.4, 0.05]"],
    frozenlake: ["0", "5", "10", "15"],
    pendulum: ["[0.8, 0.6, 0.2]", "[0.0, 1.0, 0.0]", "[-0.9, 0.4, -0.5]"],
  }

  const getActionName = (action: number, task: string) => {
    const actionMaps: Record<string, Record<number, string>> = {
      cartpole: { 0: "Push Left", 1: "Push Right" },
      mountaincar: { 0: "Push Left", 1: "No Push", 2: "Push Right" },
      frozenlake: { 0: "Left", 1: "Down", 2: "Right", 3: "Up" },
      pendulum: { 0: "Torque Left", 1: "No Torque", 2: "Torque Right" },
    }
    return actionMaps[task]?.[action] || `Action ${action}`
  }

  const predictAction = (state: string) => {
    // Simulate prediction based on task type
    const taskType = config.task || "cartpole"

    // Parse state
    let parsedState
    try {
      parsedState = JSON.parse(state)
    } catch {
      parsedState = Number.parseFloat(state) || 0
    }

    // Generate realistic predictions
    let action, qValues, confidence

    if (taskType === "cartpole") {
      const [pos, vel, angle, angVel] = Array.isArray(parsedState) ? parsedState : [0, 0, 0, 0]
      action = angle > 0 ? 1 : 0 // Simple heuristic
      qValues = [0.3 + Math.random() * 0.4, 0.4 + Math.random() * 0.4]
      confidence = Math.max(...qValues)
    } else if (taskType === "mountaincar") {
      const [pos, vel] = Array.isArray(parsedState) ? parsedState : [0, 0]
      action = pos < 0 ? 0 : pos > 0 ? 2 : 1
      qValues = [0.2 + Math.random() * 0.3, 0.1 + Math.random() * 0.2, 0.3 + Math.random() * 0.4]
      confidence = Math.max(...qValues)
    } else {
      action = Math.floor(Math.random() * 4)
      qValues = Array.from({ length: 4 }, () => Math.random() * 0.8)
      confidence = Math.max(...qValues)
    }

    return {
      action,
      actionName: getActionName(action, taskType),
      qValues,
      confidence,
      expectedReward: Math.random() * 100 + 50,
      state: parsedState,
    }
  }

  const handlePredict = () => {
    if (!currentState.trim()) return

    const result = predictAction(currentState)
    setPrediction(result)

    // Add to history
    setStepHistory((prev) => [
      ...prev.slice(-9),
      {
        step: prev.length + 1,
        state: currentState,
        ...result,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }

  const runEpisode = async () => {
    setIsRunning(true)
    setStepHistory([])

    // Simulate a full episode
    let currentStep = 0
    const maxSteps = 20
    let state = sampleStates[config.task as keyof typeof sampleStates]?.[0] || "[0, 0, 0, 0]"

    const episodeInterval = setInterval(() => {
      const result = predictAction(state)

      setStepHistory((prev) => [
        ...prev,
        {
          step: currentStep + 1,
          state: state,
          ...result,
          timestamp: new Date().toLocaleTimeString(),
        },
      ])

      // Update state (simplified simulation)
      if (config.task === "cartpole") {
        const [pos, vel, angle, angVel] = JSON.parse(state)
        const newAngle = angle + (result.action === 1 ? -0.1 : 0.1) + (Math.random() - 0.5) * 0.05
        state = JSON.stringify([pos + vel * 0.1, vel * 0.95, newAngle, angVel * 0.95])
      }

      currentStep++
      if (currentStep >= maxSteps) {
        clearInterval(episodeInterval)
        setIsRunning(false)
        onModelTrained({ trained: true, performance: Math.random() * 100 + 200 })
      }
    }, 500)
  }

  const resetPlayground = () => {
    setCurrentState("")
    setPrediction(null)
    setStepHistory([])
    setIsRunning(false)
  }

  return (
    <div className="space-y-8">
      {/* Educational Introduction */}
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-blue-900 dark:text-blue-100">
            🎮 Test Your Trained Agent
          </CardTitle>
          <CardDescription className="font-space-mono text-blue-700 dark:text-blue-300">
            Interact with your trained {config.algorithm} agent. Input states to see predictions, or run full episodes
            to watch the agent's decision-making process.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input & Controls */}
        <div className="space-y-6">
          {/* Mode Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron text-lg">Testing Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedMode === "single" ? "default" : "outline"}
                  onClick={() => setSelectedMode("single")}
                  className="font-space-mono"
                >
                  Single Step
                </Button>
                <Button
                  variant={selectedMode === "episode" ? "default" : "outline"}
                  onClick={() => setSelectedMode("episode")}
                  className="font-space-mono"
                >
                  Full Episode
                </Button>
              </div>
            </CardContent>
          </Card>

          {selectedMode === "single" ? (
            /* Single Step Mode */
            <Card>
              <CardHeader>
                <CardTitle className="font-orbitron text-lg">State Input</CardTitle>
                <CardDescription className="font-space-mono">Enter a state vector for {config.task}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-space-mono">Current State</Label>
                  <Input
                    value={currentState}
                    onChange={(e) => setCurrentState(e.target.value)}
                    placeholder="e.g., [0.1, 0.2, 0.05, -0.1]"
                    className="font-space-mono"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-space-mono">
                    Format: JSON array for continuous states, single number for discrete
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="font-space-mono">Sample States</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {(sampleStates[config.task as keyof typeof sampleStates] || sampleStates.cartpole).map(
                      (sample, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentState(sample)}
                          className="font-space-mono text-xs justify-start"
                        >
                          {sample}
                        </Button>
                      ),
                    )}
                  </div>
                </div>

                <Button onClick={handlePredict} disabled={!currentState.trim()} className="w-full font-space-mono">
                  <Brain className="h-4 w-4 mr-2" />
                  Predict Action
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Episode Mode */
            <Card>
              <CardHeader>
                <CardTitle className="font-orbitron text-lg">Episode Runner</CardTitle>
                <CardDescription className="font-space-mono">
                  Run a complete episode and watch the agent's decisions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={runEpisode} disabled={isRunning} className="w-full font-space-mono">
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? "Running Episode..." : "Start Episode"}
                </Button>

                <div className="text-sm font-space-mono text-gray-600 dark:text-gray-400">
                  {isRunning
                    ? `Step ${stepHistory.length}/20 - Agent is acting...`
                    : stepHistory.length > 0
                      ? `Episode completed in ${stepHistory.length} steps`
                      : "Click to run a full episode simulation"}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reset Button */}
          <Card>
            <CardContent className="pt-6">
              <Button onClick={resetPlayground} variant="outline" className="w-full font-space-mono">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Playground
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Prediction Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Prediction */}
          {prediction && (
            <Card>
              <CardHeader>
                <CardTitle className="font-orbitron text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Agent Decision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{prediction.action}</div>
                    <div className="text-sm font-space-mono text-gray-600 dark:text-gray-400">Action</div>
                    <Badge className="mt-1">{prediction.actionName}</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {(prediction.confidence * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm font-space-mono text-gray-600 dark:text-gray-400">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {prediction.expectedReward.toFixed(1)}
                    </div>
                    <div className="text-sm font-space-mono text-gray-600 dark:text-gray-400">Expected Reward</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {prediction.qValues.length}
                    </div>
                    <div className="text-sm font-space-mono text-gray-600 dark:text-gray-400">Actions Available</div>
                  </div>
                </div>

                {/* Q-Values */}
                <div>
                  <h4 className="font-orbitron text-sm font-semibold mb-2">Q-Values by Action:</h4>
                  <div className="space-y-2">
                    {prediction.qValues.map((qValue: number, idx: number) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-20 text-sm font-space-mono">{getActionName(idx, config.task)}</div>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${idx === prediction.action ? "bg-blue-500" : "bg-gray-400"}`}
                            style={{ width: `${(qValue / Math.max(...prediction.qValues)) * 100}%` }}
                          />
                        </div>
                        <div className="w-16 text-sm font-space-mono text-right">{qValue.toFixed(3)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step History */}
          {stepHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-orbitron text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Decision History
                </CardTitle>
                <CardDescription className="font-space-mono">Recent agent decisions and their outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {stepHistory
                    .slice()
                    .reverse()
                    .map((step, idx) => (
                      <div key={idx} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">Step {step.step}</Badge>
                          <span className="text-xs font-space-mono text-gray-500">{step.timestamp}</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm font-space-mono">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">State:</span>
                            <div className="truncate">{step.state}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Action:</span>
                            <div>{step.actionName}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
                            <div>{(step.confidence * 100).toFixed(1)}%</div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Reward:</span>
                            <div>{step.expectedReward.toFixed(1)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Agent Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron text-lg">Agent Visualization</CardTitle>
              <CardDescription className="font-space-mono">
                Visual representation of agent's decision process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-8 text-center">
                <div className="space-y-4">
                  <div className="text-6xl">🤖</div>
                  <div className="font-orbitron text-lg font-bold">{config.algorithm} Agent</div>
                  <div className="font-space-mono text-sm text-gray-600 dark:text-gray-400">
                    {prediction
                      ? `Last action: ${prediction.actionName} (${(prediction.confidence * 100).toFixed(1)}% confidence)`
                      : isRunning
                        ? "Processing episode..."
                        : "Ready for input"}
                  </div>
                  {(prediction || stepHistory.length > 0) && (
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-space-mono text-xs">Agent is active</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Continue Button */}
      {(prediction || stepHistory.length > 0) && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={() =>
              onModelTrained({
                trained: true,
                performance: prediction?.expectedReward || stepHistory[stepHistory.length - 1]?.expectedReward || 100,
              })
            }
            size="lg"
            className="font-space-mono"
          >
            Continue to Evaluation Dashboard
          </Button>
        </div>
      )}
    </div>
  )
}

export { RlPredictionPlayground }
