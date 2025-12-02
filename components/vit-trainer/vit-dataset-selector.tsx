"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ArrowLeft, Database, Upload, Settings } from "lucide-react"

const presetDatasets = {
  classification: [
    {
      id: "cifar10",
      name: "CIFAR-10",
      size: "60K images",
      classes: 10,
      description: "Common objects in 32x32 resolution",
    },
    {
      id: "cifar100",
      name: "CIFAR-100",
      size: "60K images",
      classes: 100,
      description: "Fine-grained object classification",
    },
    {
      id: "imagenet_subset",
      name: "ImageNet Subset",
      size: "50K images",
      classes: 1000,
      description: "High-resolution natural images",
    },
    {
      id: "oxford_pets",
      name: "Oxford Pets",
      size: "7K images",
      classes: 37,
      description: "Cat and dog breed classification",
    },
  ],
  detection: [
    {
      id: "coco_subset",
      name: "COCO Subset",
      size: "25K images",
      classes: 80,
      description: "Common objects in context",
    },
    {
      id: "pascal_voc",
      name: "Pascal VOC",
      size: "20K images",
      classes: 20,
      description: "Object detection benchmark",
    },
  ],
  segmentation: [
    { id: "ade20k", name: "ADE20K", size: "25K images", classes: 150, description: "Scene parsing dataset" },
    { id: "camvid", name: "CamVid", size: "700 images", classes: 32, description: "Road scene understanding" },
  ],
  super_resolution: [
    { id: "div2k", name: "DIV2K", size: "1K images", classes: 1, description: "High-quality image pairs" },
  ],
  emotion_recognition: [
    { id: "fer2013", name: "FER2013", size: "35K images", classes: 7, description: "Facial emotion recognition" },
  ],
  medical_diagnosis: [
    {
      id: "chestxray",
      name: "ChestX-ray",
      size: "112K images",
      classes: 14,
      description: "Chest X-ray pathology detection",
    },
  ],
}

interface ViTDatasetSelectorProps {
  taskConfig: any
  config: any
  onConfigChange: (config: any) => void
  onNext: () => void
  onPrevious: () => void
}

export function ViTDatasetSelector({
  taskConfig,
  config,
  onConfigChange,
  onNext,
  onPrevious,
}: ViTDatasetSelectorProps) {
  const [selectedDataset, setSelectedDataset] = useState(config.selectedDataset || "")
  const [datasetType, setDatasetType] = useState(config.datasetType || "preset")
  const [preprocessingConfig, setPreprocessingConfig] = useState(
    config.preprocessing || {
      imageSize: 224,
      augmentation: true,
      normalization: true,
      trainSplit: 0.8,
      valSplit: 0.1,
    },
  )

  const availableDatasets = presetDatasets[taskConfig.selectedTask as keyof typeof presetDatasets] || []

  const handleDatasetSelect = (datasetId: string) => {
    setSelectedDataset(datasetId)
    const dataset = availableDatasets.find((d) => d.id === datasetId)
    onConfigChange({
      ...config,
      selectedDataset: datasetId,
      datasetDetails: dataset,
      datasetType,
      preprocessing: preprocessingConfig,
    })
  }

  const handlePreprocessingChange = (key: string, value: any) => {
    const newConfig = { ...preprocessingConfig, [key]: value }
    setPreprocessingConfig(newConfig)
    onConfigChange({
      ...config,
      preprocessing: newConfig,
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-orbitron text-center">
            🟣 Step 2: Dataset Selection & Preprocessing
          </CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-400 font-space-mono">
            Choose your dataset and configure preprocessing for Vision Transformers
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={datasetType} onValueChange={setDatasetType} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preset">Preset Datasets</TabsTrigger>
              <TabsTrigger value="custom">Custom Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="preset" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableDatasets.map((dataset) => (
                  <Card
                    key={dataset.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedDataset === dataset.id
                        ? "border-purple-500 border-2 bg-purple-50 dark:bg-purple-950"
                        : "border hover:border-gray-400"
                    }`}
                    onClick={() => handleDatasetSelect(dataset.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <Database className="w-5 h-5 mr-2 text-purple-600" />
                        <h3 className="font-semibold font-orbitron">{dataset.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-space-mono">
                        {dataset.description}
                      </p>
                      <div className="flex justify-between text-xs">
                        <Badge variant="outline">{dataset.size}</Badge>
                        <Badge variant="outline">{dataset.classes} classes</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-semibold font-orbitron mb-2">Upload Custom Dataset</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-space-mono">
                    Upload a .zip file with your dataset structure
                  </p>
                  <Button variant="outline">Choose File</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {selectedDataset && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center font-orbitron">
                  <Settings className="w-5 h-5 mr-2" />
                  Preprocessing Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 font-space-mono">Image Size</label>
                    <select
                      value={preprocessingConfig.imageSize}
                      onChange={(e) => handlePreprocessingChange("imageSize", Number.parseInt(e.target.value))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value={224}>224x224 (Standard)</option>
                      <option value={384}>384x384 (High-res)</option>
                      <option value={512}>512x512 (Ultra-high)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 font-space-mono">Train Split</label>
                    <input
                      type="range"
                      min="0.6"
                      max="0.9"
                      step="0.1"
                      value={preprocessingConfig.trainSplit}
                      onChange={(e) => handlePreprocessingChange("trainSplit", Number.parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {(preprocessingConfig.trainSplit * 100).toFixed(0)}%
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 font-space-mono">Validation Split</label>
                    <input
                      type="range"
                      min="0.05"
                      max="0.2"
                      step="0.05"
                      value={preprocessingConfig.valSplit}
                      onChange={(e) => handlePreprocessingChange("valSplit", Number.parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">{(preprocessingConfig.valSplit * 100).toFixed(0)}%</div>
                  </div>
                </div>

                <div className="flex space-x-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preprocessingConfig.augmentation}
                      onChange={(e) => handlePreprocessingChange("augmentation", e.target.checked)}
                    />
                    <span className="text-sm font-space-mono">Data Augmentation</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preprocessingConfig.normalization}
                      onChange={(e) => handlePreprocessingChange("normalization", e.target.checked)}
                    />
                    <span className="text-sm font-space-mono">ImageNet Normalization</span>
                  </label>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold font-orbitron mb-2">Dataset Preview</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-space-mono">
                    <div>
                      <strong>Total Images:</strong>
                      <br />
                      {availableDatasets.find((d) => d.id === selectedDataset)?.size}
                    </div>
                    <div>
                      <strong>Classes:</strong>
                      <br />
                      {availableDatasets.find((d) => d.id === selectedDataset)?.classes}
                    </div>
                    <div>
                      <strong>Resolution:</strong>
                      <br />
                      {preprocessingConfig.imageSize}x{preprocessingConfig.imageSize}
                    </div>
                    <div>
                      <strong>Splits:</strong>
                      <br />
                      {(preprocessingConfig.trainSplit * 100).toFixed(0)}% /{" "}
                      {(preprocessingConfig.valSplit * 100).toFixed(0)}% /{" "}
                      {((1 - preprocessingConfig.trainSplit - preprocessingConfig.valSplit) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between">
            <Button onClick={onPrevious} variant="outline" className="font-space-mono">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button onClick={onNext} disabled={!selectedDataset} className="font-space-mono">
              Next: ViT Architecture
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
