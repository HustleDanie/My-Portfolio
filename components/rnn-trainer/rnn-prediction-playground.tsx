"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Play, Brain, Eye, TrendingUp } from "lucide-react"

interface RnnPredictionPlaygroundProps {
  onComplete: () => void
}

export function RnnPredictionPlayground({ onComplete }: RnnPredictionPlaygroundProps) {
  const [inputText, setInputText] = useState("")
  const [timeSeriesInput, setTimeSeriesInput] = useState("")
  const [prediction, setPrediction] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("text")

  const sampleTexts = [
    "This movie was absolutely fantastic! The acting was superb and the plot was engaging.",
    "I hate this product. It broke after just one day of use. Terrible quality.",
    "The weather today is quite pleasant with mild temperatures and clear skies.",
    "Machine learning is revolutionizing how we process and understand data.",
  ]

  const sampleTimeSeries = [
    "23.5, 24.1, 23.8, 24.3, 25.0, 24.7, 24.2",
    "100, 102, 98, 105, 110, 108, 112, 115",
    "0.5, 0.7, 0.6, 0.8, 0.9, 0.7, 0.6, 0.8",
  ]

  const handlePredict = async () => {
    setIsProcessing(true)

    // Simulate prediction processing
    setTimeout(() => {
      if (activeTab === "text") {
        setPrediction({
          type: "text",
          label:
            inputText.includes("fantastic") || inputText.includes("superb")
              ? "Positive"
              : inputText.includes("hate") || inputText.includes("terrible")
                ? "Negative"
                : "Neutral",
          confidence: Math.random() * 0.3 + 0.7,
          hiddenStates: Array.from({ length: 10 }, () => Math.random()),
          tokenPredictions: inputText.split(" ").map((word) => ({
            token: word,
            attention: Math.random(),
          })),
        })
      } else {
        const values = timeSeriesInput
          .split(",")
          .map((v) => Number.parseFloat(v.trim()))
          .filter((v) => !isNaN(v))
        setPrediction({
          type: "timeseries",
          nextValue: values[values.length - 1] + (Math.random() - 0.5) * 2,
          confidence: Math.random() * 0.2 + 0.8,
          trend: values[values.length - 1] > values[0] ? "Increasing" : "Decreasing",
          forecast: values.slice(-3).map((v, i) => v + (Math.random() - 0.5) * 0.5 * (i + 1)),
        })
      }
      setIsProcessing(false)
    }, 2000)
  }

  const handleSampleSelect = (sample: string) => {
    if (activeTab === "text") {
      setInputText(sample)
    } else {
      setTimeSeriesInput(sample)
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron text-center">🟢 STEP 5: RNN Prediction Playground</CardTitle>
        <p className="text-center text-gray-600">
          Test your trained RNN model with custom inputs and visualize predictions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Text Input
            </TabsTrigger>
            <TabsTrigger value="timeseries" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Time Series
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Input Text</label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text for classification or sentiment analysis..."
                    className="min-h-32"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Sample Texts</label>
                  <div className="space-y-2">
                    {sampleTexts.map((sample, idx) => (
                      <Card
                        key={idx}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleSampleSelect(sample)}
                      >
                        <CardContent className="p-3">
                          <p className="text-sm">{sample}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handlePredict}
                  disabled={!inputText || isProcessing}
                  className="w-full flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  {isProcessing ? "Processing..." : "Predict"}
                </Button>

                {prediction && prediction.type === "text" && (
                  <div className="space-y-4">
                    <Card className="bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Eye className="h-5 w-5" />
                          Prediction Results
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Predicted Label:</span>
                          <Badge variant="secondary" className="text-lg">
                            {prediction.label}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Confidence:</span>
                          <span className="font-mono text-lg">{(prediction.confidence * 100).toFixed(1)}%</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Token-wise Processing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {prediction.tokenPredictions.map((token: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2 rounded"
                              style={{
                                backgroundColor: `rgba(59, 130, 246, ${token.attention * 0.3})`,
                              }}
                            >
                              <span className="font-mono">{token.token}</span>
                              <span className="text-sm text-gray-600">{(token.attention * 100).toFixed(1)}%</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Hidden State Evolution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <Brain className="h-8 w-8 mx-auto mb-2" />
                            <div>Hidden state visualization</div>
                            <div className="text-sm">Shows how RNN processes sequence</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeseries" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Time Series Values</label>
                  <Textarea
                    value={timeSeriesInput}
                    onChange={(e) => setTimeSeriesInput(e.target.value)}
                    placeholder="Enter comma-separated values: 1.2, 1.5, 1.8, 2.1..."
                    className="min-h-32"
                  />
                  <p className="text-xs text-gray-600 mt-1">Enter at least 5 values separated by commas</p>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Sample Series</label>
                  <div className="space-y-2">
                    {sampleTimeSeries.map((sample, idx) => (
                      <Card
                        key={idx}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleSampleSelect(sample)}
                      >
                        <CardContent className="p-3">
                          <p className="text-sm font-mono">{sample}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handlePredict}
                  disabled={!timeSeriesInput || isProcessing}
                  className="w-full flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  {isProcessing ? "Forecasting..." : "Forecast"}
                </Button>

                {prediction && prediction.type === "timeseries" && (
                  <div className="space-y-4">
                    <Card className="bg-blue-50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Forecast Results
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Next Value:</span>
                          <span className="font-mono text-lg text-blue-600">{prediction.nextValue.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Confidence:</span>
                          <span className="font-mono text-lg">{(prediction.confidence * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Trend:</span>
                          <Badge variant={prediction.trend === "Increasing" ? "default" : "secondary"}>
                            {prediction.trend}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Forecast Visualization</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                            <div>Time series plot</div>
                            <div className="text-sm">Historical + predicted values</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <h4 className="font-semibold font-space-mono mb-2">🔍 Understanding RNN Predictions:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• RNN processes input sequentially, updating hidden state at each step</li>
              <li>• Final hidden state contains compressed sequence information</li>
              <li>• Attention weights show which parts of input are most important</li>
              <li>• For time series, RNN learns temporal patterns and dependencies</li>
              <li>• Vanilla RNNs may struggle with long-term dependencies</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={onComplete} className="px-8 py-2 font-space-mono">
            Continue to Evaluation Dashboard →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
