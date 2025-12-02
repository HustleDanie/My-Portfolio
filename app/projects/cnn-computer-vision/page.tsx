"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Import step components
import { CNNTaskSelector } from "@/components/cnn-trainer/cnn-task-selector"
import { CNNDatasetSelector } from "@/components/cnn-trainer/cnn-dataset-selector"
import { CNNArchitectureBuilder } from "@/components/cnn-trainer/cnn-architecture-builder"
import { CNNTrainingPanel } from "@/components/cnn-trainer/cnn-training-panel"
import { CNNPredictionPlayground } from "@/components/cnn-trainer/cnn-prediction-playground"
import { CNNEvaluationDashboard } from "@/components/cnn-trainer/cnn-evaluation-dashboard"
import { MobileRestriction } from "@/components/mobile-restriction"

interface TrainingState {
  selectedTask: string
  selectedDataset: string
  architecture: any
  trainingConfig: any
  trainedModel: any
  evaluationResults: any
}

export default function CNNTrainingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [trainingState, setTrainingState] = useState<TrainingState>({
    selectedTask: "",
    selectedDataset: "",
    architecture: null,
    trainingConfig: null,
    trainedModel: null,
    evaluationResults: null,
  })

  const steps = [
    {
      id: 1,
      title: "Task Selector",
      description: "Choose your computer vision task",
      color: "bg-blue-500",
      component: CNNTaskSelector,
    },
    {
      id: 2,
      title: "Dataset & Preprocessing",
      description: "Select and prepare your image dataset",
      color: "bg-purple-500",
      component: CNNDatasetSelector,
    },
    {
      id: 3,
      title: "CNN Architecture",
      description: "Build your convolutional neural network",
      color: "bg-orange-500",
      component: CNNArchitectureBuilder,
    },
    {
      id: 4,
      title: "Training Panel",
      description: "Configure and monitor CNN training",
      color: "bg-yellow-500",
      component: CNNTrainingPanel,
    },
    {
      id: 5,
      title: "Prediction Playground",
      description: "Test your trained CNN model",
      color: "bg-green-500",
      component: CNNPredictionPlayground,
    },
    {
      id: 6,
      title: "Evaluation Dashboard",
      description: "Analyze model performance metrics",
      color: "bg-red-500",
      component: CNNEvaluationDashboard,
    },
  ]

  const currentStepData = steps[currentStep - 1]
  const CurrentStepComponent = currentStepData.component

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId)
  }

  const updateTrainingState = (updates: Partial<TrainingState>) => {
    setTrainingState((prev) => ({ ...prev, ...updates }))
  }

  return (
    <>
      <MobileRestriction />
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Progress Bar */}
        <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium font-space-mono text-gray-600 dark:text-gray-400">
                  Step {currentStep} of {steps.length}
                </span>
                <span className="text-sm font-medium font-space-mono text-gray-600 dark:text-gray-400">
                  {Math.round((currentStep / steps.length) * 100)}% Complete
                </span>
              </div>
              <Progress value={(currentStep / steps.length) * 100} className="h-2" />
            </div>

            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => handleStepClick(step.id)}
                    className={`
                    flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold font-space-mono
                    transition-all duration-200 hover:scale-105
                    ${
                      currentStep === step.id
                        ? `${step.color} text-white shadow-lg`
                        : currentStep > step.id
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }
                  `}
                  >
                    {currentStep > step.id ? "✓" : step.id}
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`
                    w-12 h-1 mx-2
                    ${currentStep > step.id ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}
                  `}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold font-orbitron text-gray-900 dark:text-white">{currentStepData.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 font-space-mono text-sm">{currentStepData.description}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CurrentStepComponent
            trainingState={trainingState}
            updateTrainingState={updateTrainingState}
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        </div>

        {/* Back to Projects */}
        <div className="text-center py-8">
          <Link href="/projects">
            <Button variant="outline" className="font-orbitron">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
