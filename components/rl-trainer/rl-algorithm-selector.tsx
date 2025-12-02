"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Target, TrendingUp, Layers, Cpu } from "lucide-react"

interface RlAlgorithmSelectorProps {
  onAlgorithmSelect: (algorithm: string) => void
  selectedAlgorithm?: string
}

const algorithms = [
  {
    id: "q-learning",
    name: "Q-Learning",
    icon: Brain,
    category: "Value-Based",
    difficulty: "Beginner",
    description: "Tabular method that learns action-value function Q(s,a)",
    concepts: ["Bellman Equation", "Temporal Difference", "Off-Policy"],
    equation: "Q(s,a) ← Q(s,a) + α[r + γ max Q(s',a') - Q(s,a)]",
    pros: ["Simple to understand", "Guaranteed convergence", "Model-free"],
    cons: ["Only works with discrete states", "Memory intensive for large spaces"],
    bestFor: ["GridWorld", "FrozenLake", "Taxi"],
    color: "bg-blue-500",
  },
  {
    id: "sarsa",
    name: "SARSA",
    icon: Target,
    category: "Value-Based",
    difficulty: "Beginner",
    description: "On-policy temporal difference method for learning Q-values",
    concepts: ["On-Policy Learning", "State-Action-Reward-State-Action", "Conservative Updates"],
    equation: "Q(s,a) ← Q(s,a) + α[r + γ Q(s',a') - Q(s,a)]",
    pros: ["More conservative than Q-learning", "Better for safety-critical tasks"],
    cons: ["Slower convergence", "Limited to discrete spaces"],
    bestFor: ["CartPole", "MountainCar", "Acrobot"],
    color: "bg-green-500",
  },
  {
    id: "dqn",
    name: "Deep Q-Network (DQN)",
    icon: Layers,
    category: "Deep RL",
    difficulty: "Advanced",
    description: "Neural network approximation of Q-function for high-dimensional states",
    concepts: ["Experience Replay", "Target Network", "Function Approximation"],
    equation: "L = E[(r + γ max Q_target(s',a') - Q(s,a))²]",
    pros: ["Handles high-dimensional states", "Scalable to complex environments"],
    cons: ["Sample inefficient", "Unstable training", "Hyperparameter sensitive"],
    bestFor: ["Atari Games", "Visual Environments", "Complex State Spaces"],
    color: "bg-purple-500",
  },
  {
    id: "policy-gradient",
    name: "Policy Gradient",
    icon: TrendingUp,
    category: "Policy-Based",
    difficulty: "Intermediate",
    description: "Directly optimize policy parameters using gradient ascent",
    concepts: ["REINFORCE", "Policy Parameterization", "Monte Carlo Methods"],
    equation: "∇θ J(θ) = E[∇θ log π(a|s) Q(s,a)]",
    pros: ["Works with continuous actions", "Can learn stochastic policies"],
    cons: ["High variance", "Sample inefficient", "Slow convergence"],
    bestFor: ["Continuous Control", "Pendulum", "LunarLander"],
    color: "bg-orange-500",
  },
  {
    id: "a2c",
    name: "Actor-Critic (A2C)",
    icon: Zap,
    category: "Actor-Critic",
    difficulty: "Advanced",
    description: "Combines value-based and policy-based methods with advantage estimation",
    concepts: ["Actor-Critic Architecture", "Advantage Function", "Bias-Variance Tradeoff"],
    equation: "A(s,a) = Q(s,a) - V(s), ∇θ J(θ) = E[∇θ log π(a|s) A(s,a)]",
    pros: ["Lower variance than policy gradient", "More stable than pure policy methods"],
    cons: ["More complex implementation", "Two networks to train"],
    bestFor: ["BipedalWalker", "Continuous Control", "Complex Environments"],
    color: "bg-red-500",
  },
  {
    id: "ppo",
    name: "Proximal Policy Optimization (PPO)",
    icon: Cpu,
    category: "Policy Optimization",
    difficulty: "Expert",
    description: "State-of-the-art policy optimization with clipped surrogate objective",
    concepts: ["Trust Region", "Clipped Objective", "Multiple Epochs"],
    equation: "L^CLIP(θ) = E[min(r_t(θ)A_t, clip(r_t(θ), 1-ε, 1+ε)A_t)]",
    pros: ["Very stable training", "Sample efficient", "Works across many domains"],
    cons: ["Complex implementation", "Many hyperparameters", "Computationally intensive"],
    bestFor: ["Most Environments", "Production Systems", "Complex Tasks"],
    color: "bg-indigo-500",
  },
]

