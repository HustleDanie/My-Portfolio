"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Upload, Database, BarChart3, Eye, Settings, AlertCircle } from "lucide-react"

interface LstmDatasetSelectorProps {
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
      sequenceType: "Variable length text",
    },
    {
      id: "ag-news",
      name: "AG News",
      description: "News articles categorized by topic",
      size: "120K train, 7.6K test",
      avgLength: "45 words",
      classes: 4,
      task: "Text Classification",
      sequenceType: "Short text sequences",
    },
    {
      id: "conll2003",
      name: "CoNLL-2003 NER",
      description: "Named entity recognition dataset",
      size: "14K train, 3.5K test",
      avgLength: "14 tokens",
      classes: 9,
      task: "Sequence Labeling",
      sequenceType: "Token-level labels",
    },
    {
      id: "shakespeare",
      name: "Shakespeare Corpus",
      description: "Complete works for text generation",
      size: "1.1M characters",
      avgLength: "Variable",
      classes: 65,
      task: "Text Generation",
      sequenceType: "Character sequences",
    },
  ],
  timeseries: [
    {
      id: "weather",
      name: "Weather Time Series",
      description: "Temperature, humidity, pressure over time",
      size: "10K samples",
      avgLength: "168 hours (1 week)",
      features: 5,
      task: "Time Series Forecasting",
      sequenceType: "Multivariate sequences",
    },
    {
      id: "stock",
      name: "Stock Price Data",
      description: "Historical stock price movements",
      size: "5K samples",
      avgLength: "252 days (1 year)",
      features: 6,
      task: "Time Series Forecasting",
      sequenceType: "Financial time series",
    },
    {
      id: "air-quality",
      name: "Air Quality Index",
      description: "Pollution measurements over time",
      size: "8K samples",
      avgLength: "720 hours (1 month)",
      features: 8,
      task: "Time Series Forecasting",
      sequenceType: "Environmental data",
    },
  ],
  audio: [
    {
      id: "mfcc",
      name: "MFCC Audio Features",
      description: "Mel-frequency cepstral coefficients",
      size: "5K samples",
      avgLength: "100 frames",
      features: 13,
      task: "Audio Classification",
      sequenceType: "Audio feature sequences",
    },
  ],
}

