"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Languages,
  RefreshCw,
  HelpCircle,
  Edit3,
  Newspaper,
  Palette,
  ArrowRight,
  CheckCircle,
  Zap,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Seq2SeqTrainingConfig } from "@/app/projects/seq2seq-encoder-decoder/page"

interface Seq2SeqTaskSelectorProps {
  config: Seq2SeqTrainingConfig
  updateConfig: (key: keyof Seq2SeqTrainingConfig, value: any) => void
  onNext: () => void
}

const TEXT_TO_TEXT_TASKS = [
  {
    id: "summarization",
    title: "Text Summarization",
    description: "Generate concise summaries from longer documents",
    icon: FileText,
    difficulty: "Beginner",
    examples: ["Article summaries", "Document abstracts", "Meeting notes"],
    datasets: ["CNN/DailyMail", "XSum", "SAMSum"],
    color: "from-blue-500 to-blue-600",
    estimatedTime: "2-4 hours",
    modelSize: "Small to Medium",
  },
  {
    id: "translation",
    title: "Machine Translation",
    description: "Translate text between different languages",
    icon: Languages,
    difficulty: "Intermediate",
    examples: ["Language translation", "Document localization", "Real-time chat"],
    datasets: ["WMT14 (EN-DE)", "Tatoeba", "IWSLT"],
    color: "from-green-500 to-green-600",
    estimatedTime: "3-6 hours",
    modelSize: "Medium to Large",
  },
  {
    id: "paraphrase",
    title: "Paraphrase Generation",
    description: "Rewrite text while preserving meaning",
    icon: RefreshCw,
    difficulty: "Beginner",
    examples: ["Content rewriting", "Style variation", "Data augmentation"],
    datasets: ["PAWS", "QQP", "MRPC"],
    color: "from-purple-500 to-purple-600",
    estimatedTime: "1-3 hours",
    modelSize: "Small to Medium",
  },
  {
    id: "question_generation",
    title: "Question Generation",
    description: "Generate questions from given context",
    icon: HelpCircle,
    difficulty: "Intermediate",
    examples: ["Educational content", "Quiz generation", "Reading comprehension"],
    datasets: ["SQuAD-to-QG", "MS MARCO", "Natural Questions"],
    color: "from-orange-500 to-orange-600",
    estimatedTime: "2-4 hours",
    modelSize: "Medium",
  },
  {
    id: "grammar_correction",
    title: "Grammar Correction",
    description: "Fix grammatical errors in text",
    icon: Edit3,
    difficulty: "Advanced",
    examples: ["Writing assistance", "Language learning", "Content editing"],
    datasets: ["JFLEG", "FCE", "CoNLL-2014"],
    color: "from-red-500 to-red-600",
    estimatedTime: "3-5 hours",
    modelSize: "Medium to Large",
  },
  {
    id: "headline_generation",
    title: "Headline Generation",
    description: "Create catchy headlines from article content",
    icon: Newspaper,
    difficulty: "Intermediate",
    examples: ["News headlines", "Blog titles", "Marketing copy"],
    datasets: ["Gigaword", "Newsroom", "CNN Headlines"],
    color: "from-yellow-500 to-yellow-600",
    estimatedTime: "2-3 hours",
    modelSize: "Small to Medium",
  },
  {
    id: "style_transfer",
    title: "Style Transfer",
    description: "Change writing style while preserving content",
    icon: Palette,
    difficulty: "Advanced",
    examples: ["Formal/informal conversion", "Tone adjustment", "Brand voice"],
    datasets: ["GYAFC", "Shakespeare", "Yelp Reviews"],
    color: "from-indigo-500 to-indigo-600",
    estimatedTime: "4-6 hours",
    modelSize: "Large",
  },
]

export function Seq2SeqTaskSelector({ config, updateConfig, onNext }: Seq2SeqTaskSelectorProps) {
  const [selectedTask, setSelectedTask] = useState(config.task || "")

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId)
    updateConfig("task", taskId)
  }

  const handleNext = () => {
    if (selectedTask) {
      onNext()
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getRecommendedTasks = () => {
    return TEXT_TO_TEXT_TASKS.filter((task) => task.difficulty === "Beginner" || task.difficulty === "Intermediate")
  }

  return (
    <div className="space-y-8">
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-blue-900 dark:text-blue-100">
            🔵 STEP 1: Task Selection
          </CardTitle>
          <CardDescription className="text-blue-700 dark:text-blue-300 font-space-mono">
            Choose the text-to-text task you want to fine-tune your encoder-decoder transformer for. Each task requires
            different training strategies and evaluation metrics.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Recommended Tasks */}
      <div>
        <h3 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          Recommended for Beginners
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {getRecommendedTasks().map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 h-full ${
                  selectedTask === task.id
                    ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20"
                    : "hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-600"
                }`}
                onClick={() => handleTaskSelect(task.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${task.color} text-white`}>
                      <task.icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
                      {selectedTask === task.id && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                  </div>
                  <CardTitle className="font-orbitron text-lg">{task.title}</CardTitle>
                  <CardDescription className="text-sm">{task.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">{task.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {task.modelSize}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-space-mono text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Use Cases
                    </h4>
                    <ul className="space-y-1">
                      {task.examples.map((example, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-space-mono text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Popular Datasets
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {task.datasets.map((dataset) => (
                        <Badge key={dataset} variant="outline" className="text-xs">
                          {dataset}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Tasks */}
      <div>
        <h3 className="font-orbitron text-lg font-semibold mb-4">All Text-to-Text Tasks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEXT_TO_TEXT_TASKS.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 h-full ${
                  selectedTask === task.id
                    ? "ring-2 ring-black dark:ring-white bg-gray-50 dark:bg-gray-900"
                    : "hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-600"
                }`}
                onClick={() => handleTaskSelect(task.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${task.color} text-white`}>
                      <task.icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
                      {selectedTask === task.id && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                  </div>
                  <CardTitle className="font-orbitron text-lg">{task.title}</CardTitle>
                  <CardDescription className="text-sm">{task.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">{task.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {task.modelSize}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-space-mono text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Use Cases
                    </h4>
                    <ul className="space-y-1">
                      {task.examples.slice(0, 2).map((example, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-space-mono text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Datasets
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {task.datasets.slice(0, 2).map((dataset) => (
                        <Badge key={dataset} variant="outline" className="text-xs">
                          {dataset}
                        </Badge>
                      ))}
                      {task.datasets.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{task.datasets.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedTask && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Button onClick={handleNext} size="lg" className="gap-2 font-space-mono">
            Continue to Dataset Setup
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
