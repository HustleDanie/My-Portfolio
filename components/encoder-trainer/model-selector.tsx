"use client"

import { useState } from "react"
import { Brain, Settings, Layers, ArrowRight, ArrowLeft, Zap, Eye, Sliders, Info, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TrainingConfig } from "@/app/projects/encoder-training-dynamics/page"

interface ModelSelectorProps {
  config: TrainingConfig
  updateConfig: (key: keyof TrainingConfig, value: any) => void
  onNext: () => void
  onPrev: () => void
}

const PRETRAINED_MODELS = [
  {
    id: "bert-base-uncased",
    name: "BERT Base",
    description: "12-layer, 768-hidden, 12-heads, 110M parameters",
    size: "110M",
    layers: 12,
    hiddenSize: 768,
    attentionHeads: 12,
    maxLength: 512,
    strengths: ["General purpose", "Well-documented", "Fast training"],
    weaknesses: ["Larger than DistilBERT", "Case insensitive"],
    recommended: ["text-classification", "sentiment-analysis"],
  },
  {
    id: "bert-large-uncased",
    name: "BERT Large",
    description: "24-layer, 1024-hidden, 16-heads, 340M parameters",
    size: "340M",
    layers: 24,
    hiddenSize: 1024,
    attentionHeads: 16,
    maxLength: 512,
    strengths: ["High performance", "Rich representations"],
    weaknesses: ["Slow training", "Memory intensive"],
    recommended: ["question-answering", "named-entity-recognition"],
  },
  {
    id: "roberta-base",
    name: "RoBERTa Base",
    description: "12-layer, 768-hidden, 12-heads, 125M parameters",
    size: "125M",
    layers: 12,
    hiddenSize: 768,
    attentionHeads: 12,
    maxLength: 512,
    strengths: ["Better than BERT", "Robust training", "No NSP task"],
    weaknesses: ["Slightly larger", "More compute needed"],
    recommended: ["sentiment-analysis", "text-classification"],
  },
  {
    id: "distilbert-base-uncased",
    name: "DistilBERT",
    description: "6-layer, 768-hidden, 12-heads, 66M parameters",
    size: "66M",
    layers: 6,
    hiddenSize: 768,
    attentionHeads: 12,
    maxLength: 512,
    strengths: ["Fast", "Lightweight", "97% BERT performance"],
    weaknesses: ["Slightly lower accuracy", "Fewer layers"],
    recommended: ["language-detection", "emotion-detection"],
  },
  {
    id: "albert-base-v2",
    name: "ALBERT Base",
    description: "12-layer, 768-hidden, 12-heads, 11M parameters",
    size: "11M",
    layers: 12,
    hiddenSize: 768,
    attentionHeads: 12,
    maxLength: 512,
    strengths: ["Very lightweight", "Parameter sharing", "Good performance"],
    weaknesses: ["Slower inference", "Complex architecture"],
    recommended: ["semantic-similarity", "text-classification"],
  },
]

