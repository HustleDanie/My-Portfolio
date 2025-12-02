"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import {
  Upload,
  Database,
  Eye,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  FileText,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DecoderTrainingConfig } from "@/app/projects/decoder-language-modeling/page"

interface DecoderDatasetSelectorProps {
  config: DecoderTrainingConfig
  updateConfig: (key: keyof DecoderTrainingConfig, value: any) => void
  onNext: () => void
  onPrev: () => void
}

// Preset datasets based on task
const DECODER_PRESET_DATASETS = {
  "text-completion": [
    {
      id: "webtext",
      name: "WebText Subset",
      description: "High-quality web text for general completion",
      size: "40K samples",
      format: "prompt, completion",
      avgLength: 256,
      difficulty: "Beginner",
    },
    {
      id: "wikitext-103",
      name: "WikiText-103",
      description: "Wikipedia articles for factual completion",
      size: "28K samples",
      format: "prompt, completion",
      avgLength: 512,
      difficulty: "Intermediate",
    },
  ],
  "creative-writing": [
    {
      id: "writingprompts",
      name: "WritingPrompts",
      description: "Reddit writing prompts and stories",
      size: "300K samples",
      format: "prompt, story",
      avgLength: 1024,
      difficulty: "Intermediate",
    },
    {
      id: "bookcorpus",
      name: "BookCorpus",
      description: "Fiction books for creative writing",
      size: "74K samples",
      format: "prompt, continuation",
      avgLength: 768,
      difficulty: "Advanced",
    },
  ],
  "headline-generation": [
    {
      id: "gigaword",
      name: "Gigaword",
      description: "News articles with headlines",
      size: "3.8M samples",
      format: "article, headline",
      avgLength: 128,
      difficulty: "Beginner",
    },
    {
      id: "newsroom",
      name: "Newsroom",
      description: "News summaries and headlines",
      size: "1.3M samples",
      format: "article, headline",
      avgLength: 96,
      difficulty: "Intermediate",
    },
  ],
  "dialogue-chatbot": [
    {
      id: "dailydialog",
      name: "DailyDialog",
      description: "Daily conversation dialogues",
      size: "13K samples",
      format: "context, response",
      avgLength: 64,
      difficulty: "Intermediate",
    },
    {
      id: "personachat",
      name: "PersonaChat",
      description: "Personality-based conversations",
      size: "164K samples",
      format: "persona, dialogue",
      avgLength: 128,
      difficulty: "Advanced",
    },
  ],
  summarization: [
    {
      id: "cnn-dailymail",
      name: "CNN/DailyMail",
      description: "News articles with summaries",
      size: "287K samples",
      format: "article, summary",
      avgLength: 512,
      difficulty: "Advanced",
    },
    {
      id: "xsum",
      name: "XSum",
      description: "BBC articles with single-sentence summaries",
      size: "204K samples",
      format: "article, summary",
      avgLength: 256,
      difficulty: "Intermediate",
    },
  ],
  "code-generation": [
    {
      id: "codesearchnet",
      name: "CodeSearchNet",
      description: "Code functions with documentation",
      size: "2M samples",
      format: "docstring, code",
      avgLength: 384,
      difficulty: "Expert",
    },
  ],
}

