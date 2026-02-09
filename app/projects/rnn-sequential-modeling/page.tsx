"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RotateCcw } from "lucide-react"
import { RnnTaskSelector } from "@/components/rnn-trainer/rnn-task-selector"
import { RnnDatasetSelector } from "@/components/rnn-trainer/rnn-dataset-selector"
import { RnnArchitectureBuilder } from "@/components/rnn-trainer/rnn-architecture-builder"
import { RnnTrainingPanel } from "@/components/rnn-trainer/rnn-training-panel"
import { RnnPredictionPlayground } from "@/components/rnn-trainer/rnn-prediction-playground"
import { RnnEvaluationDashboard } from "@/components/rnn-trainer/rnn-evaluation-dashboard"
import { MobileRestriction } from "@/components/mobile-restriction"

const steps = [
  { id: 1, title: "Task Selector", description: "Choose RNN task" },
  { id: 2, title: "Dataset & Preprocessing", description: "Select and prepare data" },
  { id: 3, title: "RNN Architecture", description: "Build vanilla RNN" },
  { id: 4, title: "Training Panel", description: "Configure and train" },
  { id: 5, title: "Prediction Playground", description: "Test your model" },
  { id: 6, title: "Evaluation Dashboard", description: "Analyze performance" },
]

export default function RnnSequentialDataPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleStepSelect = (stepId: number) => {
    setCurrentStep(stepId)
  }

  const handleReset = () => {
    setCurrentStep(1)
    setCompletedSteps([])
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <RnnTaskSelector onComplete={handleStepComplete} />
      case 2:
        return <RnnDatasetSelector onComplete={handleStepComplete} />
      case 3:
        return <RnnArchitectureBuilder onComplete={handleStepComplete} />
      case 4:
        return <RnnTrainingPanel onComplete={handleStepComplete} />
      case 5:
        return <RnnPredictionPlayground onComplete={handleStepComplete} />
      case 6:
        return <RnnEvaluationDashboard onComplete={handleStepComplete} />
      default:
        return <RnnTaskSelector onComplete={handleStepComplete} />
    }
  }

  const progress = (completedSteps.length / 6) * 100

  return (
    <>
      <MobileRestriction />
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-orbitron mb-4">
              Recurrent Neural Networks for Sequential Data Processing
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn to build, train, and fine-tune vanilla RNNs for sequence learning tasks. Master the fundamentals of
              recurrent architectures and sequential data processing.
            </p>
          </div>

          {/* Progress Bar */}
          <Card className="mb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-space-mono">Training Progress</CardTitle>
                <Button variant="outline" size="sm" onClick={handleReset} className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-600 font-space-mono">
                {completedSteps.length}/6 steps completed ({Math.round(progress)}%)
              </p>
            </CardHeader>
          </Card>

          {/* Steps Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            {steps.map((step, index) => (
              <Card
                key={step.id}
                className={`cursor-pointer transition-all duration-200 ${
                  currentStep === step.id
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : completedSteps.includes(step.id)
                      ? "bg-green-50 border-green-200"
                      : "hover:bg-gray-50"
                }`}
                onClick={() => handleStepSelect(step.id)}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2 ${
                      currentStep === step.id
                        ? "bg-blue-500 text-white"
                        : completedSteps.includes(step.id)
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.id}
                  </div>
                  <p className="text-xs font-space-mono font-semibold mb-1">STEP {step.id}</p>
                  <p className="text-xs text-gray-600">{step.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Current Step Content */}
          <div className="mb-8">{renderCurrentStep()}</div>

          {/* Back to Projects Button */}
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => (window.location.href = "/projects")} className="font-space-mono">
              ← Back to Projects
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
