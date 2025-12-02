"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, ArrowRight, ArrowLeft, Brain, Zap, Settings, Copy, RefreshCw, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DecoderTrainingConfig } from "@/app/projects/decoder-language-modeling/page"

interface DecoderPredictionPlaygroundProps {
  config: DecoderTrainingConfig
  updateConfig: (key: keyof DecoderTrainingConfig, value: any) => void
  onNext: () => void
  onPrev: () => void
}

export function DecoderPredictionPlayground({
  config,
  updateConfig,
  onNext,
  onPrev,
}: DecoderPredictionPlaygroundProps) {
  const [inputPrompt, setInputPrompt] = useState("")
  const [generatedText, setGeneratedText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [comparisonMode, setComparisonMode] = useState(false)
  const [baselineText, setBaselineText] = useState("")

  const [generationConfig, setGenerationConfig] = useState({
    maxLength: 100,
    temperature: 0.8,
    topK: 50,
    topP: 0.9,
    strategy: "top_p",
    repetitionPenalty: 1.1,
    doSample: true,
  })

  const getExamplePrompts = () => {
    switch (config.task) {
      case "text-completion":
        return [
          "The future of artificial intelligence is",
          "In a world where technology has advanced beyond our wildest dreams,",
          "The most important lesson I learned was",
        ]
      case "creative-writing":
        return [
          "Once upon a time in a distant galaxy,",
          "The old lighthouse keeper had a secret that",
          "She opened the mysterious letter and discovered",
        ]
      case "headline-generation":
        return [
          "Scientists discover new species in deep ocean",
          "Technology company announces breakthrough in quantum computing",
          "Climate change summit reaches historic agreement",
        ]
      case "dialogue-chatbot":
        return [
          "User: What's the weather like today?\nBot:",
          "User: Can you help me with my homework?\nBot:",
          "User: Tell me a joke.\nBot:",
        ]
      case "summarization":
        return [
          "Summarize: The research paper discusses the impact of machine learning on healthcare...",
          "Summarize: The quarterly earnings report shows significant growth in revenue...",
          "Summarize: The new environmental policy aims to reduce carbon emissions...",
        ]
      case "code-generation":
        return [
          "# Function to calculate fibonacci numbers\ndef fibonacci(n):",
          "// Create a React component for a button\nfunction Button(",
          "# Sort a list of dictionaries by a specific key\ndef sort_by_key(data, key):",
        ]
      default:
        return ["The quick brown fox", "In the beginning", "Technology has changed"]
    }
  }

  const generateText = async (useBaseline = false) => {
    setIsGenerating(true)

    // Simulate text generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockGenerations = {
      "text-completion": [
        "rapidly evolving, with new breakthroughs happening every day. Machine learning algorithms are becoming more sophisticated, and we're seeing applications in healthcare, finance, and education that were unimaginable just a few years ago.",
        "bright and full of possibilities. As we continue to develop more advanced AI systems, we must also consider the ethical implications and ensure that these technologies benefit all of humanity.",
      ],
      "creative-writing": [
        "there lived a young explorer named Zara who had always dreamed of discovering new worlds. With her trusty spaceship and an AI companion, she set off on a journey that would change the course of galactic history.",
        "no one had ever seen before. Every night, he would climb to the top of the lighthouse and send mysterious signals into the darkness, waiting for a response that never came.",
      ],
      "headline-generation": [
        "Revolutionary Deep-Sea Species Could Hold Key to Medical Breakthroughs",
        "Quantum Computing Milestone: Company Achieves 99.9% Error Correction Rate",
      ],
      "dialogue-chatbot": [
        "I don't have access to real-time weather data, but I'd be happy to help you find a reliable weather app or website for your location!",
        "Of course! I'd be glad to help with your homework. What subject are you working on?",
      ],
      summarization: [
        "The paper highlights how ML algorithms improve diagnostic accuracy and patient outcomes in healthcare settings.",
        "The company reported 25% revenue growth driven by strong performance in cloud services and AI products.",
      ],
      "code-generation": [
        "\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)",
        "props) {\n    return (\n        <button className={props.className} onClick={props.onClick}>\n            {props.children}\n        </button>\n    );\n}",
      ],
    }

    const taskGenerations = mockGenerations[config.task as keyof typeof mockGenerations] || [
      "generated text continues here...",
    ]
    const selectedGeneration = taskGenerations[Math.floor(Math.random() * taskGenerations.length)]

    if (useBaseline) {
      // Simulate baseline model (slightly lower quality)
      const baselineGeneration = selectedGeneration
        .replace(/sophisticated/g, "advanced")
        .replace(/revolutionary/g, "new")
      setBaselineText(baselineGeneration)
    } else {
      setGeneratedText(selectedGeneration)
    }

    setIsGenerating(false)
  }

  const loadExamplePrompt = () => {
    const examples = getExamplePrompts()
    const randomExample = examples[Math.floor(Math.random() * examples.length)]
    setInputPrompt(randomExample)
    setGeneratedText("")
    setBaselineText("")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(inputPrompt + text)
  }

  const handleConfigChange = (key: string, value: any) => {
    setGenerationConfig((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-8">
      <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-green-900 dark:text-green-100">
            🟢 STEP 5: Generation Playground
          </CardTitle>
          <CardDescription className="text-green-700 dark:text-green-300 font-space-mono">
            Test your fine-tuned {config.model?.name} model with different prompts and generation strategies.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input & Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Input Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Prompt</Label>
                <Textarea
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Enter your prompt here..."
                  className="mt-2 min-h-[120px]"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={loadExamplePrompt} variant="outline" size="sm" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Example
                </Button>
                <Button
                  onClick={() => generateText(false)}
                  disabled={!inputPrompt.trim() || isGenerating}
                  className="gap-2 flex-1"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Generate
                    </>
                  )}
                </Button>
              </div>

              {/* Comparison Mode Toggle */}
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Comparison Mode</Label>
                <Switch checked={comparisonMode} onCheckedChange={setComparisonMode} />
              </div>
            </CardContent>
          </Card>

          {/* Generation Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Generation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Max Length</Label>
                <Slider
                  value={[generationConfig.maxLength]}
                  onValueChange={(value) => handleConfigChange("maxLength", value[0])}
                  min={20}
                  max={500}
                  step={10}
                  className="mt-2"
                />
                <div className="text-xs text-gray-500 mt-1">{generationConfig.maxLength} tokens</div>
              </div>

              <div>
                <Label className="text-sm font-medium">Sampling Strategy</Label>
                <Select
                  value={generationConfig.strategy}
                  onValueChange={(value) => handleConfigChange("strategy", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="greedy">Greedy (Deterministic)</SelectItem>
                    <SelectItem value="top_k">Top-k Sampling</SelectItem>
                    <SelectItem value="top_p">Top-p (Nucleus)</SelectItem>
                    <SelectItem value="temperature">Temperature Sampling</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {generationConfig.strategy !== "greedy" && (
                <>
                  <div>
                    <Label className="text-sm font-medium">Temperature</Label>
                    <Slider
                      value={[generationConfig.temperature]}
                      onValueChange={(value) => handleConfigChange("temperature", value[0])}
                      min={0.1}
                      max={2.0}
                      step={0.1}
                      className="mt-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">{generationConfig.temperature.toFixed(1)}</div>
                  </div>

                  {generationConfig.strategy === "top_k" && (
                    <div>
                      <Label className="text-sm font-medium">Top-k</Label>
                      <Slider
                        value={[generationConfig.topK]}
                        onValueChange={(value) => handleConfigChange("topK", value[0])}
                        min={1}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                      <div className="text-xs text-gray-500 mt-1">{generationConfig.topK}</div>
                    </div>
                  )}

                  {generationConfig.strategy === "top_p" && (
                    <div>
                      <Label className="text-sm font-medium">Top-p</Label>
                      <Slider
                        value={[generationConfig.topP]}
                        onValueChange={(value) => handleConfigChange("topP", value[0])}
                        min={0.1}
                        max={1.0}
                        step={0.05}
                        className="mt-2"
                      />
                      <div className="text-xs text-gray-500 mt-1">{generationConfig.topP.toFixed(2)}</div>
                    </div>
                  )}
                </>
              )}

              <div>
                <Label className="text-sm font-medium">Repetition Penalty</Label>
                <Slider
                  value={[generationConfig.repetitionPenalty]}
                  onValueChange={(value) => handleConfigChange("repetitionPenalty", value[0])}
                  min={1.0}
                  max={2.0}
                  step={0.1}
                  className="mt-2"
                />
                <div className="text-xs text-gray-500 mt-1">{generationConfig.repetitionPenalty.toFixed(1)}</div>
              </div>
            </CardContent>
          </Card>

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
                  <div>Final Loss: {config.training.finalMetrics.loss?.toFixed(4)}</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generation Results */}
        <div className="lg:col-span-2">
          {comparisonMode ? (
            <Tabs defaultValue="fine-tuned" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fine-tuned">Fine-tuned Model</TabsTrigger>
                <TabsTrigger value="baseline">Baseline Model</TabsTrigger>
              </TabsList>

              <TabsContent value="fine-tuned" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Fine-tuned Generation</span>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => generateText(false)}
                          size="sm"
                          variant="outline"
                          disabled={!inputPrompt.trim() || isGenerating}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        {generatedText && (
                          <Button onClick={() => copyToClipboard(generatedText)} size="sm" variant="outline">
                            <Copy className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isGenerating ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center space-y-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Generating text...</div>
                        </div>
                      </div>
                    ) : generatedText ? (
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <div className="text-sm font-mono leading-relaxed">
                          <span className="text-gray-600 dark:text-gray-400">{inputPrompt}</span>
                          <span className="text-green-700 dark:text-green-300 font-medium">{generatedText}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Enter a prompt and click "Generate" to see results</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="baseline" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Baseline Generation</span>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => generateText(true)}
                          size="sm"
                          variant="outline"
                          disabled={!inputPrompt.trim() || isGenerating}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        {baselineText && (
                          <Button onClick={() => copyToClipboard(baselineText)} size="sm" variant="outline">
                            <Copy className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {baselineText ? (
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <div className="text-sm font-mono leading-relaxed">
                          <span className="text-gray-600 dark:text-gray-400">{inputPrompt}</span>
                          <span className="text-blue-700 dark:text-blue-300 font-medium">{baselineText}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Generate baseline text to compare with your fine-tuned model</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Generated Text</span>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => generateText(false)}
                      size="sm"
                      variant="outline"
                      disabled={!inputPrompt.trim() || isGenerating}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    {generatedText && (
                      <Button onClick={() => copyToClipboard(generatedText)} size="sm" variant="outline">
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center space-y-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Generating text...</div>
                    </div>
                  </div>
                ) : generatedText ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <div className="text-sm font-mono leading-relaxed">
                        <span className="text-gray-600 dark:text-gray-400">{inputPrompt}</span>
                        <span className="text-green-700 dark:text-green-300 font-medium">{generatedText}</span>
                      </div>
                    </div>

                    {/* Generation Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-3 text-center">
                          <div className="text-lg font-bold text-blue-600">{generatedText.split(" ").length}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Words</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-3 text-center">
                          <div className="text-lg font-bold text-green-600">{generatedText.length}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Characters</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-3 text-center">
                          <div className="text-lg font-bold text-purple-600">2.1s</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Generation Time</div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter a prompt and click "Generate" to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
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
