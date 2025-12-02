"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Play, Square, TrendingUp, Clock, Zap } from "lucide-react"

interface ViTTrainingPanelProps {
  taskConfig: any
  datasetConfig: any
  architectureConfig: any
  config: any
  onConfigChange: (config: any) => void
  onNext: () => void
  onPrevious: () => void
}

export function ViTTrainingPanel({
  taskConfig,
  datasetConfig,
  architectureConfig,
  config,
  onConfigChange,
  onNext,
  onPrevious,
}: ViTTrainingPanelProps) {
  const [trainingConfig, setTrainingConfig] = useState(
    config.trainingConfig || {
      epochs: 10,
      batchSize: 32,
      learningRate: 0.001,
      optimizer: "adamw",
      lossFunction: "cross_entropy",
      scheduler: "cosine",
      mode: "simulated",
    },
  )

  const [isTraining, setIsTraining] = useState(false)
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [trainingMetrics, setTrainingMetrics] = useState({
    trainLoss: [],
    valLoss: [],
    trainAcc: [],
    valAcc: [],
  })

  const handleConfigChange = (key: string, value: any) => {
    const newConfig = { ...trainingConfig, [key]: value }
    setTrainingConfig(newConfig)
    onConfigChange({
      ...config,
      trainingConfig: newConfig,
    })
  }

  const simulateTraining = () => {
    setIsTraining(true)
    setCurrentEpoch(0)
    setTrainingMetrics({ trainLoss: [], valLoss: [], trainAcc: [], valAcc: [] })

    const interval = setInterval(() => {
      setCurrentEpoch((prev) => {
        const newEpoch = prev + 1

        // Simulate realistic training curves
        const trainLoss = Math.max(0.1, 2.5 * Math.exp(-newEpoch * 0.3) + Math.random() * 0.1)
        const valLoss = Math.max(0.15, 2.8 * Math.exp(-newEpoch * 0.25) + Math.random() * 0.15)
        const trainAcc = Math.min(0.98, 0.3 + 0.7 * (1 - Math.exp(-newEpoch * 0.4)) + Math.random() * 0.02)
        const valAcc = Math.min(0.95, 0.25 + 0.65 * (1 - Math.exp(-newEpoch * 0.35)) + Math.random() * 0.03)

        setTrainingMetrics((prev) => ({
          trainLoss: [...prev.trainLoss, trainLoss],
          valLoss: [...prev.valLoss, valLoss],
          trainAcc: [...prev.trainAcc, trainAcc],
          valAcc: [...prev.valAcc, valAcc],
        }))

        if (newEpoch >= trainingConfig.epochs) {
          clearInterval(interval)
          setIsTraining(false)
          onConfigChange({
            ...config,
            trainingConfig,
            trainingComplete: true,
            finalMetrics: { trainLoss, valLoss, trainAcc, valAcc },
          })
        }

        return newEpoch
      })
    }, 1000)
  }

  const stopTraining = () => {
    setIsTraining(false)
  }

  const getEstimatedTime = () => {
    const baseTime = trainingConfig.epochs * trainingConfig.batchSize * 0.1
    return `~${Math.ceil(baseTime / 60)} minutes`
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-orbitron text-center">🟡 Step 4: Training Configuration</CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-400 font-space-mono">
            Configure training parameters and monitor ViT training progress
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Training Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center font-orbitron">
                  <Zap className="w-5 h-5 mr-2" />
                  Training Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 font-space-mono">Epochs</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={trainingConfig.epochs}
                      onChange={(e) => handleConfigChange("epochs", Number.parseInt(e.target.value))}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 font-space-mono">Batch Size</label>
                    <select
                      value={trainingConfig.batchSize}
                      onChange={(e) => handleConfigChange("batchSize", Number.parseInt(e.target.value))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value={16}>16</option>
                      <option value={32}>32</option>
                      <option value={64}>64</option>
                      <option value={128}>128</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 font-space-mono">Learning Rate</label>
                  <input
                    type="range"
                    min="0.0001"
                    max="0.01"
                    step="0.0001"
                    value={trainingConfig.learningRate}
                    onChange={(e) => handleConfigChange("learningRate", Number.parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{trainingConfig.learningRate}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 font-space-mono">Optimizer</label>
                    <select
                      value={trainingConfig.optimizer}
                      onChange={(e) => handleConfigChange("optimizer", e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="adamw">AdamW</option>
                      <option value="adam">Adam</option>
                      <option value="sgd">SGD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 font-space-mono">Scheduler</label>
                    <select
                      value={trainingConfig.scheduler}
                      onChange={(e) => handleConfigChange("scheduler", e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="cosine">Cosine</option>
                      <option value="linear">Linear</option>
                      <option value="exponential">Exponential</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 font-space-mono">Training Mode</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="simulated"
                        checked={trainingConfig.mode === "simulated"}
                        onChange={(e) => handleConfigChange("mode", e.target.value)}
                      />
                      <span className="text-sm">Simulated (Demo)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="real"
                        checked={trainingConfig.mode === "real"}
                        onChange={(e) => handleConfigChange("mode", e.target.value)}
                      />
                      <span className="text-sm">Real Training</span>
                    </label>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                  <h4 className="font-semibold font-orbitron mb-2">Training Estimate</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm font-space-mono">
                    <div>
                      <strong>Duration:</strong> {getEstimatedTime()}
                    </div>
                    <div>
                      <strong>Total Steps:</strong> {Math.ceil(1000 / trainingConfig.batchSize) * trainingConfig.epochs}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={simulateTraining} disabled={isTraining} className="flex-1 font-space-mono">
                    <Play className="w-4 h-4 mr-2" />
                    {isTraining ? "Training..." : "Start Training"}
                  </Button>
                  {isTraining && (
                    <Button onClick={stopTraining} variant="outline">
                      <Square className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Training Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center font-orbitron">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Training Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isTraining || trainingMetrics.trainLoss.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-space-mono">
                          Epoch {currentEpoch}/{trainingConfig.epochs}
                        </span>
                      </div>
                      <Badge variant={isTraining ? "default" : "secondary"}>
                        {isTraining ? "Training" : "Complete"}
                      </Badge>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentEpoch / trainingConfig.epochs) * 100}%` }}
                      />
                    </div>

                    {trainingMetrics.trainLoss.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                          <h5 className="font-semibold font-space-mono text-sm mb-1">Training Loss</h5>
                          <div className="text-2xl font-bold">
                            {trainingMetrics.trainLoss[trainingMetrics.trainLoss.length - 1]?.toFixed(3)}
                          </div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                          <h5 className="font-semibold font-space-mono text-sm mb-1">Validation Acc</h5>
                          <div className="text-2xl font-bold">
                            {(trainingMetrics.valAcc[trainingMetrics.valAcc.length - 1] * 100)?.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="h-48 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <div className="text-center text-gray-500 font-space-mono text-sm">
                        Training Curves Visualization
                        <br />
                        <span className="text-xs">Loss and Accuracy over Epochs</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500 font-space-mono">
                      Configure parameters and start training to see progress
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between mt-8">
            <Button onClick={onPrevious} variant="outline" className="font-space-mono">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button onClick={onNext} disabled={!config.trainingComplete} className="font-space-mono">
              Next: Test Model
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