export function ModelSelector({ config, updateConfig, onNext, onPrev }: ModelSelectorProps) {
  const [modelType, setModelType] = useState<"pretrained" | "custom">("pretrained")
  const [selectedModel, setSelectedModel] = useState<any>(config.model || null)
  const [customConfig, setCustomConfig] = useState({
    maxLength: 512,
    embeddingDim: 768,
    numLayers: 12,
    numHeads: 12,
    ffnDim: 3072,
    dropout: 0.1,
    layerNorm: "pre",
    freezeLayers: 0,
    classifierLayers: 1,
  })

  const handlePretrainedSelect = (model: any) => {
    setSelectedModel({
      ...model,
      type: "pretrained",
      freezeLayers: 0,
      classifierLayers: 1,
    })
    updateConfig("model", {
      ...model,
      type: "pretrained",
      freezeLayers: 0,
      classifierLayers: 1,
    })
  }

  const handleCustomConfigChange = (key: string, value: any) => {
    const newConfig = { ...customConfig, [key]: value }
    setCustomConfig(newConfig)
    setSelectedModel({
      ...newConfig,
      type: "custom",
      name: "Custom Transformer",
      id: "custom-transformer",
    })
    updateConfig("model", {
      ...newConfig,
      type: "custom",
      name: "Custom Transformer",
      id: "custom-transformer",
    })
  }

  const getRecommendedModels = () => {
    return PRETRAINED_MODELS.filter((model) => model.recommended.includes(config.task))
  }

  const ModelArchitectureVisualization = ({ model }: { model: any }) => (
    <Card className="bg-gray-50 dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Architecture Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Input Layer */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-8 bg-blue-200 dark:bg-blue-800 rounded flex items-center justify-center text-xs">
              Input
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Tokenization + Embeddings ({model.hiddenSize || model.embeddingDim}d)
            </div>
          </div>

          {/* Encoder Layers */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-green-200 dark:bg-green-800 rounded flex items-center justify-center text-xs text-center">
              {model.layers || model.numLayers}x<br />
              Encoder
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Multi-Head Attention ({model.attentionHeads || model.numHeads} heads) + FFN
            </div>
          </div>

          {/* Output Head */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-8 bg-purple-200 dark:bg-purple-800 rounded flex items-center justify-center text-xs">
              Head
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Classification Head ({selectedModel?.classifierLayers || 1} layer)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-orange-900 dark:text-orange-100">
            🟠 STEP 3: Model Configuration
          </CardTitle>
          <CardDescription className="text-orange-700 dark:text-orange-300 font-space-mono">
            Choose between pretrained encoder models or build a custom transformer architecture.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={modelType} onValueChange={(value) => setModelType(value as "pretrained" | "custom")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pretrained" className="gap-2">
            <Brain className="h-4 w-4" />
            Pretrained Models
          </TabsTrigger>
          <TabsTrigger value="custom" className="gap-2">
            <Settings className="h-4 w-4" />
            Custom Builder
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pretrained" className="space-y-6">
          {/* Recommended Models */}
          {getRecommendedModels().length > 0 && (
            <div>
              <h3 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Recommended for {config.task}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {getRecommendedModels().map((model) => (
                  <Card
                    key={model.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedModel?.id === model.id
                        ? "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-950/20"
                        : "hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-600"
                    }`}
                    onClick={() => handlePretrainedSelect(model)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="font-orbitron text-lg">{model.name}</CardTitle>
                          <CardDescription className="text-sm">{model.description}</CardDescription>
                        </div>
                        {selectedModel?.id === model.id && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Size:</span>
                          <span className="ml-2 font-space-mono">{model.size}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Layers:</span>
                          <span className="ml-2 font-space-mono">{model.layers}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Strengths:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {model.strengths.slice(0, 2).map((strength) => (
                            <Badge key={strength} variant="secondary" className="text-xs">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Models */}
          <div>
            <h3 className="font-orbitron text-lg font-semibold mb-4">All Pretrained Models</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRETRAINED_MODELS.map((model) => (
                <Card
                  key={model.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedModel?.id === model.id
                      ? "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-950/20"
                      : "hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-600"
                  }`}
                  onClick={() => handlePretrainedSelect(model)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-orbitron text-base">{model.name}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {model.size}
                        </Badge>
                      </div>
                      {selectedModel?.id === model.id && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{model.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {model.layers} layers • {model.attentionHeads} heads
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Model Configuration */}
          {selectedModel?.type === "pretrained" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="h-5 w-5" />
                  Fine-tuning Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Freeze Layers</Label>
                      <div className="mt-2">
                        <Slider
                          value={[selectedModel.freezeLayers || 0]}
                          onValueChange={(value) => {
                            const updated = { ...selectedModel, freezeLayers: value[0] }
                            setSelectedModel(updated)
                            updateConfig("model", updated)
                          }}
                          max={selectedModel.layers}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0 (all trainable)</span>
                          <span>{selectedModel.freezeLayers || 0} frozen</span>
                          <span>{selectedModel.layers} (all frozen)</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Classifier Head</Label>
                      <Select
                        value={selectedModel.classifierLayers?.toString() || "1"}
                        onValueChange={(value) => {
                          const updated = { ...selectedModel, classifierLayers: Number.parseInt(value) }
                          setSelectedModel(updated)
                          updateConfig("model", updated)
                        }}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Single Layer (Linear)</SelectItem>
                          <SelectItem value="2">Two Layer MLP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <ModelArchitectureVisualization model={selectedModel} />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Custom Transformer Builder
              </CardTitle>
              <CardDescription>
                Build your own encoder transformer from scratch. Adjust parameters to match your requirements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium">Max Sequence Length</Label>
                    <Slider
                      value={[customConfig.maxLength]}
                      onValueChange={(value) => handleCustomConfigChange("maxLength", value[0])}
                      min={128}
                      max={1024}
                      step={64}
                      className="mt-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">{customConfig.maxLength} tokens</div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Embedding Dimension</Label>
                    <Select
                      value={customConfig.embeddingDim.toString()}
                      onValueChange={(value) => handleCustomConfigChange("embeddingDim", Number.parseInt(value))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="256">256</SelectItem>
                        <SelectItem value="512">512</SelectItem>
                        <SelectItem value="768">768</SelectItem>
                        <SelectItem value="1024">1024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Number of Layers</Label>
                    <Slider
                      value={[customConfig.numLayers]}
                      onValueChange={(value) => handleCustomConfigChange("numLayers", value[0])}
                      min={2}
                      max={24}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">{customConfig.numLayers} encoder layers</div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Attention Heads</Label>
                    <Select
                      value={customConfig.numHeads.toString()}
                      onValueChange={(value) => handleCustomConfigChange("numHeads", Number.parseInt(value))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="16">16</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Dropout Rate</Label>
                    <Slider
                      value={[customConfig.dropout * 100]}
                      onValueChange={(value) => handleCustomConfigChange("dropout", value[0] / 100)}
                      min={0}
                      max={50}
                      step={5}
                      className="mt-2"
                    />
                    <div className="text-xs text-gray-500 mt-1">{(customConfig.dropout * 100).toFixed(0)}%</div>
                  </div>
                </div>

                <ModelArchitectureVisualization model={customConfig} />
              </div>

              {/* Smart Suggestions */}
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Smart Suggestions:</strong>
                      <ul className="mt-1 space-y-1 text-xs">
                        {customConfig.numLayers > 12 && <li>• High layer count may overfit on small datasets</li>}
                        {customConfig.embeddingDim % customConfig.numHeads !== 0 && (
                          <li>• Embedding dimension should be divisible by number of heads</li>
                        )}
                        {customConfig.dropout < 0.1 && <li>• Consider higher dropout for better regularization</li>}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dataset
        </Button>

        {selectedModel && (
          <Button onClick={onNext} className="gap-2">
            Continue to Training
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
