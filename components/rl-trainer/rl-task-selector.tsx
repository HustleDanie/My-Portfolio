"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Gamepad2, Target, Brain, Car, Zap } from "lucide-react"

interface RlTaskSelectorProps {
  onTaskSelect: (task: string) => void
  selectedTask?: string
}

const taskCategories = [
  {
    id: "discrete-control",
    title: "Discrete Control",
    icon: Gamepad2,
    description: "Classic control problems with discrete action spaces",
    color: "bg-blue-500",
    tasks: [
      {
        id: "cartpole",
        name: "CartPole-v1",
        description: "Balance a pole on a cart by moving left or right",
        difficulty: "Beginner",
        concept: "Basic Q-Learning",
        reward: "Dense rewards for balancing",
        episodes: "200 steps max",
      },
      {
        id: "mountaincar",
        name: "MountainCar-v0",
        description: "Drive an underpowered car up a steep hill",
        difficulty: "Intermediate",
        concept: "Sparse Rewards",
        reward: "Only at goal achievement",
        episodes: "200 steps max",
      },
      {
        id: "acrobot",
        name: "Acrobot-v1",
        description: "Swing up a two-link pendulum",
        difficulty: "Intermediate",
        concept: "Continuous State Space",
        reward: "Height-based rewards",
        episodes: "500 steps max",
      },
      {
        id: "frozenlake",
        name: "FrozenLake-v1",
        description: "Navigate across a frozen lake avoiding holes",
        difficulty: "Beginner",
        concept: "Tabular Q-Learning",
        reward: "Sparse goal rewards",
        episodes: "100 steps max",
      },
      {
        id: "taxi",
        name: "Taxi-v3",
        description: "Pick up and drop off passengers efficiently",
        difficulty: "Intermediate",
        concept: "Hierarchical Actions",
        reward: "Task completion rewards",
        episodes: "200 steps max",
      },
    ],
  },
  {
    id: "continuous-control",
    title: "Continuous Control",
    icon: Target,
    description: "Control problems with continuous action spaces",
    color: "bg-green-500",
    tasks: [
      {
        id: "pendulum",
        name: "Pendulum-v1",
        description: "Keep an inverted pendulum upright",
        difficulty: "Intermediate",
        concept: "Policy Gradients",
        reward: "Angle and velocity penalties",
        episodes: "200 steps max",
      },
      {
        id: "lunarlander-continuous",
        name: "LunarLanderContinuous-v2",
        description: "Land a spacecraft smoothly on the moon",
        difficulty: "Advanced",
        concept: "Actor-Critic Methods",
        reward: "Landing success and fuel efficiency",
        episodes: "1000 steps max",
      },
      {
        id: "bipedal-walker",
        name: "BipedalWalker-v3",
        description: "Teach a 2D robot to walk forward",
        difficulty: "Expert",
        concept: "PPO/DDPG",
        reward: "Forward progress and stability",
        episodes: "1600 steps max",
      },
    ],
  },
  {
    id: "atari-visual",
    title: "Atari Visual",
    icon: Zap,
    description: "Classic Atari games with visual input processing",
    color: "bg-purple-500",
    tasks: [
      {
        id: "breakout",
        name: "Breakout",
        description: "Break bricks with a bouncing ball",
        difficulty: "Advanced",
        concept: "Deep Q-Networks",
        reward: "Score-based rewards",
        episodes: "Variable length",
      },
      {
        id: "pong",
        name: "Pong",
        description: "Classic paddle game against AI opponent",
        difficulty: "Advanced",
        concept: "CNN + RL",
        reward: "Win/lose game rewards",
        episodes: "Variable length",
      },
      {
        id: "space-invaders",
        name: "SpaceInvaders",
        description: "Shoot alien invaders from space",
        difficulty: "Expert",
        concept: "Frame Stacking",
        reward: "Score and survival",
        episodes: "Variable length",
      },
    ],
  },
  {
    id: "gridworld-logic",
    title: "Gridworld & Logic",
    icon: Brain,
    description: "Custom grid-based environments for learning fundamentals",
    color: "bg-orange-500",
    tasks: [
      {
        id: "maze-navigation",
        name: "Maze Navigation",
        description: "Find the shortest path through a maze",
        difficulty: "Beginner",
        concept: "Value Iteration",
        reward: "Goal reaching with step penalties",
        episodes: "100 steps max",
      },
      {
        id: "treasure-hunt",
        name: "Treasure Hunt",
        description: "Collect treasures while avoiding traps",
        difficulty: "Intermediate",
        concept: "Multi-Objective RL",
        reward: "Treasure value minus trap penalties",
        episodes: "150 steps max",
      },
      {
        id: "multi-goal-grid",
        name: "Multi-Goal Grid",
        description: "Navigate to different goals in sequence",
        difficulty: "Advanced",
        concept: "Hierarchical RL",
        reward: "Sequential goal completion",
        episodes: "200 steps max",
      },
    ],
  },
  {
    id: "real-world-inspired",
    title: "Real-World Inspired",
    icon: Car,
    description: "Simplified simulations of real-world applications",
    color: "bg-red-500",
    tasks: [
      {
        id: "self-driving-car",
        name: "Self-Driving Car Sim",
        description: "Navigate a car through traffic safely",
        difficulty: "Expert",
        concept: "Multi-Agent RL",
        reward: "Safety and efficiency metrics",
        episodes: "500 steps max",
      },
      {
        id: "warehouse-robot",
        name: "Warehouse Robot Sim",
        description: "Optimize package delivery in a warehouse",
        difficulty: "Advanced",
        concept: "Path Planning RL",
        reward: "Delivery efficiency and collision avoidance",
        episodes: "300 steps max",
      },
      {
        id: "drone-hovering",
        name: "Drone Hovering Sim",
        description: "Maintain stable hovering flight",
        difficulty: "Advanced",
        concept: "Continuous Control",
        reward: "Position stability and energy efficiency",
        episodes: "400 steps max",
      },
    ],
  },
]

export default function RlTaskSelector({ onTaskSelect, selectedTask }: RlTaskSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
            🎯 Choose Your RL Challenge
          </CardTitle>
          <CardDescription className="font-space-mono text-blue-700 dark:text-blue-300">
            Select from 20+ environments organized by RL concepts. Each task teaches different aspects of reinforcement
            learning, from basic Q-learning to advanced policy optimization methods.
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
                    <CardDescription className="font-space-mono text-sm">
                      {category.tasks.length} environments
                    </CardDescription>
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
            {taskCategories.find((c) => c.id === selectedCategory)?.title} Environments
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="font-orbitron text-lg mb-2">{task.name}</CardTitle>
                        <CardDescription className="font-space-mono mb-3">{task.description}</CardDescription>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
                          <Badge variant="outline" className="font-space-mono">
                            {task.concept}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm font-space-mono text-gray-600 dark:text-gray-400">
                      <div>
                        <strong>Reward:</strong> {task.reward}
                      </div>
                      <div>
                        <strong>Episodes:</strong> {task.episodes}
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
                      {selectedTask === task.id ? "Selected" : "Try This Task"}
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
            Continue to Algorithm Selection
          </Button>
        </div>
      )}
    </div>
  )
}

export { RlTaskSelector }
