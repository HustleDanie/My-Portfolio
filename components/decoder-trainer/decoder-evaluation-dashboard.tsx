"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, Download, ArrowLeft, CheckCircle, TrendingUp, Target, FileText, Save, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import type { DecoderTrainingConfig } from "@/app/projects/decoder-language-modeling/page"

interface DecoderEvaluationDashboardProps {
  config: DecoderTrainingConfig
  updateConfig: (key: keyof DecoderTrainingConfig, value: any) => void
  onPrev: () => void
}

export function DecoderEvaluationDashboard({ config, updateConfig, onPrev }: DecoderEvaluationDashboardProps) {
  const [exportStatus, setExportStatus] = useState<"idle" | "exporting" | "completed">("idle")
  const [activeTab, setActiveTab] = useState("metrics")

  // Generate mock evaluation metrics based on task
  const getTaskMetrics = () => {
    switch (config.task) {
      case "text-completion":
      case "creative-writing":
        return {
          perplexity: 15.2,
          loss: 2.72,
          bleu: null,
          rouge: null,
          diversity: {
            uniqueWords: 0.78,
            repetition: 0.12,
            coherence: 0.85,
          },
          generationQuality: {
            fluency: 0.89,
            relevance: 0.92,
            creativity: 0.76,
          },
        }
      case "headline-generation":
      case "summarization":
        return {
          perplexity: 12.8,
          loss: 2.55,
          bleu: 0.34,
          rouge: {
            rouge1: 0.42,
            rouge2: 0.28,
            rougeL: 0.38,
          },
          diversity: {
            uniqueWords: 0.82,
            repetition: 0.08,
            coherence: 0.91,
          },
          generationQuality: {
            fluency: 0.94,
            relevance: 0.88,
            conciseness: 0.85,
          },
        }
      case "dialogue-chatbot":
        return {
          perplexity: 18.5,
          loss: 2.92,
          bleu: 0.28,
          rouge: null,
          diversity: {
            uniqueWords: 0.75,
            repetition: 0.15,
            coherence: 0.82,
          },
          generationQuality: {
            fluency: 0.87,
            relevance: 0.84,
            engagement: 0.79,
          },
        }
      case "code-generation":
        return {
          perplexity: 22.1,
          loss: 3.1,
          bleu: 0.45,
          rouge: null,
          diversity: {
            uniqueTokens: 0.68,
            syntaxCorrectness: 0.92,
            functionality: 0.78,
          },
          generationQuality: {
            correctness: 0.85,
            efficiency: 0.72,
            readability: 0.88,
          },
        }
      default:
        return {
          perplexity: 16.7,
          loss: 2.81,
          bleu: null,
          rouge: null,
          diversity: {
            uniqueWords: 0.76,
            repetition: 0.14,
            coherence: 0.83,
          },
          generationQuality: {
            fluency: 0.86,
            relevance: 0.89,
            quality: 0.82,
          },
        }
    }
  }

  const metrics = getTaskMetrics()

  // Sample comparisons
  const sampleComparisons = [
    {
      prompt: "The future of artificial intelligence",
      baseline: "will be very interesting and will change many things in our world.",
      finetuned:
        "lies in creating systems that can understand context, reason about complex problems, and collaborate seamlessly with humans to solve global challenges.",
      improvement: "Better coherence and specificity",
    },
    {
      prompt: "In a world where technology",
      baseline: "is everywhere, people use it for many different things every day.",
      finetuned:
        "has become seamlessly integrated into daily life, the boundary between digital and physical reality continues to blur, creating new opportunities for human connection.",
      improvement: "More sophisticated vocabulary and ideas",
    },
    {
      prompt: "The most important lesson",
      baseline: "that I learned was to always be nice to other people.",
      finetuned:
        "I've discovered is that genuine growth comes not from avoiding failure, but from embracing it as an essential teacher on the path to mastery.",
      improvement: "Deeper insight and nuanced expression",
    },
  ]

  const handleExport = async (type: "metrics" | "samples" | "model") => {
    setExportStatus("exporting")

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setExportStatus("completed")
    setTimeout(() => setExportStatus("idle"), 3000)

    // In a real implementation, this would trigger actual file downloads
    console.log(`Exporting ${type}...`)
  }

  const perplexityData = [
    { epoch: 0, baseline: 45.2, finetuned: 45.2 },
    { epoch: 1, baseline: 45.2, finetuned: 28.7 },
    { epoch: 2, baseline: 45.2, finetuned: 19.3 },
    { epoch: 3, baseline: 45.2, finetuned: 15.2 },
  ]

  const diversityData = Object.entries(metrics.diversity).map(([key, value]) => ({
    metric: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
    score: typeof value === "number" ? value * 100 : 0,
  }))

  return (
    <div className="space-y-8">
      <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-amber-900 dark:text-amber-100">
            🟤 STEP 6: Evaluation Dashboard
          </CardTitle>
          <CardDescription className="text-amber-700 dark:text-amber-300 font-space-mono">
            Comprehensive performance analysis and model evaluation metrics for your fine-tuned language model.
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
                  <strong>Learning Rate:</strong> {config.training?.learningRate || "5e-5"}
                </div>
                <div>
                  <strong>Epochs:</strong> {config.training?.epochs || 3}
                </div>
                <div>
                  <strong>Batch Size:</strong> {config.training?.batchSize || 8}
                </div>
                <div>
                  <strong>Final Loss:</strong>{" "}
                  {config.training?.finalMetrics?.loss?.toFixed(4) || metrics.loss.toFixed(4)}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400">Performance</h4>
              <div className="space-y-1 text-sm">
                <div>
                  <strong>Final Perplexity:</strong> {metrics.perplexity.toFixed(1)}
                </div>
                <div>
                  <strong>Training Time:</strong> ~45 minutes
                </div>
                <div>
                  <strong>Memory Used:</strong> ~2.1 GB
                </div>
                <div>
                  <strong>Status:</strong> <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="samples">Sample Comparisons</TabsTrigger>
          <TabsTrigger value="export">Export & Save</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          {/* Core Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{metrics.loss.toFixed(3)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Final Loss</div>
                <div className="text-xs text-green-600 mt-1">↓ 65% improvement</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{metrics.perplexity.toFixed(1)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Perplexity</div>
                <div className="text-xs text-green-600 mt-1">↓ 66% improvement</div>
              </CardContent>
            </Card>
            {metrics.bleu && (
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{(metrics.bleu * 100).toFixed(1)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">BLEU Score</div>
                  <div className="text-xs text-green-600 mt-1">↑ 28% improvement</div>
                </CardContent>
              </Card>
            )}
            {metrics.rouge && (
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{(metrics.rouge.rouge1 * 100).toFixed(1)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">ROUGE-1</div>
                  <div className="text-xs text-green-600 mt-1">↑ 22% improvement</div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Perplexity Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={perplexityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="baseline"
                        stroke="#94a3b8"
                        strokeWidth={2}
                        name="Baseline"
                        strokeDasharray="5 5"
                      />
                      <Line type="monotone" dataKey="finetuned" stroke="#3b82f6" strokeWidth={2} name="Fine-tuned" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Text Diversity Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={diversityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quality Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Generation Quality Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(metrics.generationQuality).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span>{(value * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={value * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="samples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Sample Output Comparisons
              </CardTitle>
              <CardDescription>Side-by-side comparison of baseline vs fine-tuned model outputs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sampleComparisons.map((sample, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div>
                      <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-2">Prompt</h4>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded p-3 text-sm font-mono">{sample.prompt}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                          Baseline Model
                          <Badge variant="outline" className="text-xs">
                            GPT-2
                          </Badge>
                        </h4>
                        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded p-3 text-sm">
                          {sample.baseline}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                          Fine-tuned Model
                          <Badge className="bg-green-100 text-green-800 text-xs">Improved</Badge>
                        </h4>
                        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded p-3 text-sm">
                          {sample.finetuned}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded p-3">
                      <div className="text-xs text-blue-800 dark:text-blue-200">
                        <strong>Improvement:</strong> {sample.improvement}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Evaluation Report
                </CardTitle>
                <CardDescription>Comprehensive metrics and analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Includes all performance metrics, charts, and detailed analysis of your model's performance.
                </div>
                <Button
                  onClick={() => handleExport("metrics")}
                  disabled={exportStatus === "exporting"}
                  className="w-full gap-2"
                >
                  {exportStatus === "exporting" ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Export JSON Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Sample Outputs
                </CardTitle>
                <CardDescription>Generated text samples and comparisons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Collection of sample inputs and outputs from both baseline and fine-tuned models.
                </div>
                <Button
                  onClick={() => handleExport("samples")}
                  disabled={exportStatus === "exporting"}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Samples CSV
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Save className="h-5 w-5" />
                  Model Weights
                </CardTitle>
                <CardDescription>Fine-tuned model for deployment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Download your fine-tuned model weights in PyTorch or HuggingFace format.
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={() => handleExport("model")}
                    disabled={exportStatus === "exporting"}
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <Download className="h-4 w-4" />
                    PyTorch (.pt)
                  </Button>
                  <Button
                    onClick={() => handleExport("model")}
                    disabled={exportStatus === "exporting"}
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <Download className="h-4 w-4" />
                    HuggingFace
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {exportStatus === "completed" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800 dark:text-green-200">Export completed successfully!</span>
              </div>
            </motion.div>
          )}

          {/* Training Configuration Export */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Training Configuration
              </CardTitle>
              <CardDescription>Save your complete training setup for reproducibility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-sm font-mono">
                <pre>
                  {JSON.stringify(
                    {
                      task: config.task,
                      model: config.model?.name,
                      dataset: config.dataset?.name,
                      training_params: {
                        learning_rate: config.training?.learningRate || 5e-5,
                        epochs: config.training?.epochs || 3,
                        batch_size: config.training?.batchSize || 8,
                      },
                      final_metrics: {
                        loss: metrics.loss,
                        perplexity: metrics.perplexity,
                      },
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
              <Button variant="outline" className="mt-4 gap-2">
                <Download className="h-4 w-4" />
                Save Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Generation Playground
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
