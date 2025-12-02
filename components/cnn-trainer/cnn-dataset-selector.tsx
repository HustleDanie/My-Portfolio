"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Database, Upload, ImageIcon, BarChart3, Settings, Info } from "lucide-react"

interface DatasetSelectorProps {
  trainingState: any
  updateTrainingState: (updates: any) => void
  onNext: () => void
  onPrevious: () => void
  currentStep: number
  totalSteps: number
}

const presetDatasets = {
  classification: [
    {
      id: "mnist",
      name: "MNIST",
      description: "Handwritten digits (0-9) - Perfect for beginners",
      size: "60K training + 10K test",
      classes: 10,
      imageSize: "28x28",
      difficulty: "Beginner",
      samples: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      downloadSize: "11 MB",
      popular: true,
    },
    {
      id: "cifar10",
      name: "CIFAR-10",
      description: "Natural images in 10 categories",
      size: "50K training + 10K test",
      classes: 10,
      imageSize: "32x32",
      difficulty: "Intermediate",
      samples: ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"],
      downloadSize: "163 MB",
      popular: true,
    },
    {
      id: "fashion-mnist",
      name: "Fashion-MNIST",
      description: "Fashion items - More challenging than MNIST",
      size: "60K training + 10K test",
      classes: 10,
      imageSize: "28x28",
      difficulty: "Beginner",
      samples: ["T-shirt", "Trouser", "Pullover", "Dress", "Coat", "Sandal", "Shirt", "Sneaker", "Bag", "Boot"],
      downloadSize: "25 MB",
    },
    {
      id: "oxford-pets",
      name: "Oxford Pets",
      description: "37 pet breeds with detailed annotations",
      size: "7K images",
      classes: 37,
      imageSize: "Variable",
      difficulty: "Intermediate",
      samples: ["Abyssinian", "Bengal", "Birman", "Bombay", "British Shorthair", "Egyptian Mau"],
      downloadSize: "773 MB",
    },
    {
      id: "food101",
      name: "Food-101",
      description: "101 food categories with 1000 images each",
      size: "101K images",
      classes: 101,
      imageSize: "Variable",
      difficulty: "Advanced",
      samples: ["Apple pie", "Baby back ribs", "Baklava", "Beef carpaccio", "Beef tartare", "Beet salad"],
      downloadSize: "5.3 GB",
    },
  ],
  detection: [
    {
      id: "pascal-voc",
      name: "Pascal VOC",
      description: "Object detection with 20 classes",
      size: "16K images",
      classes: 20,
      imageSize: "Variable",
      difficulty: "Intermediate",
      samples: ["person", "bicycle", "car", "motorcycle", "airplane", "bus"],
      downloadSize: "2.8 GB",
      popular: true,
    },
    {
      id: "coco-subset",
      name: "COCO (Subset)",
      description: "Common objects in context - 80 classes",
      size: "5K images (subset)",
      classes: 80,
      imageSize: "Variable",
      difficulty: "Advanced",
      samples: ["person", "bicycle", "car", "motorcycle", "airplane", "bus"],
      downloadSize: "1.2 GB",
    },
  ],
  segmentation: [
    {
      id: "cityscapes",
      name: "Cityscapes",
      description: "Urban street scenes with pixel-level annotations",
      size: "5K images",
      classes: 19,
      imageSize: "2048x1024",
      difficulty: "Advanced",
      samples: ["road", "sidewalk", "building", "wall", "fence", "pole"],
      downloadSize: "11.8 GB",
    },
    {
      id: "ade20k",
      name: "ADE20K",
      description: "Scene parsing with 150 object categories",
      size: "25K images",
      classes: 150,
      imageSize: "Variable",
      difficulty: "Advanced",
      samples: ["wall", "building", "sky", "floor", "tree", "ceiling"],
      downloadSize: "3.8 GB",
    },
  ],
  "super-resolution": [
    {
      id: "div2k",
      name: "DIV2K",
      description: "High-quality images for super-resolution",
      size: "1K images",
      classes: 1,
      imageSize: "2K resolution",
      difficulty: "Intermediate",
      samples: ["High-res natural images"],
      downloadSize: "7.1 GB",
      popular: true,
    },
  ],
  "emotion-recognition": [
    {
      id: "fer2013",
      name: "FER-2013",
      description: "Facial expressions in 7 emotion categories",
      size: "35K images",
      classes: 7,
      imageSize: "48x48",
      difficulty: "Intermediate",
      samples: ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"],
      downloadSize: "96 MB",
      popular: true,
    },
  ],
}