export default function RlAlgorithmSelector({ onAlgorithmSelect, selectedAlgorithm }: RlAlgorithmSelectorProps) {
  const [selectedAlg, setSelectedAlg] = useState<string | null>(selectedAlgorithm || null)
  const [showDetails, setShowDetails] = useState<string | null>(null)

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
      <Card className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-purple-900 dark:text-purple-100">
            🧠 Choose Your RL Algorithm
          </CardTitle>
          <CardDescription className="font-space-mono text-purple-700 dark:text-purple-300">
            Select from 6 fundamental RL algorithms. Each has different strengths and is suited for different types of
            environments. Click on an algorithm to see detailed explanations and mathematical foundations.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Algorithm Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((alg) => {
          const IconComponent = alg.icon
          const isSelected = selectedAlg === alg.id
          const showingDetails = showDetails === alg.id

          return (
            <Card
              key={alg.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${alg.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="font-orbitron text-lg">{alg.name}</CardTitle>
                    <div className="flex gap-2 mt-1">
                      <Badge className={getDifficultyColor(alg.difficulty)}>{alg.difficulty}</Badge>
                      <Badge variant="outline" className="font-space-mono text-xs">
                        {alg.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="font-space-mono text-sm">{alg.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Key Concepts */}
                <div>
                  <h4 className="font-orbitron text-sm font-semibold mb-2">Key Concepts:</h4>
                  <div className="flex flex-wrap gap-1">
                    {alg.concepts.map((concept, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs font-space-mono">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Mathematical Equation */}
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <h4 className="font-orbitron text-sm font-semibold mb-2">Core Equation:</h4>
                  <code className="font-space-mono text-xs text-gray-700 dark:text-gray-300 break-all">
                    {alg.equation}
                  </code>
                </div>

                {/* Toggle Details */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(showingDetails ? null : alg.id)}
                  className="w-full font-space-mono"
                >
                  {showingDetails ? "Hide Details" : "Show Details"}
                </Button>

                {/* Detailed Information */}
                {showingDetails && (
                  <div className="space-y-3 pt-2 border-t">
                    <div>
                      <h5 className="font-orbitron text-sm font-semibold text-green-600 dark:text-green-400">Pros:</h5>
                      <ul className="text-xs font-space-mono text-gray-600 dark:text-gray-400 ml-4">
                        {alg.pros.map((pro, idx) => (
                          <li key={idx} className="list-disc">
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-orbitron text-sm font-semibold text-red-600 dark:text-red-400">Cons:</h5>
                      <ul className="text-xs font-space-mono text-gray-600 dark:text-gray-400 ml-4">
                        {alg.cons.map((con, idx) => (
                          <li key={idx} className="list-disc">
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-orbitron text-sm font-semibold text-blue-600 dark:text-blue-400">
                        Best For:
                      </h5>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {alg.bestFor.map((env, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {env}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Selection Button */}
                <Button
                  onClick={() => {
                    setSelectedAlg(alg.id)
                    onAlgorithmSelect(alg.id)
                  }}
                  className="w-full font-space-mono"
                  variant={isSelected ? "default" : "outline"}
                >
                  {isSelected ? "Selected" : "Choose This Algorithm"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Next Step Button */}
      {selectedAlg && (
        <div className="flex justify-center pt-8">
          <Button onClick={() => onAlgorithmSelect(selectedAlg)} size="lg" className="font-space-mono">
            Continue to Agent Configuration
          </Button>
        </div>
      )}
    </div>
  )
}

export { RlAlgorithmSelector }
