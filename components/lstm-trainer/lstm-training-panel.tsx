"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, Square, Settings, TrendingUp, Clock, Zap } from "lucide-react"

interface LstmTrainingPanelProps {
  onComplete: () => void
}

export function LstmTrainingPanel({ onComplete }: LstmTrainingPanelProps) {
  const [isTraining, setIsTraining] = useState(false)
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [trainingConfig, setTrainingConfig] = useState({
    epochs: 15,
    batchSize: 32,
    learningRate: 0.001,
    optimizer: "adam",
    lossFunction: "crossentropy",
    scheduler: "cosine",
    gradientClipping: 1.0,
  })
  const [metrics, setMetrics] = useState({
    trainLoss: 0.0,
    valLoss: 0.0,
    trainAcc: 0.0,
    valAcc: 0.0,
    perplexity: 0.0,
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
    setMetrics({ trainLoss: 0.0, valLoss: 0.0, trainAcc: 0.0, valAcc: 0.0, perplexity: 0.0 })
    setTrainingHistory([])
  }

  const simulateTraining = () => {
    const interval = setInterval(() => {
      setCurrentEpoch((prev) => {
        const newEpoch = prev + 1

        // Simulate realistic LSTM training curves (better than RNN)
        const trainLoss = Math.max(0.05, 2.0 * Math.exp(-newEpoch * 0.4) + Math.random() * 0.08)
        const valLoss = Math.max(0.08, 2.2 * Math.exp(-newEpoch * 0.35) + Math.random() * 0.12)
        const trainAcc = Math.min(0.98, 0.4 + 0.58 * (1 - Math.exp(-newEpoch * 0.5)) + Math.random() * 0.03)
        const valAcc = Math.min(0.95, 0.35 + 0.55 * (1 - Math.exp(-newEpoch * 0.45)) + Math.random() * 0.04)
        const perplexity = Math.max(1.1, 15 * Math.exp(-newEpoch * 0.3) + Math.random() * 0.5)

        const newMetrics = { trainLoss, valLoss, trainAcc, valAcc, perplexity }
        setMetrics(newMetrics)

        setTrainingHistory((prev) => [...prev, { epoch: newEpoch, ...newMetrics }])

        if (newEpoch >= trainingConfig.epochs) {
          setIsTraining(false)
          clearInterval(interval)
        }

        return newEpoch
      })
    }, 1200) // Slightly slower to show LSTM complexity

    return () => clearInterval(interval)
  }

  const progress = (currentEpoch / trainingConfig.epochs) * 100

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron text-center">🟡 STEP 4: LSTM Training Panel</CardTitle>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Configure hyperparameters and train your LSTM model with advanced optimization
        </p>
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
                  <label className="text-sm font-semibold dark:text-gray-200">Epochs</label>
                  <input
                    type="number"
                    value={trainingConfig.epochs}
                    onChange={(e) =>
                      setTrainingConfig({
                        ...trainingConfig,
                        epochs: Number.parseInt(e.target.value),
                      })
                    }
                    className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    min="1"
                    max="100"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    LSTMs typically need more epochs than simple RNNs
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold dark:text-gray-200">Batch Size</label>
                  <select
                    value={trainingConfig.batchSize}
                    onChange={(e) =>
                      setTrainingConfig({
                        ...trainingConfig,
                        batchSize: Number.parseInt(e.target.value),
                      })
                    }
                    className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  >
                    <option value={8}>8</option>
                    <option value={16}>16</option>
                    <option value={32}>32</option>
                    <option value={64}>64</option>
                    <option value={128}>128</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold dark:text-gray-200">Learning Rate</label>
                  <select
                    value={trainingConfig.learningRate}
                    onChange={(e) =>
                      setTrainingConfig({
                        ...trainingConfig,
                        learningRate: Number.parseFloat(e.target.value),
                      })
                    }
                    className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  >
                    <option value={0.01}>0.01</option>
                    <option value={0.003}>0.003</option>
                    <option value={0.001}>0.001</option>
                    <option value={0.0003}>0.0003</option>
                    <option value={0.0001}>0.0001</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold dark:text-gray-200">Gradient Clipping</label>
                  <input
                    type="number"
                    step="0.1"
                    value={trainingConfig.gradientClipping}
                    onChange={(e) =>
                      setTrainingConfig({
                        ...trainingConfig,
                        gradientClipping: Number.parseFloat(e.target.value),
                      })
                    }
                    className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    min="0.1"
                    max="5.0"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Prevents exploding gradients in deep LSTMs
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold dark:text-gray-200">Optimizer</label>
                  <select
                    value={trainingConfig.optimizer}
                    onChange={(e) =>
                      setTrainingConfig({
                        ...trainingConfig,
                        optimizer: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  >
                    <option value="adam">Adam</option>
                    <option value="adamw">AdamW</option>
                    <option value="rmsprop">RMSprop</option>
                    <option value="sgd">SGD with Momentum</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold dark:text-gray-200">Loss Function</label>
                  <select
                    value={trainingConfig.lossFunction}
                    onChange={(e) =>
                      setTrainingConfig({
                        ...trainingConfig,
                        lossFunction: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  >
                    <option value="crossentropy">Cross Entropy</option>
                    <option value="mse">Mean Squared Error</option>
                    <option value="mae">Mean Absolute Error</option>
                    <option value="focal">Focal Loss</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold dark:text-gray-200">Learning Rate Scheduler</label>
                  <select
                    value={trainingConfig.scheduler}
                    onChange={(e) =>
                      setTrainingConfig({
                        ...trainingConfig,
                        scheduler: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  >
                    <option value="none">None</option>
                    <option value="step">Step LR</option>
                    <option value="exponential">Exponential</option>
                    <option value="cosine">Cosine Annealing</option>
                    <option value="plateau">Reduce on Plateau</option>
                  </select>
                </div>
              </div>
            </div>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <h4 className="font-semibold font-space-mono mb-2 dark:text-gray-200">💡 LSTM Training Tips:</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• LSTMs can handle longer sequences and deeper networks than vanilla RNNs</li>
                  <li>• Use gradient clipping to prevent exploding gradients in deep networks</li>
                  <li>• Adam optimizer works well with LSTM's complex parameter space</li>
                  <li>• Learning rate scheduling helps with convergence stability</li>
                  <li>• Monitor both cell state and hidden state gradients</li>
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

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{metrics.trainLoss.toFixed(3)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Train Loss</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{metrics.valLoss.toFixed(3)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Val Loss</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{(metrics.trainAcc * 100).toFixed(1)}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Train Acc</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{(metrics.valAcc * 100).toFixed(1)}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Val Acc</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{metrics.perplexity.toFixed(2)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Perplexity</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isTraining && (
              <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <h4 className="font-semibold font-space-mono dark:text-gray-200">Live LSTM Training Updates</h4>
                  </div>
                  <div className="mt-2 text-sm space-y-1 dark:text-gray-300">
                    <div>Processing sequences through LSTM gates...</div>
                    <div>Cell state: [batch_size, seq_len, hidden_size]</div>
                    <div>Hidden state: [batch_size, seq_len, hidden_size]</div>
                    <div>Backpropagating through time with gradient clipping...</div>
                    <div>Updating forget, input, and output gate parameters...</div>
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
                  <div className="h-48 bg-gray-50 dark:bg-gray-700 rounded flex items-center justify-center">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                      <div>LSTM training loss visualization</div>
                      <div className="text-sm">Smoother convergence than vanilla RNN</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Gate Activations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gray-50 dark:bg-gray-700 rounded flex items-center justify-center">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <Zap className="h-8 w-8 mx-auto mb-2" />
                      <div>LSTM gate activation patterns</div>
                      <div className="text-sm">Forget, input, output gate dynamics</div>
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
                        <tr className="border-b dark:border-gray-600">
                          <th className="text-left p-2 dark:text-gray-200">Epoch</th>
                          <th className="text-left p-2 dark:text-gray-200">Train Loss</th>
                          <th className="text-left p-2 dark:text-gray-200">Val Loss</th>
                          <th className="text-left p-2 dark:text-gray-200">Train Acc</th>
                          <th className="text-left p-2 dark:text-gray-200">Val Acc</th>
                          <th className="text-left p-2 dark:text-gray-200">Perplexity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trainingHistory.slice(-10).map((entry, idx) => (
                          <tr key={idx} className="border-b dark:border-gray-600">
                            <td className="p-2 dark:text-gray-300">{entry.epoch}</td>
                            <td className="p-2 dark:text-gray-300">{entry.trainLoss.toFixed(3)}</td>
                            <td className="p-2 dark:text-gray-300">{entry.valLoss.toFixed(3)}</td>
                            <td className="p-2 dark:text-gray-300">{(entry.trainAcc * 100).toFixed(1)}%</td>
                            <td className="p-2 dark:text-gray-300">{(entry.valAcc * 100).toFixed(1)}%</td>
                            <td className="p-2 dark:text-gray-300">{entry.perplexity.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <h4 className="font-semibold font-space-mono mb-2 dark:text-gray-200">📊 LSTM Training Insights:</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• LSTM training is more stable than vanilla RNN due to gating mechanisms</li>
                  <li>• Cell state gradients flow more smoothly through long sequences</li>
                  <li>• Gate parameters learn to control information flow automatically</li>
                  <li>• Perplexity measures how well the model predicts sequences</li>
                  <li>• Lower perplexity indicates better sequence modeling capability</li>
                </ul>
              </CardContent>
            </Card>
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
