"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Brain, Layers, AlertTriangle, Zap } from "lucide-react"

interface LstmArchitectureBuilderProps {
  onComplete: () => void
}

const presetArchitectures = [
  {
    id: "simple-lstm",
    name: "Simple LSTM",
    description: "Single-layer LSTM for basic sequence tasks",
    config: {
      hiddenSize: 128,
      numLayers: 1,
      bidirectional: false,
      dropout: 0.1,
      embeddingDim: 100,
      outputType: "classification",
    },
    complexity: "Low",
    parameters: "~150K",
    bestFor: "Short sequences, simple patterns",
    gates: "Standard LSTM gates (forget, input, output)",
  },
  {
    id: "bidirectional-lstm",
    name: "Bidirectional LSTM",
    description: "Processes sequences in both directions for better context",
    config: {
      hiddenSize: 128,
      numLayers: 1,
      bidirectional: true,
      dropout: 0.2,
      embeddingDim: 150,
      outputType: "classification",
    },
    complexity: "Medium",
    parameters: "~300K",
    bestFor: "Classification, sequence labeling",
    gates: "Forward + backward LSTM processing",
  },
  {
    id: "stacked-lstm",
    name: "Stacked LSTM",
    description: "Multi-layer LSTM for complex sequence modeling",
    config: {
      hiddenSize: 256,
      numLayers: 3,
      bidirectional: false,
      dropout: 0.3,
      embeddingDim: 200,
      outputType: "generation",
    },
    complexity: "High",
    parameters: "~800K",
    bestFor: "Text generation, complex patterns",
    gates: "Hierarchical LSTM layers",
  },
  {
    id: "many-to-one-lstm",
    name: "Many-to-One LSTM",
    description: "Sequence to single output for forecasting",
    config: {
      hiddenSize: 64,
      numLayers: 2,
      bidirectional: false,
      dropout: 0.2,
      embeddingDim: 0, // No embedding for time series
      outputType: "regression",
    },
    complexity: "Medium",
    parameters: "~100K",
    bestFor: "Time series forecasting, regression",
    gates: "Temporal pattern recognition",
  },
]

