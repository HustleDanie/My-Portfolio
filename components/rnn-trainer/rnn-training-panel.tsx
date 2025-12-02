"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, Square, Settings, TrendingUp, Clock } from "lucide-react"

interface RnnTrainingPanelProps {
  onComplete: () => void
}

export function RnnTrainingPanel({ onComplete }: RnnTrainingPanelProps) {
  const [isTraining, setIsTraining] = useState(false)
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [trainingConfig, setTrainingConfig] = useState({
    epochs: 10,
    batchSize: 32,
    learningRate: 0.001,
    optimizer: "adam",
    lossFunction: "crossentropy",
    scheduler: "none",
  })
  const [metrics, setMetrics] = useState({
    trainLoss: 0.0,
    valLoss: 0.0,
    trainAcc: 0.0,
    valAcc: 0.0,
  })
  const [trainingHistory, setTrainingHistory] = useState<any[]>([])

  const startTraining = () => {
    setIsTraining(true)
    setCurrentEpoch(0)
    simulateTraining()
  }

  const pauseTraining = () => {
    setIsTraining(false)
  }

  const stopTraining = () => {
    setIsTraining(false)
    setCurrentEpoch(0)
    setMetrics({ trainLoss: 0.0, valLoss: 0.0, trainAcc: 0.0, valAcc: 0.0 })
    setTrainingHistory([])
  }

  const simulateTraining = () => {
    const interval = setInterval(() => {
      setCurrentEpoch((prev) => {
        const newEpoch = prev + 1

        // Simulate realistic RNN training curves
        const trainLoss = Math.max(0.1, 2.5 * Math.exp(-newEpoch * 0.3) + Math.random() * 0.1)
        const valLoss = Math.max(0.15, 2.8 * Math.exp(-newEpoch * 0.25) + Math.random() * 0.15)
        const trainAcc = Math.min(0.95, 0.3 + 0.65 * (1 - Math.exp(-newEpoch * 0.4)) + Math.random() * 0.05)
        const valAcc = Math.min(0.9, 0.25 + 0.6 * (1 - Math.exp(-newEpoch * 0.35)) + Math.random() * 0.05)

        const newMetrics = { trainLoss, valLoss, trainAcc, valAcc }
        setMetrics(newMetrics)

        setTrainingHistory((prev) => [...prev, { epoch: newEpoch, ...newMetrics }])

        if (newEpoch >= trainingConfig.epochs) {
          setIsTraining(false)
          clearInterval(interval)
        }

        return newEpoch
      })
    }, 1000)

    return () => clearInterval(interval)
  }

  const progress = (currentEpoch / trainingConfig.epochs) * 100

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron text-center">🟡 STEP 4: RNN Training Panel</CardTitle>
        <p className="text-center text-gray-600">Configure hyperparameters and train your vanilla RNN model</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="config">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="config" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Training
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Metrics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold">Epochs</label>
                  <input
                    type="number"
                    value={trainingConfig.epochs}
                    onChange={(e) =>
                      setTrainingConfig({
                        ...trainingConfig,
                        epochs: Number.parseInt(e.target.value),
                      })
                    }
                    className="w-full mt-1 p-2 border rounded"
                    min="1"
                    max="100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Batch Size</label>
                  <select
                    value={trainingConfig.batchSize}
                    onChange={(e) =>
                      setTrainingConfig({
                        ...trainingConfig,
                        batchSize: Number.parseInt(e.target.value),
                      })
                    }
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value={16}>16</option>
                    <option value={32}>32</option>
                    <option value={64}>64</option>
                    <option value={128}>128</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold">Learning Rate</label>
                  <select
                    value={trainingConfig.learningRate}
                    onChange={(e) =>
                      setTrainingConfig({
                        ...trainingConfig,
                        learningRate: Number.parseFloat(e.target.value),
                      })
                    }
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value={0.1}>0.1</option>
                    <option value={0.01}>0.01</option>
                    <option value={0.001}>0.001</option>
                    <option value={0.0001}>0.0001</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold">Optimizer</label>
                  <select
                    value={trainingConfig.optimizer}
                    onChange={(e) =>
                      setTrainingConfig({
                        ...trainingConfig,
                        optimizer: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="adam">Adam</option>
                    <option value="sgd">SGD</option>
                    <option value="rmsprop">RMSprop</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold">Loss Function</label>
                  <select
                    value={trainingConfig.lossFunction}
                    onChange={(e) =>
                      setTrainingConfig({
                        ...trainingConfig,
                        lossFunction: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="crossentropy">Cross Entropy</option>
                    <option value="mse">Mean Squared Error</option>
                    <option value="mae">Mean Absolute Error</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold">Learning Rate Scheduler</label>
                  <select
                    value={trainingConfig.scheduler}
                    onChange={(e) =>
                      setTrainingConfig({
                        ...trainingConfig,
                        scheduler: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="none">None</option>
                    <option value="step">Step LR</option>
                    <option value="exponential">Exponential</option>
                    <option value="cosine">Cosine Annealing</option>
                  </select>
                </div>
              </div>
            </div>

            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-semibold font-space-mono mb-2">💡 RNN Training Tips:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Start with smaller learning rates (0.001) for RNNs</li>
                  <li>• Use gradient clipping to prevent exploding gradients</li>
                  <li>• Monitor for vanishing gradients in deeper networks</li>
                  <li>• Smaller batch sizes often work better for sequences</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <div className="flex justify-center gap-4 mb-6">
              <Button onClick={startTraining} disabled={isTraining} className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Start Training
              </Button>
              <Button
                onClick={pauseTraining}
                disabled={!isTraining}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Pause className="h-4 w-4" />
                Pause
              </Button>
              <Button onClick={stopTraining} variant="destructive" className="flex items-center gap-2">
                <Square className="h-4 w-4" />
                Stop
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Training Progress</span>
                  <Badge variant={isTraining ? "default" : "secondary"}>{isTraining ? "Training..." : "Stopped"}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>
                      Epoch {currentEpoch} / {trainingConfig.epochs}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{metrics.trainLoss.toFixed(3)}</div>
                    <div className="text-sm text-gray-600">Train Loss</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{metrics.valLoss.toFixed(3)}</div>
                    <div className="text-sm text-gray-600">Val Loss</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{(metrics.trainAcc * 100).toFixed(1)}%</div>
                    <div className="text-sm text-gray-600">Train Acc</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{(metrics.valAcc * 100).toFixed(1)}%</div>
                    <div className="text-sm text-gray-600">Val Acc</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isTraining && (
              <Card className="bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <h4 className="font-semibold font-space-mono">Live Training Updates</h4>
                  </div>
                  <div className="mt-2 text-sm space-y-1">
                    <div>Processing sequences through RNN layers...</div>
                    <div>Hidden state shape: [batch_size, hidden_size]</div>
                    <div>Backpropagating through time (BPTT)...</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Loss Curves</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                      <div>Training loss visualization</div>
                      <div className="text-sm">Real-time loss curves</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Accuracy Curves</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                      <div>Accuracy visualization</div>
                      <div className="text-sm">Train vs validation accuracy</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {trainingHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Training History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-48 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Epoch</th>
                          <th className="text-left p-2">Train Loss</th>
                          <th className="text-left p-2">Val Loss</th>
                          <th className="text-left p-2">Train Acc</th>
                          <th className="text-left p-2">Val Acc</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trainingHistory.slice(-10).map((entry, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="p-2">{entry.epoch}</td>
                            <td className="p-2">{entry.trainLoss.toFixed(3)}</td>
                            <td className="p-2">{entry.valLoss.toFixed(3)}</td>
                            <td className="p-2">{(entry.trainAcc * 100).toFixed(1)}%</td>
                            <td className="p-2">{(entry.valAcc * 100).toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-center">
          <Button onClick={onComplete} className="px-8 py-2 font-space-mono">
            Continue to Prediction Playground →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
