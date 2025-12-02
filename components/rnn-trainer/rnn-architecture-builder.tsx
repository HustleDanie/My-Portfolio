"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Brain, Layers, AlertTriangle, Info } from "lucide-react"

interface RnnArchitectureBuilderProps {
  onComplete: () => void
}

const presetArchitectures = [
  {
    id: "simple-rnn",
    name: "Simple RNN",
    description: "Basic single-layer RNN for beginners",
    config: {
      hiddenSize: 64,
      numLayers: 1,
      bidirectional: false,
      dropout: 0.0,
      embeddingDim: 100,
    },
    complexity: "Low",
    parameters: "~50K",
    bestFor: "Short sequences, simple patterns",
  },
  {
    id: "deep-rnn",
    name: "Deep RNN",
    description: "Multi-layer RNN for complex patterns",
    config: {
      hiddenSize: 128,
      numLayers: 3,
      bidirectional: false,
      dropout: 0.2,
      embeddingDim: 200,
    },
    complexity: "Medium",
    parameters: "~200K",
    bestFor: "Medium sequences, pattern recognition",
  },
  {
    id: "bidirectional-rnn",
    name: "Bidirectional RNN",
    description: "Processes sequences in both directions",
    config: {
      hiddenSize: 128,
      numLayers: 2,
      bidirectional: true,
      dropout: 0.3,
      embeddingDim: 150,
    },
    complexity: "High",
    parameters: "~400K",
    bestFor: "Classification, sequence labeling",
  },
]

