"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: "devassist",
    title: "DevAssist",
    description: "Enterprise-grade automated code migration using LangGraph workflow. Supports Python 2→3 and Flask→FastAPI migrations.",
    image: "/images/devassist.png",
    github: "https://github.com/HustleDanie/DevAssist",
    link: "/projects/autonomous-agent-systems",
  },
  {
    id: "stockagentx",
    title: "StockAgentX",
    description: "AI-powered financial intelligence platform leveraging multi-agent orchestration, RAG pipeline, and deep learning.",
    image: "/images/stock.png",
    github: "https://github.com/HustleDanie/StockAgentX-Multi-Agent-Financial-Intelligence-Platform",
    link: "/projects/autonomous-agent-systems",
  },
  {
    id: "vision-transformer-training",
    title: "Vision Transformer Training",
    description: "Advanced training interface for Vision Transformers (ViT) with support for image classification and attention visualization.",
    image: "/placeholder-logo.svg",
    github: "#",
    link: "/projects/vision-transformer-training",
  },
  {
    id: "encoder-training-dynamics",
    title: "Encoder Training Dynamics",
    description: "Deep dive into transformer encoder architectures and their training dynamics for NLP tasks.",
    image: "/placeholder-logo.svg",
    github: "#",
    link: "/projects/encoder-training-dynamics",
  },
  {
    id: "decoder-language-modeling",
    title: "Decoder Language Modeling",
    description: "Exploring autoregressive language models and decoder-only transformer architectures.",
    image: "/placeholder-logo.svg",
    github: "#",
    link: "/projects/decoder-language-modeling",
  },
  {
    id: "deep-rl-playground",
    title: "Deep RL Playground",
    description: "Interactive platform for training and testing reinforcement learning agents across various environments.",
    image: "/placeholder-logo.svg",
    github: "#",
    link: "/projects/deep-rl-playground",
  },
  {
    id: "cnn-computer-vision",
    title: "CNN Computer Vision",
    description: "Comprehensive CNN training platform for image classification and computer vision tasks.",
    image: "/placeholder-logo.svg",
    github: "#",
    link: "/projects/cnn-computer-vision",
  },
  {
    id: "rnn-sequential-modeling",
    title: "RNN Sequential Modeling",
    description: "Exploring recurrent neural networks for sequential data processing and time series analysis.",
    image: "/placeholder-logo.svg",
    github: "#",
    link: "/projects/rnn-sequential-modeling",
  },
  {
    id: "lstm-long-term-dependencies",
    title: "LSTM Long-Term Dependencies",
    description: "Understanding LSTM networks and their ability to capture long-term dependencies in sequences.",
    image: "/placeholder-logo.svg",
    github: "#",
    link: "/projects/lstm-long-term-dependencies",
  },
]

export default function ProjectsPage() {
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
              Projects
            </h1>
            <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full bg-white dark:bg-card border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/50 rounded-lg">
                  {/* Project Image */}
                  <Link href={project.link}>
                    <div className="relative h-40 sm:h-48 md:h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                      <img
                        src={project.image || "/placeholder-logo.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-logo.svg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>

                  {/* Project Content */}
                  <div className="p-4 sm:p-5 md:p-6">
                    <Link href={project.link}>
                      <h3 className="font-orbitron text-base sm:text-lg md:text-xl font-bold text-black dark:text-white mb-2 sm:mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {project.title}
                      </h3>
                    </Link>
                    <p className="font-space-mono text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                      {project.description}
                    </p>

                    {/* Links */}
                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800">
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-space-mono text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">View on GitHub</span>
                        <span className="sm:hidden">GitHub</span>
                      </Link>
                      <Link
                        href={project.link}
                        className="flex items-center gap-1 text-xs sm:text-sm font-space-mono text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                      >
                        <span>Details</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
