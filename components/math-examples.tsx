"use client"

import TeX from "@matejmazur/react-katex"
import "katex/dist/katex.min.css"

// Reusable math components
export const BlockMath = ({ math, className = "" }: { math: string; className?: string }) => (
  <div className={`my-4 ${className}`}>
    <TeX math={math} block />
  </div>
)

export const InlineMath = ({ math }: { math: string }) => <TeX math={math} />

// Example usage component
export function MathExamples() {
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold mb-4">Math Formula Examples</h2>

      {/* Block Math */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-3">Attention Formula</h3>
        <BlockMath
          math="\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V"
          className="bg-gray-50 p-4 rounded border-l-4 border-blue-500"
        />
      </div>

      {/* Inline Math */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-3">Inline Math Example</h3>
        <p>
          The transformer uses <InlineMath math="d_{model} = 512" /> as the model dimension, with{" "}
          <InlineMath math="h = 8" /> attention heads, where each head has dimension{" "}
          <InlineMath math="d_k = d_v = d_{model}/h = 64" />.
        </p>
      </div>

      {/* Complex Formula */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-3">Layer Normalization</h3>
        <BlockMath math="\text{LayerNorm}(x) = \gamma \odot \frac{x - \mu}{\sigma} + \beta" className="text-center" />
        <p className="text-sm text-gray-600 mt-2">
          Where <InlineMath math="\mu" /> and <InlineMath math="\sigma" /> are the mean and standard deviation computed
          over the features.
        </p>
      </div>
    </div>
  )
}
