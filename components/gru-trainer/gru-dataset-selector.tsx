"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Upload, Database, Eye, Settings, CheckCircle, AlertTriangle, BarChart3 } from "lucide-react"

interface Dataset {
  id: string
  name: string
  description: string
  size: string
  samples: number
  features: string[]
  taskTypes: string[]
  format: string
  preview: any[]
}

const presetDatasets: Record<string, Dataset[]> = {
  "text-classification": [
    {
      id: "imdb",
      name: "IMDb Movie Reviews",
      description: "Binary sentiment classification of movie reviews",
      size: "25,000 reviews",
      samples: 25000,
      features: ["text", "label"],
      taskTypes: ["Binary Classification"],
      format: "CSV",
      preview: [
        { text: "This movie was absolutely fantastic! Great acting and plot.", label: "positive" },
        { text: "Boring and predictable. Waste of time.", label: "negative" },
        { text: "Amazing cinematography and stellar performances.", label: "positive" },
      ],
    },
    {
      id: "ag-news",
      name: "AG News Classification",
      description: "News article categorization into 4 topics",
      size: "120,000 articles",
      samples: 120000,
      features: ["text", "category"],
      taskTypes: ["Multi-class Classification"],
      format: "CSV",
      preview: [
        { text: "Wall Street stocks rallied on positive earnings reports...", category: "Business" },
        { text: "The championship game will be held next Sunday...", category: "Sports" },
        { text: "New breakthrough in quantum computing announced...", category: "Technology" },
      ],
    },
  ],
  "sequence-labeling": [
    {
      id: "conll2003",
      name: "CoNLL-2003 NER",
      description: "Named Entity Recognition dataset",
      size: "20,000 sentences",
      samples: 20000,
      features: ["tokens", "labels"],
      taskTypes: ["Token Classification"],
      format: "CoNLL",
      preview: [
        { tokens: ["John", "works", "at", "Google"], labels: ["B-PER", "O", "O", "B-ORG"] },
        {
          tokens: ["Apple", "Inc.", "is", "based", "in", "California"],
          labels: ["B-ORG", "I-ORG", "O", "O", "O", "B-LOC"],
        },
      ],
    },
  ],
  "text-generation": [
    {
      id: "shakespeare",
      name: "Shakespeare Corpus",
      description: "Complete works of William Shakespeare",
      size: "1.1M characters",
      samples: 40000,
      features: ["text"],
      taskTypes: ["Text Generation"],
      format: "TXT",
      preview: [
        { text: "To be or not to be, that is the question:" },
        { text: "All the world's a stage, and all the men and women merely players" },
        { text: "Romeo, Romeo, wherefore art thou Romeo?" },
      ],
    },
  ],
  "time-series": [
    {
      id: "stock-prices",
      name: "Stock Price Data",
      description: "Historical stock prices with technical indicators",
      size: "50,000 records",
      samples: 50000,
      features: ["timestamp", "open", "high", "low", "close", "volume"],
      taskTypes: ["Regression", "Forecasting"],
      format: "CSV",
      preview: [
        { timestamp: "2023-01-01", open: 150.2, high: 152.1, low: 149.8, close: 151.5, volume: 1000000 },
        { timestamp: "2023-01-02", open: 151.5, high: 153.2, low: 150.9, close: 152.8, volume: 1200000 },
      ],
    },
  ],
}

interface GruDatasetSelectorProps {
  taskId: string
  onDatasetSelect: (dataset: Dataset, config: any) => void
  selectedDataset?: Dataset
}

