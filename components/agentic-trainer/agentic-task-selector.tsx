"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Globe, Code, Wrench, Brain, Eye, Bot, MessageSquare, Workflow } from "lucide-react"

interface AgenticTaskSelectorProps {
  onTaskSelect: (task: string) => void
  selectedTask?: string
}

const taskCategories = [
  {
    id: "web-navigation",
    title: "Web Navigation & Interaction",
    icon: Globe,
    description: "Autonomous web browsing and form interaction tasks",
    color: "bg-blue-500",
    tasks: [
      {
        id: "fill-forms",
        name: "Fill Online Forms",
        description: "Navigate websites and complete registration or contact forms",
        difficulty: "Intermediate",
        skills: ["DOM Navigation", "Form Parsing", "Input Validation"],
        preview: "🌐 → 📝 → ✅",
        estimatedTime: "5-10 minutes",
      },
      {
        id: "book-flight",
        name: "Book a Flight",
        description: "Search, compare, and book flights using travel websites",
        difficulty: "Advanced",
        skills: ["Multi-step Planning", "Price Comparison", "Date Handling"],
        preview: "✈️ → 📅 → 💳",
        estimatedTime: "10-15 minutes",
      },
      {
        id: "summarize-webpage",
        name: "Summarize Webpage Content",
        description: "Extract and summarize key information from web articles",
        difficulty: "Beginner",
        skills: ["Content Extraction", "Text Summarization", "Web Scraping"],
        preview: "📄 → 🔍 → 📋",
        estimatedTime: "3-5 minutes",
      },
    ],
  },
  {
    id: "code-generation",
    title: "Code Generation & Debugging",
    icon: Code,
    description: "Programming assistance and software development tasks",
    color: "bg-green-500",
    tasks: [
      {
        id: "solve-coding-challenge",
        name: "Solve Programming Challenges",
        description: "Complete algorithmic problems and coding challenges",
        difficulty: "Advanced",
        skills: ["Algorithm Design", "Code Generation", "Testing"],
        preview: "🧩 → 💻 → ✅",
        estimatedTime: "15-30 minutes",
      },
      {
        id: "refactor-code",
        name: "Refactor Broken Code",
        description: "Identify bugs and improve code quality and structure",
        difficulty: "Intermediate",
        skills: ["Code Analysis", "Bug Detection", "Refactoring"],
        preview: "🐛 → 🔧 → ✨",
        estimatedTime: "10-20 minutes",
      },
      {
        id: "add-unit-tests",
        name: "Add Unit Tests",
        description: "Generate comprehensive test suites for existing code",
        difficulty: "Intermediate",
        skills: ["Test Generation", "Code Coverage", "Quality Assurance"],
        preview: "📝 → 🧪 → 🛡️",
        estimatedTime: "8-15 minutes",
      },
    ],
  },
  {
    id: "tool-use",
    title: "Tool Use & API Interaction",
    icon: Wrench,
    description: "External tool integration and API orchestration",
    color: "bg-purple-500",
    tasks: [
      {
        id: "search-calculator",
        name: "Use Search & Calculator Tools",
        description: "Combine web search and calculations to solve problems",
        difficulty: "Beginner",
        skills: ["Tool Chaining", "API Calls", "Result Integration"],
        preview: "🔍 + 🧮 → 📊",
        estimatedTime: "5-8 minutes",
      },
      {
        id: "query-database",
        name: "Query CSV or Database",
        description: "Extract insights from structured data using SQL or pandas",
        difficulty: "Intermediate",
        skills: ["Data Querying", "SQL Generation", "Data Analysis"],
        preview: "📊 → 🔍 → 📈",
        estimatedTime: "10-15 minutes",
      },
      {
        id: "send-emails",
        name: "Send Emails via APIs",
        description: "Compose and send emails using external email services",
        difficulty: "Intermediate",
        skills: ["Email Composition", "API Integration", "Template Processing"],
        preview: "✍️ → 📧 → 📤",
        estimatedTime: "5-10 minutes",
      },
    ],
  },
  {
    id: "scientific-reasoning",
    title: "Scientific Reasoning",
    icon: Brain,
    description: "Complex reasoning and knowledge-based problem solving",
    color: "bg-orange-500",
    tasks: [
      {
        id: "math-word-problems",
        name: "Solve Math Word Problems",
        description: "Break down and solve complex mathematical word problems",
        difficulty: "Advanced",
        skills: ["Mathematical Reasoning", "Problem Decomposition", "Step-by-step Solving"],
        preview: "📝 → 🧮 → ✅",
        estimatedTime: "8-12 minutes",
      },
      {
        id: "science-qa",
        name: "Answer Science Questions",
        description: "Use scientific documents to answer complex questions",
        difficulty: "Advanced",
        skills: ["Document Retrieval", "Scientific Reasoning", "Evidence Synthesis"],
        preview: "❓ → 📚 → 🔬",
        estimatedTime: "10-20 minutes",
      },
      {
        id: "multi-hop-qa",
        name: "Multi-hop Document QA",
        description: "Answer questions requiring information from multiple sources",
        difficulty: "Expert",
        skills: ["Multi-document Reasoning", "Information Synthesis", "Fact Verification"],
        preview: "📄 + 📄 → 🔗 → 💡",
        estimatedTime: "15-25 minutes",
      },
    ],
  },
  {
    id: "multi-modal",
    title: "Multi-Modal Tasks",
    icon: Eye,
    description: "Vision and multi-modal understanding tasks",
    color: "bg-red-500",
    tasks: [
      {
        id: "describe-image",
        name: "Describe Image Content",
        description: "Generate detailed descriptions of images and visual scenes",
        difficulty: "Intermediate",
        skills: ["Computer Vision", "Scene Understanding", "Natural Language Generation"],
        preview: "🖼️ → 👁️ → 📝",
        estimatedTime: "3-5 minutes",
      },
      {
        id: "extract-receipt-info",
        name: "Extract Receipt Information",
        description: "Parse and extract structured data from scanned receipts",
        difficulty: "Advanced",
        skills: ["OCR", "Document Understanding", "Information Extraction"],
        preview: "🧾 → 🔍 → 📊",
        estimatedTime: "5-8 minutes",
      },
      {
        id: "gui-interaction",
        name: "Vision-based GUI Interaction",
        description: "Navigate and interact with graphical user interfaces",
        difficulty: "Expert",
        skills: ["GUI Understanding", "Action Planning", "Visual Reasoning"],
        preview: "🖥️ → 👆 → ⚡",
        estimatedTime: "10-15 minutes",
      },
    ],
  },
  {
    id: "embodied-robotics",
    title: "Embodied/Robotics Simulations",
    icon: Bot,
    description: "Spatial reasoning and embodied AI tasks",
    color: "bg-indigo-500",
    tasks: [
      {
        id: "navigate-room",
        name: "Navigate 3D Room",
        description: "Plan paths and navigate through 3D environments",
        difficulty: "Advanced",
        skills: ["Spatial Reasoning", "Path Planning", "Environment Mapping"],
        preview: "🏠 → 🗺️ → 🚶",
        estimatedTime: "8-12 minutes",
      },
      {
        id: "pick-place-objects",
        name: "Pick and Place Objects",
        description: "Manipulate objects in simulated robotic environments",
        difficulty: "Expert",
        skills: ["Object Recognition", "Manipulation Planning", "Physics Understanding"],
        preview: "🤖 → 📦 → 🎯",
        estimatedTime: "12-20 minutes",
      },
      {
        id: "open-door",
        name: "Open Door with Instructions",
        description: "Follow natural language instructions to interact with objects",
        difficulty: "Advanced",
        skills: ["Instruction Following", "Action Sequencing", "Spatial Understanding"],
        preview: "🚪 → 📝 → 🔓",
        estimatedTime: "10-15 minutes",
      },
    ],
  },
  {
    id: "planning-memory",
    title: "Planning with Memory",
    icon: Brain,
    description: "Long-term planning and memory management tasks",
    color: "bg-teal-500",
    tasks: [
      {
        id: "shopping-list",
        name: "Complete Shopping List",
        description: "Plan and execute a shopping trip with budget constraints",
        difficulty: "Intermediate",
        skills: ["Task Planning", "Budget Management", "Priority Ordering"],
        preview: "📝 → 🛒 → ✅",
        estimatedTime: "8-12 minutes",
      },
      {
        id: "execute-subgoals",
        name: "Execute Subgoals in Order",
        description: "Break down complex tasks into ordered subtasks",
        difficulty: "Advanced",
        skills: ["Goal Decomposition", "Task Sequencing", "Progress Tracking"],
        preview: "🎯 → 📋 → ⚡",
        estimatedTime: "10-18 minutes",
      },
      {
        id: "schedule-events",
        name: "Schedule Calendar Events",
        description: "Manage calendar conflicts and schedule optimization",
        difficulty: "Intermediate",
        skills: ["Time Management", "Conflict Resolution", "Scheduling Optimization"],
        preview: "📅 → ⏰ → ✅",
        estimatedTime: "6-10 minutes",
      },
    ],
  },
  {
    id: "dialogue-agents",
    title: "Multi-Turn Dialogue Agents",
    icon: MessageSquare,
    description: "Conversational AI and dialogue management",
    color: "bg-pink-500",
    tasks: [
      {
        id: "tutor-roleplay",
        name: "Roleplay as Tutor",
        description: "Provide educational guidance and answer student questions",
        difficulty: "Advanced",
        skills: ["Educational Reasoning", "Adaptive Teaching", "Knowledge Transfer"],
        preview: "👨‍🏫 → 💬 → 🎓",
        estimatedTime: "15-25 minutes",
      },
      {
        id: "customer-support",
        name: "Handle Customer Support",
        description: "Resolve customer issues through multi-turn conversations",
        difficulty: "Advanced",
        skills: ["Problem Solving", "Empathy", "Solution Finding"],
        preview: "📞 → 🤝 → ✅",
        estimatedTime: "10-20 minutes",
      },
      {
        id: "step-by-step-qa",
        name: "Answer Queries Step-by-Step",
        description: "Provide detailed explanations for complex questions",
        difficulty: "Intermediate",
        skills: ["Explanation Generation", "Step-by-step Reasoning", "Clarity"],
        preview: "❓ → 📝 → 💡",
        estimatedTime: "8-15 minutes",
      },
    ],
  },
  {
    id: "autonomous-workflows",
    title: "Autonomous Workflows",
    icon: Workflow,
    description: "End-to-end workflow automation and orchestration",
    color: "bg-cyan-500",
    tasks: [
      {
        id: "clean-visualize-data",
        name: "Clean & Visualize Dataset",
        description: "Complete data analysis pipeline from raw data to insights",
        difficulty: "Expert",
        skills: ["Data Processing", "Visualization", "Statistical Analysis"],
        preview: "📊 → 🧹 → 📈",
        estimatedTime: "20-30 minutes",
      },
      {
        id: "write-email-summary",
        name: "Write Summary + Email It",
        description: "Generate reports and distribute them via email",
        difficulty: "Advanced",
        skills: ["Report Generation", "Email Automation", "Content Formatting"],
        preview: "📄 → ✍️ → 📧",
        estimatedTime: "12-18 minutes",
      },
      {
        id: "manage-project-files",
        name: "Manage Project Files",
        description: "Organize, version, and maintain project file structures",
        difficulty: "Advanced",
        skills: ["File Management", "Version Control", "Organization"],
        preview: "📁 → 🗂️ → ✅",
        estimatedTime: "15-25 minutes",
      },
    ],
  },
]

