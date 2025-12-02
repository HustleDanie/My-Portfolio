"use client"

import { useEffect, useRef } from "react"

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Matrix characters
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("")

    const fontSize = 10
    let columns = Math.max(1, Math.floor(canvas.width / fontSize))

    // Array of drops - one per column
    const drops: number[] = Array.from({ length: columns }, () => 1)

    // Initialize drops
    // for (let x = 0; x < columns; x++) {
    //   drops[x] = 1
    // }

    // Drawing the characters
    function draw() {
      // Black BG for the canvas with slight transparency for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0F0" // Green text
      ctx.font = fontSize + "px monospace"

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Random character to print
        const text = matrix[Math.floor(Math.random() * matrix.length)]

        // x = i * fontSize, y = value of drops[i] * fontSize
        ctx.fillStyle = `rgba(0, 255, 0, ${Math.random() * 0.5 + 0.5})`
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Sending the drop back to the top randomly after it has crossed the screen
        // Adding randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Incrementing Y coordinate
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    const handleResize = () => {
      resizeCanvas()
      columns = Math.max(1, Math.floor(canvas.width / fontSize))

      // Shrink or grow the drops array to exactly `columns`
      if (drops.length > columns) {
        drops.splice(columns) // remove extra
      } else {
        while (drops.length < columns) {
          drops.push(Math.floor((Math.random() * canvas.height) / fontSize))
        }
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "black" }}
    />
  )
}
