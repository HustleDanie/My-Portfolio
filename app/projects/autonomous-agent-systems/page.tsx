"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"
import { MobileRestriction } from "@/components/mobile-restriction"

// Import step components
import { AgenticTaskSelector } from "@/components/agentic-trainer/agentic-task-selector"
import { AgentFrameworkSelector } from "@/components/agentic-trainer/agent-framework-selector"
import { AgentConfigurationPanel } from "@/components/agentic-trainer/agent-configuration-panel"
import { AgentExecutionViewer } from "@/components/agentic-trainer/agent-execution-viewer"
import { PredictionPlayground } from "@/components/agentic-trainer/prediction-playground"
import { PerformanceDashboard } from "@/components/agentic-trainer/performance-dashboard"

const steps = [
  {
    id: 1,
    title: "Agentic Task Selector",
    description: "Choose from 20+ real-world autonomous agent tasks",
    component: "task-selector",
  },
  {
    id: 2,
    title: "Agent Framework Selector",
    description: "Select agent architecture and reasoning approach",
    component: "framework-selector",
  },
  {
    id: 3,
    title: "Agent Configuration Panel",
    description: "Configure tools, memory, and reasoning strategies",
    component: "configuration-panel",
  },
  {
    id: 4,
    title: "Agent Execution Viewer",
    description: "Watch your agent execute tasks step-by-step",
    component: "execution-viewer",
  },
  {
    id: 5,
    title: "Prediction Playground",
    description: "Interact with agent outputs and provide feedback",
    component: "prediction-playground",
  },
  {
    id: 6,
    title: "Performance Dashboard",
    description: "Analyze agent performance and export results",
    component: "performance-dashboard",
  },
]

export default function AutonomousAgentSystemsPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [config, setConfig] = useState({
    task: "",
    framework: "",
    tools: [],
    memory: {},
    reasoning: "",
    execution: {},
    results: {},
  })

  const handleStepComplete = (stepData: any) => {
    setConfig((prev) => ({ ...prev, ...stepData }))
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setConfig({
      task: "",
      framework: "",
      tools: [],
      memory: {},
      reasoning: "",
      execution: {},
      results: {},
    })
  }

  const renderCurrentStep = () => {
    const currentStepData = steps[currentStep - 1]

    switch (currentStepData.component) {
      case "task-selector":
        return <AgenticTaskSelector onTaskSelect={(task) => handleStepComplete({ task })} selectedTask={config.task} />
      case "framework-selector":
        return (
          <AgentFrameworkSelector
            onFrameworkSelect={(framework) => handleStepComplete({ framework })}
            selectedFramework={config.framework}
          />
        )
      case "configuration-panel":
        return (
          <AgentConfigurationPanel
            onConfigComplete={(agentConfig) => handleStepComplete({ agentConfig })}
            config={config}
          />
        )
      case "execution-viewer":
        return (
          <AgentExecutionViewer
            onExecutionComplete={(execution) => handleStepComplete({ execution })}
            config={config}
          />
        )
      case "prediction-playground":
        return (
          <PredictionPlayground
            onPlaygroundComplete={(playground) => handleStepComplete({ playground })}
            config={config}
          />
        )
      case "performance-dashboard":
        return <PerformanceDashboard config={config} />
      default:
        return null
    }
  }

  return (
    <>
      <MobileRestriction />
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 pt-32">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/projects")}
                className="font-space-mono"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
              <Button variant="outline" onClick={handleReset} className="font-space-mono">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            <h1 className="font-orbitron text-4xl lg:text-5xl font-bold text-black dark:text-white mb-6">
              Autonomous Agent Systems
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-space-mono leading-relaxed max-w-4xl mb-8">
              Master the fundamentals of agentic AI systems through hands-on experience with autonomous agents. Learn
              how AI agents reason, use tools, maintain memory, and execute complex multi-step tasks across diverse
              real-world scenarios.
            </p>

            {/* Progress Indicator */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-orbitron text-xl">
                    Step {currentStep}: {steps[currentStep - 1].title}
                  </CardTitle>
                  <Badge variant="outline" className="font-space-mono">
                    {currentStep} of {steps.length}
                  </Badge>
                </div>
                <CardDescription className="font-space-mono">{steps[currentStep - 1].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={(currentStep / steps.length) * 100} className="h-2" />
                <div className="flex justify-between mt-4">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex flex-col items-center cursor-pointer transition-colors ${
                        index + 1 <= currentStep
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-400 dark:text-gray-600"
                      }`}
                      onClick={() => index + 1 <= currentStep && setCurrentStep(index + 1)}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                          index + 1 === currentStep
                            ? "bg-blue-600 text-white"
                            : index + 1 < currentStep
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                        }`}
                      >
                        {step.id}
                      </div>
                      <span className="text-xs font-space-mono text-center hidden lg:block">{step.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Step Content */}
          <div className="mb-12">{renderCurrentStep()}</div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handleStepBack} disabled={currentStep === 1} className="font-space-mono">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Step
            </Button>

            <div className="text-center">
              <p className="text-sm font-space-mono text-gray-600 dark:text-gray-400">
                Complete each step to build and evaluate your autonomous agent
              </p>
            </div>

            <Button
              onClick={() => setCurrentStep(Math.min(currentStep + 1, steps.length))}
              disabled={currentStep === steps.length}
              className="font-space-mono"
            >
              Next Step
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
