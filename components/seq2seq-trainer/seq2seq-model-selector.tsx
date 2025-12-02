"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Brain,
  Settings,
  Layers,
  Info,
  ChevronRight,
  ChevronDown,
  Lock,
  Unlock,
  Eye,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface PretrainedModel {
  id: string
  name: string
  description: string
  size: string
  parameters: string
  maxLength: number
  languages: string[]
  tasks: string[]
  recommended: boolean
  architecture: {
    encoderLayers: number
    decoderLayers: number
    hiddenSize: number
    attentionHeads: number
    feedforwardSize: number
  }
}

const pretrainedModels: PretrainedModel[] = [
  {
    id: "t5-small",
    name: "T5-Small",
    description: "Text-to-Text Transfer Transformer (Small)",
    size: "242MB",
    parameters: "60M",
    maxLength: 512,
    languages: ["English"],
    tasks: ["summarization", "translation", "question_generation", "paraphrase"],
    recommended: true,
    architecture: {
      encoderLayers: 6,
      decoderLayers: 6,
      hiddenSize: 512,
      attentionHeads: 8,
      feedforwardSize: 2048,
    },
  },
  {
    id: "t5-base",
    name: "T5-Base",
    description: "Text-to-Text Transfer Transformer (Base)",
    size: "892MB",
    parameters: "220M",
    maxLength: 512,
    languages: ["English"],
    tasks: ["summarization", "translation", "question_generation", "paraphrase", "grammar_correction"],
    recommended: true,
    architecture: {
      encoderLayers: 12,
      decoderLayers: 12,
      hiddenSize: 768,
      attentionHeads: 12,
      feedforwardSize: 3072,
    },
  },
  {
    id: "bart-base",
    name: "BART-Base",
    description: "Bidirectional and Auto-Regressive Transformers",
    size: "558MB",
    parameters: "140M",
    maxLength: 1024,
    languages: ["English"],
    tasks: ["summarization", "paraphrase", "headline_generation"],
    recommended: false,
    architecture: {
      encoderLayers: 6,
      decoderLayers: 6,
      hiddenSize: 768,
      attentionHeads: 12,
      feedforwardSize: 3072,
    },
  },
  {
    id: "mt5-small",
    name: "mT5-Small",
    description: "Multilingual T5 (Small)",
    size: "1.2GB",
    parameters: "300M",
    maxLength: 512,
    languages: ["101 languages"],
    tasks: ["translation", "summarization", "paraphrase"],
    recommended: false,
    architecture: {
      encoderLayers: 8,
      decoderLayers: 8,
      hiddenSize: 512,
      attentionHeads: 6,
      feedforwardSize: 1024,
    },
  },
]

interface Seq2SeqModelSelectorProps {
  onComplete: (data: { model: string; config: any }) => void
  selectedTask: string
}

