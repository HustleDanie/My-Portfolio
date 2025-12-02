"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Save, TrendingUp, Target, Zap, Award } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface RlEvaluationDashboardProps {
  config: any
}

export default function RlEvaluationDashboard({ config }: RlEvaluationDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState<"reward" | "success" | "efficiency">("reward")

  // Generate evaluation data based on config
  const generateEvaluationData = () => {
    const episodes = config.agent?.episodes?.[0] || 1000
    const algorithm = config.algorithm || "q-learning"

    // Simulate performance based on algorithm
    const basePerformance = {
      "q-learning": { avgReward: 180, successRate: 75, efficiency: 65 },
      dqn: { avgReward: 220, successRate: 85, efficiency: 80 },
      ppo: { avgReward: 280, successRate: 95, efficiency: 90 },
      a2c: { avgReward: 240, successRate: 88, efficiency: 82 },
      "policy-gradient": { avgReward: 200, successRate: 78, efficiency: 70 },
      sarsa: { avgReward: 170, successRate: 72, efficiency: 68 },
    }

    const perf = basePerformance[algorithm as keyof typeof basePerformance] || basePerformance["q-learning"]

    return {
      ...perf,
      totalEpisodes: episodes,
      convergenceEpisode: Math.floor(episodes * 0.6),
      bestEpisodeReward: perf.avgReward * 1.4,
      worstEpisodeReward: perf.avgReward * 0.3,
      trainingTime: Math.ceil(episodes / 100),
      memoryUsage: Math.ceil(episodes * 0.05),
    }
  }

  const evaluationData = generateEvaluationData()

  // Generate comparison data
  const comparisonData = [
    { algorithm: "Random Agent", reward: 50, successRate: 20, efficiency: 10 },
    { algorithm: "Q-Learning", reward: 180, successRate: 75, efficiency: 65 },
    { algorithm: "DQN", reward: 220, successRate: 85, efficiency: 80 },
    { algorithm: "PPO", reward: 280, successRate: 95, efficiency: 90 },
    {
      algorithm: config.algorithm,
      reward: evaluationData.avgReward,
      successRate: evaluationData.successRate,
      efficiency: evaluationData.efficiency,
      highlight: true,
    },
  ]

  // Generate training curve data
  const trainingCurveData = Array.from({ length: 20 }, (_, i) => {
    const episode = (i + 1) * (evaluationData.totalEpisodes / 20)
    const progress = i / 19
    const reward = 50 + progress * (evaluationData.avgReward - 50) + Math.sin(i * 0.5) * 20
    return {
      episode: Math.floor(episode),
      reward: Math.max(0, reward),
      success: Math.min(100, progress * evaluationData.successRate + Math.random() * 10),
    }
  })

  const exportMetrics = () => {
    const metrics = {
      task: config.task,
      algorithm: config.algorithm,
      configuration: config.agent,
      results: evaluationData,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(metrics, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `rl-evaluation-${config.task}-${config.algorithm}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportReport = () => {
    const report = `
# RL Training Evaluation Report

## Configuration
- **Task**: ${config.task}
- **Algorithm**: ${config.algorithm}
- **Episodes**: ${evaluationData.totalEpisodes}
- **Training Time**: ${evaluationData.trainingTime} minutes

## Results
- **Average Reward**: ${evaluationData.avgReward.toFixed(1)}
- **Success Rate**: ${evaluationData.successRate.toFixed(1)}%
- **Efficiency Score**: ${evaluationData.efficiency.toFixed(1)}%
- **Convergence Episode**: ${evaluationData.convergenceEpisode}

## Performance Analysis
The ${config.algorithm} agent achieved an average reward of ${evaluationData.avgReward.toFixed(1)} 
over ${evaluationData.totalEpisodes} training episodes on the ${config.task} task.

Generated on: ${new Date().toLocaleString()}
    `

    const blob = new Blob([report], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `rl-report-${config.task}-${config.algorithm}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      {/* Educational Introduction */}
      <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-green-900 dark:text-green-100">
            📊 Evaluation Results
          </CardTitle>
          <CardDescription className="font-space-mono text-green-700 dark:text-green-300">
            Comprehensive analysis of your {config.algorithm} agent's performance on {config.task}. Review metrics,
            compare with other algorithms, and export your results.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-orbitron text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Average Reward
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {evaluationData.avgReward.toFixed(1)}
            </div>
            <div className="text-sm font-space-mono text-gray-600 dark:text-gray-400">
              Range: {evaluationData.worstEpisodeReward.toFixed(1)} - {evaluationData.bestEpisodeReward.toFixed(1)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-orbitron text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {evaluationData.successRate.toFixed(1)}%
            </div>
            <div className="text-sm font-space-mono text-gray-600 dark:text-gray-400">Task completion rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-orbitron text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {evaluationData.efficiency.toFixed(1)}%
            </div>
            <div className="text-sm font-space-mono text-gray-600 dark:text-gray-400">Learning efficiency score</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-orbitron text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-500" />
              Convergence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {evaluationData.convergenceEpisode}
            </div>
            <div className="text-sm font-space-mono text-gray-600 dark:text-gray-400">Episodes to converge</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Training Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-orbitron text-lg">Training Progress</CardTitle>
            <CardDescription className="font-space-mono">
              Reward and success rate over training episodes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trainingCurveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="episode" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="reward" stroke="#3b82f6" strokeWidth={2} name="Average Reward" />
                  <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} name="Success Rate (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Algorithm Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="font-orbitron text-lg">Algorithm Comparison</CardTitle>
            <CardDescription className="font-space-mono">
              Performance comparison with other RL algorithms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="algorithm" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey={
                      selectedMetric === "reward"
                        ? "reward"
                        : selectedMetric === "success"
                          ? "successRate"
                          : "efficiency"
                    }
                    fill="#8884d8"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                variant={selectedMetric === "reward" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMetric("reward")}
                className="font-space-mono"
              >
                Reward
              </Button>
              <Button
                variant={selectedMetric === "success" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMetric("success")}
                className="font-space-mono"
              >
                Success Rate
              </Button>
              <Button
                variant={selectedMetric === "efficiency" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMetric("efficiency")}
                className="font-space-mono"
              >
                Efficiency
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="font-orbitron text-lg">Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-orbitron text-sm font-semibold mb-2 text-green-600 dark:text-green-400">Strengths</h4>
              <ul className="space-y-1 text-sm font-space-mono text-gray-600 dark:text-gray-400">
                {evaluationData.successRate > 80 && (
                  <li>• High success rate ({evaluationData.successRate.toFixed(1)}%)</li>
                )}
                {evaluationData.avgReward > 200 && <li>• Excellent reward performance</li>}
                {evaluationData.efficiency > 75 && <li>• Efficient learning process</li>}
                {evaluationData.convergenceEpisode < evaluationData.totalEpisodes * 0.7 && (
                  <li>• Fast convergence to optimal policy</li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-orbitron text-sm font-semibold mb-2 text-orange-600 dark:text-orange-400">
                Areas for Improvement
              </h4>
              <ul className="space-y-1 text-sm font-space-mono text-gray-600 dark:text-gray-400">
                {evaluationData.successRate < 70 && <li>• Consider increasing exploration or training episodes</li>}
                {evaluationData.avgReward < 150 && <li>• Reward performance could be improved</li>}
                {evaluationData.efficiency < 60 && <li>• Learning efficiency needs optimization</li>}
                {evaluationData.convergenceEpisode > evaluationData.totalEpisodes * 0.8 && (
                  <li>• Slow convergence - try different hyperparameters</li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="font-orbitron text-lg">Export Results</CardTitle>
          <CardDescription className="font-space-mono">
            Save your training results and analysis for future reference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={exportMetrics} className="font-space-mono">
              <Download className="h-4 w-4 mr-2" />
              Export Metrics (JSON)
            </Button>
            <Button onClick={exportReport} variant="outline" className="font-space-mono">
              <FileText className="h-4 w-4 mr-2" />
              Export Report (MD)
            </Button>
            <Button variant="outline" className="font-space-mono" disabled>
              <Save className="h-4 w-4 mr-2" />
              Save Model
              <Badge variant="secondary" className="ml-2">
                Soon
              </Badge>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Training Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="font-orbitron text-lg">Training Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-space-mono">
            <div>
              <div className="text-gray-600 dark:text-gray-400">Task</div>
              <div className="font-semibold">{config.task}</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400">Algorithm</div>
              <div className="font-semibold">{config.algorithm}</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400">Episodes</div>
              <div className="font-semibold">{evaluationData.totalEpisodes}</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400">Training Time</div>
              <div className="font-semibold">{evaluationData.trainingTime} min</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400">Learning Rate</div>
              <div className="font-semibold">{config.agent?.learningRate?.[0] || 0.001}</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400">Discount Factor</div>
              <div className="font-semibold">{config.agent?.discountFactor?.[0] || 0.99}</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400">Batch Size</div>
              <div className="font-semibold">{config.agent?.batchSize?.[0] || 32}</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400">Memory Usage</div>
              <div className="font-semibold">{evaluationData.memoryUsage} MB</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { RlEvaluationDashboard }
