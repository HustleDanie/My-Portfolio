"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, Square, Settings, TrendingUp, Zap, Clock, AlertCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface TrainingConfig {
  epochs: number
  batchSize: number
  learningRate: number
  optimizer: "adam" | "rmsprop" | "sgd"
  scheduler: "none" | "step" | "cosine"
  gradientClipping: number
  earlyStoppingPatience: number
}

interface TrainingMetrics {
  epoch: number
  trainLoss: number
  valLoss: number
  trainAcc: number
  valAcc: number
  learningRate: number
  gradientNorm: number
}

interface GruTrainingPanelProps {
  architecture: any
  dataset: any
  onTrainingComplete: (metrics: TrainingMetrics[]) => void
}

export default function GruTrainingPanel({ architecture, dataset, onTrainingComplete }: GruTrainingPanelProps) {
  const [trainingConfig, setTrainingConfig] = useState<TrainingConfig>({
    epochs: 10,
    batchSize: 32,
    learningRate: 0.001,
    optimizer: "adam",
    scheduler: "none",
    gradientClipping: 1.0,
    earlyStoppingPatience: 3,
  })

  const [trainingState, setTrainingState] = useState<"idle" | "training" | "paused" | "completed">("idle")
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [trainingMetrics, setTrainingMetrics] = useState<TrainingMetrics[]>([])
  const [currentBatch, setCurrentBatch] = useState(0)
  const [totalBatches, setTotalBatches] = useState(100)
  const [estimatedTime, setEstimatedTime] = useState(0)

  // Simulate training process
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (trainingState === "training") {
      interval = setInterval(() => {
        setCurrentBatch((prev) => {
          if (prev >= totalBatches) {
            setCurrentEpoch((prevEpoch) => {
              const newEpoch = prevEpoch + 1

              // Generate realistic GRU training metrics
              const trainLoss = Math.max(0.1, 2.5 * Math.exp(-newEpoch * 0.3) + Math.random() * 0.1)
              const valLoss = Math.max(0.15, trainLoss + 0.05 + Math.random() * 0.1)
              const trainAcc = Math.min(0.95, 0.5 + (1 - Math.exp(-newEpoch * 0.2)) * 0.4 + Math.random() * 0.05)
              const valAcc = Math.max(0.3, trainAcc - 0.05 + Math.random() * 0.1)
              const gradientNorm = Math.max(0.1, 2.0 * Math.exp(-newEpoch * 0.1) + Math.random() * 0.5)

              const newMetrics = {
                epoch: newEpoch,
                trainLoss,
                valLoss,
                trainAcc,
                valAcc,
                learningRate: trainingConfig.learningRate * Math.pow(0.95, newEpoch),
                gradientNorm,
              }

              setTrainingMetrics((prev) => [...prev, newMetrics])

              if (newEpoch >= trainingConfig.epochs) {
                setTrainingState("completed")
                onTrainingComplete([...trainingMetrics, newMetrics])
              }

              return newEpoch
            })
            return 0
          }
          return prev + 1
        })
      }, 100) // Fast simulation
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [trainingState, currentBatch, totalBatches, trainingConfig.epochs, trainingMetrics, onTrainingComplete])

  const startTraining = () => {
    if (trainingState === "idle") {
      setTrainingMetrics([])
      setCurrentEpoch(0)
      setCurrentBatch(0)
      setTotalBatches(Math.floor(dataset?.samples / trainingConfig.batchSize) || 100)
    }
    setTrainingState("training")
  }

  const pauseTraining = () => {
    setTrainingState("paused")
  }

  const stopTraining = () => {
    setTrainingState("idle")
    setCurrentEpoch(0)
    setCurrentBatch(0)
    setTrainingMetrics([])
  }

  const epochProgress = totalBatches > 0 ? (currentBatch / totalBatches) * 100 : 0
  const overallProgress = trainingConfig.epochs > 0 ? (currentEpoch / trainingConfig.epochs) * 100 : 0

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Step 4: Train Your GRU Model</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Configure training parameters and monitor your GRU model's learning progress. GRUs typically train faster than
          LSTMs while maintaining good performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Training Configuration</span>
            </CardTitle>
            <CardDescription>Adjust hyperparameters for optimal GRU training</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Epochs</label>
                <input
                  type="number"
                  value={trainingConfig.epochs}
                  onChange={(e) => setTrainingConfig((prev) => ({ ...prev, epochs: Number.parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border rounded-md"
                  min="1"
                  max="100"
                  disabled={trainingState === "training"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Batch Size</label>
                <select
                  value={trainingConfig.batchSize}
                  onChange={(e) =>
                    setTrainingConfig((prev) => ({ ...prev, batchSize: Number.parseInt(e.target.value) }))
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={trainingState === "training"}
                >
                  <option value={16}>16</option>
                  <option value={32}>32</option>
                  <option value={64}>64</option>
                  <option value={128}>128</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Learning Rate</label>
              <select
                value={trainingConfig.learningRate}
                onChange={(e) =>
                  setTrainingConfig((prev) => ({ ...prev, learningRate: Number.parseFloat(e.target.value) }))
                }
                className="w-full px-3 py-2 border rounded-md"
                disabled={trainingState === "training"}
              >
                <option value={0.0001}>0.0001</option>
                <option value={0.001}>0.001</option>
                <option value={0.01}>0.01</option>
                <option value={0.1}>0.1</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Optimizer</label>
              <select
                value={trainingConfig.optimizer}
                onChange={(e) => setTrainingConfig((prev) => ({ ...prev, optimizer: e.target.value as any }))}
                className="w-full px-3 py-2 border rounded-md"
                disabled={trainingState === "training"}
              >
                <option value="adam">Adam</option>
                <option value="rmsprop">RMSprop</option>
                <option value="sgd">SGD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gradient Clipping</label>
              <input
                type="number"
                value={trainingConfig.gradientClipping}
                onChange={(e) =>
                  setTrainingConfig((prev) => ({ ...prev, gradientClipping: Number.parseFloat(e.target.value) }))
                }
                className="w-full px-3 py-2 border rounded-md"
                min="0.1"
                max="10"
                step="0.1"
                disabled={trainingState === "training"}
              />
              <p className="text-xs text-muted-foreground mt-1">Prevents exploding gradients in GRU training</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Learning Rate Scheduler</label>
              <select
                value={trainingConfig.scheduler}
                onChange={(e) => setTrainingConfig((prev) => ({ ...prev, scheduler: e.target.value as any }))}
                className="w-full px-3 py-2 border rounded-md"
                disabled={trainingState === "training"}
              >
                <option value="none">None</option>
                <option value="step">Step Decay</option>
                <option value="cosine">Cosine Annealing</option>
              </select>
            </div>

            <div className="flex space-x-2">
              {trainingState === "idle" || trainingState === "paused" ? (
                <Button onClick={startTraining} className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  {trainingState === "paused" ? "Resume" : "Start Training"}
                </Button>
              ) : (
                <Button onClick={pauseTraining} variant="outline" className="flex-1">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              )}

              <Button onClick={stopTraining} variant="destructive" disabled={trainingState === "idle"}>
                <Square className="h-4 w-4 mr-2" />
                Stop
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Training Progress</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{currentEpoch}</div>
                <div className="text-sm text-muted-foreground">Current Epoch</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {trainingMetrics.length > 0
                    ? trainingMetrics[trainingMetrics.length - 1].trainAcc.toFixed(3)
                    : "0.000"}
                </div>
                <div className="text-sm text-muted-foreground">Train Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {trainingMetrics.length > 0 ? trainingMetrics[trainingMetrics.length - 1].valAcc.toFixed(3) : "0.000"}
                </div>
                <div className="text-sm text-muted-foreground">Val Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {trainingMetrics.length > 0
                    ? trainingMetrics[trainingMetrics.length - 1].trainLoss.toFixed(3)
                    : "0.000"}
                </div>
                <div className="text-sm text-muted-foreground">Current Loss</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Epoch Progress</span>
                  <span>
                    {currentBatch}/{totalBatches} batches
                  </span>
                </div>
                <Progress value={epochProgress} className="w-full" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>
                    {currentEpoch}/{trainingConfig.epochs} epochs
                  </span>
                </div>
                <Progress value={overallProgress} className="w-full" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge
                variant={
                  trainingState === "training" ? "default" : trainingState === "completed" ? "secondary" : "outline"
                }
              >
                {trainingState === "training"
                  ? "Training"
                  : trainingState === "completed"
                    ? "Completed"
                    : trainingState === "paused"
                      ? "Paused"
                      : "Ready"}
              </Badge>

              {trainingState === "training" && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Est. {Math.max(0, (trainingConfig.epochs - currentEpoch) * 30)} sec remaining</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {trainingMetrics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Training Metrics</CardTitle>
            <CardDescription>Real-time visualization of GRU training progress</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="loss" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="loss">Loss Curves</TabsTrigger>
                <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
                <TabsTrigger value="gradients">Gradients</TabsTrigger>
              </TabsList>

              <TabsContent value="loss" className="mt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trainingMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="epoch" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="trainLoss" stroke="#3b82f6" name="Training Loss" strokeWidth={2} />
                    <Line type="monotone" dataKey="valLoss" stroke="#ef4444" name="Validation Loss" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="accuracy" className="mt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trainingMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="epoch" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="trainAcc"
                      stroke="#10b981"
                      name="Training Accuracy"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="valAcc"
                      stroke="#8b5cf6"
                      name="Validation Accuracy"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="gradients" className="mt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trainingMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="epoch" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="gradientNorm"
                      stroke="#f59e0b"
                      name="Gradient Norm"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="learningRate"
                      stroke="#06b6d4"
                      name="Learning Rate"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center">
            <Zap className="h-4 w-4 mr-2" />
            GRU Training Tips
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• GRUs typically converge faster than LSTMs</li>
            <li>• Use gradient clipping to prevent exploding gradients</li>
            <li>• Start with smaller learning rates for stability</li>
            <li>• Monitor validation loss to detect overfitting early</li>
          </ul>
        </div>

        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Performance Notes
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• GRUs use ~25% fewer parameters than LSTMs</li>
            <li>• Faster training and inference times</li>
            <li>• Good performance on shorter sequences</li>
            <li>• May struggle with very long-term dependencies</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { GruTrainingPanel }
