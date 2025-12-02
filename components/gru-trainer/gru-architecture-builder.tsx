"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Layers, Zap, Settings, Eye, AlertTriangle, CheckCircle } from "lucide-react"

interface GruConfig {
  embeddingDim: number
  hiddenSize: number
  numLayers: number
  dropout: number
  bidirectional: boolean
  outputType: "classification" | "regression" | "sequence"
  numClasses?: number
}

interface PresetArchitecture {
  id: string
  name: string
  description: string
  config: GruConfig
  bestFor: string[]
  complexity: "Simple" | "Moderate" | "Complex"
}

const presetArchitectures: PresetArchitecture[] = [
  {
    id: "simple-gru",
    name: "Simple GRU Classifier",
    description: "Single-layer GRU for basic classification tasks",
    config: {
      embeddingDim: 128,
      hiddenSize: 64,
      numLayers: 1,
      dropout: 0.2,
      bidirectional: false,
      outputType: "classification",
      numClasses: 2,
    },
    bestFor: ["Binary classification", "Small datasets", "Fast inference"],
    complexity: "Simple",
  },
  {
    id: "bidirectional-gru",
    name: "Bidirectional GRU",
    description: "Bidirectional GRU for better context understanding",
    config: {
      embeddingDim: 256,
      hiddenSize: 128,
      numLayers: 1,
      dropout: 0.3,
      bidirectional: true,
      outputType: "classification",
      numClasses: 4,
    },
    bestFor: ["Text classification", "Sequence labeling", "Context-aware tasks"],
    complexity: "Moderate",
  },
  {
    id: "stacked-gru",
    name: "Stacked GRU",
    description: "Multi-layer GRU for complex pattern recognition",
    config: {
      embeddingDim: 256,
      hiddenSize: 256,
      numLayers: 2,
      dropout: 0.4,
      bidirectional: false,
      outputType: "sequence",
      numClasses: 10000,
    },
    bestFor: ["Text generation", "Complex sequences", "Deep patterns"],
    complexity: "Complex",
  },
  {
    id: "many-to-one-gru",
    name: "Many-to-One GRU",
    description: "GRU for sequence-to-value prediction",
    config: {
      embeddingDim: 64,
      hiddenSize: 128,
      numLayers: 2,
      dropout: 0.2,
      bidirectional: false,
      outputType: "regression",
    },
    bestFor: ["Time series forecasting", "Sentiment scoring", "Regression tasks"],
    complexity: "Moderate",
  },
]

interface GruArchitectureBuilderProps {
  taskType: string
  onArchitectureSelect: (config: GruConfig) => void
  selectedConfig?: GruConfig
}

