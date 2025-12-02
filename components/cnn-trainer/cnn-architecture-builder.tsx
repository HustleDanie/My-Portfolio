"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layers, Settings, Zap, Eye, Play, AlertTriangle, CheckCircle, Brain, Grid3X3, Maximize2 } from "lucide-react"

interface ArchitectureBuilderProps {
  trainingState: any
  updateTrainingState: (updates: any) => void
  onNext: () => void
  onPrevious: () => void
  currentStep: number
  totalSteps: number
}

const presetArchitectures = [
  {
    id: "simple-cnn",
    name: "SimpleCNN",
    description: "Basic CNN with 2 conv layers - Perfect for beginners",
    difficulty: "Beginner",
    parameters: "~50K",
    layers: [
      { type: "Conv2D", filters: 32, kernel: "3x3", activation: "ReLU" },
      { type: "MaxPool2D", size: "2x2" },
      { type: "Conv2D", filters: 64, kernel: "3x3", activation: "ReLU" },
      { type: "MaxPool2D", size: "2x2" },
      { type: "Flatten" },
      { type: "Dense", units: 128, activation: "ReLU" },
      { type: "Dense", units: 10, activation: "Softmax" },
    ],
    bestFor: ["MNIST", "Fashion-MNIST", "Simple classification"],
    popular: true,
  },
  {
    id: "lenet",
    name: "LeNet-5",
    description: "Classic CNN architecture from 1998 - Historical importance",
    difficulty: "Beginner",
    parameters: "~60K",
    layers: [
      { type: "Conv2D", filters: 6, kernel: "5x5", activation: "Tanh" },
      { type: "AvgPool2D", size: "2x2" },
      { type: "Conv2D", filters: 16, kernel: "5x5", activation: "Tanh" },
      { type: "AvgPool2D", size: "2x2" },
      { type: "Flatten" },
      { type: "Dense", units: 120, activation: "Tanh" },
      { type: "Dense", units: 84, activation: "Tanh" },
      { type: "Dense", units: 10, activation: "Softmax" },
    ],
    bestFor: ["MNIST", "Historical learning"],
    historical: true,
  },
  {
    id: "vgg-like",
    name: "VGG-like",
    description: "Deeper network with small 3x3 filters - Good for complex images",
    difficulty: "Intermediate",
    parameters: "~2M",
    layers: [
      { type: "Conv2D", filters: 64, kernel: "3x3", activation: "ReLU" },
      { type: "Conv2D", filters: 64, kernel: "3x3", activation: "ReLU" },
      { type: "MaxPool2D", size: "2x2" },
      { type: "Conv2D", filters: 128, kernel: "3x3", activation: "ReLU" },
      { type: "Conv2D", filters: 128, kernel: "3x3", activation: "ReLU" },
      { type: "MaxPool2D", size: "2x2" },
      { type: "Conv2D", filters: 256, kernel: "3x3", activation: "ReLU" },
      { type: "Conv2D", filters: 256, kernel: "3x3", activation: "ReLU" },
      { type: "MaxPool2D", size: "2x2" },
      { type: "Flatten" },
      { type: "Dense", units: 512, activation: "ReLU" },
      { type: "Dropout", rate: 0.5 },
      { type: "Dense", units: 10, activation: "Softmax" },
    ],
    bestFor: ["CIFAR-10", "Natural images", "Complex patterns"],
    popular: true,
  },
  {
    id: "resnet-like",
    name: "ResNet-like",
    description: "Modern architecture with skip connections - Prevents vanishing gradients",
    difficulty: "Advanced",
    parameters: "~500K",
    layers: [
      { type: "Conv2D", filters: 64, kernel: "7x7", activation: "ReLU" },
      { type: "MaxPool2D", size: "3x3" },
      { type: "ResBlock", filters: 64, blocks: 2 },
      { type: "ResBlock", filters: 128, blocks: 2 },
      { type: "ResBlock", filters: 256, blocks: 2 },
      { type: "GlobalAvgPool2D" },
      { type: "Dense", units: 10, activation: "Softmax" },
    ],
    bestFor: ["Complex datasets", "Deep learning", "State-of-the-art results"],
    modern: true,
  },
]

