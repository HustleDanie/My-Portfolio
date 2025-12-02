"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, ImageIcon, Target, Eye, Zap, Camera, RefreshCw, Layers, BarChart3 } from "lucide-react"

interface PredictionPlaygroundProps {
  trainingState: any
  updateTrainingState: (updates: any) => void
  onNext: () => void
  onPrevious: () => void
  currentStep: number
  totalSteps: number
}

const sampleImages = [
  { id: 1, name: "Cat", url: "/placeholder.svg?height=150&width=150", category: "animal" },
  { id: 2, name: "Dog", url: "/placeholder.svg?height=150&width=150", category: "animal" },
  { id: 3, name: "Car", url: "/placeholder.svg?height=150&width=150", category: "vehicle" },
  { id: 4, name: "Airplane", url: "/placeholder.svg?height=150&width=150", category: "vehicle" },
  { id: 5, name: "Flower", url: "/placeholder.svg?height=150&width=150", category: "nature" },
  { id: 6, name: "Building", url: "/placeholder.svg?height=150&width=150", category: "architecture" },
]

const mockPredictions = [
  { class: "Cat", confidence: 0.92, color: "bg-green-500" },
  { class: "Dog", confidence: 0.05, color: "bg-gray-300" },
  { class: "Bird", confidence: 0.02, color: "bg-gray-300" },
  { class: "Horse", confidence: 0.01, color: "bg-gray-300" },
]