export function LstmDatasetSelector({ onComplete }: LstmDatasetSelectorProps) {
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("preset")
  const [preprocessing, setPreprocessing] = useState({
    maxLength: 256,
    minLength: 10,
    padding: "post",
    truncation: true,
    normalization: true,
    windowSize: 50, // for time series
    stride: 1,
  })

  const handleDatasetSelect = (datasetId: string) => {
    setSelectedDataset(datasetId)
  }

  const handleContinue = () => {
    if (selectedDataset) {
      onComplete()
    }
  }

  const getSelectedDataset = () => {
    const allDatasets = [...presetDatasets.text, ...presetDatasets.timeseries, ...presetDatasets.audio]
    return allDatasets.find((d) => d.id === selectedDataset)
  }

  const selectedDatasetData = getSelectedDataset()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron text-center">
          🟣 STEP 2: Dataset Selection & Preprocessing
        </CardTitle>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Choose your dataset and configure preprocessing for LSTM training
        </p>
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
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="font-semibold font-space-mono mb-3 dark:text-gray-200">📝 Text Datasets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {presetDatasets.text.map((dataset) => (
                    <Card
                      key={dataset.id}
                      className={`cursor-pointer transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 ${
                        selectedDataset === dataset.id
                          ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => handleDatasetSelect(dataset.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold dark:text-gray-200">{dataset.name}</h4>
                          <Badge variant="secondary">{dataset.task}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{dataset.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="dark:text-gray-300">Size: {dataset.size}</div>
                          <div className="dark:text-gray-300">Avg Length: {dataset.avgLength}</div>
                          <div className="dark:text-gray-300">Classes: {dataset.classes}</div>
                          <div className="dark:text-gray-300">Type: {dataset.sequenceType}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold font-space-mono mb-3 dark:text-gray-200">📈 Time Series Datasets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {presetDatasets.timeseries.map((dataset) => (
                    <Card
                      key={dataset.id}
                      className={`cursor-pointer transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 ${
                        selectedDataset === dataset.id
                          ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => handleDatasetSelect(dataset.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold dark:text-gray-200">{dataset.name}</h4>
                          <Badge variant="secondary">{dataset.task}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{dataset.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="dark:text-gray-300">Size: {dataset.size}</div>
                          <div className="dark:text-gray-300">Length: {dataset.avgLength}</div>
                          <div className="dark:text-gray-300">Features: {dataset.features}</div>
                          <div className="dark:text-gray-300">Type: {dataset.sequenceType}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold font-space-mono mb-3 dark:text-gray-200">🎵 Audio Datasets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {presetDatasets.audio.map((dataset) => (
                    <Card
                      key={dataset.id}
                      className={`cursor-pointer transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 ${
                        selectedDataset === dataset.id
                          ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => handleDatasetSelect(dataset.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold dark:text-gray-200">{dataset.name}</h4>
                          <Badge variant="secondary">{dataset.task}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{dataset.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="dark:text-gray-300">Size: {dataset.size}</div>
                          <div className="dark:text-gray-300">Length: {dataset.avgLength}</div>
                          <div className="dark:text-gray-300">Features: {dataset.features}</div>
                          <div className="dark:text-gray-300">Type: {dataset.sequenceType}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600">
              <CardContent className="p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 dark:text-gray-200">Upload Your Dataset</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Support for .csv, .json, or .txt files</p>
                <Button variant="outline">Choose Files</Button>
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  <p>Expected formats:</p>
                  <p>Text: columns 'text', 'label' or 'sequence', 'tags'</p>
                  <p>Time Series: columns 'timestamp', 'value' or multiple features</p>
                  <p>Audio: columns 'features' (array) or separate feature columns</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedDataset && selectedDatasetData && (
          <div className="space-y-4">
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Preprocessing Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold dark:text-gray-200">Max Sequence Length</label>
                    <div className="mt-1">
                      <input
                        type="range"
                        min="32"
                        max="1024"
                        value={preprocessing.maxLength}
                        onChange={(e) =>
                          setPreprocessing({
                            ...preprocessing,
                            maxLength: Number.parseInt(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {preprocessing.maxLength} tokens/steps
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold dark:text-gray-200">Min Sequence Length</label>
                    <div className="mt-1">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={preprocessing.minLength}
                        onChange={(e) =>
                          setPreprocessing({
                            ...preprocessing,
                            minLength: Number.parseInt(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {preprocessing.minLength} tokens/steps
                      </div>
                    </div>
                  </div>

                  {selectedDatasetData.task.includes("Time Series") && (
                    <>
                      <div>
                        <label className="text-sm font-semibold dark:text-gray-200">Window Size</label>
                        <div className="mt-1">
                          <input
                            type="range"
                            min="10"
                            max="200"
                            value={preprocessing.windowSize}
                            onChange={(e) =>
                              setPreprocessing({
                                ...preprocessing,
                                windowSize: Number.parseInt(e.target.value),
                              })
                            }
                            className="w-full"
                          />
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {preprocessing.windowSize} time steps
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold dark:text-gray-200">Stride</label>
                        <div className="mt-1">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={preprocessing.stride}
                            onChange={(e) =>
                              setPreprocessing({
                                ...preprocessing,
                                stride: Number.parseInt(e.target.value),
                              })
                            }
                            className="w-full"
                          />
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {preprocessing.stride} step(s)
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preprocessing.truncation}
                      onChange={(e) =>
                        setPreprocessing({
                          ...preprocessing,
                          truncation: e.target.checked,
                        })
                      }
                    />
                    <span className="text-sm dark:text-gray-200">Truncate Long Sequences</span>
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
                    <span className="text-sm dark:text-gray-200">Normalization</span>
                  </label>

                  <div className="flex items-center space-x-2">
                    <label className="text-sm dark:text-gray-200">Padding:</label>
                    <select
                      value={preprocessing.padding}
                      onChange={(e) =>
                        setPreprocessing({
                          ...preprocessing,
                          padding: e.target.value,
                        })
                      }
                      className="text-sm border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    >
                      <option value="post">Post</option>
                      <option value="pre">Pre</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4" />
                  <h4 className="font-semibold font-space-mono dark:text-gray-200">Dataset Preview</h4>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold dark:text-gray-200">Train/Val/Test Split</div>
                    <div className="space-y-1">
                      <div className="flex justify-between dark:text-gray-300">
                        <span>Train:</span>
                        <span>70%</span>
                      </div>
                      <Progress value={70} className="h-2" />
                      <div className="flex justify-between dark:text-gray-300">
                        <span>Val:</span>
                        <span>15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                      <div className="flex justify-between dark:text-gray-300">
                        <span>Test:</span>
                        <span>15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold dark:text-gray-200">Sequence Length Distribution</div>
                    <div className="h-20 bg-white dark:bg-gray-700 rounded border flex items-end justify-center">
                      <BarChart3 className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold dark:text-gray-200">Sample Data</div>
                    <div className="bg-white dark:bg-gray-700 p-2 rounded border text-xs">
                      <div className="font-mono dark:text-gray-300">
                        {selectedDatasetData.task.includes("Time Series") ? (
                          <>
                            "23.5, 24.1, 23.8, 24.3..."
                            <br />
                            Target: 25.0
                          </>
                        ) : (
                          <>
                            "This movie was amazing..."
                            <br />
                            Label: Positive
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <h4 className="font-semibold font-space-mono text-yellow-800 dark:text-yellow-200">
                  LSTM Sequence Processing:
                </h4>
              </div>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• LSTMs can handle longer sequences than vanilla RNNs (up to 1000+ steps)</li>
                <li>• Memory cells maintain information across long sequences</li>
                <li>• Bidirectional LSTMs process sequences in both directions</li>
                <li>• Consider sequence length vs. computational cost trade-offs</li>
              </ul>
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
