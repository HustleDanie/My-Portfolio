"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, ArrowRight, ArrowLeft, Brain, Target, Zap, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import type { TrainingConfig } from "@/app/projects/encoder-training-dynamics/page"

interface PredictionPlaygroundProps {
  config: TrainingConfig
  updateConfig: (key: keyof TrainingConfig, value: any) => void
  onNext: () => void
  onPrev: () => void
}

export function PredictionPlayground({ config, updateConfig, onNext, onPrev }: PredictionPlaygroundProps) {
  const [inputText, setInputText] = useState("")
  const [contextText, setContextText] = useState("")
  const [questionText, setQuestionText] = useState("")
  const [prediction, setPrediction] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getTaskInputs = () => {
    switch (config.task) {
      case "text-classification":
      case "sentiment-analysis":
      case "language-detection":
      case "emotion-detection":
        return ["text"]
      case "named-entity-recognition":
        return ["text"]
      case "question-answering":
        return ["context", "question"]
      case "semantic-similarity":
        return ["text1", "text2"]
      default:
        return ["text"]
    }
  }

  const getExampleInputs = () => {
    switch (config.task) {
      case "text-classification":
        return {
          text: "Scientists have discovered a new species of deep-sea fish in the Pacific Ocean. The fish, which glows in the dark, was found at depths of over 2000 meters.",
        }
      case "sentiment-analysis":
        return {
          text: "I absolutely loved this movie! The acting was incredible and the plot kept me engaged throughout. Highly recommend it to everyone.",
        }
      case "named-entity-recognition":
        return {
          text: "Apple Inc. was founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in Cupertino, California on April 1, 1976.",
        }
      case "question-answering":
        return {
          context:
            "The Amazon rainforest, also known as Amazonia, is a moist broadleaf tropical rainforest in the Amazon biome that covers most of the Amazon basin of South America. This basin encompasses 7,000,000 km2, of which 5,500,000 km2 are covered by the rainforest.",
          question: "How much area does the Amazon basin cover?",
        }
      case "semantic-similarity":
        return {
          text1: "The cat is sleeping on the couch.",
          text2: "A feline is resting on the sofa.",
        }
      default:
        return { text: "Enter your text here..." }
    }
  }

  const generateMockPrediction = () => {
    setIsLoading(true)

    setTimeout(() => {
      let mockPrediction: any = {}

      switch (config.task) {
        case "text-classification":
          mockPrediction = {
            predicted_class: "Technology",
            confidence: 0.89,
            probabilities: [
              { class: "Technology", probability: 0.89 },
              { class: "Science", probability: 0.07 },
              { class: "Business", probability: 0.03 },
              { class: "Sports", probability: 0.01 },
            ],
          }
          break
        case "sentiment-analysis":
          mockPrediction = {
            predicted_class: "Positive",
            confidence: 0.94,
            probabilities: [
              { class: "Positive", probability: 0.94 },
              { class: "Negative", probability: 0.06 },
            ],
          }
          break
        case "named-entity-recognition":
          mockPrediction = {
            entities: [
              { text: "Apple Inc.", label: "ORG", start: 0, end: 10, confidence: 0.99 },
              { text: "Steve Jobs", label: "PER", start: 25, end: 35, confidence: 0.97 },
              { text: "Steve Wozniak", label: "PER", start: 37, end: 50, confidence: 0.96 },
              { text: "Ronald Wayne", label: "PER", start: 56, end: 68, confidence: 0.94 },
              { text: "Cupertino", label: "LOC", start: 72, end: 81, confidence: 0.92 },
              { text: "California", label: "LOC", start: 83, end: 93, confidence: 0.95 },
            ],
          }
          break
        case "question-answering":
          mockPrediction = {
            answer: "7,000,000 km2",
            confidence: 0.91,
            start_position: 156,
            end_position: 168,
            context_with_answer: contextText,
          }
          break
        case "semantic-similarity":
          mockPrediction = {
            similarity_score: 0.87,
            interpretation: "High similarity - the sentences convey the same meaning with different words",
          }
          break
        default:
          mockPrediction = { result: "Mock prediction result" }
      }

      setPrediction(mockPrediction)
      setIsLoading(false)
    }, 1500)
  }

  const loadExample = () => {
    const examples = getExampleInputs()
    setInputText(examples.text || "")
    setContextText(examples.context || "")
    setQuestionText(examples.question || "")
    setPrediction(null)
  }

  const renderPredictionResult = () => {
    if (!prediction) return null

    switch (config.task) {
      case "text-classification":
      case "sentiment-analysis":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Badge className="text-lg px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {prediction.predicted_class}
              </Badge>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Confidence: {(prediction.confidence * 100).toFixed(1)}%
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Class Probabilities:</h4>
              {prediction.probabilities.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <Badge variant="outline" className="min-w-[100px] justify-center">
                    {item.class}
                  </Badge>
                  <div className="flex-1">
                    <Progress value={item.probability * 100} className="h-2" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[50px]">
                    {(item.probability * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )

      case "named-entity-recognition":
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-3">Detected Entities:</h4>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <div className="text-sm leading-relaxed">
                  {inputText.split("").map((char, i) => {
                    const entity = prediction.entities.find((e: any) => i >= e.start && i < e.end)
                    if (entity && i === entity.start) {
                      return (
                        <span
                          key={i}
                          className={`px-1 py-0.5 rounded text-white text-xs ${
                            entity.label === "PER"
                              ? "bg-blue-500"
                              : entity.label === "ORG"
                                ? "bg-green-500"
                                : entity.label === "LOC"
                                  ? "bg-purple-500"
                                  : "bg-gray-500"
                          }`}
                        >
                          {inputText.slice(entity.start, entity.end)}
                          <sup className="ml-1">{entity.label}</sup>
                        </span>
                      )
                    } else if (!entity) {
                      return char
                    }
                    return null
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Entity Details:</h4>
              {prediction.entities.map((entity: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        entity.label === "PER"
                          ? "bg-blue-500"
                          : entity.label === "ORG"
                            ? "bg-green-500"
                            : entity.label === "LOC"
                              ? "bg-purple-500"
                              : "bg-gray-500"
                      }
                    >
                      {entity.label}
                    </Badge>
                    <span className="font-medium">{entity.text}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {(entity.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )

      case "question-answering":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600 mb-2">"{prediction.answer}"</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Confidence: {(prediction.confidence * 100).toFixed(1)}%
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-2">Answer in Context:</h4>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm">
                {contextText.slice(0, prediction.start_position)}
                <span className="bg-yellow-200 dark:bg-yellow-800 px-1 py-0.5 rounded">{prediction.answer}</span>
                {contextText.slice(prediction.end_position)}
              </div>
            </div>
          </div>
        )

      case "semantic-similarity":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {(prediction.similarity_score * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Semantic Similarity Score</div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
              <p className="text-sm text-purple-800 dark:text-purple-200">{prediction.interpretation}</p>
            </div>
          </div>
        )

      default:
        return <div>Prediction result would appear here</div>
    }
  }

  return (
    <div className="space-y-8">
      <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-green-900 dark:text-green-100">
            🟢 STEP 5: Prediction Playground
          </CardTitle>
          <CardDescription className="text-green-700 dark:text-green-300 font-space-mono">
            Test your fine-tuned {config.model?.name} model on new inputs and see real-time predictions.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Model Input
            </CardTitle>
            <CardDescription>Enter text for your {config.task} model to analyze</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {config.task === "question-answering" ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Context</Label>
                  <Textarea
                    value={contextText}
                    onChange={(e) => setContextText(e.target.value)}
                    placeholder="Enter the context passage..."
                    className="mt-2 min-h-[120px]"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Question</Label>
                  <Textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Enter your question..."
                    className="mt-2 min-h-[60px]"
                  />
                </div>
              </div>
            ) : config.task === "semantic-similarity" ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Text 1</Label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter first text..."
                    className="mt-2 min-h-[80px]"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Text 2</Label>
                  <Textarea
                    value={contextText}
                    onChange={(e) => setContextText(e.target.value)}
                    placeholder="Enter second text..."
                    className="mt-2 min-h-[80px]"
                  />
                </div>
              </div>
            ) : (
              <div>
                <Label className="text-sm font-medium">Input Text</Label>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your text here..."
                  className="mt-2 min-h-[150px]"
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={loadExample} variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                Load Example
              </Button>
              <Button
                onClick={generateMockPrediction}
                disabled={!inputText.trim() || isLoading}
                className="gap-2 flex-1"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Predicting...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Run Prediction
                  </>
                )}
              </Button>
            </div>

            {/* Model Info */}
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Model Information</span>
                </div>
                <div className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                  <div>Model: {config.model?.name}</div>
                  <div>Task: {config.task}</div>
                  <div>Dataset: {config.dataset?.name}</div>
                  {config.training?.finalMetrics && (
                    <div>Accuracy: {(config.training.finalMetrics.accuracy * 100).toFixed(1)}%</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Prediction Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Prediction Results
            </CardTitle>
            <CardDescription>Model predictions and confidence scores</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Processing your input...</div>
                </div>
              </div>
            ) : prediction ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {renderPredictionResult()}
              </motion.div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter text and click "Run Prediction" to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Training
        </Button>

        <Button onClick={onNext} className="gap-2">
          Continue to Evaluation
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