export function RnnArchitectureBuilder({ onComplete }: RnnArchitectureBuilderProps) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [customConfig, setCustomConfig] = useState({
    hiddenSize: 128,
    numLayers: 2,
    bidirectional: false,
    dropout: 0.2,
    embeddingDim: 150,
    sequenceLength: 100,
  })
  const [activeTab, setActiveTab] = useState("preset")

  const calculateParameters = (config: any) => {
    const { hiddenSize, numLayers, embeddingDim, bidirectional } = config
    const multiplier = bidirectional ? 2 : 1
    const embeddingParams = embeddingDim * 10000 // Assuming vocab size of 10k
    const rnnParams = (embeddingDim + hiddenSize + 1) * hiddenSize * numLayers * multiplier
    const outputParams = hiddenSize * multiplier * 2 // Assuming binary classification
    return Math.round((embeddingParams + rnnParams + outputParams) / 1000) + "K"
  }

  const getComplexityWarning = (config: any) => {
    if (config.numLayers > 3) {
      return "Deep RNNs may suffer from vanishing gradients"
    }
    if (config.sequenceLength > 150) {
      return "Long sequences may cause information loss in vanilla RNNs"
    }
    if (config.hiddenSize > 256) {
      return "Large hidden size increases training time significantly"
    }
    return null
  }

  const handlePresetSelect = (presetId: string) => {
    setSelectedPreset(presetId)
    const preset = presetArchitectures.find((p) => p.id === presetId)
    if (preset) {
      setCustomConfig({ ...customConfig, ...preset.config })
    }
  }

  const handleContinue = () => {
    onComplete()
  }

  const currentConfig =
    activeTab === "preset" && selectedPreset
      ? presetArchitectures.find((p) => p.id === selectedPreset)?.config || customConfig
      : customConfig

  const warning = getComplexityWarning(currentConfig)

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron text-center">
          🟠 STEP 3: Vanilla RNN Architecture Builder
        </CardTitle>
        <p className="text-center text-gray-600">Configure your RNN architecture (strictly vanilla RNN cells only)</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preset" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Preset Architectures
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Custom Builder
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preset" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {presetArchitectures.map((preset) => (
                <Card
                  key={preset.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedPreset === preset.id ? "ring-2 ring-orange-500 bg-orange-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => handlePresetSelect(preset.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold font-space-mono">{preset.name}</h3>
                      <Badge variant="secondary">{preset.complexity}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{preset.description}</p>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Hidden Size:</span>
                        <span>{preset.config.hiddenSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Layers:</span>
                        <span>{preset.config.numLayers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bidirectional:</span>
                        <span>{preset.config.bidirectional ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Parameters:</span>
                        <span>{preset.parameters}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-gray-600">
                        <strong>Best for:</strong> {preset.bestFor}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold">Hidden Size</label>
                  <div className="mt-2">
                    <Slider
                      value={[customConfig.hiddenSize]}
                      onValueChange={(value) =>
                        setCustomConfig({
                          ...customConfig,
                          hiddenSize: value[0],
                        })
                      }
                      max={512}
                      min={32}
                      step={32}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-600 mt-1">{customConfig.hiddenSize} units</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold">Number of Layers</label>
                  <div className="mt-2">
                    <Slider
                      value={[customConfig.numLayers]}
                      onValueChange={(value) =>
                        setCustomConfig({
                          ...customConfig,
                          numLayers: value[0],
                        })
                      }
                      max={6}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-600 mt-1">{customConfig.numLayers} layers</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold">Embedding Dimension</label>
                  <div className="mt-2">
                    <Slider
                      value={[customConfig.embeddingDim]}
                      onValueChange={(value) =>
                        setCustomConfig({
                          ...customConfig,
                          embeddingDim: value[0],
                        })
                      }
                      max={300}
                      min={50}
                      step={25}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-600 mt-1">{customConfig.embeddingDim} dimensions</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold">Dropout Rate</label>
                  <div className="mt-2">
                    <Slider
                      value={[customConfig.dropout]}
                      onValueChange={(value) =>
                        setCustomConfig({
                          ...customConfig,
                          dropout: value[0],
                        })
                      }
                      max={0.5}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-600 mt-1">{customConfig.dropout.toFixed(1)} dropout</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">Bidirectional</label>
                  <Switch
                    checked={customConfig.bidirectional}
                    onCheckedChange={(checked) =>
                      setCustomConfig({
                        ...customConfig,
                        bidirectional: checked,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Card className="bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-lg">Architecture Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Parameters:</span>
                      <span className="font-mono">{calculateParameters(currentConfig)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory Usage:</span>
                      <span className="font-mono">
                        ~{Math.round((Number.parseInt(calculateParameters(currentConfig)) * 4) / 1000)}MB
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Training Speed:</span>
                      <span className="font-mono">
                        {currentConfig.bidirectional ? "Slow" : currentConfig.numLayers > 2 ? "Medium" : "Fast"}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4" />
                      <h4 className="font-semibold font-space-mono">RNN Architecture Flow</h4>
                    </div>
                    <div className="text-xs space-y-1">
                      <div>1. Input → Embedding Layer</div>
                      <div>2. Embedding → RNN Layers ({currentConfig.numLayers})</div>
                      <div>3. Hidden States → {currentConfig.bidirectional ? "Bidirectional" : "Unidirectional"}</div>
                      <div>4. Final Hidden → Classifier</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {warning && (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <h4 className="font-semibold font-space-mono text-yellow-800">Architecture Warning</h4>
              </div>
              <p className="text-sm text-yellow-700 mt-1">{warning}</p>
            </CardContent>
          </Card>
        )}

        <Card className="bg-green-50">
          <CardContent className="p-4">
            <h4 className="font-semibold font-space-mono mb-2">🧠 Understanding Vanilla RNNs:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Hidden state h(t) = tanh(W_hh * h(t-1) + W_ih * x(t) + b)</li>
              <li>• Information flows through time via hidden state</li>
              <li>• Gradients can vanish exponentially with sequence length</li>
              <li>• Best for sequences under 100 time steps</li>
              <li>• Bidirectional RNNs see future context but double parameters</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={handleContinue} className="px-8 py-2 font-space-mono">
            Continue to Training Panel →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
