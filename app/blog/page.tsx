"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: "knowledge-retrieval",
    title: "Enterprise Knowledge Retrieval & Synthesis Platform",
    description: "Building a production-ready GenAI/MLOps system for enterprise document search, synthesis, and RAG pipelines with hybrid search and citations.",
    link: "/projects/knowledge-retrieval",
  },
  {
    id: "omnisearch",
    title: "OmniSearch: Multimodal Product Discovery",
    description: "Creating a multimodal retrieval system using CLIP embeddings, Weaviate vector DB, and two-stage ranking for cross-modal e-commerce search.",
    link: "/projects/omnisearch",
  },
  {
    id: "medsecure",
    title: "MedSecure: HIPAA-Compliant Medical Summarization",
    description: "Designing a secure medical document processing platform with automatic PII masking, entity extraction, and hallucination verification.",
    link: "/projects/medsecure",
  },
  {
    id: "oncology-irae",
    title: "Oncology irAE Clinical Safety Assistant",
    description: "Building an AI-powered clinical decision support system for detecting and triaging immune-related adverse events in oncology patients.",
    link: "/projects/oncology-irae-detection",
  },
  {
    id: "devassist",
    title: "DevAssist: Multi-Agent Code Migration",
    description: "Enterprise-grade automated code migration using LangGraph workflow. Supports Python 2→3 and Flask→FastAPI migrations.",
    link: "/projects/devassist",
  },
  {
    id: "stockagentx",
    title: "StockAgentX: Financial Intelligence Platform",
    description: "AI-powered financial intelligence platform leveraging multi-agent orchestration, RAG pipeline, and deep learning for stock analysis.",
    link: "/projects/stockagentx",
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
