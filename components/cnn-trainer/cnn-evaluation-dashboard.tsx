"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Download,
  Target,
  TrendingUp,
  Award,
  FileText,
  Save,
  Share2,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import Link from "next/link"

interface EvaluationDashboardProps {
  trainingState: any
  updateTrainingState: (updates: any) => void
  onNext: () => void
  onPrevious: () => void
  currentStep: number
  totalSteps: number
}

// Mock evaluation data
const classMetrics = [
  { class: "Cat", precision: 0.89, recall: 0.92, f1Score: 0.9, support: 1000 },
  { class: "Dog", precision: 0.85, recall: 0.88, f1Score: 0.86, support: 950 },
  { class: "Bird", precision: 0.78, recall: 0.75, f1Score: 0.76, support: 800 },
  { class: "Car", precision: 0.93, recall: 0.91, f1Score: 0.92, support: 1100 },
  { class: "Airplane", precision: 0.87, recall: 0.84, f1Score: 0.85, support: 750 },
  { class: "Ship", precision: 0.82, recall: 0.79, f1Score: 0.8, support: 650 },
]

const confusionMatrix = [
  { predicted: "Cat", actual: "Cat", value: 920 },
  { predicted: "Cat", actual: "Dog", value: 45 },
  { predicted: "Cat", actual: "Bird", value: 15 },
  { predicted: "Dog", actual: "Cat", value: 35 },
  { predicted: "Dog", actual: "Dog", value: 836 },
  { predicted: "Dog", actual: "Bird", value: 25 },
  { predicted: "Bird", actual: "Cat", value: 20 },
  { predicted: "Bird", actual: "Dog", value: 30 },
  { predicted: "Bird", actual: "Bird", value: 600 },
]

const performanceComparison = [
  { model: "Your CNN", accuracy: 0.87, parameters: "2.1M", trainTime: "45min" },
  { model: "ResNet-18", accuracy: 0.89, parameters: "11.7M", trainTime: "2.5h" },
  { model: "VGG-16", accuracy: 0.85, parameters: "138M", trainTime: "4.2h" },
  { model: "MobileNet", accuracy: 0.82, parameters: "4.2M", trainTime: "1.8h" },
]

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"]

