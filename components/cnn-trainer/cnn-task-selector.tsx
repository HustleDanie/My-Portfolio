"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Layers, Eye, Target, Grid3X3, ArrowUp, Brush, Heart, RefreshCw } from "lucide-react"

interface TaskSelectorProps {
  trainingState: any
  updateTrainingState: (updates: any) => void
  onNext: () => void
  onPrevious: () => void
  currentStep: number
  totalSteps: number
}

const visionTasks = [
  {
    id: "classification",
    title: "Image Classification",
    description: "Classify images into predefined categories (e.g., cats vs dogs, handwritten digits)",
    icon: ImageIcon,
    difficulty: "Beginner",
    difficultyColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    examples: ["MNIST digits", "CIFAR-10 objects", "Fashion items", "Animal species"],
    useCases: ["Content moderation", "Medical diagnosis", "Quality control", "Photo organization"],
    datasets: ["MNIST", "CIFAR-10", "Fashion-MNIST", "Oxford Pets", "Food-101"],
    architectures: ["LeNet", "VGG", "ResNet", "EfficientNet"],
    popular: true,
  },
  {
    id: "detection",
    title: "Object Detection",
    description: "Locate and classify multiple objects within images using bounding boxes",
    icon: Target,
    difficulty: "Intermediate",
    difficultyColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    examples: ["People in photos", "Cars on roads", "Products on shelves", "Faces in crowds"],
    useCases: ["Autonomous driving", "Security systems", "Retail analytics", "Sports analysis"],
    datasets: ["Pascal VOC", "COCO (subset)", "Open Images"],
    architectures: ["YOLO", "R-CNN", "SSD", "RetinaNet"],
    popular: true,
  },
  {
    id: "segmentation",
    title: "Image Segmentation",
    description: "Classify every pixel in an image to create detailed object boundaries",
    icon: Grid3X3,
    difficulty: "Advanced",
    difficultyColor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    examples: ["Road segmentation", "Medical imaging", "Background removal", "Scene parsing"],
    useCases: ["Medical imaging", "Autonomous vehicles", "Photo editing", "Satellite imagery"],
    datasets: ["Cityscapes", "ADE20K", "Pascal VOC", "COCO Stuff"],
    architectures: ["U-Net", "DeepLab", "Mask R-CNN", "PSPNet"],
  },
  {
    id: "super-resolution",
    title: "Image Super-Resolution",
    description: "Enhance image quality by increasing resolution and reducing noise",
    icon: ArrowUp,
    difficulty: "Intermediate",
    difficultyColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    examples: ["Photo enhancement", "Video upscaling", "Medical image clarity", "Satellite imagery"],
    useCases: ["Photo restoration", "Video streaming", "Medical imaging", "Surveillance"],
    datasets: ["DIV2K", "Set5", "Set14", "Urban100"],
    architectures: ["SRCNN", "ESRGAN", "EDSR", "RealESRGAN"],
  },
  {
    id: "style-transfer",
    title: "Style Transfer",
    description: "Apply artistic styles from one image to the content of another image",
    icon: Brush,
    difficulty: "Intermediate",
    difficultyColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    examples: ["Artistic filters", "Photo stylization", "Creative effects", "Art generation"],
    useCases: ["Photo editing apps", "Creative tools", "Art generation", "Social media filters"],
    datasets: ["COCO", "WikiArt", "Custom style images"],
    architectures: ["Neural Style Transfer", "CycleGAN", "AdaIN", "MSG-Net"],
    optional: true,
  },
  {
    id: "emotion-recognition",
    title: "Facial Emotion Recognition",
    description: "Detect and classify human emotions from facial expressions in images",
    icon: Heart,
    difficulty: "Intermediate",
    difficultyColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    examples: ["Happy/sad detection", "Mood analysis", "Expression classification", "Sentiment from faces"],
    useCases: ["Customer feedback", "Mental health apps", "Human-computer interaction", "Market research"],
    datasets: ["FER-2013", "AffectNet", "RAF-DB", "EmotioNet"],
    architectures: ["CNN + FC", "ResNet", "VGG", "MobileNet"],
    optional: true,
  },
  {
    id: "restoration",
    title: "Image Restoration",
    description: "Remove noise, blur, and artifacts to restore damaged or degraded images",
    icon: RefreshCw,
    difficulty: "Advanced",
    difficultyColor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    examples: ["Denoising", "Deblurring", "Artifact removal", "Old photo restoration"],
    useCases: ["Photo restoration", "Medical imaging", "Historical preservation", "Forensics"],
    datasets: ["BSD", "Set12", "Kodak", "McMaster"],
    architectures: ["DnCNN", "FFDNet", "IRCNN", "DRUNet"],
    optional: true,
  },
]