export function CNNDatasetSelector({ trainingState, updateTrainingState, onNext, onPrevious }: DatasetSelectorProps) {
  const [selectedDataset, setSelectedDataset] = useState(trainingState.selectedDataset || "")
  const [activeTab, setActiveTab] = useState("preset")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [datasetAnalysis, setDatasetAnalysis] = useState<any>(null)

  const selectedTask = trainingState.selectedTask || "classification"
  const availableDatasets = presetDatasets[selectedTask as keyof typeof presetDatasets] || []

  const handleDatasetSelect = (datasetId: string) => {
    setSelectedDataset(datasetId)
    updateTrainingState({ selectedDataset: datasetId })

    // Simulate dataset analysis
    const dataset = availableDatasets.find((d) => d.id === datasetId)
    if (dataset) {
      setDatasetAnalysis({
        totalImages: Number.parseInt(dataset.size.split(" ")[0].replace("K", "000")),
        classes: dataset.classes,
        avgImageSize: dataset.imageSize,
        distribution: generateMockDistribution(dataset.classes),
      })
    }
  }

  const generateMockDistribution = (numClasses: number) => {
    return Array.from({ length: numClasses }, (_, i) => ({
      class: `Class ${i + 1}`,
      count: Math.floor(Math.random() * 1000) + 500,
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setIsUploading(true)
      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setSelectedDataset("custom-upload")
          updateTrainingState({ selectedDataset: "custom-upload" })
        }
      }, 200)
    }
  }

  const selectedDatasetData = availableDatasets.find((d) => d.id === selectedDataset)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-full">
          <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <span className="font-space-mono text-sm text-purple-600 dark:text-purple-400">
            Dataset Selection & Preprocessing
          </span>
        </div>
        <h2 className="text-3xl font-bold font-orbitron text-gray-900 dark:text-white">Choose Your Dataset</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Select a dataset for your{" "}
          <span className="font-semibold text-purple-600 dark:text-purple-400">{selectedTask.replace("-", " ")}</span>{" "}
          task. We'll help you understand the data and prepare it for training.
        </p>
      </div>

      {/* Dataset Selection Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preset" className="font-space-mono">
            <Database className="w-4 h-4 mr-2" />
            Preset Datasets
          </TabsTrigger>
          <TabsTrigger value="upload" className="font-space-mono">
            <Upload className="w-4 h-4 mr-2" />
            Upload Custom
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preset" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableDatasets.map((dataset) => (
              <Card
                key={dataset.id}
                className={`
                  cursor-pointer transition-all duration-300 hover:shadow-lg
                  ${
                    selectedDataset === dataset.id
                      ? "ring-2 ring-purple-500 shadow-lg bg-purple-50 dark:bg-purple-900/20"
                      : "hover:shadow-md"
                  }
                `}
                onClick={() => handleDatasetSelect(dataset.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-orbitron flex items-center space-x-2">
                      <span>{dataset.name}</span>
                      {dataset.popular && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </CardTitle>
                    <Badge
                      className={`
                      text-xs font-space-mono
                      ${
                        dataset.difficulty === "Beginner"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : dataset.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }
                    `}
                    >
                      {dataset.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">{dataset.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Size:</span>
                      <p className="text-gray-600 dark:text-gray-400">{dataset.size}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Classes:</span>
                      <p className="text-gray-600 dark:text-gray-400">{dataset.classes}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Image Size:</span>
                      <p className="text-gray-600 dark:text-gray-400">{dataset.imageSize}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Download:</span>
                      <p className="text-gray-600 dark:text-gray-400">{dataset.downloadSize}</p>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Sample Classes:</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {dataset.samples.slice(0, 4).map((sample, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {sample}
                        </Badge>
                      ))}
                      {dataset.samples.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{dataset.samples.length - 4} more
                        </Badge>
                      )}
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
              <CardTitle className="font-orbitron flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload Custom Dataset</span>
              </CardTitle>
              <CardDescription>
                Upload your own dataset as a .zip file. We support various formats for different tasks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                {!isUploading ? (
                  <div className="space-y-4">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-semibold">Drop your dataset here</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">or click to browse files</p>
                    </div>
                    <input
                      type="file"
                      accept=".zip"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="dataset-upload"
                    />
                    <label htmlFor="dataset-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Choose File
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <div>
                      <p className="text-lg font-semibold">Uploading Dataset...</p>
                      <Progress value={uploadProgress} className="w-64 mx-auto mt-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{uploadProgress}% complete</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Format Requirements */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold font-space-mono text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Dataset Format Requirements
                </h4>
                <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                  <p>
                    <strong>Classification:</strong> Folder structure with one folder per class
                  </p>
                  <p>
                    <strong>Detection:</strong> Images + JSON annotations or YOLO format
                  </p>
                  <p>
                    <strong>Segmentation:</strong> Images + corresponding mask images
                  </p>
                  <p>
                    <strong>Super-Resolution:</strong> High-res and low-res image pairs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dataset Analysis */}
      {selectedDatasetData && datasetAnalysis && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="font-orbitron text-xl flex items-center space-x-3">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span>Dataset Analysis: {selectedDatasetData.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold font-orbitron text-purple-600 dark:text-purple-400">
                  {datasetAnalysis.totalImages.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Images</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold font-orbitron text-blue-600 dark:text-blue-400">
                  {datasetAnalysis.classes}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Classes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold font-orbitron text-green-600 dark:text-green-400">
                  {datasetAnalysis.avgImageSize}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Image Size</div>
              </div>
            </div>

            {/* Preprocessing Options */}
            <div className="space-y-4">
              <h4 className="font-semibold font-space-mono text-gray-700 dark:text-gray-300">Preprocessing Options:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Resize to 224x224</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Normalize pixel values</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Random horizontal flip</span>
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Random rotation (±15°)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Color jittering</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Train/Val split (80/20)</span>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={onPrevious} variant="outline" className="font-space-mono">
          Previous Step
        </Button>
        <Button onClick={onNext} disabled={!selectedDataset} className="font-space-mono">
          Continue to Architecture
          <Settings className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
