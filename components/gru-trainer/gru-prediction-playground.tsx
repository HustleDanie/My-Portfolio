"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Play, Brain, TrendingUp, MessageSquare, Tag, Zap } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface PredictionResult {
  input: string
  prediction: any
  confidence: number
  processingTime: number
  hiddenStates?: number[]
  gateActivations?: {
    reset: number[]
    update: number[]
  }
}

interface GruPredictionPlaygroundProps {
  model: any
  taskType: string
  onPredictionMade: (result: PredictionResult) => void
}

export default function GruPredictionPlayground({ model, taskType, onPredictionMade }: GruPredictionPlaygroundProps) {
  const [activeTab, setActiveTab] = useState("text-classification")
  const [inputText, setInputText] = useState("")
  const [timeSeriesInput, setTimeSeriesInput] = useState("1.2,1.5,1.8,2.1,2.3,2.0,1.9,2.2,2.5,2.8")
  const [isProcessing, setIsProcessing] = useState(false)
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)
  const [showInternals, setShowInternals] = useState(false)

  const sampleInputs = {
    "text-classification": [
      "This movie was absolutely fantastic! Great acting and amazing plot.",
      "Boring and predictable. Complete waste of time.",
      "The product quality is excellent and delivery was fast.",
      "Terrible customer service, very disappointed.",
    ],
    "sequence-labeling": [
      "John works at Google in California.",
      "Apple Inc. released a new iPhone yesterday.",
      "The meeting is scheduled for Monday at 3 PM.",
      "Microsoft acquired GitHub for $7.5 billion.",
    ],
    "text-generation": [
      "Once upon a time",
      "The future of artificial intelligence",
      "In a world where technology",
      "The secret to happiness",
    ],
    "time-series": ["1.2,1.5,1.8,2.1,2.3", "100,105,98,102,110", "0.5,0.7,0.6,0.8,0.9", "25.5,26.1,24.8,25.9,26.5"],
  }

  const handlePrediction = async () => {
    setIsProcessing(true)

    // Simulate GRU processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const input = activeTab === "time-series" ? timeSeriesInput : inputText

    // Generate realistic predictions based on task type
    let prediction: any
    const confidence = 0.7 + Math.random() * 0.25

    switch (activeTab) {
      case "text-classification":
        prediction = {
          label: Math.random() > 0.5 ? "Positive" : "Negative",
          probabilities: {
            Positive: Math.random(),
            Negative: Math.random(),
          },
        }
        break
      case "sequence-labeling":
        const tokens = input.split(" ")
        prediction = {
          tokens,
          labels: tokens.map(
            () => ["O", "B-PER", "I-PER", "B-ORG", "I-ORG", "B-LOC", "I-LOC"][Math.floor(Math.random() * 7)],
          ),
        }
        break
      case "text-generation":
        prediction = {
          generated: input + " lies in the power of human connection and understanding.",
        }
        break
      case "time-series":
        const values = timeSeriesInput.split(",").map(Number)
        const nextValue = values[values.length - 1] + (Math.random() - 0.5) * 0.5
        prediction = {
          nextValue: nextValue.toFixed(2),
          forecast: Array.from({ length: 5 }, (_, i) => nextValue + (Math.random() - 0.5) * (i + 1) * 0.3),
        }
        break
    }

    const result: PredictionResult = {
      input,
      prediction,
      confidence,
      processingTime: 150 + Math.random() * 100,
      hiddenStates: Array.from({ length: 10 }, () => Math.random() * 2 - 1),
      gateActivations: {
        reset: Array.from({ length: 10 }, () => Math.random()),
        update: Array.from({ length: 10 }, () => Math.random()),
      },
    }

    setPredictionResult(result)
    onPredictionMade(result)
    setIsProcessing(false)
  }

  const getTaskIcon = (task: string) => {
    switch (task) {
      case "text-classification":
        return <MessageSquare className="h-4 w-4" />
      case "sequence-labeling":
        return <Tag className="h-4 w-4" />
      case "text-generation":
        return <Zap className="h-4 w-4" />
      case "time-series":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Step 5: Test Your GRU Model</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interact with your trained GRU model and explore its predictions. Observe how the reset and update gates
          process sequential information.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="text-classification" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Classification</span>
          </TabsTrigger>
          <TabsTrigger value="sequence-labeling" className="flex items-center space-x-2">
            <Tag className="h-4 w-4" />
            <span className="hidden sm:inline">Labeling</span>
          </TabsTrigger>
          <TabsTrigger value="text-generation" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Generation</span>
          </TabsTrigger>
          <TabsTrigger value="time-series" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Time Series</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text-classification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Text Classification</span>
              </CardTitle>
              <CardDescription>Enter text to classify using your trained GRU model</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Input Text</label>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text to classify..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Sample Inputs</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sampleInputs["text-classification"].map((sample, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputText(sample)}
                      className="text-left justify-start h-auto p-3"
                    >
                      <span className="truncate">{sample}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={handlePrediction} disabled={!inputText.trim() || isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Classify Text
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time-series" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Time Series Forecasting</span>
              </CardTitle>
              <CardDescription>Enter comma-separated values to forecast the next values</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Time Series Values</label>
                <input
                  type="text"
                  value={timeSeriesInput}
                  onChange={(e) => setTimeSeriesInput(e.target.value)}
                  placeholder="1.2,1.5,1.8,2.1,2.3"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <p className="text-xs text-muted-foreground mt-1">Enter comma-separated numerical values</p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Sample Sequences</h4>
                <div className="grid grid-cols-2 gap-2">
                  {sampleInputs["time-series"].map((sample, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => setTimeSeriesInput(sample)}
                      className="font-mono"
                    >
                      {sample}
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={handlePrediction} disabled={!timeSeriesInput.trim() || isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Forecast Values
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar content for other tabs... */}
      </Tabs>

      {predictionResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getTaskIcon(activeTab)}
                <span>Prediction Results</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Confidence</span>
                  <div className="text-2xl font-bold text-green-600">
                    {(predictionResult.confidence * 100).toFixed(1)}%
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Processing Time</span>
                  <div className="text-2xl font-bold text-blue-600">{predictionResult.processingTime.toFixed(0)}ms</div>
                </div>
              </div>

              <div className="space-y-3">
                {activeTab === "text-classification" && predictionResult.prediction.label && (
                  <div>
                    <h4 className="font-semibold mb-2">Classification Result</h4>
                    <Badge
                      className={
                        predictionResult.prediction.label === "Positive"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {predictionResult.prediction.label}
                    </Badge>
                  </div>
                )}

                {activeTab === "time-series" && predictionResult.prediction.nextValue && (
                  <div>
                    <h4 className="font-semibold mb-2">Next Value Prediction</h4>
                    <div className="text-3xl font-bold text-blue-600">{predictionResult.prediction.nextValue}</div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => setShowInternals(!showInternals)}>
                  <Brain className="h-4 w-4 mr-2" />
                  {showInternals ? "Hide" : "Show"} GRU Internals
                </Button>
              </div>
            </CardContent>
          </Card>

          {showInternals && predictionResult.gateActivations && (
            <Card>
              <CardHeader>
                <CardTitle>GRU Gate Activations</CardTitle>
                <CardDescription>Visualization of reset and update gate activations during processing</CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="gates" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="gates">Gate Activations</TabsTrigger>
                    <TabsTrigger value="hidden">Hidden States</TabsTrigger>
                  </TabsList>

                  <TabsContent value="gates" className="mt-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={predictionResult.gateActivations.reset.map((reset, i) => ({
                          step: i,
                          reset,
                          update: predictionResult.gateActivations!.update[i],
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="step" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="reset" fill="#3b82f6" name="Reset Gate" />
                        <Bar dataKey="update" fill="#10b981" name="Update Gate" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  <TabsContent value="hidden" className="mt-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart
                        data={predictionResult.hiddenStates?.map((state, i) => ({
                          step: i,
                          value: state,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="step" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h3 className="font-semibold mb-2">Understanding GRU Predictions</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>
            • <strong>Reset Gate:</strong> Controls how much past information to forget
          </li>
          <li>
            • <strong>Update Gate:</strong> Determines how much new information to incorporate
          </li>
          <li>
            • <strong>Hidden States:</strong> Represent the model's internal memory at each time step
          </li>
          <li>
            • <strong>Processing Time:</strong> GRUs are typically faster than LSTMs due to simpler architecture
          </li>
        </ul>
      </div>
    </div>
  )
}

// Allow named-import style, e.g.  import { GruPredictionPlayground } from "…"
export { GruPredictionPlayground }