export function LstmArchitectureBuilder({ onComplete }: LstmArchitectureBuilderProps) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [customConfig, setCustomConfig] = useState({
    hiddenSize: 128,
    numLayers: 2,
    bidirectional: false,
    dropout: 0.2,
    embeddingDim: 150,
    outputType: "classification",
    sequenceLength: 256,
  })
  const [activeTab, setActiveTab] = useState("preset")

  const calculateParameters = (config: any) => {
    const { hiddenSize, numLayers, embeddingDim, bidirectional } = config
    const multiplier = bidirectional ? 2 : 1

    // LSTM has 4 gates, each with input and hidden weights
    const lstmParams = 4 * (embeddingDim + hiddenSize + 1) * hiddenSize * numLayers * multiplier
    const embeddingParams = embeddingDim > 0 ? embeddingDim * 10000 : 0 // Assuming vocab size of 10k
    const outputParams = hiddenSize * multiplier * 10 // Assuming 10 output classes

    return Math.round((embeddingParams + lstmParams + outputParams) / 1000) + "K"
  }

  const getComplexityWarning = (config: any) => {
    if (config.numLayers > 4) {
      return "Very deep LSTMs may suffer from optimization difficulties"
    }
    if (config.sequenceLength > 1000) {
      return "Very long sequences may cause memory issues during training"
    }
    if (config.hiddenSize > 512) {
      return "Large hidden size significantly increases training time"
    }
    if (config.bidirectional && config.numLayers > 2) {
      return "Deep bidirectional LSTMs are computationally expensive"
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
        <CardTitle className="text-2xl font-orbitron text-center">🟠 STEP 3: LSTM Architecture Builder</CardTitle>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Configure your LSTM architecture with memory cells and gates
        </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {presetArchitectures.map((preset) => (
                <Card
                  key={preset.id}
                  className={`cursor-pointer transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 ${
                    selectedPreset === preset.id
                      ? "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handlePresetSelect(preset.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold font-space-mono dark:text-gray-200">{preset.name}</h3>
                      <Badge variant="secondary">{preset.complexity}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{preset.description}</p>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between dark:text-gray-300">
                        <span>Hidden Size:</span>
                        <span>{preset.config.hiddenSize}</span>
                      </div>
                      <div className="flex justify-between dark:text-gray-300">
                        <span>Layers:</span>
                        <span>{preset.config.numLayers}</span>
                      </div>
                      <div className="flex justify-between dark:text-gray-300">
                        <span>Bidirectional:</span>
                        <span>{preset.config.bidirectional ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between dark:text-gray-300">
                        <span>Parameters:</span>
                        <span>{preset.parameters}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Best for:</strong> {preset.bestFor}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        <strong>Gates:</strong> {preset.gates}
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
                  <label className="text-sm font-semibold dark:text-gray-200">Hidden Size</label>
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
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {customConfig.hiddenSize} units (cell state + hidden state)
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold dark:text-gray-200">Number of Layers</label>
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
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {customConfig.numLayers} stacked LSTM layers
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold dark:text-gray-200">Embedding Dimension</label>
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
                      min={0}
                      step={25}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {customConfig.embeddingDim === 0
                        ? "No embedding (for numerical data)"
                        : `${customConfig.embeddingDim} dimensions`}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold dark:text-gray-200">Dropout Rate</label>
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
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {customConfig.dropout.toFixed(1)} dropout (applied between layers)
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold dark:text-gray-200">Bidirectional</label>
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

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold dark:text-gray-200">Output Type</label>
                    <select
                      value={customConfig.outputType}
                      onChange={(e) =>
                        setCustomConfig({
                          ...customConfig,
                          outputType: e.target.value,
                        })
                      }
                      className="text-sm border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    >
                      <option value="classification">Classification</option>
                      <option value="regression">Regression</option>
                      <option value="generation">Generation</option>
                      <option value="sequence_labeling">Sequence Labeling</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-gray-200">Architecture Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between dark:text-gray-300">
                      <span>Total Parameters:</span>
                      <span className="font-mono">{calculateParameters(currentConfig)}</span>
                    </div>
                    <div className="flex justify-between dark:text-gray-300">
                      <span>Memory Usage:</span>
                      <span className="font-mono">
                        ~{Math.round((Number.parseInt(calculateParameters(currentConfig)) * 4) / 1000)}MB
                      </span>
                    </div>
                    <div className="flex justify-between dark:text-gray-300">
                      <span>Training Speed:</span>
                      <span className="font-mono">
                        {currentConfig.bidirectional ? "Slow" : currentConfig.numLayers > 2 ? "Medium" : "Fast"}
                      </span>
                    </div>
                    <div className="flex justify-between dark:text-gray-300">
                      <span>Memory Cells:</span>
                      <span className="font-mono">{currentConfig.hiddenSize * currentConfig.numLayers}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4" />
                      <h4 className="font-semibold font-space-mono dark:text-gray-200">LSTM Gate Flow</h4>
                    </div>
                    <div className="text-xs space-y-1 dark:text-gray-300">
                      <div>1. Input → Embedding Layer ({customConfig.embeddingDim}D)</div>
                      <div>2. Forget Gate → Decides what to forget from cell state</div>
                      <div>3. Input Gate → Decides what new info to store</div>
                      <div>4. Cell State → Updated with new information</div>
                      <div>5. Output Gate → Controls hidden state output</div>
                      <div>
                        6. Hidden State → {currentConfig.bidirectional ? "Bidirectional" : "Unidirectional"} (
                        {customConfig.numLayers} layers)
                      </div>
                      <div>7. Final Output → {customConfig.outputType} head</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <h4 className="font-semibold font-space-mono mb-2 dark:text-gray-200">🔬 LSTM Gate Equations:</h4>
                    <div className="text-xs space-y-1 font-mono dark:text-gray-300">
                      <div>{"f_t = σ(W_f · [h_{t-1}, x_t] + b_f)  # Forget gate"}</div>
                      <div>{"i_t = σ(W_i · [h_{t-1}, x_t] + b_i)  # Input gate"}</div>
                      <div>{"C̃_t = tanh(W_C · [h_{t-1}, x_t] + b_C)  # Candidate"}</div>
                      <div>{"C_t = f_t * C_{t-1} + i_t * C̃_t       # Cell state"}</div>
                      <div>{"o_t = σ(W_o · [h_{t-1}, x_t] + b_o)  # Output gate"}</div>
                      <div>{"h_t = o_t * tanh(C_t)                 # Hidden state"}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {warning && (
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <h4 className="font-semibold font-space-mono text-yellow-800 dark:text-yellow-200">
                  Architecture Warning
                </h4>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">{warning}</p>
            </CardContent>
          </Card>
        )}

        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <h4 className="font-semibold font-space-mono mb-2 dark:text-gray-200">
              🔬 Understanding LSTM Architecture:
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• LSTM cells have separate cell state (C_t) and hidden state (h_t)</li>
              <li>• Three gates control information flow: forget, input, and output</li>
              <li>• Cell state acts as a "conveyor belt" carrying information across time</li>
              <li>• Bidirectional LSTMs process sequences forward and backward</li>
              <li>• Stacked layers allow hierarchical feature learning</li>
              <li>• Dropout prevents overfitting in deep LSTM networks</li>
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
