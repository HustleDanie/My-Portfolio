"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, TrendingUp, Zap, Target, Brain } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RlTrainingInterfaceProps {
  onTrainingComplete: (results: any) => void
  config: any
}

export default function RlTrainingInterface({ onTrainingComplete, config }: RlTrainingInterfaceProps) {
  const [isTraining, setIsTraining] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState(0)
  const [trainingData, setTrainingData] = useState<any[]>([])
  const [currentMetrics, setCurrentMetrics] = useState({
    reward: 0,
    avgReward: 0,
    exploration: 0.1,
    loss: 0,
    episodeLength: 0,
    successRate: 0,
  })

  const [trainingMode, setTrainingMode] = useState<"simulated" | "real">("simulated")

  // Simulated training data generation
  const generateTrainingStep = (episode: number) => {
    const progress = episode / (config.agent?.episodes?.[0] || 1000)
    const baseReward = Math.sin(episode * 0.01) * 50 + 100 + progress * 200
    const noise = (Math.random() - 0.5) * 100
    const reward = Math.max(0, baseReward + noise)

    const avgReward =
      trainingData.length > 0
        ? trainingData.slice(-10).reduce((sum, d) => sum + d.reward, 0) / Math.min(10, trainingData.length)
        : reward

    const exploration = Math.max(
      0.01,
      (config.agent?.explorationRate?.[0] || 0.1) * Math.pow(config.agent?.explorationDecay?.[0] || 0.995, episode),
    )
    const loss = Math.max(0, 2 - progress * 1.5 + Math.random() * 0.5)
    const episodeLength = Math.floor(50 + progress * 150 + Math.random() * 50)
    const successRate = Math.min(1, progress * 0.8 + Math.random() * 0.2)

    return {
      episode,
      reward,
      avgReward,
      exploration,
      loss,
      episodeLength,
      successRate: successRate * 100,
    }
  }

  const startTraining = () => {
    setIsTraining(true)
    setCurrentEpisode(0)
    setTrainingData([])
  }

  const pauseTraining = () => {
    setIsTraining(false)
  }

  const resetTraining = () => {
    setIsTraining(false)
    setCurrentEpisode(0)
    setTrainingData([])
    setCurrentMetrics({
      reward: 0,
      avgReward: 0,
      exploration: 0.1,
      loss: 0,
      episodeLength: 0,
      successRate: 0,
    })
  }

  // Training simulation effect
  useEffect(() => {
    if (!isTraining) return

    const interval = setInterval(() => {
      const maxEpisodes = config.agent?.episodes?.[0] || 1000

      if (currentEpisode >= maxEpisodes) {
        setIsTraining(false)
        onTrainingComplete({
          finalReward: currentMetrics.avgReward,
          totalEpisodes: maxEpisodes,
          trainingData: trainingData,
          convergenceEpisode: Math.floor(maxEpisodes * 0.7),
        })
        return
      }

      const newStep = generateTrainingStep(currentEpisode)
      setTrainingData((prev) => [...prev.slice(-99), newStep])
      setCurrentMetrics(newStep)
      setCurrentEpisode((prev) => prev + 1)
    }, 50) // Fast simulation

    return () => clearInterval(interval)
  }, [isTraining, currentEpisode, config, currentMetrics, trainingData, onTrainingComplete])

  const maxEpisodes = config.agent?.episodes?.[0] || 1000
  const progress = (currentEpisode / maxEpisodes) * 100

  return (
    <div className="space-y-8">
      {/* Educational Introduction */}
      <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl text-green-900 dark:text-green-100">
            🚀 Train Your RL Agent
          </CardTitle>
          <CardDescription className="font-space-mono text-green-700 dark:text-green-300">
            Watch your {config.algorithm} agent learn to solve {config.task} in real-time. Monitor training metrics and
            see how the agent's performance improves over episodes.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Training Controls & Progress */}
        <div className="space-y-6">
          {/* Training Mode Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron text-lg">Training Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={trainingMode === "simulated" ? "default" : "outline"}
                  onClick={() => setTrainingMode("simulated")}
                  className="font-space-mono"
                >
                  Simulated
                </Button>
                <Button
                  variant={trainingMode === "real" ? "default" : "outline"}
                  onClick={() => setTrainingMode("real")}
                  className="font-space-mono"
                  disabled
                >
                  Real Backend
                  <Badge variant="secondary" className="ml-2">
                    Soon
                  </Badge>
                </Button>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-space-mono">
                {trainingMode === "simulated"
                  ? "Fast simulation for demonstration purposes"
                  : "Connect to real PyTorch backend for actual training"}
              </p>
            </CardContent>
          </Card>

          {/* Training Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron text-lg">Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={isTraining ? pauseTraining : startTraining}
                  className="font-space-mono"
                  disabled={currentEpisode >= maxEpisodes}
                >
                  {isTraining ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      {currentEpisode > 0 ? "Resume" : "Start"}
                    </>
                  )}
                </Button>
                <Button onClick={resetTraining} variant="outline" className="font-space-mono">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Training Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron text-lg">Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-space-mono mb-2">
                  <span>
                    Episode {currentEpisode} / {maxEpisodes}
                  </span>
                  <span>{progress.toFixed(1)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-2 text-sm font-space-mono">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant={isTraining ? "default" : "secondary"}>
                    {isTraining ? "Training" : currentEpisode >= maxEpisodes ? "Complete" : "Paused"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>ETA:</span>
                  <span>
                    {isTraining
                      ? `${Math.ceil(((maxEpisodes - currentEpisode) * 0.05) / 60)}m ${Math.ceil(((maxEpisodes - currentEpisode) * 0.05) % 60)}s`
                      : "Paused"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron text-lg">Current Episode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm font-space-mono">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Reward</div>
                    <div className="font-bold">{currentMetrics.reward.toFixed(1)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Avg Reward</div>
                    <div className="font-bold">{currentMetrics.avgReward.toFixed(1)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Exploration</div>
                    <div className="font-bold">{(currentMetrics.exploration * 100).toFixed(1)}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-500" />
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Loss</div>
                    <div className="font-bold">{currentMetrics.loss.toFixed(3)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Reward Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron text-lg">Reward Progress</CardTitle>
              <CardDescription className="font-space-mono">
                Episode rewards and moving average over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trainingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="episode" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="reward"
                      stroke="#8884d8"
                      strokeWidth={1}
                      dot={false}
                      name="Episode Reward"
                    />
                    <Line
                      type="monotone"
                      dataKey="avgReward"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      dot={false}
                      name="Moving Average"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exploration Decay */}
            <Card>
              <CardHeader>
                <CardTitle className="font-orbitron text-lg">Exploration Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trainingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="episode" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="exploration" stroke="#ff7300" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Loss Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="font-orbitron text-lg">Training Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trainingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="episode" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="loss" stroke="#dc2626" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Environment Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron text-lg">Environment Visualization</CardTitle>
              <CardDescription className="font-space-mono">
                Live view of agent performance in {config.task}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                <div className="space-y-4">
                  <div className="text-4xl">🤖</div>
                  <div className="font-space-mono text-sm text-gray-600 dark:text-gray-400">
                    {isTraining
                      ? `Agent is learning... Episode ${currentEpisode}`
                      : currentEpisode >= maxEpisodes
                        ? "Training Complete! Agent has learned the task."
                        : "Click Start to begin training visualization"}
                  </div>
                  {isTraining && (
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-space-mono text-xs">Learning in progress</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Continue Button */}
      {currentEpisode >= maxEpisodes && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={() =>
              onTrainingComplete({
                finalReward: currentMetrics.avgReward,
                totalEpisodes: maxEpisodes,
                trainingData: trainingData,
                convergenceEpisode: Math.floor(maxEpisodes * 0.7),
              })
            }
            size="lg"
            className="font-space-mono"
          >
            Continue to Prediction Playground
          </Button>
        </div>
      )}
    </div>
  )
}

export { RlTrainingInterface }