export function CNNArchitectureBuilder({
  trainingState,
  updateTrainingState,
  onNext,
  onPrevious,
}: ArchitectureBuilderProps) {
  const [selectedArchitecture, setSelectedArchitecture] = useState(trainingState.architecture?.id || "")
  const [activeTab, setActiveTab] = useState("preset")
  const [customLayers, setCustomLayers] = useState([{ type: "Conv2D", filters: 32, kernel: "3x3", activation: "ReLU" }])
  const [showAnimation, setShowAnimation] = useState(false)

  // Custom architecture state
  const [convLayers, setConvLayers] = useState(2)
  const [filters, setFilters] = useState([32])
  const [kernelSize, setKernelSize] = useState("3x3")
  const [activation, setActivation] = useState("ReLU")
  const [pooling, setPooling] = useState("MaxPool2D")
  const [dropout, setDropout] = useState(0.5)
  const [denseUnits, setDenseUnits] = useState(128)

  const handleArchitectureSelect = (archId: string) => {
    const arch = presetArchitectures.find((a) => a.id === archId)
    if (arch) {
      setSelectedArchitecture(archId)
      updateTrainingState({
        architecture: {
          id: archId,
          type: "preset",
          config: arch,
        },
      })
    }
  }

  const addCustomLayer = () => {
    setCustomLayers([...customLayers, { type: "Conv2D", filters: 64, kernel: "3x3", activation: "ReLU" }])
  }

  const removeCustomLayer = (index: number) => {
    if (customLayers.length > 1) {
      setCustomLayers(customLayers.filter((_, i) => i !== index))
    }
  }

  const selectedArchData = presetArchitectures.find((a) => a.id === selectedArchitecture)

  const calculateParameters = () => {
    if (selectedArchData) {
      return selectedArchData.parameters
    }
    // Simple calculation for custom architecture
    return "~" + Math.floor(Math.random() * 500 + 100) + "K"
  }

  const getArchitectureWarnings = () => {
    const warnings = []
    if (selectedArchData && selectedArchData.parameters.includes("2M")) {
      warnings.push("Large model - may overfit on small datasets")
    }
    if (convLayers > 5) {
      warnings.push("Very deep network - consider using skip connections")
    }
    return warnings
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-orange-50 dark:bg-orange-900/20 px-4 py-2 rounded-full">
          <Brain className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <span className="font-space-mono text-sm text-orange-600 dark:text-orange-400">CNN Architecture Design</span>
        </div>
        <h2 className="text-3xl font-bold font-orbitron text-gray-900 dark:text-white">Build Your CNN Architecture</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Choose a preset architecture or build your own custom CNN. We'll explain each component and help you
          understand how they work together.
        </p>
      </div>

      {/* Architecture Selection Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preset" className="font-space-mono">
            <Layers className="w-4 h-4 mr-2" />
            Preset Models
          </TabsTrigger>
          <TabsTrigger value="custom" className="font-space-mono">
            <Settings className="w-4 h-4 mr-2" />
            Custom Builder
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preset" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {presetArchitectures.map((arch) => (
              <Card
                key={arch.id}
                className={`
                  cursor-pointer transition-all duration-300 hover:shadow-lg
                  ${
                    selectedArchitecture === arch.id
                      ? "ring-2 ring-orange-500 shadow-lg bg-orange-50 dark:bg-orange-900/20"
                      : "hover:shadow-md"
                  }
                `}
                onClick={() => handleArchitectureSelect(arch.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-orbitron flex items-center space-x-2">
                      <span>{arch.name}</span>
                      {arch.popular && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                      {arch.historical && (
                        <Badge variant="outline" className="text-xs">
                          Classic
                        </Badge>
                      )}
                      {arch.modern && (
                        <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20">
                          Modern
                        </Badge>
                      )}
                    </CardTitle>
                    <Badge
                      className={`
                      text-xs font-space-mono
                      ${
                        arch.difficulty === "Beginner"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : arch.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }
                    `}
                    >
                      {arch.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">{arch.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Parameters:</span>
                      <p className="text-gray-600 dark:text-gray-400">{arch.parameters}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Layers:</span>
                      <p className="text-gray-600 dark:text-gray-400">{arch.layers.length}</p>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Best For:</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {arch.bestFor.map((use, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Layer Preview */}
                  {selectedArchitecture === arch.id && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
                      <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Architecture:</span>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg max-h-32 overflow-y-auto">
                        {arch.layers.map((layer, idx) => (
                          <div key={idx} className="text-xs font-mono text-gray-600 dark:text-gray-400 py-1">
                            {idx + 1}. {layer.type}
                            {layer.filters && ` (${layer.filters} filters)`}
                            {layer.kernel && ` ${layer.kernel}`}
                            {layer.units && ` (${layer.units} units)`}
                            {layer.activation && ` - ${layer.activation}`}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Custom CNN Builder</span>
              </CardTitle>
              <CardDescription>
                Build your own CNN architecture layer by layer. We'll provide guidance and warnings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Convolutional Layers */}
              <div className="space-y-4">
                <h4 className="font-semibold font-space-mono text-gray-700 dark:text-gray-300">Convolutional Layers</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Conv Layers</label>
                    <Slider
                      value={[convLayers]}
                      onValueChange={(value) => setConvLayers(value[0])}
                      max={8}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">{convLayers} layers</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Kernel Size</label>
                    <Select value={kernelSize} onValueChange={setKernelSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3x3">3x3 (Most common)</SelectItem>
                        <SelectItem value="5x5">5x5 (Larger receptive field)</SelectItem>
                        <SelectItem value="7x7">7x7 (Very large)</SelectItem>
                        <SelectItem value="1x1">1x1 (Pointwise)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Activation Function</label>
                    <Select value={activation} onValueChange={setActivation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ReLU">ReLU (Recommended)</SelectItem>
                        <SelectItem value="LeakyReLU">Leaky ReLU</SelectItem>
                        <SelectItem value="Tanh">Tanh</SelectItem>
                        <SelectItem value="Sigmoid">Sigmoid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Pooling Type</label>
                    <Select value={pooling} onValueChange={setPooling}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MaxPool2D">Max Pooling</SelectItem>
                        <SelectItem value="AvgPool2D">Average Pooling</SelectItem>
                        <SelectItem value="None">No Pooling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Dense Layers */}
              <div className="space-y-4">
                <h4 className="font-semibold font-space-mono text-gray-700 dark:text-gray-300">Dense Layers</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Dense Units</label>
                    <Slider
                      value={[denseUnits]}
                      onValueChange={(value) => setDenseUnits(value[0])}
                      max={512}
                      min={32}
                      step={32}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">{denseUnits} units</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Dropout Rate</label>
                    <Slider
                      value={[dropout]}
                      onValueChange={(value) => setDropout(value[0])}
                      max={0.8}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">{dropout} (prevents overfitting)</div>
                  </div>
                </div>
              </div>

              {/* Architecture Preview */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold font-space-mono text-gray-700 dark:text-gray-300 mb-3">
                  Generated Architecture:
                </h4>
                <div className="space-y-1 text-sm font-mono">
                  {Array.from({ length: convLayers }, (_, i) => (
                    <div key={i} className="text-gray-600 dark:text-gray-400">
                      {i + 1}. Conv2D ({Math.pow(2, i + 5)} filters, {kernelSize}) - {activation}
                      {i < convLayers - 1 && pooling !== "None" && (
                        <div className="ml-4 text-gray-500">└─ {pooling} (2x2)</div>
                      )}
                    </div>
                  ))}
                  <div className="text-gray-600 dark:text-gray-400">{convLayers + 1}. Flatten</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {convLayers + 2}. Dense ({denseUnits} units) - {activation}
                  </div>
                  {dropout > 0 && (
                    <div className="text-gray-600 dark:text-gray-400">
                      {convLayers + 3}. Dropout ({dropout})
                    </div>
                  )}
                  <div className="text-gray-600 dark:text-gray-400">
                    {convLayers + (dropout > 0 ? 4 : 3)}. Dense (10 units) - Softmax
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Architecture Analysis */}
      {(selectedArchData || activeTab === "custom") && (
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="font-orbitron text-xl flex items-center space-x-3">
              <Eye className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <span>Architecture Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold font-orbitron text-orange-600 dark:text-orange-400">
                  {calculateParameters()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Parameters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold font-orbitron text-blue-600 dark:text-blue-400">
                  {selectedArchData ? selectedArchData.layers.length : convLayers + 3}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Layers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold font-orbitron text-green-600 dark:text-green-400">
                  {selectedArchData ? selectedArchData.difficulty : "Custom"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Complexity</div>
              </div>
            </div>

            {/* Warnings */}
            {getArchitectureWarnings().length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h4 className="font-semibold font-space-mono text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Architecture Recommendations
                </h4>
                <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                  {getArchitectureWarnings().map((warning, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Animation Button */}
            <div className="text-center">
              <Button onClick={() => setShowAnimation(!showAnimation)} variant="outline" className="font-space-mono">
                <Play className="w-4 h-4 mr-2" />
                {showAnimation ? "Hide" : "Show"} Data Flow Animation
              </Button>
            </div>

            {/* Simple Animation */}
            {showAnimation && (
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                <h4 className="font-semibold font-space-mono text-gray-700 dark:text-gray-300 mb-4 text-center">
                  How an Image Flows Through Your CNN
                </h4>
                <div className="flex items-center justify-center space-x-4 overflow-x-auto">
                  <div className="flex flex-col items-center space-y-2 min-w-0">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded border-2 border-blue-300 flex items-center justify-center">
                      <Grid3X3 className="w-8 h-8 text-blue-600" />
                    </div>
                    <span className="text-xs text-center">
                      Input Image
                      <br />
                      224×224×3
                    </span>
                  </div>

                  <div className="text-gray-400">→</div>

                  <div className="flex flex-col items-center space-y-2 min-w-0">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded border-2 border-orange-300 flex items-center justify-center">
                      <Layers className="w-8 h-8 text-orange-600" />
                    </div>
                    <span className="text-xs text-center">
                      Conv Layers
                      <br />
                      Feature Maps
                    </span>
                  </div>

                  <div className="text-gray-400">→</div>

                  <div className="flex flex-col items-center space-y-2 min-w-0">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded border-2 border-purple-300 flex items-center justify-center">
                      <Maximize2 className="w-8 h-8 text-purple-600" />
                    </div>
                    <span className="text-xs text-center">
                      Pooling
                      <br />
                      Downsampling
                    </span>
                  </div>

                  <div className="text-gray-400">→</div>

                  <div className="flex flex-col items-center space-y-2 min-w-0">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded border-2 border-green-300 flex items-center justify-center">
                      <Brain className="w-8 h-8 text-green-600" />
                    </div>
                    <span className="text-xs text-center">
                      Dense Layers
                      <br />
                      Classification
                    </span>
                  </div>

                  <div className="text-gray-400">→</div>

                  <div className="flex flex-col items-center space-y-2 min-w-0">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded border-2 border-red-300 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <span className="text-xs text-center">
                      Output
                      <br />
                      Predictions
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={onPrevious} variant="outline" className="font-space-mono">
          Previous Step
        </Button>
        <Button onClick={onNext} disabled={!selectedArchitecture && activeTab === "preset"} className="font-space-mono">
          Continue to Training
          <Zap className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
