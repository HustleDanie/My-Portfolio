"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BarChart3, Download, Award, TrendingUp, Target, Zap } from "lucide-react"

interface ViTEvaluationDashboardProps {
  taskConfig: any
  datasetConfig: any
  architectureConfig: any
  trainingConfig: any
  predictionResults: any
  onPrevious: () => void
}

export function ViTEvaluationDashboard({
  taskConfig,
  datasetConfig,
  architectureConfig,
  trainingConfig,
  predictionResults,
  onPrevious,
}: ViTEvaluationDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState("accuracy")

  // Mock evaluation metrics based on task type
  const getTaskMetrics = () => {
    switch (taskConfig.selectedTask) {
      case "classification":
        return {
          accuracy: 0.892,
          precision: 0.885,
          recall: 0.898,
          f1Score: 0.891,
          topK: 0.967,
        }
      case "detection":
        return {
          mAP: 0.734,
          mAP50: 0.856,
          precision: 0.782,
          recall: 0.745,
          iou: 0.678,
        }
      case "segmentation":
        return {
          pixelAccuracy: 0.923,
          meanIoU: 0.756,
          diceScore: 0.834,
          precision: 0.867,
          recall: 0.801,
        }
      default:
        return {
          accuracy: 0.892,
          precision: 0.885,
          recall: 0.898,
          f1Score: 0.891,
        }
    }
  }

  const metrics = getTaskMetrics()
  const confusionMatrix = [
    [85, 3, 2, 1],
    [4, 88, 1, 2],
    [2, 1, 89, 3],
    [1, 2, 4, 87],
  ]

  const classNames = ["Class A", "Class B", "Class C", "Class D"]

  const handleExport = (type: string) => {
    console.log(`Exporting ${type}...`)
    // Simulate export functionality
  }

  const getMetricColor = (value: number) => {
    if (value >= 0.9) return "text-green-600"
    if (value >= 0.8) return "text-yellow-600"
    return "text-red-600"
  }

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "accuracy":
        return <Target className="w-4 h-4" />
      case "precision":
        return <Zap className="w-4 h-4" />
      case "recall":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <BarChart3 className="w-4 h-4" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-orbitron text-center">🟤 Step 6: Evaluation Dashboard</CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-400 font-space-mono">
            Comprehensive performance analysis of your Vision Transformer
          </p>
        </CardHeader>
        <CardContent className="p-6">
          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Object.entries(metrics).map(([key, value]) => (
              <Card key={key} className="text-center">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    {getMetricIcon(key)}
                    <h3 className="font-semibold font-orbitron ml-2 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                  </div>
                  <div className={`text-2xl font-bold ${getMetricColor(value as number)}`}>
                    {((value as number) * 100).toFixed(1)}%
                  </div>
                  <Badge variant="outline" className="mt-2">
                    {(value as number) >= 0.9 ? "Excellent" : (value as number) >= 0.8 ? "Good" : "Needs Improvement"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Confusion Matrix */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center font-orbitron">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Confusion Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="p-2"></th>
                        {classNames.map((name, i) => (
                          <th key={i} className="p-2 font-space-mono text-center">
                            {name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {confusionMatrix.map((row, i) => (
                        <tr key={i}>
                          <td className="p-2 font-space-mono font-semibold">{classNames[i]}</td>
                          {row.map((value, j) => (
                            <td key={j} className="p-2 text-center">
                              <div
                                className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                                  i === j
                                    ? "bg-green-500 text-white"
                                    : value > 5
                                      ? "bg-red-200 text-red-800"
                                      : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {value}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Model Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center font-orbitron">
                  <Award className="w-5 h-5 mr-2" />
                  Model Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-space-mono">Your ViT Model</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "89%" }} />
                      </div>
                      <span className="text-sm font-bold">89.2%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-space-mono">ResNet-50 Baseline</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-400 h-2 rounded-full" style={{ width: "84%" }} />
                      </div>
                      <span className="text-sm">84.1%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-space-mono">EfficientNet-B0</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-400 h-2 rounded-full" style={{ width: "86%" }} />
                      </div>
                      <span className="text-sm">86.3%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold font-orbitron mb-2">Performance Summary</h4>
                  <ul className="text-sm font-space-mono space-y-1">
                    <li>✅ Outperforms CNN baselines</li>
                    <li>✅ Strong attention mechanisms</li>
                    <li>✅ Good generalization</li>
                    <li>⚠️ Higher computational cost</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Options */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center font-orbitron">
                <Download className="w-5 h-5 mr-2" />
                Export Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={() => handleExport("metrics")} variant="outline" className="font-space-mono">
                  <Download className="w-4 h-4 mr-2" />
                  Export Metrics (JSON)
                </Button>
                <Button onClick={() => handleExport("confusion")} variant="outline" className="font-space-mono">
                  <Download className="w-4 h-4 mr-2" />
                  Confusion Matrix (PNG)
                </Button>
                <Button onClick={() => handleExport("model")} variant="outline" className="font-space-mono">
                  <Download className="w-4 h-4 mr-2" />
                  Trained Model (.pth)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Training Summary */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="font-orbitron">Training Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm font-space-mono">
                <div>
                  <strong>Task:</strong>
                  <br />
                  {taskConfig.taskDetails?.title}
                </div>
                <div>
                  <strong>Dataset:</strong>
                  <br />
                  {datasetConfig.datasetDetails?.name}
                </div>
                <div>
                  <strong>Architecture:</strong>
                  <br />
                  {architectureConfig.architectureType === "pretrained"
                    ? architectureConfig.modelDetails?.name
                    : "Custom ViT"}
                </div>
                <div>
                  <strong>Training Time:</strong>
                  <br />
                  {trainingConfig.trainingConfig?.epochs} epochs
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-8">
            <Button onClick={onPrevious} variant="outline" className="font-space-mono">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
