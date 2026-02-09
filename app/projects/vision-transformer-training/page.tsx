"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCcw } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

import { ViTTaskSelector } from "@/components/vit-trainer/vit-task-selector"
import { ViTDatasetSelector } from "@/components/vit-trainer/vit-dataset-selector"
import { ViTArchitectureConfigurator } from "@/components/vit-trainer/vit-architecture-configurator"
import { ViTTrainingPanel } from "@/components/vit-trainer/vit-training-panel"
import { ViTPredictionPlayground } from "@/components/vit-trainer/vit-prediction-playground"
import { ViTEvaluationDashboard } from "@/components/vit-trainer/vit-evaluation-dashboard"
import { MobileRestriction } from "@/components/mobile-restriction"

const steps = [
  { id: 1, title: "Task Selector", color: "bg-blue-500" },
  { id: 2, title: "Dataset & Preprocessing", color: "bg-purple-500" },
  { id: 3, title: "ViT Architecture", color: "bg-orange-500" },
  { id: 4, title: "Training Panel", color: "bg-yellow-500" },
  { id: 5, title: "Prediction Playground", color: "bg-green-500" },
  { id: 6, title: "Evaluation Dashboard", color: "bg-amber-600" },
]

export default function VisionTransformersPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [taskConfig, setTaskConfig] = useState<any>({})
  const [datasetConfig, setDatasetConfig] = useState<any>({})
  const [architectureConfig, setArchitectureConfig] = useState<any>({})
  const [trainingConfig, setTrainingConfig] = useState<any>({})
  const [predictionResults, setPredictionResults] = useState<any>({})

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ViTTaskSelector config={taskConfig} onConfigChange={setTaskConfig} onNext={handleNext} />
      case 2:
        return (
          <ViTDatasetSelector
            taskConfig={taskConfig}
            config={datasetConfig}
            onConfigChange={setDatasetConfig}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 3:
        return (
          <ViTArchitectureConfigurator
            taskConfig={taskConfig}
            datasetConfig={datasetConfig}
            config={architectureConfig}
            onConfigChange={setArchitectureConfig}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 4:
        return (
          <ViTTrainingPanel
            taskConfig={taskConfig}
            datasetConfig={datasetConfig}
            architectureConfig={architectureConfig}
            config={trainingConfig}
            onConfigChange={setTrainingConfig}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 5:
        return (
          <ViTPredictionPlayground
            taskConfig={taskConfig}
            datasetConfig={datasetConfig}
            architectureConfig={architectureConfig}
            trainingConfig={trainingConfig}
            results={predictionResults}
            onResultsChange={setPredictionResults}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 6:
        return (
          <ViTEvaluationDashboard
            taskConfig={taskConfig}
            datasetConfig={datasetConfig}
            architectureConfig={architectureConfig}
            trainingConfig={trainingConfig}
            predictionResults={predictionResults}
            onPrevious={handlePrevious}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <MobileRestriction />
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vision Transformers Training Lab
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-space-mono">
              Learn to adapt self-attention for computer vision tasks
            </p>
            <Badge variant="outline" className="mt-2">
              Interactive ViT Tutorial
            </Badge>
          </div>

          {/* Progress Bar */}
          <Card className="mb-8 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-orbitron text-lg font-semibold text-black dark:text-white">Training Progress</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentStep(1)
                    setTaskConfig({})
                    setDatasetConfig({})
                    setArchitectureConfig({})
                    setTrainingConfig({})
                    setPredictionResults({})
                  }}
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>

              <Progress value={(currentStep / 6) * 100} className="mb-4" />

              <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                {[
                  { id: 1, title: "Task Selection", description: "Choose your vision task" },
                  { id: 2, title: "Dataset Setup", description: "Select and prepare data" },
                  { id: 3, title: "ViT Configuration", description: "Configure transformer" },
                  { id: 4, title: "Training", description: "Train your model" },
                  { id: 5, title: "Prediction", description: "Test your model" },
                  { id: 6, title: "Evaluation", description: "Analyze performance" },
                ].map((step) => (
                  <div
                    key={step.id}
                    className={`text-center p-2 rounded-lg transition-all ${
                      step.id === currentStep
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : step.id < currentStep
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <div className="font-space-mono text-xs font-bold">STEP {step.id}</div>
                    <div className="font-space-mono text-xs">{step.title}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Step Content */}
          {renderCurrentStep()}

          {/* Back to Projects Button */}
          <div className="flex justify-center mt-12">
            <Link href="/projects">
              <Button variant="outline" className="font-space-mono">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
