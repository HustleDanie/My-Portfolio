"use client"

import { useEffect, useRef } from "react"

interface MathRendererProps {
  math: string
  display?: boolean
}

declare global {
  interface Window {
    MathJax: any
  }
}

export default function MathRenderer({ math, display = false }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load MathJax if it's not already loaded
    if (!window.MathJax) {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
      script.async = true
      document.head.appendChild(script)

      script.onload = () => {
        window.MathJax.startup.promise = window.MathJax.startup.promise
          .then(() => {
            if (containerRef.current) {
              window.MathJax.typeset([containerRef.current])
            }
          })
          .catch((err: any) => console.error("MathJax failed to start:", err))
      }
    } else if (containerRef.current) {
      // If MathJax is already loaded, just typeset the current element
      window.MathJax.typeset([containerRef.current])
    }
  }, [math])

  return <div ref={containerRef}>{display ? <div>{`\\[${math}\\]`}</div> : <span>{`\$$${math}\$$`}</span>}</div>
}
