"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Square, Settings, TrendingUp, Clock, Zap, CheckCircle, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TrainingMetrics {
  epoch: number
  trainLoss: number
  valLoss: number
  bleuScore?: number
  rougeScore?: number
  perplexity: number
}

interface Seq2SeqTrainingPanelProps {
  onComplete: (data: { training: any }) => void
  config: any
}

export function Seq2SeqTrainingPanel({ onComplete, config }: Seq2SeqTrainingPanelProps) {
  const [trainingConfig, setTrainingConfig] = useState({
    epochs: 3,
    batchSize: 16,
    learningRate: 5e-5,
    optimizer: "adamw",
    scheduler: "linear",
    warmupSteps: 500,
    maxGradNorm: 1.0,
    evaluationStrategy: "epoch",
  })

  const [trainingState, setTrainingState] = useState<"idle" | "running" | "paused" | "completed">("idle")
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(1000)
  const [metrics, setMetrics] = useState<TrainingMetrics[]>([])
  const [currentSample, setCurrentSample] = useState<any>(null)
  const [estimatedTime, setEstimatedTime] = useState("15 minutes")

  // Simulate training progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (trainingState === "running") {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const newStep = prev + 1
          const newEpoch = Math.floor(newStep / (totalSteps / trainingConfig.epochs))

          if (newEpoch !== currentEpoch) {
            setCurrentEpoch(newEpoch)

            // Add epoch metrics
            const newMetric: TrainingMetrics = {
              epoch: newEpoch,
              trainLoss: 2.5 - newEpoch * 0.3 + Math.random() * 0.2,
              valLoss: 2.7 - newEpoch * 0.25 + Math.random() * 0.15,
              bleuScore: Math.min(0.4 + newEpoch * 0.1 + Math.random() * 0.05, 0.8),
              rougeScore: Math.min(0.35 + newEpoch * 0.08 + Math.random() * 0.04, 0.75),
              perplexity: Math.max(15 - newEpoch * 2 + Math.random() * 2, 5),
            }

            setMetrics((prev) => [...prev, newMetric])
          }

          // Generate sample predictions
          if (newStep % 100 === 0) {
            setCurrentSample({
              input: "The researchers discovered a new method for improving neural network efficiency...",
              prediction: `New method improves neural networks (Step ${newStep})`,
              target: "Researchers find way to boost neural network efficiency",
            })
          }

          if (newStep >= totalSteps) {
            setTrainingState("completed")
            onComplete({ training: { metrics, config: trainingConfig } })
            return totalSteps
          }

          return newStep
        })
      }, 50) // Fast simulation
    }

    return () => clearInterval(interval)
  }, [trainingState, currentEpoch, totalSteps, trainingConfig, onComplete])

  const startTraining = () => {
    setTrainingState("running")
    setCurrentStep(0)
    setCurrentEpoch(0)
    setMetrics([])
    setTotalSteps(trainingConfig.epochs * 100) // Simulate steps per epoch
  }

  const pauseTraining = () => {
    setTrainingState("paused")
  }

  const resumeTraining = () => {
    setTrainingState("running")
  }

  const stopTraining = () => {
    setTrainingState("idle")
    setCurrentStep(0)
    setCurrentEpoch(0)
    setMetrics([])
  }

  const updateTrainingConfig = (key: string, value: any) => {
    setTrainingConfig((prev) => ({ ...prev, [key]: value }))

    // Update time estimate
    const timePerEpoch = value === "epochs" ? 5 : 5
    const totalTime = (key === "epochs" ? value : trainingConfig.epochs) * timePerEpoch
    setEstimatedTime(`${totalTime} minutes`)
  }

  const getTaskSpecificMetrics = () => {
    if (!config.task) return []

    switch (config.task) {
      case "summarization":
        return ["ROUGE-1", "ROUGE-L", "BLEU"]
      case "translation":
        return ["BLEU", "chrF", "TER"]
      case "paraphrase":
        return ["BLEU", "METEOR", "Semantic Similarity"]
      case "question_generation":
        return ["BLEU", "ROUGE", "Question Quality"]
      case "grammar_correction":
        return ["GLEU", "Edit Distance", "Accuracy"]
      case "headline_generation":
        return ["ROUGE", "BLEU", "Headline Quality"]
      default:
        return ["BLEU", "ROUGE"]
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Training Configuration</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Configure training hyperparameters and monitor your model's progress in real-time.
        </p>
      </div>

      {/* Training Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Hyperparameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Epochs</Label>
              <Slider
                value={[trainingConfig.epochs]}
                onValueChange={(value) => updateTrainingConfig("epochs", value[0])}
                max={10}
                min={1}
                step={1}
                disabled={trainingState === "running"}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>1</span>
                <span>{trainingConfig.epochs}</span>
                <span>10</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Batch Size</Label>
              <Select
                value={trainingConfig.batchSize.toString()}
                onValueChange={(value) => updateTrainingConfig("batchSize", Number.parseInt(value))}
                disabled={trainingState === "running"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="32">32</SelectItem>
                  <SelectItem value="64">64</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Learning Rate</Label>
              <Select
                value={trainingConfig.learningRate.toString()}
                onValueChange={(value) => updateTrainingConfig("learningRate", Number.parseFloat(value))}
                disabled={trainingState === "running"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1e-5">1e-5</SelectItem>
                  <SelectItem value="5e-5">5e-5</SelectItem>
                  <SelectItem value="1e-4">1e-4</SelectItem>
                  <SelectItem value="5e-4">5e-4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Optimizer</Label>
              <Select
                value={trainingConfig.optimizer}
                onValueChange={(value) => updateTrainingConfig("optimizer", value)}
                disabled={trainingState === "running"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adamw">AdamW</SelectItem>
                  <SelectItem value="adam">Adam</SelectItem>
                  <SelectItem value="sgd">SGD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Scheduler</Label>
              <Select
                value={trainingConfig.scheduler}
                onValueChange={(value) => updateTrainingConfig("scheduler", value)}
                disabled={trainingState === "running"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="cosine">Cosine</SelectItem>
                  <SelectItem value="constant">Constant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Warmup Steps</Label>
              <Slider
                value={[trainingConfig.warmupSteps]}
                onValueChange={(value) => updateTrainingConfig("warmupSteps", value[0])}
                max={2000}
                min={0}
                step={100}
                disabled={trainingState === "running"}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>0</span>
                <span>{trainingConfig.warmupSteps}</span>
                <span>2000</span>
              </div>
            </div>
          </div>

          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              <strong>Estimated Training Time:</strong> {estimatedTime} with current configuration. Training will use{" "}
              {getTaskSpecificMetrics().join(", ")} for evaluation.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Training Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Training Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            {trainingState === "idle" && (
              <Button onClick={startTraining} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Start Training
              </Button>
            )}

            {trainingState === "running" && (
              <>
                <Button onClick={pauseTraining} variant="outline" className="flex items-center gap-2">
                  <Pause className="w-4 h-4" />
                  Pause
                </Button>
                <Button onClick={stopTraining} variant="destructive" className="flex items-center gap-2">
                  <Square className="w-4 h-4" />
                  Stop
                </Button>
              </>
            )}

            {trainingState === "paused" && (
              <>
                <Button onClick={resumeTraining} className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Resume
                </Button>
                <Button onClick={stopTraining} variant="destructive" className="flex items-center gap-2">
                  <Square className="w-4 h-4" />
                  Stop
                </Button>
              </>
            )}

            {trainingState === "completed" && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-600 font-medium">Training Completed!</span>
              </div>
            )}

            <div className="ml-auto flex items-center gap-4">
              <Badge variant="outline">
                Epoch {currentEpoch}/{trainingConfig.epochs}
              </Badge>
              <Badge variant="outline">
                Step {currentStep}/{totalSteps}
              </Badge>
            </div>
          </div>

          {trainingState !== "idle" && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
              </div>
              <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Training Metrics */}
      {metrics.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Training Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Loss Chart */}
                <div>
                  <h4 className="text-sm font-medium mb-4">Loss Over Time</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={metrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="trainLoss" stroke="#3b82f6" name="Train Loss" />
                      <Line type="monotone" dataKey="valLoss" stroke="#ef4444" name="Val Loss" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Metrics Chart */}
                <div>
                  <h4 className="text-sm font-medium mb-4">Evaluation Metrics</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={metrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="bleuScore" stroke="#10b981" name="BLEU Score" />
                      <Line type="monotone" dataKey="rougeScore" stroke="#f59e0b" name="ROUGE Score" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Current Metrics */}
              {metrics.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {metrics[metrics.length - 1].trainLoss.toFixed(3)}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Train Loss</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {metrics[metrics.length - 1].valLoss.toFixed(3)}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Val Loss</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {(metrics[metrics.length - 1].bleuScore! * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">BLEU Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {metrics[metrics.length - 1].perplexity.toFixed(1)}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Perplexity</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sample Predictions */}
          {currentSample && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Sample Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-500 dark:text-slate-400">Input:</Label>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 p-3 bg-slate-50 dark:bg-slate-800 rounded">
                      {currentSample.input}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-500 dark:text-slate-400">Model Prediction:</Label>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 p-3 bg-blue-50 dark:bg-blue-900 rounded">
                      {currentSample.prediction}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-500 dark:text-slate-400">Target:</Label>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 p-3 bg-green-50 dark:bg-green-900 rounded">
                      {currentSample.target}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  )
}
