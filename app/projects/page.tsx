"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: "knowledge-retrieval",
    title: "Enterprise Knowledge Retrieval",
    description: "Production-ready GenAI/MLOps platform for enterprise document search, synthesis, and RAG pipelines with hybrid search.",
    image: "/images/retrieval.png",
    github: "https://github.com/HustleDanie/Enterprise-Knowledge-Retrieval-Synthesis-Platform",
    link: "/projects/knowledge-retrieval",
  },
  {
    id: "omnisearch",
    title: "OmniSearch",
    description: "Multimodal product discovery engine using CLIP embeddings. Search with text, images, or both for cross-modal e-commerce search.",
    image: "/images/omnisearch.png",
    github: "https://github.com/HustleDanie/OmniSearch-A-Multimodal-Retrieval-and-Ranking-System-for-Cross-Modal-E-Commerce-Product-Discovery",
    link: "/projects/omnisearch",
  },
  {
    id: "medsecure",
    title: "MedSecure",
    description: "HIPAA-compliant medical document summarization platform with automatic PII masking and AI-powered summarization.",
    image: "/images/medsecure.png",
    github: "https://github.com/HustleDanie/MedSecure---HIPAA-Compliant-Medical-Summary-Platform-",
    link: "/projects/medsecure",
  },
  {
    id: "oncology-irae-detection",
    title: "Oncology irAE Assistant",
    description: "AI-powered clinical decision support for detecting and triaging immune-related adverse events in oncology immunotherapy patients.",
    image: "/images/oncology.png",
    github: "https://github.com/HustleDanie/Oncology-irAE-Detection",
    link: "/projects/oncology-irae-detection",
  },
  {
    id: "devassist",
    title: "DevAssist",
    description: "Enterprise-grade automated code migration using LangGraph workflow. Supports Python 2→3 and Flask→FastAPI migrations.",
    image: "/images/devassist.png",
    github: "https://github.com/HustleDanie/DevAssist",
    link: "/projects/devassist",
  },
  {
    id: "stockagentx",
    title: "StockAgentX",
    description: "AI-powered financial intelligence platform leveraging multi-agent orchestration, RAG pipeline, and deep learning.",
    image: "/images/stock.png",
    github: "https://github.com/HustleDanie/StockAgentX-Multi-Agent-Financial-Intelligence-Platform",
    link: "/projects/stockagentx",
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
                <div className="h-full bg-white dark:bg-card border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/50">
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
