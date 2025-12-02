"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, Download, ArrowLeft, CheckCircle, TrendingUp, Target, FileText, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { TrainingConfig } from "@/app/projects/encoder-training-dynamics/page"

interface EvaluationDashboardProps {
  config: TrainingConfig
  updateConfig: (key: keyof TrainingConfig, value: any) => void
  onPrev: () => void
}

export function EvaluationDashboard({ config, updateConfig, onPrev }: EvaluationDashboardProps) {
  const [exportStatus, setExportStatus] = useState<"idle" | "exporting" | "completed">("idle")

  // Generate mock evaluation metrics based on task
  const getTaskMetrics = () => {
    switch (config.task) {
      case "text-classification":
      case "sentiment-analysis":
        return {
          accuracy: 0.89,
          precision: 0.87,
          recall: 0.91,
          f1: 0.89,
          confusionMatrix: [
            { class: "Class A", predicted_A: 85, predicted_B: 10, predicted_C: 5 },
            { class: "Class B", predicted_A: 8, predicted_B: 88, predicted_C: 4 },
            { class: "Class C", predicted_A: 7, predicted_B: 5, predicted_C: 88 },
          ],
          classMetrics: [
            { class: "Class A", precision: 0.85, recall: 0.89, f1: 0.87, support: 100 },
            { class: "Class B", precision: 0.88, recall: 0.85, f1: 0.86, support: 100 },
            { class: "Class C", precision: 0.91, recall: 0.92, f1: 0.91, support: 100 },
          ],
        }
      case "named-entity-recognition":
        return {
          tokenF1: 0.92,
          entityPrecision: 0.89,
          entityRecall: 0.87,
          entityF1: 0.88,
          entityMetrics: [
            { entity: "PER", precision: 0.91, recall: 0.89, f1: 0.9, support: 150 },
            { entity: "ORG", precision: 0.87, recall: 0.85, f1: 0.86, support: 120 },
            { entity: "LOC", precision: 0.89, recall: 0.88, f1: 0.88, support: 100 },
            { entity: "MISC", precision: 0.85, recall: 0.82, f1: 0.83, support: 80 },
          ],
        }
      case "question-answering":
        return {
          exactMatch: 0.78,
          f1Score: 0.85,
          startAccuracy: 0.82,
          endAccuracy: 0.8,
          hasAnswerF1: 0.87,
          noAnswerF1: 0.83,
        }
      case "semantic-similarity":
        return {
          pearsonCorr: 0.84,
          spearmanCorr: 0.82,
          mse: 0.15,
          mae: 0.12,
        }
      default:
        return {
          accuracy: 0.89,
          precision: 0.87,
          recall: 0.91,
          f1: 0.89,
        }
    }
  }

  const metrics = getTaskMetrics()

  const handleExport = async (type: "metrics" | "confusion" | "model") => {
    setExportStatus("exporting")

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setExportStatus("completed")
    setTimeout(() => setExportStatus("idle"), 3000)

    // In a real implementation, this would trigger actual file downloads
    console.log(`Exporting ${type}...`)
  }

  const renderTaskSpecificMetrics = () => {
    switch (config.task) {
      case "text-classification":
      case "sentiment-analysis":
        return (
          <div className="space-y-6">
            {/* Overall Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{(metrics.accuracy * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{(metrics.precision * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Precision</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{(metrics.recall * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Recall</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{(metrics.f1 * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">F1 Score</div>
                </CardContent>
              </Card>
            </div>

            {/* Per-Class Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Per-Class Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={metrics.classMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="class" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="precision" fill="#3b82f6" name="Precision" />
                      <Bar dataKey="recall" fill="#10b981" name="Recall" />
                      <Bar dataKey="f1" fill="#f59e0b" name="F1 Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "named-entity-recognition":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{(metrics.tokenF1 * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Token F1</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{(metrics.entityPrecision * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Entity Precision</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{(metrics.entityRecall * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Entity Recall</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{(metrics.entityF1 * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Entity F1</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Entity Type Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={metrics.entityMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="entity" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="precision" fill="#3b82f6" name="Precision" />
                      <Bar dataKey="recall" fill="#10b981" name="Recall" />
                      <Bar dataKey="f1" fill="#f59e0b" name="F1 Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "question-answering":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{(metrics.exactMatch * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Exact Match</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{(metrics.f1Score * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">F1 Score</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{(metrics.startAccuracy * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Start Accuracy</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{(metrics.accuracy * 100).toFixed(1)}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="space-y-8">
      <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-amber-900 dark:text-amber-100">
            🟤 STEP 6: Evaluation Dashboard
          </CardTitle>
          <CardDescription className="text-amber-700 dark:text-amber-300 font-space-mono">
            Comprehensive performance analysis and model evaluation metrics for your fine-tuned transformer.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Training Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Training Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400">Model Configuration</h4>
              <div className="space-y-1 text-sm">
                <div>
                  <strong>Model:</strong> {config.model?.name}
                </div>
                <div>
                  <strong>Task:</strong> {config.task}
                </div>
                <div>
                  <strong>Dataset:</strong> {config.dataset?.name}
                </div>
                <div>
                  <strong>Samples:</strong> {config.dataset?.stats?.totalSamples?.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400">Training Parameters</h4>
              <div className="space-y-1 text-sm">
                <div>
                  <strong>Learning Rate:</strong> {config.training?.learningRate || "2e-5"}
                </div>
                <div>
                  <strong>Epochs:</strong> {config.training?.epochs || 3}
                </div>
                <div>
                  <strong>Batch Size:</strong> {config.training?.batchSize || 16}
                </div>
                <div>
                  <strong>Optimizer:</strong> {config.training?.optimizer || "AdamW"}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400">Training Results</h4>
              <div className="space-y-1 text-sm">
                <div>
                  <strong>Final Loss:</strong> {config.training?.finalMetrics?.loss?.toFixed(4) || "0.2341"}
                </div>
                <div>
                  <strong>Training Time:</strong> 12.5 minutes
                </div>
                <div>
                  <strong>Status:</strong> <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>{renderTaskSpecificMetrics()}</CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Results
          </CardTitle>
          <CardDescription>Download your model, metrics, and evaluation results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => handleExport("metrics")}
              disabled={exportStatus === "exporting"}
              className="gap-2 h-auto p-4 flex-col"
            >
              <FileText className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Metrics Report</div>
                <div className="text-xs text-gray-500">CSV/JSON format</div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => handleExport("confusion")}
              disabled={exportStatus === "exporting"}
              className="gap-2 h-auto p-4 flex-col"
            >
              <BarChart3 className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Confusion Matrix</div>
                <div className="text-xs text-gray-500">PNG image</div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => handleExport("model")}
              disabled={exportStatus === "exporting"}
              className="gap-2 h-auto p-4 flex-col"
            >
              <Save className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Model Weights</div>
                <div className="text-xs text-gray-500">.bin/.pt format</div>
              </div>
            </Button>
          </div>

          {exportStatus === "exporting" && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Preparing download...
              </div>
              <Progress value={60} />
            </div>
          )}

          {exportStatus === "completed" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Export completed successfully!</span>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Model Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Model Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Performance Analysis</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Model shows strong performance across all metrics</li>
                <li>• No significant overfitting detected</li>
                <li>• Balanced precision and recall scores</li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Improvement Suggestions</h4>
              <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <li>• Consider data augmentation for better generalization</li>
                <li>• Try different learning rate schedules</li>
                <li>• Experiment with ensemble methods</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Deployment Ready</h4>
              <p className="text-sm text-green-800 dark:text-green-200">
                Your model meets production quality standards and is ready for deployment. Consider A/B testing in a
                staging environment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Prediction Playground
        </Button>

        <div className="text-center">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-lg px-4 py-2">
            Training Complete! 🎉
          </Badge>
        </div>
      </div>
    </div>
  )
}
