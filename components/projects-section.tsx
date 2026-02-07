"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const featuredProjects = [
  {
    id: "devassist",
    title: "DevAssist",
    description:
      "Enterprise-grade automated code migration using LangGraph workflow. Supports Python 2→3 and Flask→FastAPI migrations with a multi-agent system featuring Git Clone, Planner Agent, Coder Agent, and Tester Agent for seamless code transformation.",
    image: "/images/devassist.png",
    github: "https://github.com/HustleDanie/DevAssist",
  },
  {
    id: "stockagentx",
    title: "StockAgentX",
    description:
      "AI-powered financial intelligence platform leveraging multi-agent orchestration, RAG pipeline, and deep learning (FinBERT, LSTM) for real-time stock market analysis with SEC filings integration and sentiment analysis.",
    image: "/images/stock.png",
    github: "https://github.com/HustleDanie/StockAgentX-Multi-Agent-Financial-Intelligence-Platform",
  },
  {
    id: "neural-network-playground",
    title: "Neural Network Playground",
    description:
      "Hands-on exploration of neural architectures and training dynamics with real-time visualization and experimentation tools.",
    image: "/placeholder-logo.svg",
    github: "#",
  },
]

const ProjectsSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-16 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-black dark:text-gray-300 font-space-mono text-sm md:text-base">
            Interactive AI projects and research tools showcasing practical applications of machine learning and deep learning.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/50">
                {/* Project Image */}
                <Link href={`/projects/${project.id}`}>
                  <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
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
                <div className="p-6">
                  <Link href={`/projects/${project.id}`}>
                    <h3 className="font-orbitron text-xl font-bold text-black dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="font-space-mono text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* GitHub Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-space-mono text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4" />
                      <span>View on GitHub</span>
                    </Link>
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-1 text-sm font-space-mono text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
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

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="font-space-mono font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 px-8 py-3 rounded-lg group"
          >
            <Link href="/projects" className="flex items-center gap-2">
              Explore More Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
