"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: "devassist",
    title: "DevAssist",
    description: "Enterprise-grade automated code migration using LangGraph workflow. Supports Python 2→3 and Flask→FastAPI migrations.",
    link: "/projects/autonomous-agent-systems",
  },
  {
    id: "stockagentx",
    title: "StockAgentX",
    description: "AI-powered financial intelligence platform leveraging multi-agent orchestration, RAG pipeline, and deep learning.",
    link: "/projects/autonomous-agent-systems",
  },
  {
    id: "vision-transformer",
    title: "Vision Transformer Training",
    description: "Interactive exploration of Vision Transformers (ViT) for image classification with attention visualization.",
    link: "/projects/vision-transformer-training",
  },
  {
    id: "encoder-dynamics",
    title: "Encoder Training Dynamics",
    description: "Deep dive into transformer encoder architectures and their training dynamics for NLP tasks.",
    link: "/projects/encoder-training-dynamics",
  },
  {
    id: "decoder-modeling",
    title: "Decoder Language Modeling",
    description: "Exploring autoregressive language models and decoder-only transformer architectures.",
    link: "/projects/decoder-language-modeling",
  },
  {
    id: "deep-rl",
    title: "Deep RL Playground",
    description: "Interactive reinforcement learning experiments with DQN, PPO, and A3C algorithms.",
    link: "/projects/deep-rl-playground",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white">
              Blog
            </h1>
            <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={post.link}>
                  <div className="bg-card border border-border rounded-lg p-4 sm:p-5 md:p-6 h-full hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-lg group">
                    <h3 className="font-orbitron text-base sm:text-lg md:text-xl font-semibold text-black dark:text-white mb-2 sm:mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-space-mono text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center text-xs sm:text-sm font-space-mono text-muted-foreground group-hover:text-black dark:group-hover:text-white transition-colors">
                      Read more
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
