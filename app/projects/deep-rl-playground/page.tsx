"use client"

import { useState } from "react"
import { ArrowLeft, Download, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { RlTaskSelector } from "@/components/rl-trainer/rl-task-selector"
import { RlAlgorithmSelector } from "@/components/rl-trainer/rl-algorithm-selector"
import { RlAgentConfigurator } from "@/components/rl-trainer/rl-agent-configurator"
import { RlTrainingInterface } from "@/components/rl-trainer/rl-training-interface"
import { RlPredictionPlayground } from "@/components/rl-trainer/rl-prediction-playground"
import { RlEvaluationDashboard } from "@/components/rl-trainer/rl-evaluation-dashboard"
import { MobileRestriction } from "@/components/mobile-restriction"

interface RlConfig {
  task?: string
  algorithm?: string
  environment?: any
  agent?: any
  training?: any
  model?: any
}

const steps = [
  { id: 1, title: "Task Selector", description: "Choose RL environment and task type" },
  { id: 2, title: "Algorithm Selector", description: "Select and understand RL algorithm" },
  { id: 3, title: "Agent Configuration", description: "Configure agent and environment parameters" },
  { id: 4, title: "Training Interface", description: "Train your RL agent with real-time feedback" },
  { id: 5, title: "Prediction Playground", description: "Test and analyze trained agent behavior" },
  { id: 6, title: "Evaluation Dashboard", description: "Evaluate performance and export results" },
]

export default function DeepRlPlaygroundPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [config, setConfig] = useState<RlConfig>({})
  const [isTraining, setIsTraining] = useState(false)

  const handleTaskSelect = (task: string) => {
    setConfig((prev) => ({ ...prev, task }))
    setCurrentStep(2)
  }

  const handleAlgorithmSelect = (algorithm: string) => {
    setConfig((prev) => ({ ...prev, algorithm }))
    setCurrentStep(3)
  }

  const handleAgentConfig = (agentConfig: any) => {
    setConfig((prev) => ({ ...prev, agent: agentConfig }))
    setCurrentStep(4)
  }

  const handleTrainingComplete = (trainingResults: any) => {
    setConfig((prev) => ({ ...prev, training: trainingResults }))
    setCurrentStep(5)
  }

  const handleModelTrained = (model: any) => {
    setConfig((prev) => ({ ...prev, model }))
    setCurrentStep(6)
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <RlTaskSelector onTaskSelect={handleTaskSelect} selectedTask={config.task} />
      case 2:
        return <RlAlgorithmSelector onAlgorithmSelect={handleAlgorithmSelect} selectedAlgorithm={config.algorithm} />
      case 3:
        return <RlAgentConfigurator onConfigComplete={handleAgentConfig} config={config} />
      case 4:
        return <RlTrainingInterface onTrainingComplete={handleTrainingComplete} config={config} />
      case 5:
        return <RlPredictionPlayground onModelTrained={handleModelTrained} config={config} />
      case 6:
        return <RlEvaluationDashboard config={config} />
      default:
        return <RlTaskSelector onTaskSelect={handleTaskSelect} selectedTask={config.task} />
    }
  }

  return (
    <>
      <MobileRestriction />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/projects">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 font-space-mono">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Projects
                  </Button>
                </Link>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-700" />
                <div>
                  <h1 className="font-orbitron text-xl font-bold text-black dark:text-white">Deep RL Playground</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-space-mono">
                    Interactive Agent Training Laboratory
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="font-space-mono">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Guide
                </Button>
                <Button variant="outline" size="sm" className="font-space-mono">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-orbitron text-sm font-medium text-black dark:text-white">
                  Step {currentStep} of {steps.length}
                </span>
                <span className="font-space-mono text-sm text-gray-600 dark:text-gray-400">
                  {Math.round((currentStep / steps.length) * 100)}% Complete
                </span>
              </div>
              <Progress value={(currentStep / steps.length) * 100} className="h-2" />
            </div>

            {/* Step Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`p-3 rounded-lg border transition-all ${
                    step.id === currentStep
                      ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                      : step.id < currentStep
                        ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.id === currentStep
                          ? "bg-blue-500 text-white"
                          : step.id < currentStep
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {step.id}
                    </div>
                    <span className="font-orbitron text-xs font-medium text-black dark:text-white">{step.title}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-space-mono leading-tight">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-space-mono">{steps[currentStep - 1].description}</p>
          </div>

          {renderCurrentStep()}
        </main>

        {/* Back to Project Button */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <Link href="/projects">
            <Button className="font-space-mono shadow-lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