export function DecoderDatasetSelector({ config, updateConfig, onNext, onPrev }: DecoderDatasetSelectorProps) {
  const [selectedDataset, setSelectedDataset] = useState<any>(config.dataset || null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<any>(null)
  const [validationStatus, setValidationStatus] = useState<"idle" | "validating" | "valid" | "invalid">("idle")
  const [maxLength, setMaxLength] = useState(512)
  const [paddingStrategy, setPaddingStrategy] = useState("max_length")

  const taskDatasets = DECODER_PRESET_DATASETS[config.task as keyof typeof DECODER_PRESET_DATASETS] || []

  const handleDatasetSelect = (dataset: any) => {
    setSelectedDataset(dataset)
    setPreviewData(generateMockPreview(dataset))
    setValidationStatus("valid")
    updateConfig("dataset", { ...dataset, maxLength, paddingStrategy })
  }

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setUploadedFile(file)
        setValidationStatus("validating")

        // Simulate validation
        setTimeout(() => {
          const mockDataset = {
            id: "custom",
            name: file.name,
            description: "Custom uploaded dataset",
            size: `${Math.floor(Math.random() * 50 + 10)}K samples`,
            format: "Custom format",
            type: "uploaded",
            avgLength: Math.floor(Math.random() * 400 + 200),
          }
          setSelectedDataset(mockDataset)
          setPreviewData(generateMockPreview(mockDataset))
          setValidationStatus("valid")
          updateConfig("dataset", { ...mockDataset, maxLength, paddingStrategy })
        }, 2000)
      }
    },
    [updateConfig, maxLength, paddingStrategy],
  )

  const generateMockPreview = (dataset: any) => {
    const samples = []
    for (let i = 0; i < 5; i++) {
      if (config.task === "text-completion" || config.task === "creative-writing") {
        samples.push({
          prompt: `Sample prompt ${i + 1} for ${dataset.name}...`,
          completion: `Generated completion text that continues the prompt in a meaningful way...`,
        })
      } else if (config.task === "headline-generation") {
        samples.push({
          article: `Sample article text ${i + 1} about current events and news...`,
          headline: `Breaking: Sample Headline ${i + 1}`,
        })
      } else if (config.task === "dialogue-chatbot") {
        samples.push({
          context: `Previous conversation context ${i + 1}`,
          response: `Appropriate response ${i + 1} that continues the dialogue`,
        })
      } else if (config.task === "summarization") {
        samples.push({
          article: `Long article text ${i + 1} with multiple paragraphs and detailed information...`,
          summary: `Concise summary ${i + 1} of the main points`,
        })
      }
    }

    return {
      samples,
      stats: {
        totalSamples: Number.parseInt(dataset.size?.replace(/[^\d]/g, "") || "1000"),
        avgTokenLength: dataset.avgLength || Math.floor(Math.random() * 300 + 100),
        maxTokenLength: Math.floor((dataset.avgLength || 200) * 1.5),
        minTokenLength: Math.floor((dataset.avgLength || 200) * 0.3),
        lengthDistribution: [
          { range: "0-100", count: 15, percentage: 15 },
          { range: "100-300", count: 45, percentage: 45 },
          { range: "300-500", count: 30, percentage: 30 },
          { range: "500+", count: 10, percentage: 10 },
        ],
      },
    }
  }

  const getRequiredFields = () => {
    switch (config.task) {
      case "text-completion":
      case "creative-writing":
        return ["prompt", "completion"]
      case "headline-generation":
        return ["article", "headline"]
      case "dialogue-chatbot":
        return ["context", "response"]
      case "summarization":
        return ["article", "summary"]
      case "code-generation":
        return ["docstring", "code"]
      default:
        return ["input_text", "target_text"]
    }
  }

  return (
    <div className="space-y-8">
      <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-purple-900 dark:text-purple-100">
            🟣 STEP 2: Dataset Setup
          </CardTitle>
          <CardDescription className="text-purple-700 dark:text-purple-300 font-space-mono">
            Select a preset dataset or upload your own data for the <strong>{config.task}</strong> task. Required
            fields: {getRequiredFields().join(", ")}
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="preset" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preset" className="gap-2">
            <Database className="h-4 w-4" />
            Preset Datasets
          </TabsTrigger>
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Custom
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preset" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {taskDatasets.map((dataset, index) => (
              <motion.div
                key={dataset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 h-full ${
                    selectedDataset?.id === dataset.id
                      ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/20"
                      : "hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-600"
                  }`}
                  onClick={() => handleDatasetSelect(dataset)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-purple-600" />
                        <Badge variant="outline">{dataset.difficulty}</Badge>
                      </div>
                      {selectedDataset?.id === dataset.id && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                    <CardTitle className="font-orbitron text-lg">{dataset.name}</CardTitle>
                    <CardDescription>{dataset.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Size:</span>
                        <span className="ml-2 font-space-mono">{dataset.size}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Avg Length:</span>
                        <span className="ml-2 font-space-mono">{dataset.avgLength}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Format:</span>
                      <div className="mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {dataset.format}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Custom Dataset
              </CardTitle>
              <CardDescription>
                Upload a CSV, JSON, or TXT file with your custom dataset. We'll validate the format automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".csv,.json,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">CSV, JSON, or TXT files up to 100MB</p>
                </label>
              </div>

              {/* Required Format Info */}
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Required Format</h4>
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="mb-2">Your file should contain these fields:</p>
                    <ul className="space-y-1">
                      {getRequiredFields().map((field, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                          <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">{field}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {validationStatus === "validating" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                    <span className="text-sm">Validating dataset format...</span>
                  </div>
                  <Progress value={60} />
                </div>
              )}

              {validationStatus === "valid" && uploadedFile && (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-200">
                      Dataset validated successfully!
                    </span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    File: {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tokenizer Configuration */}
      {selectedDataset && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Tokenizer Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">Max Sequence Length</Label>
                <Slider
                  value={[maxLength]}
                  onValueChange={(value) => {
                    setMaxLength(value[0])
                    if (selectedDataset) {
                      updateConfig("dataset", { ...selectedDataset, maxLength: value[0], paddingStrategy })
                    }
                  }}
                  min={128}
                  max={2048}
                  step={64}
                  className="mt-2"
                />
                <div className="text-xs text-gray-500 mt-1">{maxLength} tokens</div>
              </div>

              <div>
                <Label className="text-sm font-medium">Padding Strategy</Label>
                <Select
                  value={paddingStrategy}
                  onValueChange={(value) => {
                    setPaddingStrategy(value)
                    if (selectedDataset) {
                      updateConfig("dataset", { ...selectedDataset, maxLength, paddingStrategy: value })
                    }
                  }}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="max_length">Pad to Max Length</SelectItem>
                    <SelectItem value="longest">Pad to Longest in Batch</SelectItem>
                    <SelectItem value="do_not_pad">No Padding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Warning for sequence length */}
            {previewData && previewData.stats.maxTokenLength > maxLength && (
              <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Warning:</strong> Some sequences ({previewData.stats.maxTokenLength} tokens) exceed your
                      max length ({maxLength}). They will be truncated during training.
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dataset Preview */}
      {previewData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Dataset Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sample Data */}
            <div>
              <h4 className="font-space-mono text-sm font-semibold mb-3">Sample Data</h4>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
                {previewData.samples.slice(0, 3).map((sample: any, i: number) => (
                  <div
                    key={i}
                    className="text-sm font-mono border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0"
                  >
                    {Object.entries(sample).map(([key, value]) => (
                      <div key={key} className="mb-2">
                        <span className="text-gray-600 dark:text-gray-400 font-semibold">{key}: </span>
                        <span className="text-gray-800 dark:text-gray-200">{value as string}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {previewData.stats.totalSamples.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Samples</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{previewData.stats.avgTokenLength}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Length</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{previewData.stats.maxTokenLength}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Max Length</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{previewData.stats.minTokenLength}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Min Length</div>
                </CardContent>
              </Card>
            </div>

            {/* Length Distribution */}
            <div>
              <h4 className="font-space-mono text-sm font-semibold mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Sequence Length Distribution
              </h4>
              <div className="space-y-2">
                {previewData.stats.lengthDistribution.map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <Badge variant="outline" className="min-w-[80px] justify-center">
                      {item.range}
                    </Badge>
                    <div className="flex-1">
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[60px]">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Task Selection
        </Button>

        {selectedDataset && (
          <Button onClick={onNext} className="gap-2">
            Continue to Model Configuration
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
