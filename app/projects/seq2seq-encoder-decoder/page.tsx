"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Step Components
import { Seq2SeqTaskSelector } from "@/components/seq2seq-trainer/seq2seq-task-selector"
import { Seq2SeqDatasetSelector } from "@/components/seq2seq-trainer/seq2seq-dataset-selector"
import { Seq2SeqModelSelector } from "@/components/seq2seq-trainer/seq2seq-model-selector"
import { Seq2SeqTrainingPanel } from "@/components/seq2seq-trainer/seq2seq-training-panel"
import { Seq2SeqPredictionPlayground } from "@/components/seq2seq-trainer/seq2seq-prediction-playground"
import { Seq2SeqEvaluationDashboard } from "@/components/seq2seq-trainer/seq2seq-evaluation-dashboard"
import { MobileRestriction } from "@/components/mobile-restriction"

// Types
export interface Seq2SeqTrainingConfig {
  task: string
  dataset: any
  model: any
  training: any
  results: any
}

const SEQ2SEQ_STEPS = [
  { id: 1, title: "Task Selection", description: "Choose your text-to-text task" },
  { id: 2, title: "Dataset Setup", description: "Select and prepare your data" },
  { id: 3, title: "Model Configuration", description: "Configure your encoder-decoder transformer" },
  { id: 4, title: "Training", description: "Train your sequence-to-sequence model" },
  { id: 5, title: "Generation", description: "Test text generation" },
  { id: 6, title: "Evaluation", description: "Analyze model performance" },
]

export default function Seq2SeqEncoderDecoderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [config, setConfig] = useState<Seq2SeqTrainingConfig>({
    task: "",
    dataset: null,
    model: null,
    training: null,
    results: null,
  })

  const updateConfig = (key: keyof Seq2SeqTrainingConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetTraining = () => {
    setCurrentStep(1)
    setConfig({
      task: "",
      dataset: null,
      model: null,
      training: null,
      results: null,
    })
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Seq2SeqTaskSelector config={config} updateConfig={updateConfig} onNext={nextStep} />
      case 2:
        return (
          <Seq2SeqDatasetSelector config={config} updateConfig={updateConfig} onNext={nextStep} onPrev={prevStep} />
        )
      case 3:
        return <Seq2SeqModelSelector config={config} updateConfig={updateConfig} onNext={nextStep} onPrev={prevStep} />
      case 4:
        return <Seq2SeqTrainingPanel config={config} updateConfig={updateConfig} onNext={nextStep} onPrev={prevStep} />
      case 5:
        return (
          <Seq2SeqPredictionPlayground
            config={config}
            updateConfig={updateConfig}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 6:
        return <Seq2SeqEvaluationDashboard config={config} updateConfig={updateConfig} onPrev={prevStep} />
      default:
        return null
    }
  }

  return (
    <>
      <MobileRestriction />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Sequence-to-Sequence Learning
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-space-mono text-lg max-w-3xl mx-auto">
              Interactive platform for fine-tuning encoder-decoder transformers (T5, BART, mT5) for text-to-text tasks
            </p>
          </motion.div>

          {/* Progress Bar */}
          <Card className="mb-8 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-orbitron text-lg font-semibold text-black dark:text-white">Training Progress</h3>
                <Button variant="outline" size="sm" onClick={resetTraining} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>

              <Progress value={(currentStep / 6) * 100} className="mb-4" />

              <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                {SEQ2SEQ_STEPS.map((step) => (
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

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Back to Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" className="gap-2 font-space-mono" asChild>
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  )
}