export function CNNPredictionPlayground({
  trainingState,
  updateTrainingState,
  onNext,
  onPrevious,
}: PredictionPlaygroundProps) {
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [predictions, setPredictions] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showFeatureMaps, setShowFeatureMaps] = useState(false)
  const [showGradCAM, setShowGradCAM] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleImageSelect = (image: any) => {
    setSelectedImage(image)
    setPredictions([])
    setShowFeatureMaps(false)
    setShowGradCAM(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setUploadedImage(imageUrl)
        setSelectedImage({ id: "uploaded", name: "Uploaded Image", url: imageUrl, category: "custom" })
        setPredictions([])
      }
      reader.readAsDataURL(file)
    }
  }

  const runPrediction = () => {
    if (!selectedImage) return

    setIsProcessing(true)

    // Simulate prediction process
    setTimeout(() => {
      // Generate realistic predictions based on image
      const basePredictions = [...mockPredictions]

      // Adjust predictions based on selected image
      if (selectedImage.name.toLowerCase().includes("cat")) {
        basePredictions[0] = { class: "Cat", confidence: 0.89 + Math.random() * 0.1, color: "bg-green-500" }
        basePredictions[1] = { class: "Dog", confidence: 0.05 + Math.random() * 0.05, color: "bg-gray-300" }
      } else if (selectedImage.name.toLowerCase().includes("dog")) {
        basePredictions[0] = { class: "Dog", confidence: 0.85 + Math.random() * 0.1, color: "bg-green-500" }
        basePredictions[1] = { class: "Cat", confidence: 0.08 + Math.random() * 0.05, color: "bg-gray-300" }
      }

      setPredictions(basePredictions)
      setIsProcessing(false)
    }, 2000)
  }

  const toggleFeatureMaps = () => {
    setShowFeatureMaps(!showFeatureMaps)
  }

  const toggleGradCAM = () => {
    setShowGradCAM(!showGradCAM)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full">
          <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="font-space-mono text-sm text-green-600 dark:text-green-400">CNN Prediction Playground</span>
        </div>
        <h2 className="text-3xl font-bold font-orbitron text-gray-900 dark:text-white">Test Your Trained Model</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Upload images or select from our samples to see how your CNN performs. Explore feature maps and attention
          visualizations to understand what your model learned.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center space-x-2">
                <ImageIcon className="w-5 h-5" />
                <span>Select Test Image</span>
              </CardTitle>
              <CardDescription>Choose an image to test your trained CNN model</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="samples" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="samples">Sample Images</TabsTrigger>
                  <TabsTrigger value="upload">Upload Image</TabsTrigger>
                </TabsList>

                <TabsContent value="samples" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {sampleImages.map((image) => (
                      <div
                        key={image.id}
                        className={`
                          cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-md
                          ${
                            selectedImage?.id === image.id
                              ? "border-green-500 shadow-lg"
                              : "border-gray-200 dark:border-gray-700"
                          }
                        `}
                        onClick={() => handleImageSelect(image)}
                      >
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.name}
                          className="w-full h-24 object-cover rounded-t-lg"
                        />
                        <div className="p-2 text-center">
                          <p className="text-sm font-medium">{image.name}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {image.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold mb-2">Upload Your Image</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">PNG, JPG up to 10MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Choose File
                      </Button>
                    </label>
                  </div>

                  {uploadedImage && (
                    <div className="text-center">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded"
                        className="max-w-full h-48 object-contain mx-auto rounded-lg border"
                      />
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {/* Selected Image Preview */}
              {selectedImage && (
                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-orbitron">Selected Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <img
                        src={selectedImage.url || "/placeholder.svg"}
                        alt={selectedImage.name}
                        className="max-w-full h-48 object-contain mx-auto rounded-lg border"
                      />
                      <div>
                        <p className="font-semibold">{selectedImage.name}</p>
                        <Badge variant="outline" className="mt-1">
                          {selectedImage.category}
                        </Badge>
                      </div>
                      <Button onClick={runPrediction} disabled={isProcessing} className="w-full font-space-mono">
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Run Prediction
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Prediction Results */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Prediction Results</span>
              </CardTitle>
              <CardDescription>Model predictions with confidence scores</CardDescription>
            </CardHeader>
            <CardContent>
              {predictions.length > 0 ? (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {predictions.map((pred, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{pred.class}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {(pred.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              idx === 0 ? "bg-green-500" : "bg-gray-400"
                            }`}
                            style={{ width: `${pred.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Top Prediction */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="text-center">
                      <p className="text-sm text-green-600 dark:text-green-400 mb-1">Top Prediction</p>
                      <p className="text-2xl font-bold font-orbitron text-green-700 dark:text-green-300">
                        {predictions[0]?.class}
                      </p>
                      <p className="text-lg text-green-600 dark:text-green-400">
                        {(predictions[0]?.confidence * 100).toFixed(1)}% confidence
                      </p>
                    </div>
                  </div>

                  {/* Visualization Options */}
                  <div className="space-y-3">
                    <h4 className="font-semibold font-space-mono text-gray-700 dark:text-gray-300">
                      Visualization Options:
                    </h4>
                    <div className="flex space-x-2">
                      <Button
                        onClick={toggleFeatureMaps}
                        variant={showFeatureMaps ? "default" : "outline"}
                        size="sm"
                        className="font-space-mono"
                      >
                        <Layers className="w-4 h-4 mr-2" />
                        Feature Maps
                      </Button>
                      <Button
                        onClick={toggleGradCAM}
                        variant={showGradCAM ? "default" : "outline"}
                        size="sm"
                        className="font-space-mono"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Grad-CAM
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select an image and run prediction to see results</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Feature Maps Visualization */}
          {showFeatureMaps && predictions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-orbitron text-lg flex items-center space-x-2">
                  <Layers className="w-5 h-5" />
                  <span>Feature Maps</span>
                </CardTitle>
                <CardDescription>Visualizing what the CNN learned at different layers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded opacity-70" />
                      </div>
                      <p className="text-xs text-center text-gray-600 dark:text-gray-400">Filter {i + 1}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                  These feature maps show what patterns the CNN detected in your image
                </p>
              </CardContent>
            </Card>
          )}

          {/* Grad-CAM Visualization */}
          {showGradCAM && predictions.length > 0 && selectedImage && (
            <Card>
              <CardHeader>
                <CardTitle className="font-orbitron text-lg flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Grad-CAM Heatmap</span>
                </CardTitle>
                <CardDescription>Areas the model focused on for its prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <img
                      src={selectedImage.url || "/placeholder.svg"}
                      alt="Original"
                      className="w-48 h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-yellow-500/20 to-transparent rounded-lg" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Red areas indicate where the model focused most for the "{predictions[0]?.class}" prediction
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Model Insights */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="font-orbitron text-lg flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span>Understanding Your Model</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">🎯 Interpreting Results:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• High confidence &gt;80% suggests strong prediction</li>
                <li>• Multiple similar confidences indicate uncertainty</li>
                <li>• Feature maps show learned patterns</li>
                <li>• Grad-CAM highlights important image regions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔍 What to Look For:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Does the model focus on relevant features?</li>
                <li>• Are predictions consistent across similar images?</li>
                <li>• Do feature maps make intuitive sense?</li>
                <li>• Is the model overly confident on unclear images?</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={onPrevious} variant="outline" className="font-space-mono">
          Previous Step
        </Button>
        <Button onClick={onNext} className="font-space-mono">
          Continue to Evaluation
          <BarChart3 className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
