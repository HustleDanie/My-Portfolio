"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Zap, TrendingUp, MessageSquare, Tag } from "lucide-react"

interface Task {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  datasets: string[]
  examples: string[]
  gruAdvantages: string[]
}

const tasks: Task[] = [
  {
    id: "text-classification",
    name: "Text Classification",
    description: "Classify text into predefined categories using GRU networks",
    icon: <MessageSquare className="h-6 w-6" />,
    difficulty: "Beginner",
    datasets: ["IMDb Reviews", "SST-2", "AG News", "Amazon Reviews"],
    examples: ["Sentiment analysis", "Spam detection", "Intent classification"],
    gruAdvantages: ["Faster than LSTM", "Good for shorter sequences", "Efficient memory usage"],
  },
  {
    id: "sequence-labeling",
    name: "Sequence Labeling",
    description: "Label each token in a sequence with appropriate tags",
    icon: <Tag className="h-6 w-6" />,
    difficulty: "Intermediate",
    datasets: ["CoNLL-2003", "Universal Dependencies", "OntoNotes 5.0"],
    examples: ["POS tagging", "Named Entity Recognition", "Chunking"],
    gruAdvantages: ["Bidirectional processing", "Context-aware labeling", "Efficient for token-level tasks"],
  },
  {
    id: "text-generation",
    name: "Text Generation",
    description: "Generate coherent text sequences character by character or word by word",
    icon: <Zap className="h-6 w-6" />,
    difficulty: "Advanced",
    datasets: ["Shakespeare", "GPT-2 Slice", "Poetry Corpus", "News Articles"],
    examples: ["Story generation", "Poetry creation", "Code completion"],
    gruAdvantages: ["Simpler than LSTM", "Good creativity balance", "Faster training"],
  },
  {
    id: "time-series",
    name: "Time Series Forecasting",
    description: "Predict future values in temporal sequences",
    icon: <TrendingUp className="h-6 w-6" />,
    difficulty: "Intermediate",
    datasets: ["Stock Prices", "Electricity Usage", "Air Quality", "Weather Data"],
    examples: ["Stock prediction", "Energy forecasting", "Weather prediction"],
    gruAdvantages: ["Handles temporal patterns", "Memory efficient", "Good for trend analysis"],
  },
  {
    id: "emotion-recognition",
    name: "Emotion Recognition",
    description: "Detect emotions from text sequences",
    icon: <MessageSquare className="h-6 w-6" />,
    difficulty: "Intermediate",
    datasets: ["EmoBank", "ISEAR", "GoEmotions", "Emotion Stimulus"],
    examples: ["Social media analysis", "Customer feedback", "Mental health monitoring"],
    gruAdvantages: ["Captures emotional context", "Efficient processing", "Good for real-time analysis"],
  },
  {
    id: "dna-sequence",
    name: "DNA Sequence Prediction",
    description: "Predict DNA sequence patterns and structures",
    icon: <Zap className="h-6 w-6" />,
    difficulty: "Advanced",
    datasets: ["Human Genome", "Protein Sequences", "Gene Expression", "Splice Sites"],
    examples: ["Gene prediction", "Protein folding", "Mutation analysis"],
    gruAdvantages: ["Handles long sequences", "Pattern recognition", "Biological sequence modeling"],
  },
]

interface GruTaskSelectorProps {
  onTaskSelect: (task: Task) => void
  selectedTask?: Task
}

export default function GruTaskSelector({ onTaskSelect, selectedTask }: GruTaskSelectorProps) {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Step 1: Select Your GRU Task</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose a sequence learning task to explore with Gated Recurrent Units. GRUs are efficient alternatives to
          LSTMs with simpler architecture but comparable performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedTask?.id === task.id
                ? "ring-2 ring-blue-500 shadow-lg"
                : hoveredTask === task.id
                  ? "shadow-md transform -translate-y-1"
                  : ""
            }`}
            onMouseEnter={() => setHoveredTask(task.id)}
            onMouseLeave={() => setHoveredTask(null)}
            onClick={() => onTaskSelect(task)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">{task.icon}</div>
                  {selectedTask?.id === task.id && <CheckCircle className="h-5 w-5 text-green-500" />}
                </div>
                <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
              </div>
              <CardTitle className="text-lg">{task.name}</CardTitle>
              <CardDescription className="text-sm">{task.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Available Datasets
                </h4>
                <div className="flex flex-wrap gap-1">
                  {task.datasets.slice(0, 3).map((dataset) => (
                    <Badge key={dataset} variant="outline" className="text-xs">
                      {dataset}
                    </Badge>
                  ))}
                  {task.datasets.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{task.datasets.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">GRU Advantages</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {task.gruAdvantages.map((advantage, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-1">•</span>
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Example Applications</h4>
                <div className="text-xs text-muted-foreground">{task.examples.join(", ")}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTask && (
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">{selectedTask.icon}</div>
            <div>
              <h3 className="font-bold text-lg">{selectedTask.name}</h3>
              <p className="text-sm text-muted-foreground">Selected Task</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Why GRU for this task?</h4>
              <ul className="space-y-1 text-muted-foreground">
                {selectedTask.gruAdvantages.map((advantage, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {advantage}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Available Datasets</h4>
              <div className="space-y-1">
                {selectedTask.datasets.map((dataset) => (
                  <Badge key={dataset} variant="outline" className="mr-1 mb-1">
                    {dataset}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Applications</h4>
              <ul className="space-y-1 text-muted-foreground">
                {selectedTask.examples.map((example, idx) => (
                  <li key={idx}>• {example}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center">
          <Zap className="h-4 w-4 mr-2" />
          About GRU Networks
        </h3>
        <p className="text-sm text-muted-foreground">
          Gated Recurrent Units (GRUs) are a simplified version of LSTMs with only two gates: reset and update. They're
          computationally more efficient while maintaining comparable performance for many sequence learning tasks. GRUs
          are particularly effective for shorter sequences and when computational resources are limited.
        </p>
      </div>
    </div>
  )
}

// Named export so the module works with both default **and** named imports.
export { GruTaskSelector }
