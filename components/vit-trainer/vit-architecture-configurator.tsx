"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ArrowLeft, Cpu, Settings, AlertTriangle } from "lucide-react"

const pretrainedModels = [
  {
    id: "vit_base_patch16_224",
    name: "ViT-Base/16",
    description: "Base Vision Transformer with 16x16 patches",
    params: "86M",
    imageSize: 224,
    patchSize: 16,
    layers: 12,
    heads: 12,
    difficulty: "Beginner",
  },
  {
    id: "vit_large_patch16_384",
    name: "ViT-Large/16",
    description: "Large Vision Transformer with high resolution",
    params: "307M",
    imageSize: 384,
    patchSize: 16,
    layers: 24,
    heads: 16,
    difficulty: "Intermediate",
  },
  {
    id: "deit_base_patch16_224",
    name: "DeiT-Base/16",
    description: "Data-efficient Image Transformer",
    params: "86M",
    imageSize: 224,
    patchSize: 16,
    layers: 12,
    heads: 12,
    difficulty: "Beginner",
  },
  {
    id: "swin_tiny_patch4_window7_224",
    name: "Swin-Tiny",
    description: "Hierarchical Vision Transformer",
    params: "28M",
    imageSize: 224,
    patchSize: 4,
    layers: 12,
    heads: 3,
    difficulty: "Intermediate",
  },
]

interface ViTArchitectureConfiguratorProps {
  taskConfig: any
  datasetConfig: any
  config: any
  onConfigChange: (config: any) => void
  onNext: () => void
  onPrevious: () => void
}

