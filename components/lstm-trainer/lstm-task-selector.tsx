"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, TrendingUp, MessageSquare, Hash, Tag, Mic } from "lucide-react"

interface LstmTaskSelectorProps {
  onComplete: () => void
}

const tasks = [
  {
    id: "text-classification",
    title: "Text Classification",
    description: "Classify documents into categories with LSTM's superior context understanding",
    icon: FileText,
    difficulty: "Beginner",
    examples: ["Topic Classification", "Spam Detection", "Emotion Recognition"],
    datasets: ["IMDb Reviews", "AG News", "Yelp Reviews"],
    color: "bg-blue-500",
    lstmAdvantage: "Captures long-range dependencies in text",
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    description: "Analyze emotional tone with LSTM's memory of context across sentences",
    icon: MessageSquare,
    difficulty: "Beginner",
    examples: ["Movie Reviews", "Product Reviews", "Social Media Analysis"],
    datasets: ["IMDb", "SST-2", "Amazon Reviews"],
    color: "bg-green-500",
    lstmAdvantage: "Remembers sentiment context throughout long reviews",
  },
  {
    id: "sequence-labeling",
    title: "Sequence Labeling",
    description: "Label each token using LSTM's bidirectional context awareness",
    icon: Tag,
    difficulty: "Intermediate",
    examples: ["POS Tagging", "Named Entity Recognition", "Chunking"],
    datasets: ["CoNLL-2003", "Penn Treebank", "OntoNotes"],
    color: "bg-red-500",
    lstmAdvantage: "Maintains context for accurate token-level predictions",
  },
  {
    id: "text-generation",
    title: "Text Generation",
    description: "Generate coherent text with LSTM's long-term memory capabilities",
    icon: Hash,
    difficulty: "Advanced",
    examples: ["Story Writing", "Poetry Generation", "Code Generation"],
    datasets: ["Shakespeare Corpus", "Penn Treebank", "Python Code"],
    color: "bg-purple-500",
    lstmAdvantage: "Generates coherent long sequences without forgetting context",
  },
  {
    id: "time-series",
    title: "Time Series Forecasting",
    description: "Predict future values using LSTM's ability to learn temporal patterns",
    icon: TrendingUp,
    difficulty: "Intermediate",
    examples: ["Stock Prediction", "Weather Forecasting", "Energy Consumption"],
    datasets: ["Weather Data", "Stock Prices", "Air Quality"],
    color: "bg-cyan-500",
    lstmAdvantage: "Captures long-term trends and seasonal patterns",
  },
  {
    id: "speech-modeling",
    title: "Speech-like Sequence Modeling",
    description: "Model sequential audio features with LSTM's temporal understanding",
    icon: Mic,
    difficulty: "Advanced",
    examples: ["Audio Classification", "Speech Recognition", "Music Generation"],
    datasets: ["MFCC Features", "Spectrograms", "Audio Sequences"],
    color: "bg-orange-500",
    lstmAdvantage: "Handles variable-length audio sequences effectively",
  },
]

export function LstmTaskSelector({ onComplete }: LstmTaskSelectorProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null)

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId)
  }

  const handleContinue = () => {
    if (selectedTask) {
      onComplete()
    }
  }

  const selectedTaskData = tasks.find((task) => task.id === selectedTask)

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron text-center">🔵 STEP 1: Select LSTM Task</CardTitle>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Choose a sequence learning task that leverages LSTM's memory capabilities
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => {
            const IconComponent = task.icon
            return (
              <Card
                key={task.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 ${
                  selectedTask === task.id
                    ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleTaskSelect(task.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${task.color} text-white`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-space-mono dark:text-gray-200">{task.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {task.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{task.description}</p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Examples:</p>
                      <div className="flex flex-wrap gap-1">
                        {task.examples.map((example, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Datasets:</p>
                      <div className="flex flex-wrap gap-1">
                        {task.datasets.map((dataset, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {dataset}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">LSTM Advantage:</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{task.lstmAdvantage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {selectedTask && selectedTaskData && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold font-space-mono mb-2 dark:text-gray-200">
              🧠 About LSTMs for {selectedTaskData.title}:
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• LSTM gates (forget, input, output) control information flow</li>
              <li>• Cell state maintains long-term memory across sequences</li>
              <li>• Solves vanishing gradient problem of vanilla RNNs</li>
              <li>• Excellent for tasks requiring long-range dependencies</li>
              <li>• {selectedTaskData.lstmAdvantage}</li>
            </ul>
          </div>
        )}

        <div className="flex justify-center">
          <Button onClick={handleContinue} disabled={!selectedTask} className="px-8 py-2 font-space-mono">
            Continue to Dataset Selection →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
