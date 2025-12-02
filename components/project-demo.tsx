"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectDemoProps {
  projectType: "neural" | "cognitive" | "rl" | "tensor"
  title?: string
  description?: string
}

export function ProjectDemo({ projectType, title, description }: ProjectDemoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [animationId, setAnimationId] = useState<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Responsive canvas sizing
    const updateCanvasSize = () => {
      const isMobile = window.innerWidth < 768
      canvas.width = isMobile ? 320 : 500
      canvas.height = isMobile ? 200 : 300
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Different animations based on project type
      switch (projectType) {
        case "neural":
          drawNeuralNetwork(ctx, time, window.innerWidth < 768)
          break
        case "cognitive":
          drawCognitiveArchitecture(ctx, time, window.innerWidth < 768)
          break
        case "rl":
          drawRLEnvironment(ctx, time, window.innerWidth < 768)
          break
        case "tensor":
          drawTensorOperations(ctx, time, window.innerWidth < 768)
          break
      }

      time += 0.02
      if (isRunning) {
        const id = requestAnimationFrame(animate)
        setAnimationId(id)
      }
    }

    if (isRunning) {
      animate()
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isRunning, projectType])

  // Keep all the existing drawing functions exactly the same
  const drawNeuralNetwork = (ctx: CanvasRenderingContext2D, time: number, isMobile: boolean) => {
    const layers = isMobile ? [3, 4, 3, 2] : [4, 6, 6, 4, 2]
    const layerSpacing = isMobile ? 70 : 90
    const nodeSpacing = isMobile ? 30 : 35
    const canvasHeight = isMobile ? 200 : 300

    layers.forEach((nodeCount, layerIndex) => {
      const x = (isMobile ? 30 : 50) + layerIndex * layerSpacing
      const startY = (canvasHeight - (nodeCount - 1) * nodeSpacing) / 2

      for (let i = 0; i < nodeCount; i++) {
        const y = startY + i * nodeSpacing
        const activation = Math.sin(time * 2 + layerIndex + i) * 0.5 + 0.5

        // Draw connections to next layer
        if (layerIndex < layers.length - 1) {
          const nextLayerNodes = layers[layerIndex + 1]
          const nextX = x + layerSpacing
          const nextStartY = (canvasHeight - (nextLayerNodes - 1) * nodeSpacing) / 2

          for (let j = 0; j < nextLayerNodes; j++) {
            const nextY = nextStartY + j * nodeSpacing
            const weight = Math.sin(time + i + j + layerIndex) * 0.5 + 0.5

            ctx.strokeStyle = `rgba(0, 255, 100, ${weight * 0.8})`
            ctx.lineWidth = weight * (isMobile ? 2 : 4)
            ctx.beginPath()
            ctx.moveTo(x + (isMobile ? 6 : 10), y)
            ctx.lineTo(nextX - (isMobile ? 6 : 10), nextY)
            ctx.stroke()
          }
        }

        // Draw node
        const nodeSize = isMobile ? 8 : 12
        ctx.fillStyle = `rgba(0, 255, 100, ${activation})`
        ctx.beginPath()
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = "#00ff64"
        ctx.lineWidth = isMobile ? 1 : 2
        ctx.stroke()
      }
    })
  }

  const drawCognitiveArchitecture = (ctx: CanvasRenderingContext2D, time: number, isMobile: boolean) => {
    const modules = isMobile
      ? [
          { name: "Perception", x: 60, y: 60, color: "#ff6b6b", type: "neural" },
          { name: "Memory", x: 160, y: 50, color: "#4ecdc4", type: "hybrid" },
          { name: "Reasoning", x: 260, y: 60, color: "#45b7d1", type: "symbolic" },
          { name: "Action", x: 160, y: 140, color: "#96ceb4", type: "neural" },
        ]
      : [
          { name: "Perception", x: 80, y: 80, color: "#ff6b6b", type: "neural" },
          { name: "Memory", x: 250, y: 60, color: "#4ecdc4", type: "hybrid" },
          { name: "Reasoning", x: 420, y: 80, color: "#45b7d1", type: "symbolic" },
          { name: "Planning", x: 350, y: 180, color: "#96ceb4", type: "symbolic" },
          { name: "Action", x: 180, y: 200, color: "#feca57", type: "neural" },
          { name: "Learning", x: 250, y: 140, color: "#ff9ff3", type: "hybrid" },
        ]

    modules.forEach((module, index) => {
      const pulse = Math.sin(time * 2 + index) * 0.3 + 0.7
      const size = isMobile ? (module.type === "hybrid" ? 35 : 30) : module.type === "hybrid" ? 50 : 40

      ctx.fillStyle = module.color
      ctx.globalAlpha = pulse

      if (module.type === "symbolic") {
        ctx.fillRect(module.x - size / 2, module.y - size / 2, size, size)
      } else if (module.type === "neural") {
        ctx.beginPath()
        ctx.arc(module.x, module.y, size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          const x = module.x + (size / 2) * Math.cos(angle)
          const y = module.y + (size / 2) * Math.sin(angle)
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
      }

      ctx.globalAlpha = 1

      // Draw labels
      ctx.fillStyle = "#ffffff"
      ctx.font = isMobile ? "8px monospace" : "12px monospace"
      ctx.textAlign = "center"
      ctx.fillText(module.name, module.x, module.y + size / 2 + (isMobile ? 12 : 20))
    })
  }

  const drawRLEnvironment = (ctx: CanvasRenderingContext2D, time: number, isMobile: boolean) => {
    const gridSize = isMobile ? 25 : 40
    const cols = isMobile ? 8 : 10
    const rows = isMobile ? 5 : 6
    const startX = isMobile ? 20 : 50
    const startY = isMobile ? 20 : 50

    // Environment grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSize + startX
        const y = j * gridSize + startY
        const value = Math.sin(time * 0.5 + i * 0.3 + j * 0.2) * 0.5 + 0.5

        const red = Math.floor(255 * (1 - value))
        const green = Math.floor(255 * value)
        ctx.fillStyle = `rgba(${red}, ${green}, 100, 0.4)`
        ctx.fillRect(x, y, gridSize - 2, gridSize - 2)

        ctx.strokeStyle = "#333"
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, gridSize - 2, gridSize - 2)
      }
    }

    // Agent
    const agentX = startX + 40 + Math.sin(time * 0.8) * (isMobile ? 80 : 180)
    const agentY = startY + 60 + Math.cos(time * 0.6) * (isMobile ? 40 : 80)

    ctx.fillStyle = "#ff4444"
    ctx.beginPath()
    ctx.arc(agentX, agentY, isMobile ? 6 : 8, 0, Math.PI * 2)
    ctx.fill()

    // Metrics
    const reward = Math.sin(time * 2) * 50 + 50
    ctx.fillStyle = "#ffffff"
    ctx.font = isMobile ? "8px monospace" : "12px monospace"
    ctx.textAlign = "left"
    ctx.fillText(`Reward: ${reward.toFixed(1)}`, 10, isMobile ? 15 : 20)
  }

  const drawTensorOperations = (ctx: CanvasRenderingContext2D, time: number, isMobile: boolean) => {
    const operations = isMobile
      ? [
          { name: "Input", x: 40, y: 70, width: 60, height: 40, color: "#ff6b6b" },
          { name: "MatMul", x: 140, y: 60, width: 60, height: 60, color: "#4ecdc4" },
          { name: "Output", x: 240, y: 70, width: 60, height: 40, color: "#45b7d1" },
        ]
      : [
          { name: "Input", x: 60, y: 100, width: 80, height: 60, color: "#ff6b6b" },
          { name: "MatMul", x: 200, y: 80, width: 80, height: 100, color: "#4ecdc4" },
          { name: "Activation", x: 340, y: 100, width: 80, height: 60, color: "#45b7d1" },
        ]

    operations.forEach((op, index) => {
      const intensity = Math.sin(time * 3 + index * 0.5) * 0.5 + 0.5

      ctx.fillStyle = op.color
      ctx.globalAlpha = 0.3 + intensity * 0.7
      ctx.fillRect(op.x, op.y, op.width, op.height)
      ctx.globalAlpha = 1

      // Draw grid pattern
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 1
      const cellWidth = op.width / (isMobile ? 4 : 6)
      const cellHeight = op.height / (isMobile ? 3 : 4)

      for (let i = 0; i <= (isMobile ? 4 : 6); i++) {
        ctx.beginPath()
        ctx.moveTo(op.x + i * cellWidth, op.y)
        ctx.lineTo(op.x + i * cellWidth, op.y + op.height)
        ctx.stroke()
      }

      // Labels
      ctx.fillStyle = "#ffffff"
      ctx.font = isMobile ? "8px monospace" : "14px monospace"
      ctx.textAlign = "center"
      ctx.fillText(op.name, op.x + op.width / 2, op.y + op.height + (isMobile ? 12 : 20))
    })
  }

  const handleToggle = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  return (
    <div className="w-full px-4 py-6 md:px-8 lg:px-12">
      {/* Responsive Container: Stack on mobile, side-by-side on desktop */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start">
        {/* Left Content: Description */}
        <div className="w-full lg:w-1/2 space-y-4 lg:space-y-6">
          {title && <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400 font-mono">{title}</h3>}

          {description && (
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">{description}</p>
          )}

          <div className="space-y-2 lg:space-y-3">
            <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white font-mono">
              Interactive Features:
            </h4>
            <ul className="text-xs sm:text-sm lg:text-base text-gray-400 space-y-1 lg:space-y-2 font-mono">
              <li>• Real-time visualization</li>
              <li>• Play/pause controls</li>
              <li>• Reset functionality</li>
              <li>• Responsive animations</li>
            </ul>
          </div>
        </div>

        {/* Right Content: Demo Canvas */}
        <div className="w-full lg:w-1/2 order-1 lg:order-none">
          <div className="bg-black rounded-lg p-3 md:p-4 lg:p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-2 md:mb-3 lg:mb-4">
              <h4 className="text-green-400 font-mono text-xs sm:text-sm lg:text-base">Live Simulation</h4>
              <div className="flex gap-1 md:gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleToggle}
                  className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 p-0"
                >
                  {isRunning ? (
                    <Pause className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4" />
                  ) : (
                    <Play className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReset}
                  className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 p-0"
                >
                  <RotateCcw className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4" />
                </Button>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              className="w-full h-32 sm:h-40 md:h-48 lg:h-64 border border-green-500/30 rounded bg-black"
              style={{ imageRendering: "pixelated" }}
            />

            <div className="mt-2 md:mt-3 lg:mt-4 flex justify-between items-center text-xs sm:text-sm text-gray-400 font-mono">
              <span>{isRunning ? "● RUNNING" : "○ STOPPED"}</span>
              <span className="hidden sm:inline">Real-time visualization</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