export function ViTArchitectureConfigurator({
  taskConfig,
  datasetConfig,
  config,
  onConfigChange,
  onNext,
  onPrevious,
}: ViTArchitectureConfiguratorProps) {
  const [architectureType, setArchitectureType] = useState(config.architectureType || "pretrained")
  const [selectedModel, setSelectedModel] = useState(config.selectedModel || "")
  const [customConfig, setCustomConfig] = useState(
    config.customConfig || {
      imageSize: 224,
      patchSize: 16,
      embeddingDim: 768,
      numLayers: 12,
      numHeads: 12,
      mlpDim: 3072,
      dropout: 0.1,
      positionEncoding: "learnable",
      classifierHead: "mlp",
    },
  )
  const [finetuneConfig, setFinetuneConfig] = useState(
    config.finetuneConfig || {
      freezeEncoder: false,
      freezeLayers: 0,
      useClsToken: true,
    },
  )

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId)
    const model = pretrainedModels.find((m) => m.id === modelId)
    onConfigChange({
      ...config,
      architectureType,
      selectedModel: modelId,
      modelDetails: model,
      finetuneConfig,
    })
  }

  const handleCustomConfigChange = (key: string, value: any) => {
    const newConfig = { ...customConfig, [key]: value }
    setCustomConfig(newConfig)
    onConfigChange({
      ...config,
      architectureType,
      customConfig: newConfig,
    })
  }

  const calculateParameters = () => {
    const { embeddingDim, numLayers, numHeads, mlpDim, imageSize, patchSize } = customConfig
    const numPatches = (imageSize / patchSize) ** 2
    const patchEmbedding = patchSize * patchSize * 3 * embeddingDim
    const positionEmbedding = (numPatches + 1) * embeddingDim
    const transformerParams =
      numLayers *
      (4 * embeddingDim * embeddingDim + // Attention weights
        2 * embeddingDim * mlpDim) // MLP weights
    const total = patchEmbedding + positionEmbedding + transformerParams
    return (total / 1000000).toFixed(1) + "M"
  }

  const getWarnings = () => {
    const warnings = []
    if (customConfig.patchSize > customConfig.imageSize / 4) {
      warnings.push("Patch size too large - may lose fine details")
    }
    if (customConfig.numHeads > customConfig.embeddingDim / 32) {
      warnings.push("Too many attention heads for embedding dimension")
    }
    if (customConfig.numLayers < 6) {
      warnings.push("Few layers may underfit complex tasks")
    }
    return warnings
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-orbitron text-center">
            🟠 Step 3: Vision Transformer Architecture
          </CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-400 font-space-mono">
            Configure your ViT architecture - pretrained or custom build
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={architectureType} onValueChange={setArchitectureType} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pretrained">Pretrained Models</TabsTrigger>
              <TabsTrigger value="custom">Custom Builder</TabsTrigger>
            </TabsList>

            <TabsContent value="pretrained" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pretrainedModels.map((model) => (
                  <Card
                    key={model.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedModel === model.id
                        ? "border-orange-500 border-2 bg-orange-50 dark:bg-orange-950"
                        : "border hover:border-gray-400"
                    }`}
                    onClick={() => handleModelSelect(model.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Cpu className="w-5 h-5 mr-2 text-orange-600" />
                          <h3 className="font-semibold font-orbitron">{model.name}</h3>
                        </div>
                        <Badge className={getDifficultyColor(model.difficulty)}>{model.difficulty}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-space-mono">
                        {model.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <strong>Parameters:</strong> {model.params}
                        </div>
                        <div>
                          <strong>Patch Size:</strong> {model.patchSize}x{model.patchSize}
                        </div>
                        <div>
                          <strong>Layers:</strong> {model.layers}
                        </div>
                        <div>
                          <strong>Heads:</strong> {model.heads}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedModel && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center font-orbitron">
                      <Settings className="w-5 h-5 mr-2" />
                      Fine-tuning Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center space-x-2 mb-4">
                          <input
                            type="checkbox"
                            checked={finetuneConfig.freezeEncoder}
                            onChange={(e) =>
                              setFinetuneConfig({
                                ...finetuneConfig,
                                freezeEncoder: e.target.checked,
                              })
                            }
                          />
                          <span className="text-sm font-space-mono">Freeze Encoder Blocks</span>
                        </label>

                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={finetuneConfig.useClsToken}
                            onChange={(e) =>
                              setFinetuneConfig({
                                ...finetuneConfig,
                                useClsToken: e.target.checked,
                              })
                            }
                          />
                          <span className="text-sm font-space-mono">Use CLS Token</span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 font-space-mono">Freeze First N Layers</label>
                        <input
                          type="range"
                          min="0"
                          max={pretrainedModels.find((m) => m.id === selectedModel)?.layers || 12}
                          value={finetuneConfig.freezeLayers}
                          onChange={(e) =>
                            setFinetuneConfig({
                              ...finetuneConfig,
                              freezeLayers: Number.parseInt(e.target.value),
                            })
                          }
                          className="w-full"
                        />
                        <div className="text-xs text-gray-500 mt-1">{finetuneConfig.freezeLayers} layers frozen</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 font-space-mono">Image Size</label>
                  <select
                    value={customConfig.imageSize}
                    onChange={(e) => handleCustomConfigChange("imageSize", Number.parseInt(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value={224}>224x224</option>
                    <option value={384}>384x384</option>
                    <option value={512}>512x512</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 font-space-mono">Patch Size</label>
                  <select
                    value={customConfig.patchSize}
                    onChange={(e) => handleCustomConfigChange("patchSize", Number.parseInt(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value={8}>8x8</option>
                    <option value={16}>16x16</option>
                    <option value={32}>32x32</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 font-space-mono">Embedding Dimension</label>
                  <select
                    value={customConfig.embeddingDim}
                    onChange={(e) => handleCustomConfigChange("embeddingDim", Number.parseInt(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value={384}>384</option>
                    <option value={768}>768</option>
                    <option value={1024}>1024</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 font-space-mono">Number of Layers</label>
                  <input
                    type="range"
                    min="6"
                    max="24"
                    value={customConfig.numLayers}
                    onChange={(e) => handleCustomConfigChange("numLayers", Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{customConfig.numLayers} layers</div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 font-space-mono">Attention Heads</label>
                  <input
                    type="range"
                    min="4"
                    max="16"
                    value={customConfig.numHeads}
                    onChange={(e) => handleCustomConfigChange("numHeads", Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{customConfig.numHeads} heads</div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 font-space-mono">Dropout Rate</label>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.1"
                    value={customConfig.dropout}
                    onChange={(e) => handleCustomConfigChange("dropout", Number.parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{customConfig.dropout}</div>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                <h4 className="font-semibold font-orbitron mb-2">Architecture Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-space-mono">
                  <div>
                    <strong>Parameters:</strong> {calculateParameters()}
                  </div>
                  <div>
                    <strong>Patches:</strong> {(customConfig.imageSize / customConfig.patchSize) ** 2}
                  </div>
                  <div>
                    <strong>Sequence Length:</strong> {(customConfig.imageSize / customConfig.patchSize) ** 2 + 1}
                  </div>
                  <div>
                    <strong>Head Dimension:</strong> {customConfig.embeddingDim / customConfig.numHeads}
                  </div>
                </div>
              </div>

              {getWarnings().length > 0 && (
                <Card className="border-yellow-500">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                      <h4 className="font-semibold font-orbitron">Architecture Warnings</h4>
                    </div>
                    <ul className="text-sm font-space-mono space-y-1">
                      {getWarnings().map((warning, index) => (
                        <li key={index} className="text-yellow-700">
                          • {warning}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <Button onClick={onPrevious} variant="outline" className="font-space-mono">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={onNext}
              disabled={architectureType === "pretrained" ? !selectedModel : false}
              className="font-space-mono"
            >
              Next: Training Setup
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