export function Seq2SeqModelSelector({ onComplete, selectedTask }: Seq2SeqModelSelectorProps) {
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [modelType, setModelType] = useState<"pretrained" | "custom">("pretrained")
  const [customConfig, setCustomConfig] = useState({
    encoderLayers: 6,
    decoderLayers: 6,
    hiddenSize: 512,
    attentionHeads: 8,
    feedforwardSize: 2048,
    vocabSize: 32128,
    maxPositionEmbeddings: 512,
    dropout: 0.1,
    sharedEmbeddings: true,
  })
  const [freezeConfig, setFreezeConfig] = useState({
    freezeEncoder: false,
    freezeDecoder: false,
    freezeEmbeddings: false,
  })
  const [showArchitecture, setShowArchitecture] = useState(false)

  const compatibleModels = pretrainedModels.filter((model) => model.tasks.includes(selectedTask))

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId)
    const model = pretrainedModels.find((m) => m.id === modelId)
    onComplete({
      model: modelId,
      config: {
        type: "pretrained",
        freezeConfig,
        architecture: model?.architecture,
      },
    })
  }

  const handleCustomConfigChange = (key: string, value: any) => {
    const newConfig = { ...customConfig, [key]: value }
    setCustomConfig(newConfig)
    onComplete({
      model: "custom",
      config: {
        type: "custom",
        architecture: newConfig,
        freezeConfig,
      },
    })
  }

  const handleFreezeConfigChange = (key: string, value: boolean) => {
    const newFreezeConfig = { ...freezeConfig, [key]: value }
    setFreezeConfig(newFreezeConfig)
    onComplete({
      model: selectedModel || "custom",
      config: {
        type: modelType,
        architecture:
          modelType === "custom" ? customConfig : pretrainedModels.find((m) => m.id === selectedModel)?.architecture,
        freezeConfig: newFreezeConfig,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Configure Encoder-Decoder Model</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Choose a pretrained model or build a custom encoder-decoder architecture for your task.
        </p>
      </div>

      <Tabs
        value={modelType}
        onValueChange={(value) => setModelType(value as "pretrained" | "custom")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pretrained" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Pretrained Models
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Custom Builder
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pretrained" className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Showing models compatible with <strong>{selectedTask}</strong>. Pretrained models are faster to train and
              often perform better with limited data.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {compatibleModels.map((model) => (
              <motion.div key={model.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedModel === model.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                  } ${model.recommended ? "border-green-200 dark:border-green-800" : ""}`}
                  onClick={() => handleModelSelect(model.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {model.name}
                          {model.recommended && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              Recommended
                            </Badge>
                          )}
                        </CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{model.description}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Parameters:</span>
                        <div className="font-medium">{model.parameters}</div>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Size:</span>
                        <div className="font-medium">{model.size}</div>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Max Length:</span>
                        <div className="font-medium">{model.maxLength}</div>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Languages:</span>
                        <div className="font-medium">{model.languages.join(", ")}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white">Architecture:</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-50 dark:bg-slate-800 rounded p-2">
                          <div className="font-medium">Encoder</div>
                          <div>{model.architecture.encoderLayers} layers</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded p-2">
                          <div className="font-medium">Decoder</div>
                          <div>{model.architecture.decoderLayers} layers</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {model.tasks.map((task) => (
                        <Badge key={task} variant={task === selectedTask ? "default" : "outline"} className="text-xs">
                          {task.replace("_", " ")}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Building a custom model requires more computational resources and training time. Consider using a
              pretrained model first, especially with limited data.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Custom Architecture Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Encoder Configuration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Encoder</h3>

                  <div>
                    <Label className="text-sm font-medium">Number of Layers</Label>
                    <div className="mt-2">
                      <Slider
                        value={[customConfig.encoderLayers]}
                        onValueChange={(value) => handleCustomConfigChange("encoderLayers", value[0])}
                        max={24}
                        min={2}
                        step={2}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>2</span>
                        <span>{customConfig.encoderLayers}</span>
                        <span>24</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Hidden Size</Label>
                    <Select
                      value={customConfig.hiddenSize.toString()}
                      onValueChange={(value) => handleCustomConfigChange("hiddenSize", Number.parseInt(value))}
                    >
                      <SelectTrigger>
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
                    <Label className="text-sm font-medium">Attention Heads</Label>
                    <Select
                      value={customConfig.attentionHeads.toString()}
                      onValueChange={(value) => handleCustomConfigChange("attentionHeads", Number.parseInt(value))}
                    >
                      <SelectTrigger>
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
                </div>

                {/* Decoder Configuration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Decoder</h3>

                  <div>
                    <Label className="text-sm font-medium">Number of Layers</Label>
                    <div className="mt-2">
                      <Slider
                        value={[customConfig.decoderLayers]}
                        onValueChange={(value) => handleCustomConfigChange("decoderLayers", value[0])}
                        max={24}
                        min={2}
                        step={2}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>2</span>
                        <span>{customConfig.decoderLayers}</span>
                        <span>24</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Feedforward Size</Label>
                    <Select
                      value={customConfig.feedforwardSize.toString()}
                      onValueChange={(value) => handleCustomConfigChange("feedforwardSize", Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1024">1024</SelectItem>
                        <SelectItem value="2048">2048</SelectItem>
                        <SelectItem value="3072">3072</SelectItem>
                        <SelectItem value="4096">4096</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Dropout Rate</Label>
                    <div className="mt-2">
                      <Slider
                        value={[customConfig.dropout * 100]}
                        onValueChange={(value) => handleCustomConfigChange("dropout", value[0] / 100)}
                        max={50}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>0%</span>
                        <span>{(customConfig.dropout * 100).toFixed(0)}%</span>
                        <span>50%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Global Configuration */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">Global Settings</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Shared Embeddings</Label>
                    <Switch
                      checked={customConfig.sharedEmbeddings}
                      onCheckedChange={(checked) => handleCustomConfigChange("sharedEmbeddings", checked)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Max Position Embeddings</Label>
                    <Select
                      value={customConfig.maxPositionEmbeddings.toString()}
                      onValueChange={(value) =>
                        handleCustomConfigChange("maxPositionEmbeddings", Number.parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="512">512</SelectItem>
                        <SelectItem value="1024">1024</SelectItem>
                        <SelectItem value="2048">2048</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Architecture Summary */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Architecture Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Total Layers:</span>
                    <div className="font-medium">{customConfig.encoderLayers + customConfig.decoderLayers}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Parameters:</span>
                    <div className="font-medium">
                      ~
                      {Math.round(
                        (customConfig.hiddenSize *
                          customConfig.hiddenSize *
                          (customConfig.encoderLayers + customConfig.decoderLayers)) /
                          1000000,
                      )}
                      M
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Hidden Size:</span>
                    <div className="font-medium">{customConfig.hiddenSize}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Attention Heads:</span>
                    <div className="font-medium">{customConfig.attentionHeads}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Fine-tuning Configuration */}
      {(selectedModel || modelType === "custom") && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Fine-tuning Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {freezeConfig.freezeEncoder ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    <Label className="text-sm font-medium">Freeze Encoder</Label>
                  </div>
                  <Switch
                    checked={freezeConfig.freezeEncoder}
                    onCheckedChange={(checked) => handleFreezeConfigChange("freezeEncoder", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {freezeConfig.freezeDecoder ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    <Label className="text-sm font-medium">Freeze Decoder</Label>
                  </div>
                  <Switch
                    checked={freezeConfig.freezeDecoder}
                    onCheckedChange={(checked) => handleFreezeConfigChange("freezeDecoder", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {freezeConfig.freezeEmbeddings ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    <Label className="text-sm font-medium">Freeze Embeddings</Label>
                  </div>
                  <Switch
                    checked={freezeConfig.freezeEmbeddings}
                    onCheckedChange={(checked) => handleFreezeConfigChange("freezeEmbeddings", checked)}
                  />
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Tip:</strong> For small datasets, consider freezing the encoder and only fine-tuning the
                  decoder. This prevents overfitting while adapting the model to your specific task.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Architecture Visualization */}
      {(selectedModel || modelType === "custom") && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Collapsible open={showArchitecture} onOpenChange={setShowArchitecture}>
            <Card>
              <CardHeader>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0">
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Architecture Visualization
                    </CardTitle>
                    {showArchitecture ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </Button>
                </CollapsibleTrigger>
              </CardHeader>

              <CollapsibleContent>
                <CardContent>
                  <div className="flex flex-col items-center space-y-4">
                    {/* Input */}
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3 text-center">
                      <div className="text-sm font-medium">Input Text</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Tokenized Sequence</div>
                    </div>

                    <ChevronDown className="w-4 h-4 text-slate-400" />

                    {/* Encoder */}
                    <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center min-w-48">
                      <div className="text-sm font-medium mb-2">Encoder</div>
                      <div className="space-y-1">
                        {Array.from({
                          length:
                            modelType === "custom"
                              ? customConfig.encoderLayers
                              : pretrainedModels.find((m) => m.id === selectedModel)?.architecture.encoderLayers || 6,
                        }).map((_, i) => (
                          <div key={i} className="bg-green-200 dark:bg-green-800 rounded px-2 py-1 text-xs">
                            Layer {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>

                    <ChevronDown className="w-4 h-4 text-slate-400" />

                    {/* Cross Attention */}
                    <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-3 text-center">
                      <div className="text-sm font-medium">Cross-Attention</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Encoder-Decoder Connection</div>
                    </div>

                    <ChevronDown className="w-4 h-4 text-slate-400" />

                    {/* Decoder */}
                    <div className="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center min-w-48">
                      <div className="text-sm font-medium mb-2">Decoder</div>
                      <div className="space-y-1">
                        {Array.from({
                          length:
                            modelType === "custom"
                              ? customConfig.decoderLayers
                              : pretrainedModels.find((m) => m.id === selectedModel)?.architecture.decoderLayers || 6,
                        }).map((_, i) => (
                          <div key={i} className="bg-orange-200 dark:bg-orange-800 rounded px-2 py-1 text-xs">
                            Layer {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>

                    <ChevronDown className="w-4 h-4 text-slate-400" />

                    {/* Output */}
                    <div className="bg-red-100 dark:bg-red-900 rounded-lg p-3 text-center">
                      <div className="text-sm font-medium">Output Text</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Generated Sequence</div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </motion.div>
      )}
    </div>
  )
}
