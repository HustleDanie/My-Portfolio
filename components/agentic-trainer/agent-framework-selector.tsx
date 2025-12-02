"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Repeat, Layers, Users } from "lucide-react"

interface AgentFrameworkSelectorProps {
  onFrameworkSelect: (framework: string) => void
  selectedFramework?: string
}

const frameworks = [
  {
    id: "prompt-based",
    name: "Prompt-based (Single-step)",
    icon: Brain,
    category: "Simple",
    description: "Single-shot reasoning with ReAct or few-shot prompting",
    color: "bg-blue-500",
    architecture: {
      components: ["Input", "Reasoning", "Action", "Output"],
      flow: "Linear",
      memory: "None",
      iterations: "1",
    },
    concepts: ["ReAct Pattern", "Few-shot Learning", "Chain-of-Thought", "Direct Reasoning"],
    pros: [
      "Simple to understand and implement",
      "Fast execution",
      "Low computational overhead",
      "Good for straightforward tasks",
    ],
    cons: [
      "Limited to single-step reasoning",
      "No memory between actions",
      "Cannot handle complex multi-step tasks",
      "No error recovery",
    ],
    bestFor: ["Simple Q&A", "Text Generation", "Basic Tool Use", "Quick Decisions"],
    diagram: "Input → Think → Act → Output",
    example: "User asks question → Agent reasons → Agent responds",
  },
  {
    id: "loop-based",
    name: "Loop-based (Multi-step)",
    icon: Repeat,
    category: "Iterative",
    description: "Multi-step reasoning with AutoGPT and BabyAGI patterns",
    color: "bg-green-500",
    architecture: {
      components: ["Goal", "Planning", "Execution", "Reflection", "Memory"],
      flow: "Iterative Loop",
      memory: "Short-term",
      iterations: "Multiple",
    },
    concepts: ["Goal Decomposition", "Iterative Refinement", "Self-Reflection", "Progress Tracking"],
    pros: [
      "Can handle complex multi-step tasks",
      "Self-correcting through iteration",
      "Maintains context across steps",
      "Flexible goal achievement",
    ],
    cons: [
      "Can get stuck in loops",
      "Higher computational cost",
      "May lose focus on original goal",
      "Requires careful termination conditions",
    ],
    bestFor: ["Research Tasks", "Content Creation", "Problem Solving", "Exploratory Analysis"],
    diagram: "Goal → Plan → Execute → Reflect → Repeat",
    example: "Write article → Research → Draft → Review → Revise → Publish",
  },
  {
    id: "planner-executor",
    name: "Planner-Executor (Modular)",
    icon: Layers,
    category: "Structured",
    description: "Separate planning and execution with LangChain Agents and CrewAI",
    color: "bg-purple-500",
    architecture: {
      components: ["Planner", "Executor", "Tools", "Memory", "Coordinator"],
      flow: "Hierarchical",
      memory: "Structured",
      iterations: "Planned",
    },
    concepts: ["Hierarchical Planning", "Tool Specialization", "Task Decomposition", "Execution Monitoring"],
    pros: [
      "Clear separation of concerns",
      "Efficient tool utilization",
      "Robust error handling",
      "Scalable architecture",
    ],
    cons: [
      "More complex to set up",
      "Requires careful coordination",
      "May over-plan simple tasks",
      "Higher memory requirements",
    ],
    bestFor: ["Complex Workflows", "Tool-heavy Tasks", "Structured Problems", "Production Systems"],
    diagram: "Plan → Decompose → Execute → Monitor → Complete",
    example: "Data analysis → Plan steps → Execute queries → Generate report → Validate",
  },
  {
    id: "multi-agent",
    name: "Multi-agent (Cooperative)",
    icon: Users,
    category: "Collaborative",
    description: "Multiple specialized agents working together with CAMEL and OpenAgents",
    color: "bg-red-500",
    architecture: {
      components: ["Agent Pool", "Communication", "Coordination", "Shared Memory", "Task Distribution"],
      flow: "Collaborative",
      memory: "Shared",
      iterations: "Concurrent",
    },
    concepts: ["Agent Specialization", "Inter-agent Communication", "Task Distribution", "Consensus Building"],
    pros: [
      "Leverages specialized expertise",
      "Parallel task execution",
      "Robust through redundancy",
      "Handles complex scenarios",
    ],
    cons: [
      "Complex coordination overhead",
      "Communication bottlenecks",
      "Difficult to debug",
      "High resource requirements",
    ],
    bestFor: ["Complex Projects", "Multi-domain Tasks", "Creative Collaboration", "Large-scale Problems"],
    diagram: "Coordinator → Assign → Agents Work → Communicate → Integrate",
    example: "Software project → Designer + Coder + Tester → Collaborate → Deliver",
  },
]

