"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Brain, Database, Layers, Play, Target, BarChart3 } from "lucide-react"
import Link from "next/link"

import { LstmTaskSelector } from "@/components/lstm-trainer/lstm-task-selector"
import { LstmDatasetSelector } from "@/components/lstm-trainer/lstm-dataset-selector"
import { LstmArchitectureBuilder } from "@/components/lstm-trainer/lstm-architecture-builder"
import { LstmTrainingPanel } from "@/components/lstm-trainer/lstm-training-panel"
import { LstmPredictionPlayground } from "@/components/lstm-trainer/lstm-prediction-playground"
import { LstmEvaluationDashboard } from "@/components/lstm-trainer/lstm-evaluation-dashboard"
import { MobileRestriction } from "@/components/mobile-restriction"

const steps = [
  { id: 1, title: "Task Selection", icon: Brain, color: "bg-blue-500" },
  { id: 2, title: "Dataset & Preprocessing", icon: Database, color: "bg-purple-500" },
  { id: 3, title: "LSTM Architecture", icon: Layers, color: "bg-orange-500" },
  { id: 4, title: "Training Configuration", icon: Play, color: "bg-yellow-500" },
  { id: 5, title: "Prediction Testing", icon: Target, color: "bg-green-500" },
  { id: 6, title: "Evaluation & Export", icon: BarChart3, color: "bg-red-500" },
]

export default function LstmSequenceLearningPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleStepComplete = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleStepSelect = (stepId: number) => {
    setCurrentStep(stepId)
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <LstmTaskSelector onComplete={handleStepComplete} />
      case 2:
        return <LstmDatasetSelector onComplete={handleStepComplete} />
      case 3:
        return <LstmArchitectureBuilder onComplete={handleStepComplete} />
      case 4:
        return <LstmTrainingPanel onComplete={handleStepComplete} />
      case 5:
        return <LstmPredictionPlayground onComplete={handleStepComplete} />
      case 6:
        return <LstmEvaluationDashboard onComplete={handleStepComplete} />
      default:
        return <LstmTaskSelector onComplete={handleStepComplete} />
    }
  }

  const progress = (currentStep / 6) * 100

  return (
    <>
      <MobileRestriction />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/projects">
              <Button variant="ghost" className="mb-4 hover:bg-gray-200 dark:hover:bg-gray-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            </Link>

            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LSTM Sequence Learning
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Master Long Short-Term Memory networks for advanced sequence modeling tasks including classification,
                prediction, generation, and time series forecasting
              </p>
            </div>

            {/* Progress Overview */}
            <Card className="max-w-4xl mx-auto mb-8">
              <CardHeader>
                <CardTitle className="text-center">Training Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Step {currentStep} of 6</span>
                    <span>{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  {steps.map((step) => {
                    const IconComponent = step.icon
                    const isActive = currentStep === step.id
                    const isCompleted = currentStep > step.id

                    return (
                      <button
                        key={step.id}
                        onClick={() => handleStepSelect(step.id)}
                        className={`p-3 rounded-lg text-center transition-all duration-200 ${
                          isActive
                            ? "bg-blue-100 dark:bg-blue-900 border-2 border-blue-500"
                            : isCompleted
                              ? "bg-green-100 dark:bg-green-900 border-2 border-green-500"
                              : "bg-gray-100 dark:bg-gray-700 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                            isActive ? "bg-blue-500" : isCompleted ? "bg-green-500" : "bg-gray-400"
                          }`}
                        >
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <div className="text-xs font-semibold dark:text-gray-200">{step.title}</div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Step Content */}
          <div className="flex justify-center">{renderCurrentStep()}</div>

          {/* Educational Footer */}
          <Card className="max-w-4xl mx-auto mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold font-space-mono mb-3 dark:text-gray-200">🧠 About LSTM Networks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <h4 className="font-semibold mb-2 dark:text-gray-200">Key Advantages:</h4>
                  <ul className="space-y-1">
                    <li>• Solves vanishing gradient problem</li>
                    <li>• Maintains long-term memory</li>
                    <li>• Three-gate architecture (forget, input, output)</li>
                    <li>• Separate cell state and hidden state</li>
                    <li>• Superior to vanilla RNNs for long sequences</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 dark:text-gray-200">Applications:</h4>
                  <ul className="space-y-1">
                    <li>• Natural language processing</li>
                    <li>• Time series forecasting</li>
                    <li>• Speech recognition</li>
                    <li>• Machine translation</li>
                    <li>• Sentiment analysis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
