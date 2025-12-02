"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, TrendingUp, MessageSquare, Hash, Tag } from "lucide-react"

interface RnnTaskSelectorProps {
  onComplete: () => void
}

const tasks = [
  {
    id: "text-classification",
    title: "Text Classification",
    description: "Classify documents into categories (spam detection, topic classification)",
    icon: FileText,
    difficulty: "Beginner",
    examples: ["Spam Detection", "News Categorization", "Document Classification"],
    datasets: ["IMDb Reviews", "AG News", "Reuters-21578"],
    color: "bg-blue-500",
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    description: "Analyze emotional tone and sentiment in text sequences",
    icon: MessageSquare,
    difficulty: "Beginner",
    examples: ["Movie Reviews", "Product Reviews", "Social Media Posts"],
    datasets: ["IMDb", "SST-2", "Amazon Reviews"],
    color: "bg-green-500",
  },
  {
    id: "char-generation",
    title: "Character-Level Text Generation",
    description: "Generate text character by character using RNN language models",
    icon: Hash,
    difficulty: "Intermediate",
    examples: ["Poetry Generation", "Code Generation", "Story Writing"],
    datasets: ["Shakespeare Corpus", "Python Code", "Poetry Dataset"],
    color: "bg-purple-500",
  },
  {
    id: "word-modeling",
    title: "Word-Level Language Modeling",
    description: "Predict next words in sequences for language understanding",
    icon: MessageSquare,
    difficulty: "Intermediate",
    examples: ["Text Completion", "Language Understanding", "Word Prediction"],
    datasets: ["Penn Treebank", "WikiText-2", "BookCorpus"],
    color: "bg-orange-500",
  },
  {
    id: "sequence-labeling",
    title: "Sequence Labeling",
    description: "Label each token in a sequence (POS tagging, NER)",
    icon: Tag,
    difficulty: "Advanced",
    examples: ["POS Tagging", "Named Entity Recognition", "Chunking"],
    datasets: ["CoNLL-2003", "Penn Treebank", "OntoNotes"],
    color: "bg-red-500",
  },
  {
    id: "time-series",
    title: "Time Series Forecasting",
    description: "Predict future values in temporal sequences",
    icon: TrendingUp,
    difficulty: "Intermediate",
    examples: ["Stock Prediction", "Weather Forecasting", "Energy Consumption"],
    datasets: ["Weather Data", "Stock Prices", "Energy Consumption"],
    color: "bg-cyan-500",
  },
]

export function RnnTaskSelector({ onComplete }: RnnTaskSelectorProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null)

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId)
  }

  const handleContinue = () => {
    if (selectedTask) {
      onComplete()
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron text-center">🔵 STEP 1: Select RNN Task</CardTitle>
        <p className="text-center text-gray-600">Choose a sequential learning task for your vanilla RNN model</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => {
            const IconComponent = task.icon
            return (
              <Card
                key={task.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedTask === task.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => handleTaskSelect(task.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${task.color} text-white`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-space-mono">{task.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {task.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{task.description}</p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-1">Examples:</p>
                      <div className="flex flex-wrap gap-1">
                        {task.examples.map((example, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-1">Datasets:</p>
                      <div className="flex flex-wrap gap-1">
                        {task.datasets.map((dataset, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {dataset}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {selectedTask && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold font-space-mono mb-2">📚 About Vanilla RNNs:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Classic RNN cells process sequences one step at a time</li>
              <li>• Hidden state carries information from previous time steps</li>
              <li>• Prone to vanishing gradients with long sequences</li>
              <li>• Best for shorter sequences and simpler patterns</li>
              <li>• Foundation for understanding more complex architectures</li>
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