export default function AgenticTaskSelector({ onTaskSelect, selectedTask }: AgenticTaskSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredTask, setHoveredTask] = useState<string | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Advanced":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Expert":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-8">
      {/* Educational Introduction */}
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-blue-900 dark:text-blue-100">
            🎯 Choose Your Agentic AI Task
          </CardTitle>
          <CardDescription className="font-space-mono text-blue-700 dark:text-blue-300">
            Select from 27 real-world autonomous agent tasks across 9 categories. Each task demonstrates different
            aspects of agentic AI including reasoning, tool use, memory management, and multi-step planning.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taskCategories.map((category) => {
          const IconComponent = category.icon
          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedCategory === category.id ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
              }`}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="font-orbitron text-lg">{category.title}</CardTitle>
                    <CardDescription className="font-space-mono text-sm">{category.tasks.length} tasks</CardDescription>
                  </div>
                </div>
                <CardDescription className="font-space-mono">{category.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      {/* Task Selection */}
      {selectedCategory && (
        <div className="space-y-4">
          <h3 className="font-orbitron text-xl font-bold text-black dark:text-white">
            {taskCategories.find((c) => c.id === selectedCategory)?.title} Tasks
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {taskCategories
              .find((c) => c.id === selectedCategory)
              ?.tasks.map((task) => (
                <Card
                  key={task.id}
                  className={`transition-all hover:shadow-md ${
                    selectedTask === task.id
                      ? "ring-2 ring-green-500 dark:ring-green-400 bg-green-50 dark:bg-green-950/30"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredTask(task.id)}
                  onMouseLeave={() => setHoveredTask(null)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="font-orbitron text-lg mb-2">{task.name}</CardTitle>
                        <CardDescription className="font-space-mono mb-3">{task.description}</CardDescription>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
                          <Badge variant="outline" className="font-space-mono text-xs">
                            {task.estimatedTime}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Task Preview */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-3">
                      <div className="text-center text-2xl mb-2">{task.preview}</div>
                      <div className="text-xs font-space-mono text-gray-600 dark:text-gray-400 text-center">
                        Task Flow Preview
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-2">
                      <h4 className="font-orbitron text-sm font-semibold">Key AI Skills:</h4>
                      <div className="flex flex-wrap gap-1">
                        {task.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs font-space-mono">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => onTaskSelect(task.id)}
                      className="w-full font-space-mono"
                      variant={selectedTask === task.id ? "default" : "outline"}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {selectedTask === task.id ? "Selected" : "Choose This Task"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Next Step Button */}
      {selectedTask && (
        <div className="flex justify-center pt-8">
          <Button onClick={() => onTaskSelect(selectedTask)} size="lg" className="font-space-mono">
            Continue to Framework Selection
          </Button>
        </div>
      )}
    </div>
  )
}

export { AgenticTaskSelector }
