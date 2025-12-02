"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Eye, Target, Layers, Zap, Heart, Stethoscope } from "lucide-react"

const visionTasks = [
  {
    id: "classification",
    title: "Image Classification",
    description: "Classify images into predefined categories using ViT attention mechanisms",
    icon: Eye,
    difficulty: "Beginner",
    examples: ["CIFAR-10", "ImageNet", "Oxford Pets"],
    color: "border-blue-500",
  },
  {
    id: "detection",
    title: "Object Detection",
    description: "Detect and localize objects in images with ViT-based detection heads",
    icon: Target,
    difficulty: "Intermediate",
    examples: ["COCO", "Pascal VOC"],
    color: "border-purple-500",
  },
  {
    id: "segmentation",
    title: "Image Segmentation",
    description: "Perform pixel-level classification using Vision Transformer architectures",
    icon: Layers,
    difficulty: "Advanced",
    examples: ["ADE20K", "CamVid"],
    color: "border-orange-500",
  },
  {
    id: "super_resolution",
    title: "Image Super-Resolution",
    description: "Enhance image resolution using transformer-based upsampling",
    icon: Zap,
    difficulty: "Intermediate",
    examples: ["DIV2K", "Set5"],
    color: "border-green-500",
  },
  {
    id: "emotion_recognition",
    title: "Facial Expression Recognition",
    description: "Recognize emotions from facial expressions using ViT attention",
    icon: Heart,
    difficulty: "Intermediate",
    examples: ["FER2013", "AffectNet"],
    color: "border-pink-500",
  },
  {
    id: "medical_diagnosis",
    title: "Medical Image Diagnosis",
    description: "Analyze medical images for diagnostic purposes with Vision Transformers",
    icon: Stethoscope,
    difficulty: "Advanced",
    examples: ["ChestX-ray", "Skin Cancer"],
    color: "border-red-500",
  },
]

interface ViTTaskSelectorProps {
  config: any
  onConfigChange: (config: any) => void
  onNext: () => void
}

export function ViTTaskSelector({ config, onConfigChange, onNext }: ViTTaskSelectorProps) {
  const [selectedTask, setSelectedTask] = useState(config.selectedTask || "")

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId)
    const task = visionTasks.find((t) => t.id === taskId)
    onConfigChange({
      ...config,
      selectedTask: taskId,
      taskDetails: task,
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-orbitron text-center">🔵 Step 1: Select Vision Task</CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-400 font-space-mono">
            Choose the computer vision task you want to solve with Vision Transformers
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visionTasks.map((task) => {
              const IconComponent = task.icon
              return (
                <Card
                  key={task.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedTask === task.id
                      ? `${task.color} border-2 bg-blue-50 dark:bg-blue-950`
                      : "border hover:border-gray-400"
                  }`}
                  onClick={() => handleTaskSelect(task.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <IconComponent className="w-6 h-6 mr-3 text-blue-600" />
                      <h3 className="font-semibold font-orbitron">{task.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-space-mono">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
                      <div className="text-xs text-gray-500">{task.examples.join(", ")}</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {selectedTask && (
            <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg mb-6">
              <h4 className="font-semibold font-orbitron mb-2">Selected Task Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-space-mono">
                <div>
                  <strong>Task:</strong> {visionTasks.find((t) => t.id === selectedTask)?.title}
                </div>
                <div>
                  <strong>Difficulty:</strong> {visionTasks.find((t) => t.id === selectedTask)?.difficulty}
                </div>
                <div className="md:col-span-2">
                  <strong>Description:</strong> {visionTasks.find((t) => t.id === selectedTask)?.description}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={onNext} disabled={!selectedTask} className="font-space-mono">
              Next: Dataset Selection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
