"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Upload, Database, FileText, AlertTriangle, CheckCircle, BarChart3, Eye, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

interface Dataset {
  id: string
  name: string
  description: string
  size: string
  domain: string
  languages?: string[]
  examples: {
    input: string
    output: string
  }[]
  recommended: boolean
}

const datasetsByTask: Record<string, Dataset[]> = {
  summarization: [
    {
      id: "cnn_dailymail",
      name: "CNN/DailyMail",
      description: "News article summarization dataset with highlights",
      size: "287K articles",
      domain: "News",
      examples: [
        {
          input: "London (CNN) -- The Queen will visit Ireland next month, Buckingham Palace announced Monday...",
          output: "Queen to visit Ireland next month for first time since 1911",
        },
      ],
      recommended: true,
    },
    {
      id: "xsum",
      name: "XSum",
      description: "Abstractive summarization of BBC articles",
      size: "227K articles",
      domain: "News",
      examples: [
        {
          input: "The BBC has announced that it will be launching a new streaming service...",
          output: "BBC launches new streaming platform",
        },
      ],
      recommended: true,
    },
    {
      id: "samsum",
      name: "SAMSum",
      description: "Dialogue summarization dataset",
      size: "16K dialogues",
      domain: "Conversations",
      examples: [
        {
          input:
            "Amanda: I baked cookies. Do you want some? Jerry: Amanda: I'll bring you tomorrow. Jerry: Sounds good!",
          output: "Amanda baked cookies and will bring some to Jerry tomorrow.",
        },
      ],
      recommended: false,
    },
  ],
  translation: [
    {
      id: "wmt14_ende",
      name: "WMT14 (EN-DE)",
      description: "English to German translation dataset",
      size: "4.5M pairs",
      domain: "General",
      languages: ["English", "German"],
      examples: [
        {
          input: "The weather is beautiful today.",
          output: "Das Wetter ist heute schön.",
        },
      ],
      recommended: true,
    },
    {
      id: "tatoeba",
      name: "Tatoeba",
      description: "Multilingual sentence pairs",
      size: "100K+ pairs",
      domain: "General",
      languages: ["Multiple"],
      examples: [
        {
          input: "Hello, how are you?",
          output: "Hola, ¿cómo estás?",
        },
      ],
      recommended: true,
    },
  ],
  paraphrase: [
    {
      id: "paws",
      name: "PAWS",
      description: "Paraphrase Adversaries from Word Scrambling",
      size: "108K pairs",
      domain: "General",
      examples: [
        {
          input: "The cat sat on the mat.",
          output: "On the mat, the cat was sitting.",
        },
      ],
      recommended: true,
    },
  ],
  question_generation: [
    {
      id: "squad_qg",
      name: "SQuAD-to-QG",
      description: "Question generation from SQuAD contexts",
      size: "87K examples",
      domain: "General Knowledge",
      examples: [
        {
          input: "Paris is the capital of France.",
          output: "What is the capital of France?",
        },
      ],
      recommended: true,
    },
  ],
  grammar_correction: [
    {
      id: "jfleg",
      name: "JFLEG",
      description: "JHU FLuency-Extended GUG corpus",
      size: "1.5K sentences",
      domain: "Academic Writing",
      examples: [
        {
          input: "I are going to the store.",
          output: "I am going to the store.",
        },
      ],
      recommended: true,
    },
  ],
  headline_generation: [
    {
      id: "gigaword",
      name: "Gigaword",
      description: "Headline generation from first sentence",
      size: "3.8M pairs",
      domain: "News",
      examples: [
        {
          input: "Scientists at MIT have developed a new artificial intelligence system...",
          output: "MIT Develops New AI System",
        },
      ],
      recommended: true,
    },
  ],
  style_transfer: [
    {
      id: "gyafc",
      name: "GYAFC",
      description: "Grammarly's Yahoo Answers Formality Corpus",
      size: "110K pairs",
      domain: "Social Media",
      examples: [
        {
          input: "hey whats up",
          output: "Hello, how are you doing?",
        },
      ],
      recommended: true,
    },
  ],
}

interface Seq2SeqDatasetSelectorProps {
  onComplete: (data: { dataset: string; preprocessing: any }) => void
  selectedTask: string
}

