"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Square, Zap, Settings, TrendingUp, Clock, Target, Brain, Activity, BarChart3 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface TrainingPanelProps {
  trainingState: any
  updateTrainingState: (updates: any) => void
  onNext: () => void
  onPrevious: () => void
  currentStep: number
  totalSteps: number
}

export function CNNTrainingPanel({ trainingState, updateTrainingState, onNext, onPrevious }: TrainingPanelProps) {
  const [isTraining, setIsTraining] = useState(false)
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [trainingData, setTrainingData] = useState<any[]>([])
  const [trainingMode, setTrainingMode] = useState("simulated")

  // Training hyperparameters
  const [epochs, setEpochs] = useState(10)
  const [batchSize, setBatchSize] = useState(32)
  const [learningRate, setLearningRate] = useState(0.001)
  const [optimizer, setOptimizer] = useState("Adam")
  const [lossFunction, setLossFunction] = useState("CrossEntropyLoss")
  const [scheduler, setScheduler] = useState("None")

  // Real-time metrics
  const [currentMetrics, setCurrentMetrics] = useState({
    loss: 0,
    accuracy: 0,
    valLoss: 0,
    valAccuracy: 0,
    timePerEpoch: 0,
  })

  const startTraining = () => {
    setIsTraining(true)
    setCurrentEpoch(0)
    setTrainingProgress(0)
    setTrainingData([])

    // Simulate training process
    simulateTraining()
  }

  const pauseTraining = () => {
    setIsTraining(false)
  }

  const stopTraining = () => {
    setIsTraining(false)
    setCurrentEpoch(0)
    setTrainingProgress(0)
    setTrainingData([])
  }

  const simulateTraining = () => {
    let epoch = 0
    const interval = setInterval(() => {
      if (epoch >= epochs || !isTraining) {
        clearInterval(interval)
        setIsTraining(false)
        if (epoch >= epochs) {
          updateTrainingState({
            trainedModel: {
              epochs: epochs,
              finalAccuracy: currentMetrics.valAccuracy,
              trainingHistory: trainingData,
            },
          })
        }
        return
      }

      epoch++
      setCurrentEpoch(epoch)
      setTrainingProgress((epoch / epochs) * 100)

      // Simulate realistic training metrics
      const loss = Math.max(0.1, 2.5 * Math.exp(-epoch * 0.3) + Math.random() * 0.2)
      const accuracy = Math.min(0.95, 0.1 + (1 - Math.exp(-epoch * 0.4)) * 0.85 + Math.random() * 0.05)
      const valLoss = loss + Math.random() * 0.3
      const valAccuracy = Math.max(0, accuracy - Math.random() * 0.1)
      const timePerEpoch = 15 + Math.random() * 10

      const newMetrics = {
        loss: Number.parseFloat(loss.toFixed(4)),
        accuracy: Number.parseFloat(accuracy.toFixed(4)),
        valLoss: Number.parseFloat(valLoss.toFixed(4)),
        valAccuracy: Number.parseFloat(valAccuracy.toFixed(4)),
        timePerEpoch: Number.parseFloat(timePerEpoch.toFixed(1)),
      }

      setCurrentMetrics(newMetrics)

      setTrainingData((prev) => [
        ...prev,
        {
          epoch,
          ...newMetrics,
        },
      ])
    }, 1000) // 1 second per epoch for demo
  }

  useEffect(() => {
    return () => {
      setIsTraining(false)
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-full">
          <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <span className="font-space-mono text-sm text-yellow-600 dark:text-yellow-400">
            CNN Training Configuration
          </span>
        </div>
        <h2 className="text-3xl font-bold font-orbitron text-gray-900 dark:text-white">Train Your CNN Model</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Configure training parameters and watch your CNN learn in real-time. Monitor loss, accuracy, and other metrics
          as your model improves.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Training Configuration */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Training Configuration</span>
              </CardTitle>
              <CardDescription>
                Set your training hyperparameters. We'll provide recommendations based on your architecture.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Training Mode */}
              <div>
                <label className="block text-sm font-medium mb-2">Training Mode</label>
                <Tabs value={trainingMode} onValueChange={setTrainingMode}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="simulated" className="text-xs">
                      Simulated (Demo)
                    </TabsTrigger>
                    <TabsTrigger value="real" className="text-xs">
                      Real Backend
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <p className="text-xs text-gray-500 mt-1">
                  {trainingMode === "simulated"
                    ? "Fast simulation for learning purposes"
                    : "Connect to real GPU backend for actual training"}
                </p>
              </div>

              {/* Hyperparameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Epochs</label>
                  <Slider
                    value={[epochs]}
                    onValueChange={(value) => setEpochs(value[0])}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{epochs} epochs</div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Batch Size</label>
                  <Select value={batchSize.toString()} onValueChange={(value) => setBatchSize(Number.parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16">16 (Small GPU)</SelectItem>
                      <SelectItem value="32">32 (Recommended)</SelectItem>
                      <SelectItem value="64">64 (Large GPU)</SelectItem>
                      <SelectItem value="128">128 (Very Large GPU)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Learning Rate</label>
                  <Select
                    value={learningRate.toString()}
                    onValueChange={(value) => setLearningRate(Number.parseFloat(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.1">0.1 (High)</SelectItem>
                      <SelectItem value="0.01">0.01 (Medium)</SelectItem>
                      <SelectItem value="0.001">0.001 (Recommended)</SelectItem>
                      <SelectItem value="0.0001">0.0001 (Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Optimizer</label>
                  <Select value={optimizer} onValueChange={setOptimizer}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Adam">Adam (Recommended)</SelectItem>
                      <SelectItem value="SGD">SGD</SelectItem>
                      <SelectItem value="AdamW">AdamW</SelectItem>
                      <SelectItem value="RMSprop">RMSprop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Loss Function</label>
                  <Select value={lossFunction} onValueChange={setLossFunction}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CrossEntropyLoss">Cross Entropy (Classification)</SelectItem>
                      <SelectItem value="MSELoss">MSE (Regression)</SelectItem>
                      <SelectItem value="BCELoss">BCE (Binary Classification)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Learning Rate Scheduler</label>
                  <Select value={scheduler} onValueChange={setScheduler}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="StepLR">Step LR</SelectItem>
                      <SelectItem value="CosineAnnealingLR">Cosine Annealing</SelectItem>
                      <SelectItem value="ReduceLROnPlateau">Reduce on Plateau</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Training Controls */}
              <div className="flex space-x-3 pt-4">
                <Button onClick={startTraining} disabled={isTraining} className="flex-1 font-space-mono">
                  <Play className="w-4 h-4 mr-2" />
                  Start Training
                </Button>
                <Button onClick={pauseTraining} disabled={!isTraining} variant="outline" className="font-space-mono">
                  <Pause className="w-4 h-4" />
                </Button>
                <Button onClick={stopTraining} variant="outline" className="font-space-mono">
                  <Square className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Real-time Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-2xl font-bold font-orbitron text-red-600 dark:text-red-400">
                    {currentMetrics.loss.toFixed(4)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Training Loss</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold font-orbitron text-green-600 dark:text-green-400">
                    {(currentMetrics.accuracy * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Training Accuracy</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold font-orbitron text-orange-600 dark:text-orange-400">
                    {currentMetrics.valLoss.toFixed(4)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Validation Loss</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold font-orbitron text-blue-600 dark:text-blue-400">
                    {(currentMetrics.valAccuracy * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Validation Accuracy</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Progress and Charts */}
        <div className="space-y-6">
          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Training Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Epoch {currentEpoch} of {epochs}
                </span>
                <span className="text-sm text-gray-500">{trainingProgress.toFixed(1)}% Complete</span>
              </div>
              <Progress value={trainingProgress} className="h-3" />

              {isTraining && (
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{currentMetrics.timePerEpoch}s per epoch</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>ETA: {(((epochs - currentEpoch) * currentMetrics.timePerEpoch) / 60).toFixed(1)}m</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Training Charts */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Training Curves</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {trainingData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trainingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={2} name="Training Loss" />
                      <Line type="monotone" dataKey="valLoss" stroke="#f97316" strokeWidth={2} name="Validation Loss" />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#22c55e"
                        strokeWidth={2}
                        name="Training Accuracy"
                      />
                      <Line
                        type="monotone"
                        dataKey="valAccuracy"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Validation Accuracy"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Start training to see real-time metrics</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Training Tips */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
        <CardHeader>
          <CardTitle className="font-orbitron text-lg flex items-center space-x-2">
            <Brain className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <span>Training Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">🎯 What to Watch For:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Loss should decrease over time</li>
                <li>• Accuracy should increase steadily</li>
                <li>• Validation metrics should follow training</li>
                <li>• Look for overfitting (val loss increases)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⚡ Optimization Tips:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Start with Adam optimizer</li>
                <li>• Use learning rate 0.001 initially</li>
                <li>• Increase batch size if you have GPU memory</li>
                <li>• Add dropout if overfitting occurs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={onPrevious} variant="outline" className="font-space-mono">
          Previous Step
        </Button>
        <Button onClick={onNext} disabled={!trainingData.length} className="font-space-mono">
          Continue to Playground
          <Target className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
