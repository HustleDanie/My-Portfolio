"use client"

import { useState, useEffect } from "react"
import { Play, Pause, Square, ArrowRight, ArrowLeft, TrendingUp, Clock, Settings, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { TrainingConfig } from "@/app/projects/encoder-training-dynamics/page"

interface TrainingPanelProps {
  config: TrainingConfig
  updateConfig: (key: keyof TrainingConfig, value: any) => void
  onNext: () => void
  onPrev: () => void
}

export function TrainingPanel({ config, updateConfig, onNext, onPrev }: TrainingPanelProps) {
  const [trainingConfig, setTrainingConfig] = useState({
    learningRate: 2e-5,
    epochs: 3,
    batchSize: 16,
    optimizer: "adamw",
    scheduler: "linear",
    warmupSteps: 500,
    weightDecay: 0.01,
    earlyStopping: true,
    patience: 2,
    mode: "simulated", // 'simulated' or 'real'
  })

  const [trainingState, setTrainingState] = useState<"idle" | "running" | "paused" | "completed">("idle")
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [trainingData, setTrainingData] = useState<any[]>([])
  const [metrics, setMetrics] = useState({
    loss: 0,
    accuracy: 0,
    f1: 0,
    timePerEpoch: 0,
  })

  // Simulate training progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (trainingState === "running") {
      interval = setInterval(() => {
        setCurrentEpoch((prev) => {
          const newEpoch = prev + 0.1

          // Generate realistic training metrics
          const loss = Math.max(0.1, 2.5 * Math.exp(-newEpoch * 0.8) + Math.random() * 0.1)
          const accuracy = Math.min(0.95, 0.5 + (1 - Math.exp(-newEpoch * 0.6)) * 0.4 + Math.random() * 0.05)
          const f1 = Math.min(0.92, accuracy * 0.95 + Math.random() * 0.03)

          setMetrics({
            loss: Number.parseFloat(loss.toFixed(4)),
            accuracy: Number.parseFloat(accuracy.toFixed(4)),
            f1: Number.parseFloat(f1.toFixed(4)),
            timePerEpoch: 45 + Math.random() * 15,
          })

          // Update training data for chart
          if (Math.floor(newEpoch * 10) % 5 === 0) {
            // Update every 0.5 epochs
            setTrainingData((prev) => [
              ...prev,
              {
                epoch: Number.parseFloat(newEpoch.toFixed(1)),
                loss: Number.parseFloat(loss.toFixed(4)),
                accuracy: Number.parseFloat(accuracy.toFixed(4)),
                f1: Number.parseFloat(f1.toFixed(4)),
              },
            ])
          }

          // Complete training
          if (newEpoch >= trainingConfig.epochs) {
            setTrainingState("completed")
            updateConfig("training", {
              ...trainingConfig,
              finalMetrics: { loss, accuracy, f1 },
              completed: true,
            })
            return trainingConfig.epochs
          }

          return newEpoch
        })
      }, 100) // Update every 100ms for smooth animation
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [trainingState]) // Removed trainingConfig.epochs from the dependency array

  const handleConfigChange = (key: string, value: any) => {
    setTrainingConfig((prev) => ({ ...prev, [key]: value }))
  }

  const startTraining = () => {
    setTrainingState("running")
    setCurrentEpoch(0)
    setTrainingData([])
    setMetrics({ loss: 0, accuracy: 0, f1: 0, timePerEpoch: 0 })
  }

  const pauseTraining = () => {
    setTrainingState("paused")
  }

  const resumeTraining = () => {
    setTrainingState("running")
  }

  const stopTraining = () => {
    setTrainingState("idle")
    setCurrentEpoch(0)
    setTrainingData([])
    setMetrics({ loss: 0, accuracy: 0, f1: 0, timePerEpoch: 0 })
  }

  const getEstimatedTime = () => {
    const samplesPerEpoch = config.dataset?.stats?.totalSamples || 10000
    const stepsPerEpoch = Math.ceil(samplesPerEpoch / trainingConfig.batchSize)
    const timePerStep = 0.5
    return (stepsPerEpoch * timePerStep * trainingConfig.epochs) / 60 // minutes
  }

  const getTaskSpecificMetrics = () => {
    switch (config.task) {
      case "named-entity-recognition":
        return ["Token F1", "Entity Precision", "Entity Recall"]
      case "question-answering":
        return ["EM Score", "F1 Score", "Start Accuracy"]
      case "semantic-similarity":
        return ["Pearson Correlation", "Spearman Correlation"]
      default:
        return ["Accuracy", "Precision", "Recall", "F1"]
    }
  }

  return (
    <div className="space-y-8">
      <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-yellow-900 dark:text-yellow-100">
            🟡 STEP 4: Training Panel
          </CardTitle>
          <CardDescription className="text-yellow-700 dark:text-yellow-300 font-space-mono">
            Configure training parameters and monitor the fine-tuning process for your {config.model?.name} model.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Training Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Training Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Learning Rate</Label>
                <Select
                  value={trainingConfig.learningRate.toString()}
                  onValueChange={(value) => handleConfigChange("learningRate", Number.parseFloat(value))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5e-5">5e-5 (High)</SelectItem>
                    <SelectItem value="2e-5">2e-5 (Recommended)</SelectItem>
                    <SelectItem value="1e-5">1e-5 (Conservative)</SelectItem>
                    <SelectItem value="5e-6">5e-6 (Very Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Epochs</Label>
                <Slider
                  value={[trainingConfig.epochs]}
                  onValueChange={(value) => handleConfigChange("epochs", value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="mt-2"
                />
                <div className="text-xs text-gray-500 mt-1">{trainingConfig.epochs} epochs</div>
              </div>

              <div>
                <Label className="text-sm font-medium">Batch Size</Label>
                <Select
                  value={trainingConfig.batchSize.toString()}
                  onValueChange={(value) => handleConfigChange("batchSize", Number.parseInt(value))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8">8 (Memory Efficient)</SelectItem>
                    <SelectItem value="16">16 (Recommended)</SelectItem>
                    <SelectItem value="32">32 (Fast Training)</SelectItem>
                    <SelectItem value="64">64 (High Memory)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Optimizer</Label>
                <Select
                  value={trainingConfig.optimizer}
                  onValueChange={(value) => handleConfigChange("optimizer", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adamw">AdamW (Recommended)</SelectItem>
                    <SelectItem value="adam">Adam</SelectItem>
                    <SelectItem value="sgd">SGD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Scheduler</Label>
                <Select
                  value={trainingConfig.scheduler}
                  onValueChange={(value) => handleConfigChange("scheduler", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear Decay</SelectItem>
                    <SelectItem value="cosine">Cosine Annealing</SelectItem>
                    <SelectItem value="constant">Constant</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Weight Decay</Label>
                <Slider
                  value={[trainingConfig.weightDecay * 100]}
                  onValueChange={(value) => handleConfigChange("weightDecay", value[0] / 100)}
                  min={0}
                  max={10}
                  step={0.1}
                  className="mt-2"
                />
                <div className="text-xs text-gray-500 mt-1">{(trainingConfig.weightDecay * 100).toFixed(1)}%</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Early Stopping</Label>
              <Switch
                checked={trainingConfig.earlyStopping}
                onCheckedChange={(checked) => handleConfigChange("earlyStopping", checked)}
              />
            </div>

            {trainingConfig.earlyStopping && (
              <div>
                <Label className="text-sm font-medium">Patience</Label>
                <Slider
                  value={[trainingConfig.patience]}
                  onValueChange={(value) => handleConfigChange("patience", value[0])}
                  min={1}
                  max={5}
                  step={1}
                  className="mt-2"
                />
                <div className="text-xs text-gray-500 mt-1">{trainingConfig.patience} epochs without improvement</div>
              </div>
            )}

            {/* Training Mode */}
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Training Mode</Label>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {trainingConfig.mode === "simulated"
                        ? "Demo mode with simulated training"
                        : "Real backend training"}
                    </p>
                  </div>
                  <Switch
                    checked={trainingConfig.mode === "real"}
                    onCheckedChange={(checked) => handleConfigChange("mode", checked ? "real" : "simulated")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Estimated Time */}
            <Card className="bg-gray-50 dark:bg-gray-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Estimated Training Time</span>
                </div>
                <div className="text-lg font-bold text-blue-600">{getEstimatedTime().toFixed(1)} minutes</div>
                <div className="text-xs text-gray-500 mt-1">
                  Based on {config.dataset?.stats?.totalSamples?.toLocaleString() || "10,000"} samples
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Training Monitor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Training Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Training Controls */}
            <div className="flex items-center gap-3">
              {trainingState === "idle" && (
                <Button onClick={startTraining} className="gap-2">
                  <Play className="h-4 w-4" />
                  Start Training
                </Button>
              )}
              {trainingState === "running" && (
                <Button onClick={pauseTraining} variant="outline" className="gap-2">
                  <Pause className="h-4 w-4" />
                  Pause
                </Button>
              )}
              {trainingState === "paused" && (
                <Button onClick={resumeTraining} className="gap-2">
                  <Play className="h-4 w-4" />
                  Resume
                </Button>
              )}
              {(trainingState === "running" || trainingState === "paused") && (
                <Button onClick={stopTraining} variant="destructive" className="gap-2">
                  <Square className="h-4 w-4" />
                  Stop
                </Button>
              )}
              {trainingState === "completed" && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Training Completed
                </Badge>
              )}
            </div>

            {/* Progress */}
            {trainingState !== "idle" && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Epoch Progress</span>
                  <span>
                    {currentEpoch.toFixed(1)} / {trainingConfig.epochs}
                  </span>
                </div>
                <Progress value={(currentEpoch / trainingConfig.epochs) * 100} />
              </div>
            )}

            {/* Current Metrics */}
            {trainingState !== "idle" && (
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-red-600">{metrics.loss.toFixed(4)}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Loss</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-green-600">{(metrics.accuracy * 100).toFixed(1)}%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-blue-600">{(metrics.f1 * 100).toFixed(1)}%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">F1 Score</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-purple-600">{metrics.timePerEpoch.toFixed(0)}s</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Time/Epoch</div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Training Chart */}
            {trainingData.length > 0 && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trainingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="epoch" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={2} name="Loss" />
                    <Line type="monotone" dataKey="accuracy" stroke="#22c55e" strokeWidth={2} name="Accuracy" />
                    <Line type="monotone" dataKey="f1" stroke="#3b82f6" strokeWidth={2} name="F1 Score" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Task-specific Metrics Info */}
            <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Task-specific Metrics:</strong>
                    <div className="mt-1 text-xs">
                      For {config.task}, we'll also track: {getTaskSpecificMetrics().join(", ")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Model Configuration
        </Button>

        {trainingState === "completed" && (
          <Button onClick={onNext} className="gap-2">
            Continue to Prediction Playground
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