export function CNNTaskSelector({ trainingState, updateTrainingState, onNext }: TaskSelectorProps) {
  const [selectedTask, setSelectedTask] = useState(trainingState.selectedTask || "")
  const [hoveredTask, setHoveredTask] = useState<string | null>(null)

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId)
    updateTrainingState({ selectedTask: taskId })
  }

  const handleContinue = () => {
    if (selectedTask) {
      onNext()
    }
  }

  const selectedTaskData = visionTasks.find((task) => task.id === selectedTask)

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
          <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-space-mono text-sm text-blue-600 dark:text-blue-400">Computer Vision Tasks</span>
        </div>
        <h2 className="text-3xl font-bold font-orbitron text-gray-900 dark:text-white">Choose Your Vision Task</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Select the computer vision task you want to learn about. Each task uses different CNN architectures and
          training approaches. Don't worry - we'll guide you through everything!
        </p>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visionTasks.map((task) => {
          const Icon = task.icon
          const isSelected = selectedTask === task.id
          const isHovered = hoveredTask === task.id

          return (
            <Card
              key={task.id}
              className={`
                cursor-pointer transition-all duration-300 hover:shadow-lg
                ${isSelected ? "ring-2 ring-blue-500 shadow-lg bg-blue-50 dark:bg-blue-900/20" : "hover:shadow-md"}
                ${task.optional ? "opacity-90" : ""}
              `}
              onClick={() => handleTaskSelect(task.id)}
              onMouseEnter={() => setHoveredTask(task.id)}
              onMouseLeave={() => setHoveredTask(null)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`
                      p-2 rounded-lg transition-colors duration-200
                      ${
                        isSelected
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      }
                    `}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-orbitron flex items-center space-x-2">
                        <span>{task.title}</span>
                        {task.popular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                        {task.optional && (
                          <Badge variant="outline" className="text-xs">
                            Optional
                          </Badge>
                        )}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge className={`${task.difficultyColor} text-xs font-space-mono`}>{task.difficulty}</Badge>
                </div>
                <CardDescription className="text-sm leading-relaxed">{task.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Examples */}
                <div>
                  <h4 className="text-sm font-semibold font-space-mono text-gray-700 dark:text-gray-300 mb-2">
                    Examples:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {task.examples.slice(0, 3).map((example, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                    {task.examples.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{task.examples.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Datasets Preview */}
                {(isSelected || isHovered) && (
                  <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
                    <div>
                      <h4 className="text-sm font-semibold font-space-mono text-gray-700 dark:text-gray-300 mb-2">
                        Available Datasets:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {task.datasets.map((dataset, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {dataset}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold font-space-mono text-gray-700 dark:text-gray-300 mb-2">
                        CNN Architectures:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {task.architectures.map((arch, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-purple-50 dark:bg-purple-900/20">
                            {arch}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Selected Task Details */}
      {selectedTaskData && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="font-orbitron text-xl flex items-center space-x-3">
              <ImageIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span>Selected: {selectedTaskData.title}</span>
            </CardTitle>
            <CardDescription className="text-base">{selectedTaskData.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold font-space-mono text-gray-700 dark:text-gray-300 mb-3">
                  Real-world Applications:
                </h4>
                <ul className="space-y-2">
                  {selectedTaskData.useCases.map((useCase, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold font-space-mono text-gray-700 dark:text-gray-300 mb-3">
                  What You'll Learn:
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    <span>CNN architecture design for {selectedTaskData.title.toLowerCase()}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    <span>Data preprocessing and augmentation techniques</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    <span>Training strategies and hyperparameter tuning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    <span>Model evaluation and performance analysis</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <div className="flex justify-center pt-6">
        <Button onClick={handleContinue} disabled={!selectedTask} size="lg" className="font-space-mono px-8">
          Continue to Dataset Selection
          <Layers className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