export default function GruArchitectureBuilder({
  taskType,
  onArchitectureSelect,
  selectedConfig,
}: GruArchitectureBuilderProps) {
  const [activeTab, setActiveTab] = useState("preset")
  const [customConfig, setCustomConfig] = useState<GruConfig>({
    embeddingDim: 128,
    hiddenSize: 128,
    numLayers: 1,
    dropout: 0.2,
    bidirectional: false,
    outputType: "classification",
    numClasses: 2,
  })
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)

  const handlePresetSelect = (preset: PresetArchitecture) => {
    setSelectedPreset(preset.id)
    onArchitectureSelect(preset.config)
  }

  const handleCustomConfigChange = (key: keyof GruConfig, value: any) => {
    const newConfig = { ...customConfig, [key]: value }
    setCustomConfig(newConfig)
    onArchitectureSelect(newConfig)
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Simple":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Complex":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const estimateParameters = (config: GruConfig) => {
    const vocabSize = 10000 // Assumed vocabulary size
    const embeddingParams = vocabSize * config.embeddingDim
    const gruParams = config.numLayers * (3 * config.hiddenSize * (config.embeddingDim + config.hiddenSize + 1))
    const outputParams = config.hiddenSize * (config.numClasses || 1)
    const totalParams = embeddingParams + gruParams + outputParams

    if (config.bidirectional) {
      return totalParams * 2
    }
    return totalParams
  }

  const currentConfig = selectedConfig || customConfig

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Step 3: Build Your GRU Architecture</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Design your GRU network architecture. Choose from optimized presets or build a custom architecture with reset
          and update gates for efficient sequence processing.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preset" className="flex items-center space-x-2">
            <Layers className="h-4 w-4" />
            <span>Preset Architectures</span>
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Custom Builder</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preset" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {presetArchitectures.map((preset) => (
              <Card
                key={preset.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPreset === preset.id ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}
                onClick={() => handlePresetSelect(preset)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{preset.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getComplexityColor(preset.complexity)}>{preset.complexity}</Badge>
                      {selectedPreset === preset.id && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                  </div>
                  <CardDescription>{preset.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Hidden Size:</span> {preset.config.hiddenSize}
                    </div>
                    <div>
                      <span className="font-semibold">Layers:</span> {preset.config.numLayers}
                    </div>
                    <div>
                      <span className="font-semibold">Bidirectional:</span> {preset.config.bidirectional ? "Yes" : "No"}
                    </div>
                    <div>
                      <span className="font-semibold">Parameters:</span>{" "}
                      {(estimateParameters(preset.config) / 1000).toFixed(0)}K
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Best For</h4>
                    <div className="flex flex-wrap gap-1">
                      {preset.bestFor.map((use) => (
                        <Badge key={use} variant="outline" className="text-xs">
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Architecture Configuration</CardTitle>
                <CardDescription>Customize your GRU architecture parameters</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Embedding Dimension: {customConfig.embeddingDim}
                  </label>
                  <Slider
                    value={[customConfig.embeddingDim]}
                    onValueChange={([value]) => handleCustomConfigChange("embeddingDim", value)}
                    min={64}
                    max={512}
                    step={32}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Higher dimensions capture more semantic information
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Hidden Size: {customConfig.hiddenSize}</label>
                  <Slider
                    value={[customConfig.hiddenSize]}
                    onValueChange={([value]) => handleCustomConfigChange("hiddenSize", value)}
                    min={32}
                    max={512}
                    step={32}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Size of GRU hidden state and memory</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Number of Layers: {customConfig.numLayers}</label>
                  <Slider
                    value={[customConfig.numLayers]}
                    onValueChange={([value]) => handleCustomConfigChange("numLayers", value)}
                    min={1}
                    max={4}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    More layers can capture complex patterns but may overfit
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Dropout Rate: {customConfig.dropout.toFixed(1)}
                  </label>
                  <Slider
                    value={[customConfig.dropout]}
                    onValueChange={([value]) => handleCustomConfigChange("dropout", value)}
                    min={0}
                    max={0.8}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Prevents overfitting by randomly dropping connections
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Bidirectional GRU</label>
                    <p className="text-xs text-muted-foreground">Process sequences in both directions</p>
                  </div>
                  <Switch
                    checked={customConfig.bidirectional}
                    onCheckedChange={(checked) => handleCustomConfigChange("bidirectional", checked)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Output Type</label>
                  <select
                    value={customConfig.outputType}
                    onChange={(e) => handleCustomConfigChange("outputType", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="classification">Classification</option>
                    <option value="regression">Regression</option>
                    <option value="sequence">Sequence Output</option>
                  </select>
                </div>

                {customConfig.outputType === "classification" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Classes</label>
                    <input
                      type="number"
                      value={customConfig.numClasses || 2}
                      onChange={(e) => handleCustomConfigChange("numClasses", Number.parseInt(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md"
                      min="2"
                      max="1000"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Architecture Visualization</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="inline-block bg-green-100 dark:bg-green-900 px-4 py-2 rounded-lg">
                        <span className="text-sm font-semibold">Input Embedding</span>
                        <div className="text-xs text-muted-foreground">Vocab → {currentConfig.embeddingDim}D</div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                    </div>

                    {Array.from({ length: currentConfig.numLayers }, (_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="text-center">
                          <div className="inline-block bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg">
                            <span className="text-sm font-semibold">
                              GRU Layer {i + 1}
                              {currentConfig.bidirectional && " (Bidirectional)"}
                            </span>
                            <div className="text-xs text-muted-foreground">
                              Hidden: {currentConfig.hiddenSize}
                              {currentConfig.bidirectional && " × 2"}
                            </div>
                          </div>
                        </div>
                        {i < currentConfig.numLayers - 1 && (
                          <div className="flex justify-center">
                            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="flex justify-center">
                      <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                    </div>

                    <div className="text-center">
                      <div className="inline-block bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-lg">
                        <span className="text-sm font-semibold">Output Layer</span>
                        <div className="text-xs text-muted-foreground">
                          {currentConfig.outputType === "classification"
                            ? `${currentConfig.numClasses} classes`
                            : currentConfig.outputType === "regression"
                              ? "1 value"
                              : "Sequence output"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Architecture Summary</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Parameters:</span>
                      <span className="font-semibold ml-2">
                        {(estimateParameters(currentConfig) / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Memory:</span>
                      <span className="font-semibold ml-2">
                        {((estimateParameters(currentConfig) * 4) / 1024 / 1024).toFixed(1)}MB
                      </span>
                    </div>
                  </div>
                </div>

                {estimateParameters(currentConfig) > 1000000 && (
                  <div className="flex items-start space-x-2 p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-amber-700 dark:text-amber-300">Large Model Warning</p>
                      <p className="text-amber-600 dark:text-amber-400">
                        This architecture has over 1M parameters and may require significant computational resources.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h3 className="font-semibold mb-4 flex items-center">
          <Zap className="h-5 w-5 mr-2" />
          GRU Gate Equations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Reset Gate</h4>
            <div className="bg-white dark:bg-gray-900 p-3 rounded font-mono text-xs">
              {"r_t = σ(W_r · [h_{t-1}, x_t] + b_r)"}
            </div>
            <p className="text-muted-foreground mt-1">Controls how much past information to forget</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Update Gate</h4>
            <div className="bg-white dark:bg-gray-900 p-3 rounded font-mono text-xs">
              {"z_t = σ(W_z · [h_{t-1}, x_t] + b_z)"}
            </div>
            <p className="text-muted-foreground mt-1">Controls how much new information to add</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Candidate Hidden State</h4>
            <div className="bg-white dark:bg-gray-900 p-3 rounded font-mono text-xs">
              {"h̃_t = tanh(W_h · [r_t * h_{t-1}, x_t] + b_h)"}
            </div>
            <p className="text-muted-foreground mt-1">New candidate values for updating hidden state</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Final Hidden State</h4>
            <div className="bg-white dark:bg-gray-900 p-3 rounded font-mono text-xs">
              {"h_t = (1 - z_t) * h_{t-1} + z_t * h̃_t"}
            </div>
            <p className="text-muted-foreground mt-1">Linear interpolation between old and new states</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Provide a named export so consumers can import { GruArchitectureBuilder }
export { GruArchitectureBuilder }
