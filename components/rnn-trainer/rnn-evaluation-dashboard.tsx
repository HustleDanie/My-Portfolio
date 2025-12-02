"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, BarChart3, Target, TrendingUp, FileText } from "lucide-react"

interface RnnEvaluationDashboardProps {
  onComplete: () => void
}

export function RnnEvaluationDashboard({ onComplete }: RnnEvaluationDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState("classification")

  // Mock evaluation data
  const classificationMetrics = {
    accuracy: 0.847,
    precision: 0.832,
    recall: 0.856,
    f1Score: 0.844,
    confusionMatrix: [
      [450, 23, 12],
      [18, 398, 29],
      [8, 31, 431],
    ],
    classNames: ["Positive", "Negative", "Neutral"],
  }

  const timeSeriesMetrics = {
    rmse: 2.34,
    mae: 1.87,
    mape: 8.5,
    r2Score: 0.923,
  }

  const handleExport = (type: string) => {
    console.log(`Exporting ${type}...`)
    // Simulate export functionality
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron text-center">🟤 STEP 6: RNN Evaluation Dashboard</CardTitle>
        <p className="text-center text-gray-600">
          Analyze your RNN model's performance with comprehensive metrics and visualizations
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="classification" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Classification
            </TabsTrigger>
            <TabsTrigger value="timeseries" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Time Series
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classification" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-blue-600">
                    {(classificationMetrics.accuracy * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-green-600">
                    {(classificationMetrics.precision * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Precision</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-purple-600">
                    {(classificationMetrics.recall * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Recall</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-orange-600">
                    {(classificationMetrics.f1Score * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">F1-Score</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Confusion Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div></div>
                      {classificationMetrics.classNames.map((name, idx) => (
                        <div key={idx} className="text-center font-semibold">
                          {name}
                        </div>
                      ))}
                    </div>
                    {classificationMetrics.confusionMatrix.map((row, i) => (
                      <div key={i} className="grid grid-cols-4 gap-2">
                        <div className="text-sm font-semibold">{classificationMetrics.classNames[i]}</div>
                        {row.map((value, j) => (
                          <div
                            key={j}
                            className={`text-center p-2 rounded text-sm font-mono ${
                              i === j ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Per-Class Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {classificationMetrics.classNames.map((className, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold">{className}</span>
                          <span>{(0.8 + Math.random() * 0.15).toFixed(3)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${80 + Math.random() * 15}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-semibold font-space-mono mb-2">📊 Classification Analysis:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Model shows strong performance across all classes</li>
                  <li>• Balanced precision and recall indicate good generalization</li>
                  <li>• Confusion matrix reveals minimal class confusion</li>
                  <li>
                    • F1-score of {(classificationMetrics.f1Score * 100).toFixed(1)}% indicates robust performance
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeseries" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-red-600">{timeSeriesMetrics.rmse.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">RMSE</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-orange-600">{timeSeriesMetrics.mae.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">MAE</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-purple-600">{timeSeriesMetrics.mape.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">MAPE</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-green-600">{timeSeriesMetrics.r2Score.toFixed(3)}</div>
                  <div className="text-sm text-gray-600">R² Score</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prediction vs Actual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                      <div>Scatter plot visualization</div>
                      <div className="text-sm">Predicted vs actual values</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Residual Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                      <div>Residual plot</div>
                      <div className="text-sm">Error distribution analysis</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-green-50">
              <CardContent className="p-4">
                <h4 className="font-semibold font-space-mono mb-2">📈 Time Series Analysis:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• RMSE of {timeSeriesMetrics.rmse} indicates good prediction accuracy</li>
                  <li>• R² score of {timeSeriesMetrics.r2Score} shows strong correlation</li>
                  <li>• MAPE of {timeSeriesMetrics.mape}% is within acceptable range</li>
                  <li>• Model captures temporal patterns effectively</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Export Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => handleExport("metrics-json")}
                    className="w-full flex items-center gap-2"
                    variant="outline"
                  >
                    <FileText className="h-4 w-4" />
                    Export Metrics (JSON)
                  </Button>
                  <Button
                    onClick={() => handleExport("metrics-csv")}
                    className="w-full flex items-center gap-2"
                    variant="outline"
                  >
                    <FileText className="h-4 w-4" />
                    Export Metrics (CSV)
                  </Button>
                  <Button
                    onClick={() => handleExport("confusion-matrix")}
                    className="w-full flex items-center gap-2"
                    variant="outline"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Export Confusion Matrix
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Export Model</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => handleExport("model-pytorch")}
                    className="w-full flex items-center gap-2"
                    variant="outline"
                  >
                    <Download className="h-4 w-4" />
                    Export PyTorch Model (.pth)
                  </Button>
                  <Button
                    onClick={() => handleExport("model-onnx")}
                    className="w-full flex items-center gap-2"
                    variant="outline"
                  >
                    <Download className="h-4 w-4" />
                    Export ONNX Model
                  </Button>
                  <Button
                    onClick={() => handleExport("config")}
                    className="w-full flex items-center gap-2"
                    variant="outline"
                  >
                    <FileText className="h-4 w-4" />
                    Export Configuration
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-yellow-50">
              <CardContent className="p-4">
                <h4 className="font-semibold font-space-mono mb-2">📋 Export Summary:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold mb-1">Model Details:</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Architecture: Vanilla RNN</li>
                      <li>• Hidden Size: 128</li>
                      <li>• Layers: 2</li>
                      <li>• Parameters: ~200K</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Training Details:</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Epochs: 10</li>
                      <li>• Batch Size: 32</li>
                      <li>• Learning Rate: 0.001</li>
                      <li>• Optimizer: Adam</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <h4 className="font-semibold font-space-mono mb-2">🎓 RNN Learning Summary:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• You've successfully built and trained a vanilla RNN from scratch</li>
              <li>• Learned about sequential data processing and hidden state dynamics</li>
              <li>• Experienced the challenges of vanishing gradients in deep RNNs</li>
              <li>• Understood the trade-offs between model complexity and performance</li>
              <li>• Ready to explore more advanced architectures like LSTMs and GRUs!</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={onComplete} className="px-8 py-2 font-space-mono bg-green-600 hover:bg-green-700">
            ✅ Complete RNN Training Lab
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