export default function GruDatasetSelector({ taskId, onDatasetSelect, selectedDataset }: GruDatasetSelectorProps) {
  const [activeTab, setActiveTab] = useState("preset")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [validationStatus, setValidationStatus] = useState<"idle" | "validating" | "valid" | "invalid">("idle")
  const [preprocessConfig, setPreprocessConfig] = useState({
    maxLength: 512,
    padding: true,
    truncation: true,
    testSplit: 0.2,
    validationSplit: 0.1,
  })

  const availableDatasets = presetDatasets[taskId] || []

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setValidationStatus("validating")

      // Simulate validation
      setTimeout(() => {
        setValidationStatus(Math.random() > 0.3 ? "valid" : "invalid")
      }, 2000)
    }
  }, [])

  const handleDatasetSelect = (dataset: Dataset) => {
    onDatasetSelect(dataset, preprocessConfig)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Step 2: Select & Preprocess Dataset</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose a dataset for your GRU model. We'll handle preprocessing including tokenization, padding, and sequence
          windowing optimized for GRU networks.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preset" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>Preset Datasets</span>
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Upload Custom</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preset" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableDatasets.map((dataset) => (
              <Card
                key={dataset.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedDataset?.id === dataset.id ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}
                onClick={() => handleDatasetSelect(dataset)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{dataset.name}</CardTitle>
                    {selectedDataset?.id === dataset.id && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                  <CardDescription>{dataset.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Size:</span> {dataset.size}
                    </div>
                    <div>
                      <span className="font-semibold">Format:</span> {dataset.format}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {dataset.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Sample Data</h4>
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-xs font-mono">
                      {JSON.stringify(dataset.preview[0], null, 2)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Custom Dataset</CardTitle>
              <CardDescription>
                Upload your own dataset in CSV, JSON, or TXT format. We'll validate and preprocess it for GRU training.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-semibold">Drop your file here or click to browse</p>
                  <p className="text-sm text-muted-foreground">Supports CSV, JSON, TXT files up to 100MB</p>
                </div>
                <input
                  type="file"
                  accept=".csv,.json,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button onClick={() => document.getElementById("file-upload")?.click()} className="mt-4">
                  Choose File
                </Button>
              </div>

              {uploadedFile && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {validationStatus === "validating" && (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                            <span className="text-sm">Validating...</span>
                          </>
                        )}
                        {validationStatus === "valid" && (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">Valid</span>
                          </>
                        )}
                        {validationStatus === "invalid" && (
                          <>
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-red-600">Invalid format</span>
                          </>
                        )}
                      </div>
                    </div>

                    {validationStatus === "validating" && <Progress value={65} className="w-full" />}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedDataset && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Preprocessing Configuration</span>
            </CardTitle>
            <CardDescription>Configure how your data will be preprocessed for GRU training</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Max Sequence Length</label>
                <input
                  type="number"
                  value={preprocessConfig.maxLength}
                  onChange={(e) =>
                    setPreprocessConfig((prev) => ({ ...prev, maxLength: Number.parseInt(e.target.value) }))
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  min="1"
                  max="2048"
                />
                <p className="text-xs text-muted-foreground mt-1">Sequences longer than this will be truncated</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Test Split</label>
                <input
                  type="number"
                  value={preprocessConfig.testSplit}
                  onChange={(e) =>
                    setPreprocessConfig((prev) => ({ ...prev, testSplit: Number.parseFloat(e.target.value) }))
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  min="0.1"
                  max="0.5"
                  step="0.05"
                />
                <p className="text-xs text-muted-foreground mt-1">Fraction of data for testing</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Validation Split</label>
                <input
                  type="number"
                  value={preprocessConfig.validationSplit}
                  onChange={(e) =>
                    setPreprocessConfig((prev) => ({ ...prev, validationSplit: Number.parseFloat(e.target.value) }))
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  min="0.05"
                  max="0.3"
                  step="0.05"
                />
                <p className="text-xs text-muted-foreground mt-1">Fraction of training data for validation</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="padding"
                    checked={preprocessConfig.padding}
                    onChange={(e) => setPreprocessConfig((prev) => ({ ...prev, padding: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="padding" className="text-sm font-medium">
                    Enable Padding
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="truncation"
                    checked={preprocessConfig.truncation}
                    onChange={(e) => setPreprocessConfig((prev) => ({ ...prev, truncation: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="truncation" className="text-sm font-medium">
                    Enable Truncation
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Data Preview
                </h4>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="space-y-2 text-sm font-mono">
                    {selectedDataset.preview.slice(0, 3).map((sample, idx) => (
                      <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                        {JSON.stringify(sample, null, 2)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dataset Statistics
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Samples:</span>
                    <span className="font-semibold">{selectedDataset.samples.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Training:</span>
                    <span className="font-semibold">
                      {Math.floor(
                        selectedDataset.samples * (1 - preprocessConfig.testSplit - preprocessConfig.validationSplit),
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Validation:</span>
                    <span className="font-semibold">
                      {Math.floor(selectedDataset.samples * preprocessConfig.validationSplit).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Test:</span>
                    <span className="font-semibold">
                      {Math.floor(selectedDataset.samples * preprocessConfig.testSplit).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h3 className="font-semibold mb-2">GRU Data Processing Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• GRUs work well with sequences of moderate length (50-500 tokens)</li>
          <li>• Padding helps batch processing but may affect performance on very short sequences</li>
          <li>• For time series, consider using sliding windows to create training sequences</li>
          <li>• GRUs are more memory efficient than LSTMs, allowing for larger batch sizes</li>
        </ul>
      </div>
    </div>
  )
}

export { GruDatasetSelector }
