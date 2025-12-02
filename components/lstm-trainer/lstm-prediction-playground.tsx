"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Play, Brain, Eye, TrendingUp, Zap, MessageSquare } from "lucide-react"

interface LstmPredictionPlaygroundProps {
  onComplete: () => void
}

export function LstmPredictionPlayground({ onComplete }: LstmPredictionPlaygroundProps) {
  const [inputText, setInputText] = useState("")
  const [timeSeriesInput, setTimeSeriesInput] = useState("")
  const [sequenceInput, setSequenceInput] = useState("")
  const [prediction, setPrediction] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("text")

  const sampleTexts = [
    "This movie was absolutely fantastic! The acting was superb and the plot kept me engaged throughout.",
    "I hate this product. It broke after just one day of use. Terrible quality and poor customer service.",
    "The weather today is quite pleasant with mild temperatures and clear skies. Perfect for outdoor activities.",
    "Machine learning and artificial intelligence are revolutionizing how we process and understand complex data patterns.",
    "The restaurant had amazing food, but the service was incredibly slow. Mixed feelings about the overall experience.",
  ]

  const sampleTimeSeries = [
    "23.5, 24.1, 23.8, 24.3, 25.0, 24.7, 24.2, 23.9, 24.5, 25.2",
    "100, 102, 98, 105, 110, 108, 112, 115, 118, 120, 117, 122",
    "0.5, 0.7, 0.6, 0.8, 0.9, 0.7, 0.6, 0.8, 1.0, 0.9, 1.1, 1.2",
    "45.2, 46.1, 44.8, 47.3, 48.0, 46.7, 45.2, 44.9, 46.5, 48.2",
  ]

  const sampleSequences = [
    "The quick brown fox jumps over the lazy",
    "To be or not to be that is the",
    "In the beginning was the word and the word",
    "Machine learning models require large amounts of training",
  ]

  const handlePredict = async () => {
    setIsProcessing(true)

    // Simulate LSTM prediction processing
    setTimeout(() => {
      if (activeTab === "text") {
        setPrediction({
          type: "text",
          label:
            inputText.includes("fantastic") || inputText.includes("superb") || inputText.includes("amazing")
              ? "Positive"
              : inputText.includes("hate") || inputText.includes("terrible") || inputText.includes("slow")
                ? "Negative"
                : "Neutral",
          confidence: Math.random() * 0.2 + 0.8, // LSTM typically has higher confidence
          hiddenStates: Array.from({ length: 15 }, () => Math.random()),
          cellStates: Array.from({ length: 15 }, () => Math.random()),
          gateActivations: {
            forget: Array.from({ length: 10 }, () => Math.random()),
            input: Array.from({ length: 10 }, () => Math.random()),
            output: Array.from({ length: 10 }, () => Math.random()),
          },
          tokenPredictions: inputText.split(" ").map((word) => ({
            token: word,
            attention: Math.random(),
            cellContribution: Math.random(),
          })),
        })
      } else if (activeTab === "timeseries") {
        const values = timeSeriesInput
          .split(",")
          .map((v) => Number.parseFloat(v.trim()))
          .filter((v) => !isNaN(v))
        setPrediction({
          type: "timeseries",
          nextValue: values[values.length - 1] + (Math.random() - 0.5) * 1.5,
          confidence: Math.random() * 0.15 + 0.85,
          trend: values[values.length - 1] > values[0] ? "Increasing" : "Decreasing",
          forecast: values.slice(-5).map((v, i) => v + (Math.random() - 0.5) * 0.3 * (i + 1)),
          seasonality: Math.random() > 0.5 ? "Detected" : "Not Detected",
          longTermMemory: "Strong pattern retention over " + values.length + " steps",
        })
      } else {
        const words = sequenceInput.split(" ")
        setPrediction({
          type: "generation",
          nextWords: ["dog", "cat", "house", "tree", "question"].slice(0, 3),
          confidence: Math.random() * 0.2 + 0.8,
          generatedSequence:
            sequenceInput + " " + ["dog walking", "cat sleeping", "house standing"][Math.floor(Math.random() * 3)],
          perplexity: Math.random() * 5 + 2,
          contextLength: words.length,
        })
      }
      setIsProcessing(false)
    }, 2500) // Slightly longer to show LSTM complexity
  }

  const handleSampleSelect = (sample: string) => {
    if (activeTab === "text") {
      setInputText(sample)
    } else if (activeTab === "timeseries") {
      setTimeSeriesInput(sample)
    } else {
      setSequenceInput(sample)
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron text-center">🟢 STEP 5: LSTM Prediction Playground</CardTitle>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Test your trained LSTM model and visualize its memory mechanisms
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Text Classification
            </TabsTrigger>
            <TabsTrigger value="timeseries" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Time Series
            </TabsTrigger>
            <TabsTrigger value="generation" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Text Generation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block dark:text-gray-200">Input Text</label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text for sentiment analysis or classification..."
                    className="min-h-32"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block dark:text-gray-200">Sample Texts</label>
                  <div className="space-y-2">
                    {sampleTexts.map((sample, idx) => (
                      <Card
                        key={idx}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:bg-gray-800 dark:border-gray-700"
                        onClick={() => handleSampleSelect(sample)}
                      >
                        <CardContent className="p-3">
                          <p className="text-sm dark:text-gray-300">{sample}</p>
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
                  {isProcessing ? "Processing with LSTM..." : "Predict"}
                </Button>

                {prediction && prediction.type === "text" && (
                  <div className="space-y-4">
                    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Eye className="h-5 w-5" />
                          LSTM Prediction Results
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold dark:text-gray-200">Predicted Label:</span>
                          <Badge variant="secondary" className="text-lg">
                            {prediction.label}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold dark:text-gray-200">Confidence:</span>
                          <span className="font-mono text-lg dark:text-gray-300">
                            {(prediction.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">LSTM Gate Activations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <h4 className="font-semibold mb-2 dark:text-gray-200">Forget Gate</h4>
                            <div className="space-y-1">
                              {prediction.gateActivations.forget.slice(0, 5).map((val: number, idx: number) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                    <div
                                      className="bg-red-500 h-2 rounded-full"
                                      style={{ width: `${val * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs dark:text-gray-300">{(val * 100).toFixed(0)}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 dark:text-gray-200">Input Gate</h4>
                            <div className="space-y-1">
                              {prediction.gateActivations.input.slice(0, 5).map((val: number, idx: number) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                    <div
                                      className="bg-blue-500 h-2 rounded-full"
                                      style={{ width: `${val * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs dark:text-gray-300">{(val * 100).toFixed(0)}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 dark:text-gray-200">Output Gate</h4>
                            <div className="space-y-1">
                              {prediction.gateActivations.output.slice(0, 5).map((val: number, idx: number) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                    <div
                                      className="bg-green-500 h-2 rounded-full"
                                      style={{ width: `${val * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs dark:text-gray-300">{(val * 100).toFixed(0)}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Token-wise Analysis</CardTitle>
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
                              <span className="font-mono dark:text-gray-900">{token.token}</span>
                              <div className="flex gap-4 text-sm">
                                <span className="dark:text-gray-900">
                                  Attention: {(token.attention * 100).toFixed(1)}%
                                </span>
                                <span className="dark:text-gray-900">
                                  Cell: {(token.cellContribution * 100).toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Memory State Visualization</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2 dark:text-gray-200">Hidden States</h4>
                            <div className="h-32 bg-gray-50 dark:bg-gray-700 rounded flex items-center justify-center">
                              <div className="text-center text-gray-500 dark:text-gray-400">
                                <Brain className="h-8 w-8 mx-auto mb-2" />
                                <div>Hidden state evolution</div>
                                <div className="text-sm">Short-term memory</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 dark:text-gray-200">Cell States</h4>
                            <div className="h-32 bg-gray-50 dark:bg-gray-700 rounded flex items-center justify-center">
                              <div className="text-center text-gray-500 dark:text-gray-400">
                                <Zap className="h-8 w-8 mx-auto mb-2" />
                                <div>Cell state evolution</div>
                                <div className="text-sm">Long-term memory</div>
                              </div>
                            </div>
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
                  <label className="text-sm font-semibold mb-2 block dark:text-gray-200">Time Series Values</label>
                  <Textarea
                    value={timeSeriesInput}
                    onChange={(e) => setTimeSeriesInput(e.target.value)}
                    placeholder="Enter comma-separated values: 1.2, 1.5, 1.8, 2.1..."
                    className="min-h-32"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Enter at least 10 values for better LSTM predictions
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block dark:text-gray-200">Sample Series</label>
                  <div className="space-y-2">
                    {sampleTimeSeries.map((sample, idx) => (
                      <Card
                        key={idx}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:bg-gray-800 dark:border-gray-700"
                        onClick={() => handleSampleSelect(sample)}
                      >
                        <CardContent className="p-3">
                          <p className="text-sm font-mono dark:text-gray-300">{sample}</p>
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
                  {isProcessing ? "Forecasting with LSTM..." : "Forecast"}
                </Button>

                {prediction && prediction.type === "timeseries" && (
                  <div className="space-y-4">
                    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          LSTM Forecast Results
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold dark:text-gray-200">Next Value:</span>
                          <span className="font-mono text-lg text-blue-600 dark:text-blue-400">
                            {prediction.nextValue.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold dark:text-gray-200">Confidence:</span>
                          <span className="font-mono text-lg dark:text-gray-300">
                            {(prediction.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold dark:text-gray-200">Trend:</span>
                          <Badge variant={prediction.trend === "Increasing" ? "default" : "secondary"}>
                            {prediction.trend}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold dark:text-gray-200">Seasonality:</span>
                          <Badge variant="outline">{prediction.seasonality}</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">LSTM Memory Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
                            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">
                              Long-term Memory:
                            </h4>
                            <p className="text-sm text-purple-700 dark:text-purple-300">{prediction.longTermMemory}</p>
                          </div>
                          <div className="h-48 bg-gray-50 dark:bg-gray-700 rounded flex items-center justify-center">
                            <div className="text-center text-gray-500 dark:text-gray-400">
                              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                              <div>Time series forecast plot</div>
                              <div className="text-sm">Historical + LSTM predictions</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="generation" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block dark:text-gray-200">Sequence Start</label>
                  <Textarea
                    value={sequenceInput}
                    onChange={(e) => setSequenceInput(e.target.value)}
                    placeholder="Enter the beginning of a sequence to continue..."
                    className="min-h-32"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block dark:text-gray-200">Sample Sequences</label>
                  <div className="space-y-2">
                    {sampleSequences.map((sample, idx) => (
                      <Card
                        key={idx}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:bg-gray-800 dark:border-gray-700"
                        onClick={() => handleSampleSelect(sample)}
                      >
                        <CardContent className="p-3">
                          <p className="text-sm dark:text-gray-300">{sample}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handlePredict}
                  disabled={!sequenceInput || isProcessing}
                  className="w-full flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  {isProcessing ? "Generating with LSTM..." : "Generate"}
                </Button>

                {prediction && prediction.type === "generation" && (
                  <div className="space-y-4">
                    <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MessageSquare className="h-5 w-5" />
                          LSTM Generation Results
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <span className="font-semibold dark:text-gray-200">Generated Sequence:</span>
                          <div className="mt-2 p-3 bg-white dark:bg-gray-700 rounded border font-mono text-sm dark:text-gray-300">
                            {prediction.generatedSequence}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold dark:text-gray-200">Perplexity:</span>
                          <span className="font-mono text-lg dark:text-gray-300">
                            {prediction.perplexity.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold dark:text-gray-200">Context Length:</span>
                          <span className="font-mono text-lg dark:text-gray-300">{prediction.contextLength} words</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Next Word Predictions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {prediction.nextWords.map((word: string, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                            >
                              <span className="font-mono dark:text-gray-300">{word}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {(Math.random() * 30 + 70).toFixed(1)}% probability
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <h4 className="font-semibold font-space-mono mb-2 dark:text-gray-200">
              🔍 Understanding LSTM Predictions:
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• LSTM gates control what information to remember, forget, and output</li>
              <li>• Cell state maintains long-term dependencies across sequences</li>
              <li>• Hidden state provides short-term context for current predictions</li>
              <li>• Gate activations show how the model processes each input</li>
              <li>• LSTMs excel at capturing patterns in long sequences</li>
              <li>• Memory visualization helps understand model decision-making</li>
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
