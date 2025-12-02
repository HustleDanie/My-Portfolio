"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Upload, Database, BarChart3, Eye, Settings } from "lucide-react"

interface RnnDatasetSelectorProps {
  onComplete: () => void
}

const presetDatasets = {
  text: [
    {
      id: "imdb",
      name: "IMDb Movie Reviews",
      description: "50K movie reviews for sentiment analysis",
      size: "25K train, 25K test",
      avgLength: "234 words",
      classes: 2,
      task: "Sentiment Analysis",
    },
    {
      id: "ag-news",
      name: "AG News",
      description: "News articles categorized by topic",
      size: "120K train, 7.6K test",
      avgLength: "45 words",
      classes: 4,
      task: "Text Classification",
    },
    {
      id: "shakespeare",
      name: "Shakespeare Corpus",
      description: "Complete works for character generation",
      size: "1.1M characters",
      avgLength: "Variable",
      classes: 65,
      task: "Character Generation",
    },
  ],
  timeseries: [
    {
      id: "weather",
      name: "Weather Data",
      description: "Temperature, humidity, pressure over time",
      size: "10K samples",
      avgLength: "24 hours",
      features: 5,
      task: "Time Series Forecasting",
    },
    {
      id: "stock",
      name: "Stock Prices",
      description: "Historical stock price movements",
      size: "5K samples",
      avgLength: "30 days",
      features: 6,
      task: "Time Series Forecasting",
    },
  ],
}

export function RnnDatasetSelector({ onComplete }: RnnDatasetSelectorProps) {
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("preset")
  const [preprocessing, setPreprocessing] = useState({
    maxLength: 128,
    minLength: 5,
    augmentation: false,
    normalization: true,
  })

  const handleDatasetSelect = (datasetId: string) => {
    setSelectedDataset(datasetId)
  }

  const handleContinue = () => {
    if (selectedDataset) {
      onComplete()
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron text-center">
          🟣 STEP 2: Dataset Selection & Preprocessing
        </CardTitle>
        <p className="text-center text-gray-600">Choose your dataset and configure preprocessing for RNN training</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preset" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Preset Datasets
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Custom
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preset" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold font-space-mono mb-3">📝 Text Datasets</h3>
                <div className="space-y-3">
                  {presetDatasets.text.map((dataset) => (
                    <Card
                      key={dataset.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedDataset === dataset.id ? "ring-2 ring-purple-500 bg-purple-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleDatasetSelect(dataset.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{dataset.name}</h4>
                          <Badge variant="secondary">{dataset.task}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{dataset.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Size: {dataset.size}</div>
                          <div>Avg Length: {dataset.avgLength}</div>
                          <div>Classes: {dataset.classes}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold font-space-mono mb-3">📈 Time Series Datasets</h3>
                <div className="space-y-3">
                  {presetDatasets.timeseries.map((dataset) => (
                    <Card
                      key={dataset.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedDataset === dataset.id ? "ring-2 ring-purple-500 bg-purple-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleDatasetSelect(dataset.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{dataset.name}</h4>
                          <Badge variant="secondary">{dataset.task}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{dataset.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Size: {dataset.size}</div>
                          <div>Length: {dataset.avgLength}</div>
                          <div>Features: {dataset.features}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Upload Your Dataset</h3>
                <p className="text-sm text-gray-600 mb-4">Support for .csv, .json, or .txt files</p>
                <Button variant="outline">Choose Files</Button>
                <div className="mt-4 text-xs text-gray-500">
                  <p>Expected format:</p>
                  <p>Text: columns 'text', 'label'</p>
                  <p>Time Series: columns 'timestamp', 'value'</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedDataset && (
          <div className="space-y-4">
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Preprocessing Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold">Max Sequence Length</label>
                    <div className="mt-1">
                      <input
                        type="range"
                        min="32"
                        max="512"
                        value={preprocessing.maxLength}
                        onChange={(e) =>
                          setPreprocessing({
                            ...preprocessing,
                            maxLength: Number.parseInt(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                      <div className="text-xs text-gray-600 mt-1">{preprocessing.maxLength} tokens/steps</div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Min Sequence Length</label>
                    <div className="mt-1">
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={preprocessing.minLength}
                        onChange={(e) =>
                          setPreprocessing({
                            ...preprocessing,
                            minLength: Number.parseInt(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                      <div className="text-xs text-gray-600 mt-1">{preprocessing.minLength} tokens/steps</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preprocessing.augmentation}
                      onChange={(e) =>
                        setPreprocessing({
                          ...preprocessing,
                          augmentation: e.target.checked,
                        })
                      }
                    />
                    <span className="text-sm">Data Augmentation</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preprocessing.normalization}
                      onChange={(e) =>
                        setPreprocessing({
                          ...preprocessing,
                          normalization: e.target.checked,
                        })
                      }
                    />
                    <span className="text-sm">Normalization</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4" />
                  <h4 className="font-semibold font-space-mono">Dataset Preview</h4>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold">Train/Val/Test Split</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Train:</span>
                        <span>70%</span>
                      </div>
                      <Progress value={70} className="h-2" />
                      <div className="flex justify-between">
                        <span>Val:</span>
                        <span>15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                      <div className="flex justify-between">
                        <span>Test:</span>
                        <span>15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold">Sequence Length Distribution</div>
                    <div className="h-20 bg-white rounded border flex items-end justify-center">
                      <BarChart3 className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold">Sample Data</div>
                    <div className="bg-white p-2 rounded border text-xs">
                      <div className="font-mono">
                        "This movie was amazing..."
                        <br />
                        Label: Positive
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold font-space-mono mb-2">⚠️ RNN Sequence Length Warning:</h4>
              <p className="text-sm text-gray-700">
                Vanilla RNNs struggle with long sequences due to vanishing gradients. Consider keeping sequences under
                100 steps for better performance.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Button onClick={handleContinue} disabled={!selectedDataset} className="px-8 py-2 font-space-mono">
            Continue to Architecture Builder →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
