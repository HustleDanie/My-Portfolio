"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Upload, Database, Eye, BarChart3, ArrowRight, ArrowLeft, CheckCircle, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import type { TrainingConfig } from "@/app/projects/encoder-training-dynamics/page"

interface DatasetSelectorProps {
  config: TrainingConfig
  updateConfig: (key: keyof TrainingConfig, value: any) => void
  onNext: () => void
  onPrev: () => void
}

// Preset datasets based on task
const PRESET_DATASETS = {
  "text-classification": [
    {
      id: "ag-news",
      name: "AG News",
      description: "News categorization into 4 classes",
      size: "120K samples",
      classes: ["World", "Sports", "Business", "Technology"],
      format: "text, label",
      difficulty: "Beginner",
    },
    {
      id: "dbpedia",
      name: "DBpedia",
      description: "Wikipedia article classification",
      size: "560K samples",
      classes: ["Company", "School", "Artist", "Athlete", "..."],
      format: "text, label",
      difficulty: "Intermediate",
    },
    {
      id: "imdb",
      name: "IMDb Reviews",
      description: "Movie review sentiment",
      size: "50K samples",
      classes: ["Positive", "Negative"],
      format: "text, label",
      difficulty: "Beginner",
    },
  ],
  "sentiment-analysis": [
    {
      id: "sst2",
      name: "SST-2",
      description: "Stanford Sentiment Treebank",
      size: "67K samples",
      classes: ["Positive", "Negative"],
      format: "sentence, label",
      difficulty: "Beginner",
    },
    {
      id: "yelp",
      name: "Yelp Reviews",
      description: "Restaurant review sentiment",
      size: "650K samples",
      classes: ["1-5 stars"],
      format: "text, stars",
      difficulty: "Intermediate",
    },
  ],
  "named-entity-recognition": [
    {
      id: "conll2003",
      name: "CoNLL-2003",
      description: "Named entity recognition",
      size: "20K samples",
      classes: ["PER", "LOC", "ORG", "MISC"],
      format: "tokens, labels",
      difficulty: "Advanced",
    },
  ],
  "question-answering": [
    {
      id: "squad",
      name: "SQuAD 1.1",
      description: "Reading comprehension",
      size: "100K samples",
      classes: ["Answer spans"],
      format: "context, question, answer",
      difficulty: "Advanced",
    },
  ],
}

export function DatasetSelector({ config, updateConfig, onNext, onPrev }: DatasetSelectorProps) {
  const [selectedDataset, setSelectedDataset] = useState<any>(config.dataset || null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<any>(null)
  const [validationStatus, setValidationStatus] = useState<"idle" | "validating" | "valid" | "invalid">("idle")

  const taskDatasets = PRESET_DATASETS[config.task as keyof typeof PRESET_DATASETS] || []

  const handleDatasetSelect = (dataset: any) => {
    setSelectedDataset(dataset)
    setPreviewData(generateMockPreview(dataset))
    setValidationStatus("valid")
    updateConfig("dataset", dataset)
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
          }
          setSelectedDataset(mockDataset)
          setPreviewData(generateMockPreview(mockDataset))
          setValidationStatus("valid")
          updateConfig("dataset", mockDataset)
        }, 2000)
      }
    },
    [updateConfig],
  )

  const generateMockPreview = (dataset: any) => {
    // Generate mock preview data based on task type
    const samples = []
    for (let i = 0; i < 5; i++) {
      if (config.task === "text-classification" || config.task === "sentiment-analysis") {
        samples.push({
          text: `Sample text ${i + 1} for ${dataset.name}...`,
          label: dataset.classes?.[i % dataset.classes.length] || "Label",
        })
      } else if (config.task === "named-entity-recognition") {
        samples.push({
          tokens: ["John", "works", "at", "Google", "in", "California"],
          labels: ["B-PER", "O", "O", "B-ORG", "O", "B-LOC"],
        })
      }
    }

    return {
      samples,
      stats: {
        totalSamples: Number.parseInt(dataset.size?.replace(/[^\d]/g, "") || "1000"),
        avgTokenLength: Math.floor(Math.random() * 50 + 20),
        classBalance:
          dataset.classes?.map((cls) => ({
            class: cls,
            count: Math.floor(Math.random() * 1000 + 100),
            percentage: Math.floor(Math.random() * 30 + 10),
          })) || [],
      },
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
            Select a preset dataset or upload your own data for the <strong>{config.task}</strong> task.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Size:</span>
                      <span className="font-space-mono">{dataset.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Format:</span>
                      <span className="font-space-mono">{dataset.format}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Classes:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {dataset.classes.slice(0, 3).map((cls) => (
                          <Badge key={cls} variant="secondary" className="text-xs">
                            {cls}
                          </Badge>
                        ))}
                        {dataset.classes.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{dataset.classes.length - 3}
                          </Badge>
                        )}
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
                Upload a CSV or JSON file with your custom dataset. We'll validate the format automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">CSV or JSON files up to 100MB</p>
                </label>
              </div>

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
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2">
                {previewData.samples.slice(0, 3).map((sample: any, i: number) => (
                  <div key={i} className="text-sm font-mono">
                    {config.task === "named-entity-recognition" ? (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Tokens: </span>
                        {sample.tokens.join(" ")}
                        <br />
                        <span className="text-gray-600 dark:text-gray-400">Labels: </span>
                        {sample.labels.join(" ")}
                      </div>
                    ) : (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Text: </span>
                        {sample.text}
                        <br />
                        <span className="text-gray-600 dark:text-gray-400">Label: </span>
                        <Badge variant="outline" className="text-xs">
                          {sample.label}
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Token Length</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{previewData.stats.classBalance.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Classes</div>
                </CardContent>
              </Card>
            </div>

            {/* Class Balance */}
            {previewData.stats.classBalance.length > 0 && (
              <div>
                <h4 className="font-space-mono text-sm font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Class Distribution
                </h4>
                <div className="space-y-2">
                  {previewData.stats.classBalance.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <Badge variant="outline" className="min-w-[80px] justify-center">
                        {item.class}
                      </Badge>
                      <div className="flex-1">
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[60px]">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