export default function AgentFrameworkSelector({ onFrameworkSelect, selectedFramework }: AgentFrameworkSelectorProps) {
  const [selectedFw, setSelectedFw] = useState<string | null>(selectedFramework || null)
  const [showDetails, setShowDetails] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      {/* Educational Introduction */}
      <Card className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-purple-900 dark:text-purple-100">
            🏗️ Choose Your Agent Framework
          </CardTitle>
          <CardDescription className="font-space-mono text-purple-700 dark:text-purple-300">
            Select the architectural pattern for your autonomous agent. Each framework has different strengths for
            reasoning, memory management, and task execution. Click on a framework to see detailed flow diagrams.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Framework Comparison Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="font-orbitron text-lg">Framework Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-space-mono">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Framework</th>
                  <th className="text-left p-2">Complexity</th>
                  <th className="text-left p-2">Memory</th>
                  <th className="text-left p-2">Best For</th>
                  <th className="text-left p-2">Iterations</th>
                </tr>
              </thead>
              <tbody>
                {frameworks.map((fw) => (
                  <tr key={fw.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-2 font-semibold">{fw.name}</td>
                    <td className="p-2">{fw.category}</td>
                    <td className="p-2">{fw.architecture.memory}</td>
                    <td className="p-2">{fw.bestFor[0]}</td>
                    <td className="p-2">{fw.architecture.iterations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Framework Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {frameworks.map((fw) => {
          const IconComponent = fw.icon
          const isSelected = selectedFw === fw.id
          const showingDetails = showDetails === fw.id

          return (
            <Card
              key={fw.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${fw.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="font-orbitron text-lg">{fw.name}</CardTitle>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="font-space-mono text-xs">
                        {fw.category}
                      </Badge>
                      <Badge variant="secondary" className="font-space-mono text-xs">
                        {fw.architecture.flow}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="font-space-mono text-sm">{fw.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Architecture Overview */}
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <h4 className="font-orbitron text-sm font-semibold mb-2">Architecture Flow:</h4>
                  <div className="font-space-mono text-xs text-center bg-white dark:bg-gray-700 p-2 rounded border">
                    {fw.diagram}
                  </div>
                </div>

                {/* Key Concepts */}
                <div>
                  <h4 className="font-orbitron text-sm font-semibold mb-2">Key Concepts:</h4>
                  <div className="flex flex-wrap gap-1">
                    {fw.concepts.slice(0, 3).map((concept, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs font-space-mono">
                        {concept}
                      </Badge>
                    ))}
                    {fw.concepts.length > 3 && (
                      <Badge variant="outline" className="text-xs font-space-mono">
                        +{fw.concepts.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Toggle Details */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(showingDetails ? null : fw.id)}
                  className="w-full font-space-mono"
                >
                  {showingDetails ? "Hide Details" : "Show Details & Flow Diagram"}
                </Button>

                {/* Detailed Information */}
                {showingDetails && (
                  <div className="space-y-4 pt-2 border-t">
                    {/* Architecture Components */}
                    <div>
                      <h5 className="font-orbitron text-sm font-semibold mb-2">Components:</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {fw.architecture.components.map((component, idx) => (
                          <div key={idx} className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded text-xs font-space-mono">
                            {component}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Example Use Case */}
                    <div>
                      <h5 className="font-orbitron text-sm font-semibold mb-2">Example Flow:</h5>
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs font-space-mono">
                        {fw.example}
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-orbitron text-sm font-semibold text-green-600 dark:text-green-400 mb-1">
                          Pros:
                        </h5>
                        <ul className="text-xs font-space-mono text-gray-600 dark:text-gray-400 space-y-1">
                          {fw.pros.slice(0, 2).map((pro, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-green-500">•</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-orbitron text-sm font-semibold text-red-600 dark:text-red-400 mb-1">
                          Cons:
                        </h5>
                        <ul className="text-xs font-space-mono text-gray-600 dark:text-gray-400 space-y-1">
                          {fw.cons.slice(0, 2).map((con, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-red-500">•</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Best For */}
                    <div>
                      <h5 className="font-orbitron text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                        Best For:
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {fw.bestFor.map((use, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {use}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Selection Button */}
                <Button
                  onClick={() => {
                    setSelectedFw(fw.id)
                    onFrameworkSelect(fw.id)
                  }}
                  className="w-full font-space-mono"
                  variant={isSelected ? "default" : "outline"}
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {isSelected ? "Selected" : "Choose This Framework"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Framework Recommendation */}
      <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-lg text-yellow-900 dark:text-yellow-100">
            💡 Framework Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm font-space-mono text-yellow-800 dark:text-yellow-200">
          <div>
            <strong>For Beginners:</strong> Start with Prompt-based for simple tasks, then try Loop-based for multi-step
            reasoning
          </div>
          <div>
            <strong>For Complex Tasks:</strong> Use Planner-Executor for structured workflows or Multi-agent for
            collaborative projects
          </div>
          <div>
            <strong>For Production:</strong> Planner-Executor offers the best balance of capability and reliability
          </div>
        </CardContent>
      </Card>

      {/* Next Step Button */}
      {selectedFw && (
        <div className="flex justify-center pt-8">
          <Button onClick={() => onFrameworkSelect(selectedFw)} size="lg" className="font-space-mono">
            Continue to Agent Configuration
          </Button>
        </div>
      )}
    </div>
  )
}

export { AgentFrameworkSelector }