export function Seq2SeqDatasetSelector({ onComplete, selectedTask }: Seq2SeqDatasetSelectorProps) {
  const [selectedDataset, setSelectedDataset] = useState<string>("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [dataPreview, setDataPreview] = useState<any[]>([])
  const [validationResults, setValidationResults] = useState<any>(null)
  const [preprocessing, setPreprocessing] = useState({
    maxInputLength: 512,
    maxTargetLength: 128,
    paddingStrategy: "max_length",
    truncationStrategy: "longest_first",
  })

  const currentDatasets = datasetsByTask[selectedTask] || []

  const handleDatasetSelect = (datasetId: string) => {
    setSelectedDataset(datasetId)
    setUploadedFile(null)

    // Simulate data loading
    const dataset = currentDatasets.find((d) => d.id === datasetId)
    if (dataset) {
      setDataPreview(dataset.examples)
      setValidationResults({
        totalSamples: Number.parseInt(dataset.size.replace(/[^\d]/g, "")),
        avgInputLength: 45,
        avgTargetLength: 12,
        validSamples: 100,
        issues: [],
      })
    }

    onComplete({ dataset: datasetId, preprocessing })
  }

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setUploadedFile(file)
        setSelectedDataset("")

        // Simulate file validation
        setTimeout(() => {
          setDataPreview([
            {
              input: "Sample input text from your uploaded file...",
              output: "Sample target text from your uploaded file...",
            },
          ])
          setValidationResults({
            totalSamples: 1000,
            avgInputLength: 52,
            avgTargetLength: 15,
            validSamples: 98,
            issues: ["2% of samples have empty target text"],
          })
        }, 1000)

        onComplete({ dataset: "custom", preprocessing })
      }
    },
    [preprocessing, onComplete],
  )

  const updatePreprocessing = (key: string, value: any) => {
    const newPreprocessing = { ...preprocessing, [key]: value }
    setPreprocessing(newPreprocessing)
    onComplete({ dataset: selectedDataset || "custom", preprocessing: newPreprocessing })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Select & Preprocess Dataset</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Choose a preset dataset or upload your own data. We'll validate and preprocess it for training.
        </p>
      </div>

      <Tabs defaultValue="preset" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preset" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Preset Datasets
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Custom
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preset" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDatasets.map((dataset) => (
              <motion.div key={dataset.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedDataset === dataset.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                  } ${dataset.recommended ? "border-green-200 dark:border-green-800" : ""}`}
                  onClick={() => handleDatasetSelect(dataset.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {dataset.name}
                          {dataset.recommended && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              Recommended
                            </Badge>
                          )}
                        </CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{dataset.description}</p>
                      </div>
                      {selectedDataset === dataset.id && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{dataset.size}</Badge>
                      <Badge variant="outline">{dataset.domain}</Badge>
                      {dataset.languages && <Badge variant="outline">{dataset.languages.join(", ")}</Badge>}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white">Sample:</h4>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 space-y-2">
                        <div>
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Input:</span>
                          <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                            {dataset.examples[0].input}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Target:</span>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{dataset.examples[0].output}</p>
                        </div>
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
                <Upload className="w-5 h-5" />
                Upload Custom Dataset
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-slate-900 dark:text-white">Upload your dataset</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Supports CSV, JSON, or TXT files with input_text and target_text columns
                  </p>
                </div>
                <Input
                  type="file"
                  accept=".csv,.json,.txt"
                  onChange={handleFileUpload}
                  className="mt-4 max-w-xs mx-auto"
                />
              </div>

              {uploadedFile && (
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    Uploaded: <strong>{uploadedFile.name}</strong> ({(uploadedFile.size / 1024).toFixed(1)} KB)
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Data Preview & Validation */}
      {(selectedDataset || uploadedFile) && validationResults && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Data Preview & Validation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {validationResults.totalSamples.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Samples</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{validationResults.avgInputLength}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Avg Input Length</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{validationResults.avgTargetLength}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Avg Target Length</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{validationResults.validSamples}%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Valid Samples</div>
                </div>
              </div>

              {/* Issues */}
              {validationResults.issues.length > 0 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Data Issues Found:</strong>
                    <ul className="mt-2 list-disc list-inside">
                      {validationResults.issues.map((issue: string, index: number) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Sample Preview */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-slate-900 dark:text-white">Sample Data</h4>
                {dataPreview.slice(0, 3).map((sample, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-3">
                    <div>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Input:</span>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{sample.input}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Target:</span>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{sample.output}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preprocessing Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Preprocessing Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Max Input Length</Label>
                    <div className="mt-2">
                      <Slider
                        value={[preprocessing.maxInputLength]}
                        onValueChange={(value) => updatePreprocessing("maxInputLength", value[0])}
                        max={1024}
                        min={128}
                        step={64}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>128</span>
                        <span>{preprocessing.maxInputLength}</span>
                        <span>1024</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Max Target Length</Label>
                    <div className="mt-2">
                      <Slider
                        value={[preprocessing.maxTargetLength]}
                        onValueChange={(value) => updatePreprocessing("maxTargetLength", value[0])}
                        max={512}
                        min={32}
                        step={16}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>32</span>
                        <span>{preprocessing.maxTargetLength}</span>
                        <span>512</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Dynamic Padding</Label>
                    <Switch
                      checked={preprocessing.paddingStrategy === "longest"}
                      onCheckedChange={(checked) =>
                        updatePreprocessing("paddingStrategy", checked ? "longest" : "max_length")
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Truncate Long Sequences</Label>
                    <Switch
                      checked={preprocessing.truncationStrategy === "longest_first"}
                      onCheckedChange={(checked) =>
                        updatePreprocessing("truncationStrategy", checked ? "longest_first" : "only_first")
                      }
                    />
                  </div>
                </div>
              </div>

              <Alert>
                <BarChart3 className="h-4 w-4" />
                <AlertDescription>
                  <strong>Preprocessing Summary:</strong> Input sequences will be limited to{" "}
                  {preprocessing.maxInputLength} tokens, target sequences to {preprocessing.maxTargetLength} tokens.
                  {preprocessing.paddingStrategy === "longest" ? "Dynamic padding" : "Fixed padding"} will be used.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
