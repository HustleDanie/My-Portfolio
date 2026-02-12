"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const featuredProjects = [
  {
    id: "oncology-irae-detection",
    title: "Oncology irAE Assistant",
    description:
      "AI-powered clinical decision support system for detecting, classifying, and triaging immune-related adverse events (irAEs) in oncology immunotherapy patients using MedGemma and multi-organ analysis with CTCAE severity grading.",
    image: "/images/oncology.png",
    github: "https://github.com/HustleDanie/Oncology-irAE-Detection",
  },
  {
    id: "medsecure",
    title: "MedSecure",
    description:
      "HIPAA-compliant medical document summarization platform with automatic PII masking, medical entity extraction, AI-powered summarization using Llama-3, and hallucination verification for secure patient data processing.",
    image: "/images/medsecure.png",
    github: "https://github.com/HustleDanie/MedSecure---HIPAA-Compliant-Medical-Summary-Platform-",
  },
  {
    id: "omnisearch",
    title: "OmniSearch",
    description:
      "Multimodal product discovery engine using CLIP embeddings and vector search. Find products using text, images, or both with intelligent two-stage ranking for cross-modal e-commerce search.",
    image: "/images/omnisearch.png",
    github: "https://github.com/HustleDanie/OmniSearch-A-Multimodal-Retrieval-and-Ranking-System-for-Cross-Modal-E-Commerce-Product-Discovery",
  },
]

const ProjectsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" ref={ref} className="min-h-screen flex items-center justify-center py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 60, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 md:mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 60, filter: "blur(10px)" }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="group"
            >
              <div className="h-full bg-white dark:bg-card border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/50">
                {/* Project Image */}
                <Link href={`/projects/${project.id}`}>
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
                  <Link href={`/projects/${project.id}`}>
                    <h3 className="font-orbitron text-base sm:text-lg md:text-xl font-bold text-black dark:text-white mb-2 sm:mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="font-space-mono text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                    {project.description}
                  </p>

                  {/* GitHub Link */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800">
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
            className="font-space-mono font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 px-6 sm:px-8 py-3 rounded-lg group text-sm sm:text-base h-12 sm:h-11"
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
