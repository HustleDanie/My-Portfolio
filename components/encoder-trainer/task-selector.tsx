"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Heart, Tag, HelpCircle, Link2, Globe, Smile, ArrowRight, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TrainingConfig } from "@/app/projects/encoder-training-dynamics/page"

interface TaskSelectorProps {
  config: TrainingConfig
  updateConfig: (key: keyof TrainingConfig, value: any) => void
  onNext: () => void
}

const NLP_TASKS = [
  {
    id: "text-classification",
    title: "Text Classification",
    description: "Categorize text into predefined classes (e.g., spam detection, topic classification)",
    icon: MessageSquare,
    difficulty: "Beginner",
    examples: ["News categorization", "Spam detection", "Document classification"],
    datasets: ["AG News", "DBpedia", "20 Newsgroups"],
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    description: "Determine emotional tone or opinion polarity in text",
    icon: Heart,
    difficulty: "Beginner",
    examples: ["Movie reviews", "Product feedback", "Social media sentiment"],
    datasets: ["IMDb", "SST-2", "Yelp Reviews"],
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "named-entity-recognition",
    title: "Named Entity Recognition",
    description: "Identify and classify named entities (persons, locations, organizations)",
    icon: Tag,
    difficulty: "Intermediate",
    examples: ["Person names", "Company names", "Geographic locations"],
    datasets: ["CoNLL-2003", "WNUT-17", "OntoNotes"],
    color: "from-green-500 to-green-600",
  },
  {
    id: "question-answering",
    title: "Question Answering",
    description: "Extract answers from context passages (extractive QA)",
    icon: HelpCircle,
    difficulty: "Advanced",
    examples: ["Reading comprehension", "FAQ systems", "Information extraction"],
    datasets: ["SQuAD 1.1", "NewsQA", "Natural Questions"],
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "semantic-similarity",
    title: "Semantic Textual Similarity",
    description: "Measure semantic similarity between text pairs",
    icon: Link2,
    difficulty: "Intermediate",
    examples: ["Duplicate detection", "Paraphrase identification", "Text matching"],
    datasets: ["STS-B", "QQP", "MRPC"],
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "language-detection",
    title: "Language Detection",
    description: "Identify the language of input text",
    icon: Globe,
    difficulty: "Beginner",
    examples: ["Multilingual content", "Auto-translation", "Content filtering"],
    datasets: ["WiLI-2018", "Language Identification", "Custom multilingual"],
    color: "from-teal-500 to-teal-600",
  },
  {
    id: "emotion-detection",
    title: "Emotion Detection",
    description: "Classify text into specific emotional categories",
    icon: Smile,
    difficulty: "Intermediate",
    examples: ["Customer service", "Mental health", "Social media analysis"],
    datasets: ["GoEmotions", "EmoInt", "ISEAR"],
    color: "from-yellow-500 to-yellow-600",
  },
]

export function TaskSelector({ config, updateConfig, onNext }: TaskSelectorProps) {
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

  return (
    <div className="space-y-8">
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-blue-900 dark:text-blue-100">
            🔵 STEP 1: Task Selection
          </CardTitle>
          <CardDescription className="text-blue-700 dark:text-blue-300 font-space-mono">
            Choose the NLP task you want to fine-tune your encoder transformer for. Each task has different requirements
            and evaluation metrics.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NLP_TASKS.map((task, index) => (
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
