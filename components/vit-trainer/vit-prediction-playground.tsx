"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Upload, Eye, Target, Layers } from "lucide-react"

interface ViTPredictionPlaygroundProps {
  taskConfig: any
  datasetConfig: any
  architectureConfig: any
  trainingConfig: any
  results: any
  onResultsChange: (results: any) => void
  onNext: () => void
  onPrevious: () => void
}

export function ViTPredictionPlayground({
  taskConfig,
  datasetConfig,
  architectureConfig,
  trainingConfig,
  results,
  onResultsChange,
  onNext,
  onPrevious,
}: ViTPredictionPlaygroundProps) {
  const [selectedImage, setSelectedImage] = useState("")
  const [prediction, setPrediction] = useState<any>(null)
  const [showAttention, setShowAttention] = useState(false)
  const [showFeatureMaps, setShowFeatureMaps] = useState(false)

  const sampleImages = [
    { id: "sample1", name: "Cat", url: "/placeholder.svg?height=224&width=224" },
    { id: "sample2", name: "Dog", url: "/placeholder.svg?height=224&width=224" },
    { id: "sample3", name: "Car", url: "/placeholder.svg?height=224&width=224" },
    { id: "sample4", name: "Flower", url: "/placeholder.svg?height=224&width=224" },
  ]

  const handleImageSelect = (imageId: string) => {
    setSelectedImage(imageId)
    // Simulate prediction
    const mockPrediction = {
      topPredictions: [
        { label: "Cat", confidence: 0.89, color: "bg-green-100 text-green-800" },
        { label: "Dog", confidence: 0.07, color: "bg-blue-100 text-blue-800" },
        { label: "Tiger", confidence: 0.03, color: "bg-yellow-100 text-yellow-800" },
        { label: "Lion", confidence: 0.01, color: "bg-orange-100 text-orange-800" },
      ],
      attentionMaps: true,
      processingTime: "0.12s",
    }
    setPrediction(mockPrediction)
    onResultsChange({
      ...results,
      selectedImage: imageId,
      prediction: mockPrediction,
    })
  }

  const handleFileUpload = () => {
    // Simulate file upload
    setSelectedImage("uploaded")
    const mockPrediction = {
      topPredictions: [
        { label: "Custom Image", confidence: 0.76, color: "bg-purple-100 text-purple-800" },
        { label: "Unknown", confidence: 0.24, color: "bg-gray-100 text-gray-800" },
      ],
      attentionMaps: true,
      processingTime: "0.15s",
    }
    setPrediction(mockPrediction)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-orbitron text-center">🟢 Step 5: Prediction Playground</CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-400 font-space-mono">
            Test your trained Vision Transformer with real images and visualize attention
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center font-orbitron">
                  <Upload className="w-5 h-5 mr-2" />
                  Select Test Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {sampleImages.map((image) => (
                    <Card
                      key={image.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedImage === image.id
                          ? "border-green-500 border-2 bg-green-50 dark:bg-green-950"
                          : "border hover:border-gray-400"
                      }`}
                      onClick={() => handleImageSelect(image.id)}
                    >
                      <CardContent className="p-4">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.name}
                          className="w-full h-32 object-cover rounded-md mb-2"
                        />
                        <p className="text-center font-space-mono text-sm">{image.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-space-mono">
                    Or upload your own image
                  </p>
                  <Button onClick={handleFileUpload} variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>

                {selectedImage && (
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={showAttention}
                          onChange={(e) => setShowAttention(e.target.checked)}
                        />
                        <span className="text-sm font-space-mono">Show Attention Maps</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={showFeatureMaps}
                          onChange={(e) => setShowFeatureMaps(e.target.checked)}
                        />
                        <span className="text-sm font-space-mono">Show Feature Maps</span>
                      </label>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Prediction Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center font-orbitron">
                  <Target className="w-5 h-5 mr-2" />
                  Prediction Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {prediction ? (
                  <>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                      <h4 className="font-semibold font-orbitron mb-3">Top Predictions</h4>
                      <div className="space-y-2">
                        {prediction.topPredictions.map((pred: any, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge className={pred.color}>{pred.label}</Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${pred.confidence * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-space-mono">{(pred.confidence * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm font-space-mono">
                      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                        <strong>Processing Time:</strong>
                        <br />
                        {prediction.processingTime}
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                        <strong>Model Confidence:</strong>
                        <br />
                        {(prediction.topPredictions[0].confidence * 100).toFixed(1)}%
                      </div>
                    </div>

                    {showAttention && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center font-orbitron text-lg">
                            <Eye className="w-4 h-4 mr-2" />
                            Attention Visualization
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                            <div className="text-center font-space-mono">
                              <Eye className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                              <p className="text-sm">Attention Map Overlay</p>
                              <p className="text-xs text-gray-500">Showing where ViT focuses</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {showFeatureMaps && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center font-orbitron text-lg">
                            <Layers className="w-4 h-4 mr-2" />
                            Feature Maps
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                              <div
                                key={i}
                                className="h-16 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center"
                              >
                                <span className="text-xs font-space-mono">Layer {i}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500 font-space-mono">Select an image to see ViT predictions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between mt-8">
            <Button onClick={onPrevious} variant="outline" className="font-space-mono">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button onClick={onNext} disabled={!prediction} className="font-space-mono">
              Next: Evaluation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
