"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart3, Download, Eye, TrendingUp, Award, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface EvaluationMetrics {
  rouge1: number
  rougeL: number
  bleu: number
  meteor?: number
  bertscore?: number
  perplexity: number
  accuracy?: number
}

interface SampleComparison {
  input: string
  target: string
  baseline: string
  finetuned: string
  improvement: "better" | "worse" | "similar"
}

interface Seq2SeqEvaluationDashboardProps {
  config: any
}

export function Seq2SeqEvaluationDashboard({ config }: Seq2SeqEvaluationDashboardProps) {
  const [metrics, setMetrics] = useState<EvaluationMetrics | null>(null)
  const [samples, setSamples] = useState<SampleComparison[]>([])
  const [isEvaluating, setIsEvaluating] = useState(true)

  useEffect(() => {
    // Simulate evaluation process
    const timer = setTimeout(() => {
      setMetrics(generateMockMetrics(config.task))
      setSamples(generateMockSamples(config.task))
      setIsEvaluating(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [config.task])

  const generateMockMetrics = (task: string): EvaluationMetrics => {
    const baseMetrics = {
      rouge1: 0.45 + Math.random() * 0.2,
      rougeL: 0.38 + Math.random() * 0.15,
      bleu: 0.32 + Math.random() * 0.18,
      perplexity: 8 + Math.random() * 4,
    }

    switch (task) {
      case "summarization":
        return {
          ...baseMetrics,
          rouge1: 0.52 + Math.random() * 0.1,
          rougeL: 0.45 + Math.random() * 0.08,
          bertscore: 0.78 + Math.random() * 0.05,
        }
      case "translation":
        return {
          ...baseMetrics,
          bleu: 0.48 + Math.random() * 0.1,
          meteor: 0.42 + Math.random() * 0.08,
        }
      case "grammar_correction":
        return {
          ...baseMetrics,
          accuracy: 0.85 + Math.random() * 0.1,
          bleu: 0.72 + Math.random() * 0.08,
        }
      default:
        return baseMetrics
    }
  }

  const generateMockSamples = (task: string): SampleComparison[] => {
    const samples = {
      summarization: [
        {
          input:
            "The rapid advancement of artificial intelligence has transformed numerous industries, from healthcare to finance. Machine learning algorithms now assist doctors in diagnosing diseases, help financial institutions detect fraud, and enable autonomous vehicles to navigate complex environments.",
          target: "AI transforms industries by assisting in healthcare, finance, and autonomous vehicles.",
          baseline:
            "Artificial intelligence has transformed industries including healthcare and finance with machine learning.",
          finetuned:
            "AI revolutionizes healthcare, finance, and autonomous vehicles through advanced machine learning.",
          improvement: "better" as const,
        },
        {
          input:
            "Climate change continues to be one of the most pressing global challenges of our time. Rising temperatures, melting ice caps, and extreme weather events are affecting ecosystems worldwide.",
          target: "Climate change poses global challenges with rising temperatures and ecosystem impacts.",
          baseline:
            "Climate change is a global challenge with rising temperatures and melting ice caps affecting ecosystems.",
          finetuned:
            "Climate change creates urgent global challenges through temperature rise and ecosystem disruption.",
          improvement: "better" as const,
        },
      ],
      translation: [
        {
          input: "Good morning, how are you today?",
          target: "Buenos días, ¿cómo estás hoy?",
          baseline: "Buen día, ¿cómo está usted hoy?",
          finetuned: "Buenos días, ¿cómo estás hoy?",
          improvement: "better" as const,
        },
      ],
      paraphrase: [
        {
          input: "The movie was really good and entertaining.",
          target: "The film was excellent and engaging.",
          baseline: "The movie was very good and fun to watch.",
          finetuned: "The film was outstanding and highly engaging.",
          improvement: "better" as const,
        },
      ],
    }

    return samples[task as keyof typeof samples] || samples.summarization
  }

  const getTaskSpecificMetrics = () => {
    if (!metrics) return []

    const common = [
      { name: "ROUGE-1", value: metrics.rouge1 * 100, color: "#3b82f6" },
      { name: "ROUGE-L", value: metrics.rougeL * 100, color: "#10b981" },
      { name: "BLEU", value: metrics.bleu * 100, color: "#f59e0b" },
    ]

    if (metrics.meteor) common.push({ name: "METEOR", value: metrics.meteor * 100, color: "#8b5cf6" })
    if (metrics.bertscore) common.push({ name: "BERTScore", value: metrics.bertscore * 100, color: "#ef4444" })
    if (metrics.accuracy) common.push({ name: "Accuracy", value: metrics.accuracy * 100, color: "#06b6d4" })

    return common
  }

  const getPerformanceLevel = (score: number) => {
    if (score >= 0.7) return { level: "Excellent", color: "text-green-600", bg: "bg-green-100" }
    if (score >= 0.5) return { level: "Good", color: "text-blue-600", bg: "bg-blue-100" }
    if (score >= 0.3) return { level: "Fair", color: "text-yellow-600", bg: "bg-yellow-100" }
    return { level: "Needs Improvement", color: "text-red-600", bg: "bg-red-100" }
  }

  const exportResults = (format: "json" | "csv") => {
    const data = {
      task: config.task,
      metrics,
      samples,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `evaluation_results.${format}`
    a.click()
  }

  if (isEvaluating) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Evaluating Model Performance</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Running comprehensive evaluation on test dataset...
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <div className="space-y-2">
                <p className="text-lg font-medium">Evaluating model performance...</p>
                <Progress value={66} className="w-full max-w-md mx-auto" />
                <p className="text-sm text-slate-600 dark:text-slate-400">Computing ROUGE, BLEU, and other metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Evaluation Results</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Comprehensive analysis of your fine-tuned model's performance with detailed metrics and comparisons.
        </p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {getTaskSpecificMetrics()
          .slice(0, 4)
          .map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold" style={{ color: metric.color }}>
                    {metric.value.toFixed(1)}%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{metric.name}</div>
                  <div className="mt-2">
                    <Badge
                      className={`${getPerformanceLevel(metric.value / 100).bg} ${getPerformanceLevel(metric.value / 100).color}`}
                    >
                      {getPerformanceLevel(metric.value / 100).level}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metrics Visualization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getTaskSpecificMetrics()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, "Score"]} />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Radar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={getTaskSpecificMetrics()}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Performance" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sample Comparisons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Sample Comparisons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="samples" className="w-full">
            <TabsList>
              <TabsTrigger value="samples">Sample Outputs</TabsTrigger>
              <TabsTrigger value="analysis">Quality Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="samples" className="space-y-6">
              {samples.map((sample, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Sample {index + 1}</h4>
                    <Badge
                      variant={sample.improvement === "better" ? "default" : "secondary"}
                      className={
                        sample.improvement === "better" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {sample.improvement === "better" ? "Improved" : "Similar"}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs font-medium text-slate-500 dark:text-slate-400">Input:</Label>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 p-2 bg-slate-50 dark:bg-slate-800 rounded">
                        {sample.input}
                      </p>
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-slate-500 dark:text-slate-400">Target:</Label>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 p-2 bg-green-50 dark:bg-green-900 rounded">
                        {sample.target}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          Baseline Model:
                        </Label>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 p-2 bg-blue-50 dark:bg-blue-900 rounded">
                          {sample.baseline}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          Fine-tuned Model:
                        </Label>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 p-2 bg-purple-50 dark:bg-purple-900 rounded">
                          {sample.finetuned}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {samples.filter((s) => s.improvement === "better").length}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Improved</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-600">
                      {samples.filter((s) => s.improvement === "similar").length}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Similar</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round((samples.filter((s) => s.improvement === "better").length / samples.length) * 100)}%
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Success Rate</div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  Your fine-tuned model shows significant improvement over the baseline, with{" "}
                  {Math.round((samples.filter((s) => s.improvement === "better").length / samples.length) * 100)}% of
                  samples generating better outputs. The model demonstrates strong performance in {config.task} tasks.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => exportResults("json")} className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Export JSON
            </Button>
            <Button onClick={() => exportResults("csv")} variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Export CSV
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Model
            </Button>
          </div>

          <Alert className="mt-4">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Evaluation Complete!</strong> Your model has been successfully fine-tuned and evaluated. You can
              now export the results or download the trained model for deployment.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
