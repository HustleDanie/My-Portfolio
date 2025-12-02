"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Settings, Copy, RefreshCw, Zap, Eye, Lightbulb, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GenerationConfig {
  strategy: "greedy" | "beam_search" | "top_k" | "top_p"
  maxLength: number
  temperature: number
  topK: number
  topP: number
  numBeams: number
  repetitionPenalty: number
  earlyStopping: boolean
}

interface PredictionResult {
  text: string
  confidence: number
  tokens: string[]
  probabilities?: number[]
}

interface Seq2SeqPredictionPlaygroundProps {
  onComplete: (data: { predictions: any }) => void
  config: any
}

export function Seq2SeqPredictionPlayground({ onComplete, config }: Seq2SeqPredictionPlaygroundProps) {
  const [inputText, setInputText] = useState("")
  const [generationConfig, setGenerationConfig] = useState<GenerationConfig>({
    strategy: "beam_search",
    maxLength: 128,
    temperature: 1.0,
    topK: 50,
    topP: 0.9,
    numBeams: 4,
    repetitionPenalty: 1.1,
    earlyStopping: true,
  })

  const [predictions, setPredictions] = useState<{
    finetuned: PredictionResult | null
    baseline: PredictionResult | null
  }>({
    finetuned: null,
    baseline: null,
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  // Example prompts based on task
  const getExamplePrompts = () => {
    switch (config.task) {
      case "summarization":
        return [
          "The rapid advancement of artificial intelligence has transformed numerous industries, from healthcare to finance. Machine learning algorithms now assist doctors in diagnosing diseases, help financial institutions detect fraud, and enable autonomous vehicles to navigate complex environments. However, these developments also raise important questions about job displacement, privacy, and the ethical implications of AI decision-making.",
          "Climate change continues to be one of the most pressing global challenges of our time. Rising temperatures, melting ice caps, and extreme weather events are affecting ecosystems worldwide. Scientists emphasize the urgent need for renewable energy adoption, carbon emission reduction, and international cooperation to mitigate these effects.",
          "The COVID-19 pandemic has fundamentally changed how we work, learn, and interact. Remote work has become mainstream, online education has expanded rapidly, and digital health solutions have gained widespread acceptance. These changes have accelerated digital transformation across all sectors of society.",
        ]
      case "translation":
        return [
          "Hello, how are you today?",
          "The weather is beautiful this morning.",
          "I would like to order a coffee, please.",
        ]
      case "paraphrase":
        return [
          "The movie was really good and entertaining.",
          "She completed her homework before dinner.",
          "The company announced new product features.",
        ]
      case "question_generation":
        return [
          "Paris is the capital city of France and is known for its iconic Eiffel Tower.",
          "Photosynthesis is the process by which plants convert sunlight into energy.",
          "The Great Wall of China was built over many centuries to protect against invasions.",
        ]
      case "grammar_correction":
        return [
          "I are going to the store yesterday.",
          "She don't have no money left.",
          "The book what I read was interesting.",
        ]
      case "headline_generation":
        return [
          "Scientists at MIT have developed a new artificial intelligence system that can predict weather patterns with 95% accuracy. The breakthrough could revolutionize meteorology and help communities better prepare for extreme weather events.",
          "A major technology company announced today that it will invest $10 billion in renewable energy projects over the next five years. The initiative aims to make the company carbon neutral by 2030.",
          "Researchers have discovered a new species of butterfly in the Amazon rainforest. The colorful insect, named after a local indigenous tribe, highlights the importance of biodiversity conservation.",
        ]
      default:
        return ["Enter your text here..."]
    }
  }

  const generatePrediction = async () => {
    if (!inputText.trim()) return

    setIsGenerating(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock predictions based on task
    const mockPredictions = generateMockPredictions(inputText)
    setPredictions(mockPredictions)
    setIsGenerating(false)

    onComplete({ predictions: mockPredictions })
  }

  const generateMockPredictions = (input: string): { finetuned: PredictionResult; baseline: PredictionResult } => {
    switch (config.task) {
      case "summarization":
        return {
          finetuned: {
            text: "AI transforms industries but raises ethical concerns about jobs and privacy.",
            confidence: 0.89,
            tokens: ["AI", "transforms", "industries", "but", "raises", "ethical", "concerns"],
          },
          baseline: {
            text: "Artificial intelligence has transformed numerous industries and raises questions.",
            confidence: 0.72,
            tokens: ["Artificial", "intelligence", "has", "transformed", "numerous", "industries"],
          },
        }
      case "translation":
        return {
          finetuned: {
            text: "Hola, ¿cómo estás hoy?",
            confidence: 0.94,
            tokens: ["Hola", ",", "¿", "cómo", "estás", "hoy", "?"],
          },
          baseline: {
            text: "Hola, ¿cómo está usted hoy?",
            confidence: 0.81,
            tokens: ["Hola", ",", "¿", "cómo", "está", "usted", "hoy", "?"],
          },
        }
      case "paraphrase":
        return {
          finetuned: {
            text: "The film was excellent and very engaging.",
            confidence: 0.87,
            tokens: ["The", "film", "was", "excellent", "and", "very", "engaging", "."],
          },
          baseline: {
            text: "The movie was very good and entertaining.",
            confidence: 0.75,
            tokens: ["The", "movie", "was", "very", "good", "and", "entertaining", "."],
          },
        }
      default:
        return {
          finetuned: {
            text: "Generated output from fine-tuned model",
            confidence: 0.85,
            tokens: ["Generated", "output", "from", "fine-tuned", "model"],
          },
          baseline: {
            text: "Generated output from baseline model",
            confidence: 0.7,
            tokens: ["Generated", "output", "from", "baseline", "model"],
          },
        }
    }
  }

  const updateGenerationConfig = (key: keyof GenerationConfig, value: any) => {
    setGenerationConfig((prev) => ({ ...prev, [key]: value }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Prediction Playground</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Test your fine-tuned model with custom inputs and compare results with the baseline model.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Input Text
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Enter your text:</Label>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Enter text for ${config.task || "processing"}...`}
                  className="mt-2 min-h-32"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Example Prompts:</Label>
                <div className="grid grid-cols-1 gap-2">
                  {getExamplePrompts()
                    .slice(0, 3)
                    .map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setInputText(prompt)}
                        className="text-left h-auto p-3 whitespace-normal"
                      >
                        <span className="line-clamp-2">{prompt}</span>
                      </Button>
                    ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={generatePrediction}
                  disabled={!inputText.trim() || isGenerating}
                  className="flex items-center gap-2"
                >
                  {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                  {isGenerating ? "Generating..." : "Generate"}
                </Button>

                <div className="flex items-center gap-2">
                  <Switch checked={showComparison} onCheckedChange={setShowComparison} />
                  <Label className="text-sm">Compare with baseline</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {predictions.finetuned && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Generated Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="finetuned" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="finetuned">Fine-tuned Model</TabsTrigger>
                      <TabsTrigger value="baseline" disabled={!showComparison}>
                        Baseline Model
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="finetuned" className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-green-100 text-green-800">
                            Confidence: {(predictions.finetuned.confidence * 100).toFixed(1)}%
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(predictions.finetuned!.text)}
                            className="flex items-center gap-2"
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </Button>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                          <p className="text-slate-900 dark:text-white">{predictions.finetuned.text}</p>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Token Breakdown:</Label>
                          <div className="flex flex-wrap gap-1">
                            {predictions.finetuned.tokens.map((token, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {token}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="baseline" className="space-y-4">
                      {predictions.baseline && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-blue-100 text-blue-800">
                              Confidence: {(predictions.baseline.confidence * 100).toFixed(1)}%
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(predictions.baseline!.text)}
                              className="flex items-center gap-2"
                            >
                              <Copy className="w-3 h-3" />
                              Copy
                            </Button>
                          </div>

                          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                            <p className="text-slate-900 dark:text-white">{predictions.baseline.text}</p>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Token Breakdown:</Label>
                            <div className="flex flex-wrap gap-1">
                              {predictions.baseline.tokens.map((token, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {token}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  {/* Comparison */}
                  {showComparison && predictions.baseline && (
                    <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <h4 className="text-sm font-medium mb-3">Model Comparison</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Fine-tuned</div>
                          <div className="text-sm p-2 bg-green-100 dark:bg-green-900 rounded">
                            {predictions.finetuned.text}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Baseline</div>
                          <div className="text-sm p-2 bg-blue-100 dark:bg-blue-900 rounded">
                            {predictions.baseline.text}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-green-600" />
                          <span>
                            Confidence: +
                            {((predictions.finetuned.confidence - predictions.baseline.confidence) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Generation Configuration */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Generation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Decoding Strategy</Label>
                <Select
                  value={generationConfig.strategy}
                  onValueChange={(value) => updateGenerationConfig("strategy", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="greedy">Greedy</SelectItem>
                    <SelectItem value="beam_search">Beam Search</SelectItem>
                    <SelectItem value="top_k">Top-k Sampling</SelectItem>
                    <SelectItem value="top_p">Top-p (Nucleus)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Max Length</Label>
                <div className="mt-2">
                  <Slider
                    value={[generationConfig.maxLength]}
                    onValueChange={(value) => updateGenerationConfig("maxLength", value[0])}
                    max={512}
                    min={16}
                    step={16}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>16</span>
                    <span>{generationConfig.maxLength}</span>
                    <span>512</span>
                  </div>
                </div>
              </div>

              {generationConfig.strategy === "beam_search" && (
                <div>
                  <Label className="text-sm font-medium">Number of Beams</Label>
                  <div className="mt-2">
                    <Slider
                      value={[generationConfig.numBeams]}
                      onValueChange={(value) => updateGenerationConfig("numBeams", value[0])}
                      max={8}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>1</span>
                      <span>{generationConfig.numBeams}</span>
                      <span>8</span>
                    </div>
                  </div>
                </div>
              )}

              {(generationConfig.strategy === "top_k" || generationConfig.strategy === "top_p") && (
                <>
                  <div>
                    <Label className="text-sm font-medium">Temperature</Label>
                    <div className="mt-2">
                      <Slider
                        value={[generationConfig.temperature * 100]}
                        onValueChange={(value) => updateGenerationConfig("temperature", value[0] / 100)}
                        max={200}
                        min={10}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>0.1</span>
                        <span>{generationConfig.temperature.toFixed(1)}</span>
                        <span>2.0</span>
                      </div>
                    </div>
                  </div>

                  {generationConfig.strategy === "top_k" && (
                    <div>
                      <Label className="text-sm font-medium">Top-k</Label>
                      <div className="mt-2">
                        <Slider
                          value={[generationConfig.topK]}
                          onValueChange={(value) => updateGenerationConfig("topK", value[0])}
                          max={100}
                          min={1}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>1</span>
                          <span>{generationConfig.topK}</span>
                          <span>100</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {generationConfig.strategy === "top_p" && (
                    <div>
                      <Label className="text-sm font-medium">Top-p</Label>
                      <div className="mt-2">
                        <Slider
                          value={[generationConfig.topP * 100]}
                          onValueChange={(value) => updateGenerationConfig("topP", value[0] / 100)}
                          max={100}
                          min={10}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>0.1</span>
                          <span>{generationConfig.topP.toFixed(1)}</span>
                          <span>1.0</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div>
                <Label className="text-sm font-medium">Repetition Penalty</Label>
                <div className="mt-2">
                  <Slider
                    value={[generationConfig.repetitionPenalty * 100]}
                    onValueChange={(value) => updateGenerationConfig("repetitionPenalty", value[0] / 100)}
                    max={200}
                    min={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1.0</span>
                    <span>{generationConfig.repetitionPenalty.toFixed(1)}</span>
                    <span>2.0</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Early Stopping</Label>
                <Switch
                  checked={generationConfig.earlyStopping}
                  onCheckedChange={(checked) => updateGenerationConfig("earlyStopping", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              <strong>Tip:</strong> Use beam search for better quality outputs, or top-p sampling for more creative
              results. Adjust temperature to control randomness.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