export function CNNEvaluationDashboard({ trainingState, updateTrainingState, onPrevious }: EvaluationDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [exportFormat, setExportFormat] = useState("json")

  const overallAccuracy = 0.87
  const overallPrecision = 0.86
  const overallRecall = 0.85
  const overallF1Score = 0.85

  const handleExportReport = () => {
    const report = {
      modelInfo: {
        architecture: trainingState.architecture?.config?.name || "Custom CNN",
        dataset: trainingState.selectedDataset,
        task: trainingState.selectedTask,
        trainingTime: "45 minutes",
        epochs: trainingState.trainedModel?.epochs || 10,
      },
      metrics: {
        accuracy: overallAccuracy,
        precision: overallPrecision,
        recall: overallRecall,
        f1Score: overallF1Score,
      },
      classMetrics,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cnn-evaluation-report.${exportFormat}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSaveModel = () => {
    // Simulate model saving
    updateTrainingState({
      evaluationResults: {
        accuracy: overallAccuracy,
        precision: overallPrecision,
        recall: overallRecall,
        f1Score: overallF1Score,
        classMetrics,
        timestamp: new Date().toISOString(),
      },
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full">
          <BarChart3 className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="font-space-mono text-sm text-red-600 dark:text-red-400">Model Evaluation & Analysis</span>
        </div>
        <h2 className="text-3xl font-bold font-orbitron text-gray-900 dark:text-white">Evaluation Dashboard</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Comprehensive analysis of your CNN model's performance. Review metrics, export reports, and understand how
          well your model learned.
        </p>
      </div>

      {/* Overall Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold font-orbitron text-blue-600 dark:text-blue-400 mb-2">
              {(overallAccuracy * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">Overall Accuracy</div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {overallAccuracy >= 0.85 ? "Excellent" : overallAccuracy >= 0.75 ? "Good" : "Needs Improvement"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold font-orbitron text-green-600 dark:text-green-400 mb-2">
              {(overallPrecision * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-green-700 dark:text-green-300 font-medium">Precision</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">Low false positives</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold font-orbitron text-purple-600 dark:text-purple-400 mb-2">
              {(overallRecall * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300 font-medium">Recall</div>
            <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">Low false negatives</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold font-orbitron text-orange-600 dark:text-orange-400 mb-2">
              {(overallF1Score * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-orange-700 dark:text-orange-300 font-medium">F1-Score</div>
            <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">Balanced performance</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="font-space-mono">
            Overview
          </TabsTrigger>
          <TabsTrigger value="classes" className="font-space-mono">
            Per-Class
          </TabsTrigger>
          <TabsTrigger value="confusion" className="font-space-mono">
            Confusion Matrix
          </TabsTrigger>
          <TabsTrigger value="comparison" className="font-space-mono">
            Comparison
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Performance Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">Model Architecture:</span>
                    <Badge variant="outline">{trainingState.architecture?.config?.name || "Custom CNN"}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">Dataset:</span>
                    <Badge variant="outline">{trainingState.selectedDataset || "Custom"}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">Training Epochs:</span>
                    <Badge variant="outline">{trainingState.trainedModel?.epochs || 10}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">Total Parameters:</span>
                    <Badge variant="outline">~2.1M</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Model Strengths & Weaknesses */}
            <Card>
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Strengths
                    </h4>
                    <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• High accuracy on Car and Cat classes</li>
                      <li>• Good generalization performance</li>
                      <li>• Balanced precision and recall</li>
                      <li>• Efficient parameter usage</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Areas for Improvement
                    </h4>
                    <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• Bird classification could be improved</li>
                      <li>• Some confusion between similar classes</li>
                      <li>• Consider data augmentation for minority classes</li>
                      <li>• Fine-tuning hyperparameters may help</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="classes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron">Per-Class Performance Metrics</CardTitle>
              <CardDescription>Detailed breakdown of how your model performs on each class</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="precision" fill="#3b82f6" name="Precision" />
                    <Bar dataKey="recall" fill="#ef4444" name="Recall" />
                    <Bar dataKey="f1Score" fill="#10b981" name="F1-Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Detailed Table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-semibold">Class</th>
                      <th className="text-center p-2 font-semibold">Precision</th>
                      <th className="text-center p-2 font-semibold">Recall</th>
                      <th className="text-center p-2 font-semibold">F1-Score</th>
                      <th className="text-center p-2 font-semibold">Support</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classMetrics.map((metric, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-2 font-medium">{metric.class}</td>
                        <td className="text-center p-2">{metric.precision.toFixed(3)}</td>
                        <td className="text-center p-2">{metric.recall.toFixed(3)}</td>
                        <td className="text-center p-2">{metric.f1Score.toFixed(3)}</td>
                        <td className="text-center p-2">{metric.support}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confusion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron">Confusion Matrix</CardTitle>
              <CardDescription>Visual representation of prediction accuracy for each class</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Confusion Matrix Heatmap */}
                <div>
                  <h4 className="font-semibold mb-4">Confusion Matrix (Sample)</h4>
                  <div className="grid grid-cols-4 gap-1 text-xs">
                    <div></div>
                    <div className="text-center font-semibold">Cat</div>
                    <div className="text-center font-semibold">Dog</div>
                    <div className="text-center font-semibold">Bird</div>

                    <div className="font-semibold">Cat</div>
                    <div className="bg-green-100 dark:bg-green-900/20 p-2 text-center rounded">920</div>
                    <div className="bg-red-100 dark:bg-red-900/20 p-2 text-center rounded">45</div>
                    <div className="bg-red-100 dark:bg-red-900/20 p-2 text-center rounded">15</div>

                    <div className="font-semibold">Dog</div>
                    <div className="bg-red-100 dark:bg-red-900/20 p-2 text-center rounded">35</div>
                    <div className="bg-green-100 dark:bg-green-900/20 p-2 text-center rounded">836</div>
                    <div className="bg-red-100 dark:bg-red-900/20 p-2 text-center rounded">25</div>

                    <div className="font-semibold">Bird</div>
                    <div className="bg-red-100 dark:bg-red-900/20 p-2 text-center rounded">20</div>
                    <div className="bg-red-100 dark:bg-red-900/20 p-2 text-center rounded">30</div>
                    <div className="bg-green-100 dark:bg-green-900/20 p-2 text-center rounded">600</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Green: Correct predictions, Red: Incorrect predictions</p>
                </div>

                {/* Class Distribution */}
                <div>
                  <h4 className="font-semibold mb-4">Class Distribution</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={classMetrics}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ class: className, support }) => `${className}: ${support}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="support"
                        >
                          {classMetrics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron">Model Comparison</CardTitle>
              <CardDescription>How your CNN compares to other popular architectures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Model</th>
                      <th className="text-center p-3 font-semibold">Accuracy</th>
                      <th className="text-center p-3 font-semibold">Parameters</th>
                      <th className="text-center p-3 font-semibold">Training Time</th>
                      <th className="text-center p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceComparison.map((model, idx) => (
                      <tr key={idx} className={`border-b ${idx === 0 ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}>
                        <td className="p-3 font-medium">
                          {model.model}
                          {idx === 0 && <Badge className="ml-2 text-xs">Your Model</Badge>}
                        </td>
                        <td className="text-center p-3">
                          <span
                            className={`font-semibold ${
                              model.accuracy >= 0.87
                                ? "text-green-600"
                                : model.accuracy >= 0.8
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {(model.accuracy * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="text-center p-3">{model.parameters}</td>
                        <td className="text-center p-3">{model.trainTime}</td>
                        <td className="text-center p-3">
                          {idx === 0 ? (
                            <Badge variant="default">Current</Badge>
                          ) : model.accuracy > 0.87 ? (
                            <Badge variant="outline" className="text-green-600">
                              Better
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-gray-600">
                              Baseline
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Performance Analysis</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Your CNN achieved competitive performance with significantly fewer parameters than traditional models
                  like VGG-16. While ResNet-18 shows slightly higher accuracy, your model trains much faster and uses
                  less memory, making it more practical for deployment.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export and Save Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-orbitron flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export Results</span>
            </CardTitle>
            <CardDescription>Download your evaluation report and model files</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Button onClick={handleExportReport} variant="outline" className="flex-1 font-space-mono">
                <FileText className="w-4 h-4 mr-2" />
                Export Report (JSON)
              </Button>
              <Button onClick={handleSaveModel} variant="outline" className="flex-1 font-space-mono">
                <Save className="w-4 h-4 mr-2" />
                Save Model (.pth)
              </Button>
            </div>
            <Button variant="outline" className="w-full font-space-mono">
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-orbitron flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Next Steps</span>
            </CardTitle>
            <CardDescription>Recommendations for improving your model</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                <span>Try data augmentation to improve Bird classification</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                <span>Experiment with different learning rates</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                <span>Consider transfer learning from pretrained models</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                <span>Add more training data for underperforming classes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Completion Message */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            <span>Congratulations! 🎉</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            You've successfully built, trained, and evaluated a CNN model! Your model achieved{" "}
            <span className="font-bold text-green-600 dark:text-green-400">
              {(overallAccuracy * 100).toFixed(1)}% accuracy
            </span>{" "}
            on the test set.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">What You've Learned:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• CNN architecture design principles</li>
                <li>• Data preprocessing and augmentation</li>
                <li>• Training hyperparameter tuning</li>
                <li>• Model evaluation and interpretation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Skills Gained:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Computer vision fundamentals</li>
                <li>• Deep learning best practices</li>
                <li>• Performance analysis techniques</li>
                <li>• Model deployment considerations</li>
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
        <Link href="/projects">
          <Button className="font-space-mono">
            Back to Projects
            <Award className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
