"use client"

import { useState, useEffect } from "react"
import {
  Play,
  Pause,
  Square,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Clock,
  Settings,
  AlertTriangle,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { DecoderTrainingConfig } from "@/app/projects/decoder-language-modeling/page"

interface DecoderTrainingPanelProps {
  config: DecoderTrainingConfig
  updateConfig: (key: keyof DecoderTrainingConfig, value: any) => void
  onNext: () => void
  onPrev: () => void
}

export function DecoderTrainingPanel({ config, updateConfig, onNext, onPrev }: DecoderTrainingPanelProps) {
  const [trainingConfig, setTrainingConfig] = useState({
    learningRate: 5e-5,
    epochs: 3,
    batchSize: 8,
    optimizer: "adamw",
    scheduler: "linear",
    warmupSteps: 500,
    weightDecay: 0.01,
    earlyStopping: true,
    patience: 2,
    mode: "simulated", // 'simulated' or 'real'
    gradientClipping: 1.0,
  })

  const [trainingState, setTrainingState] = useState<"idle" | "running" | "paused" | "completed">("idle")
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [trainingData, setTrainingData] = useState<any[]>([])
  const [metrics, setMetrics] = useState({
    loss: 0,
    perplexity: 0,
    learningRate: 0,
    timePerEpoch: 0,
  })
  const [generatedSamples, setGeneratedSamples] = useState<string[]>([])

  // Simulate training progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (trainingState === "running") {
      interval = setInterval(() => {
        setCurrentEpoch((prev) => {
          const newEpoch = prev + 0.1

          // Generate realistic training metrics for language modeling
          const loss = Math.max(0.5, 4.5 * Math.exp(-newEpoch * 0.7) + Math.random() * 0.2)
          const perplexity = Math.exp(loss)
          const lr = trainingConfig.learningRate * Math.max(0.1, 1 - newEpoch / trainingConfig.epochs)

          setMetrics({
            loss: Number.parseFloat(loss.toFixed(4)),
            perplexity: Number.parseFloat(perplexity.toFixed(2)),
            learningRate: Number.parseFloat(lr.toExponential(2)),
            timePerEpoch: 120 + Math.random() * 60,
          })

          // Update training data for chart
          if (Math.floor(newEpoch * 10) % 5 === 0) {
            // Update every 0.5 epochs
            setTrainingData((prev) => [
              ...prev,
              {
                epoch: Number.parseFloat(newEpoch.toFixed(1)),
                loss: Number.parseFloat(loss.toFixed(4)),
                perplexity: Number.parseFloat(perplexity.toFixed(2)),
                learningRate: lr,
              },
            ])
          }

          // Generate sample text every epoch
          if (Math.floor(newEpoch) > Math.floor(prev) && Math.floor(newEpoch) <= trainingConfig.epochs) {
            const sampleTexts = [
              `Epoch ${Math.floor(newEpoch)}: The model is learning to generate coherent text...`,
              `Epoch ${Math.floor(newEpoch)}: Generated text quality is improving with each iteration.`,
              `Epoch ${Math.floor(newEpoch)}: The language model shows better understanding of context.`,
            ]
            setGeneratedSamples((prev) => [...prev, sampleTexts[Math.floor(Math.random() * sampleTexts.length)]])
          }

          // Complete training
          if (newEpoch >= trainingConfig.epochs) {
            setTrainingState("completed")
            updateConfig("training", {
              ...trainingConfig,
              finalMetrics: { loss, perplexity },
              completed: true,
            })
            return trainingConfig.epochs
          }

          return newEpoch
        })
      }, 150) // Update every 150ms for smooth animation
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [trainingState]) // Removed trainingConfig.learningRate from dependencies

  const handleConfigChange = (key: string, value: any) => {
    setTrainingConfig((prev) => ({ ...prev, [key]: value }))
  }

  const startTraining = () => {
    setTrainingState("running")
    setCurrentEpoch(0)
    setTrainingData([])
    setGeneratedSamples([])
    setMetrics({ loss: 0, perplexity: 0, learningRate: 0, timePerEpoch: 0 })
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
    setGeneratedSamples([])
    setMetrics({ loss: 0, perplexity: 0, learningRate: 0, timePerEpoch: 0 })
  }

  const getEstimatedTime = () => {
    const samplesPerEpoch = config.dataset?.stats?.totalSamples || 10000
    const stepsPerEpoch = Math.ceil(samplesPerEpoch / trainingConfig.batchSize)
    const timePerStep = config.model?.size?.includes("1.3B") ? 2.0 : config.model?.size?.includes("345M") ? 1.0 : 0.5
    return (stepsPerEpoch * timePerStep * trainingConfig.epochs) / 60 // minutes
  }

  const getMemoryEstimate = () => {
    const modelSize = config.model?.size || "117M"
    const sizeNum = Number.parseFloat(modelSize.replace(/[^\d.]/g, ""))
    const batchMultiplier = trainingConfig.batchSize / 8
    return Math.ceil(sizeNum * 0.004 * batchMultiplier) // Rough estimate in GB
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
                    <SelectItem value="1e-4">1e-4 (High)</SelectItem>
                    <SelectItem value="5e-5">5e-5 (Recommended)</SelectItem>
                    <SelectItem value="2e-5">2e-5 (Conservative)</SelectItem>
                    <SelectItem value="1e-5">1e-5 (Very Low)</SelectItem>
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
                    <SelectItem value="4">4 (Memory Efficient)</SelectItem>
                    <SelectItem value="8">8 (Recommended)</SelectItem>
                    <SelectItem value="16">16 (Fast Training)</SelectItem>
                    <SelectItem value="32">32 (High Memory)</SelectItem>
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
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Warmup Steps</Label>
                <Slider
                  value={[trainingConfig.warmupSteps]}
                  onValueChange={(value) => handleConfigChange("warmupSteps", value[0])}
                  min={0}
                  max={2000}
                  step={100}
                  className="mt-2"
                />
                <div className="text-xs text-gray-500 mt-1">{trainingConfig.warmupSteps} steps</div>
              </div>

              <div>
                <Label className="text-sm font-medium">Gradient Clipping</Label>
                <Slider
                  value={[trainingConfig.gradientClipping]}
                  onValueChange={(value) => handleConfigChange("gradientClipping", value[0])}
                  min={0.1}
                  max={5.0}
                  step={0.1}
                  className="mt-2"
                />
                <div className="text-xs text-gray-500 mt-1">{trainingConfig.gradientClipping.toFixed(1)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Early Stopping</Label>
              <Switch
                checked={trainingConfig.earlyStopping}
                onCheckedChange={(checked) => handleConfigChange("earlyStopping", checked)}
              />
            </div>

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

            {/* Resource Estimates */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-50 dark:bg-gray-900">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">Estimated Time</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">{getEstimatedTime().toFixed(1)} min</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 dark:bg-gray-900">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">Memory Usage</span>
                  </div>
                  <div className="text-lg font-bold text-purple-600">~{getMemoryEstimate()} GB</div>
                </CardContent>
              </Card>
            </div>
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
                    <div className="text-lg font-bold text-blue-600">{metrics.perplexity.toFixed(1)}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Perplexity</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-green-600">{metrics.learningRate}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Learning Rate</div>
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
                    <Line type="monotone" dataKey="perplexity" stroke="#3b82f6" strokeWidth={2} name="Perplexity" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Generated Samples */}
            {generatedSamples.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-3">Generated Samples During Training</h4>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2 max-h-32 overflow-y-auto">
                  {generatedSamples.slice(-3).map((sample, i) => (
                    <div key={i} className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                      {sample}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Language Modeling Tips */}
            <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Language Modeling Tips:</strong>
                    <div className="mt-1 text-xs space-y-1">
                      <div>• Lower perplexity indicates better language modeling</div>
                      <div>• Watch for overfitting if validation loss increases</div>
                      <div>• Generated samples show model quality improvement</div>
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
            Continue to Generation Playground
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
