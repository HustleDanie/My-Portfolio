"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Workflow, Cpu } from "lucide-react"
import Link from "next/link"

function TechIcon({ name, logo, className }: { name: string; logo: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-[8px] sm:text-[10px] font-bold text-gray-600 dark:text-gray-300 font-space-mono ${className}`}>
        {initials}
      </div>
    )
  }

  return (
    <img
      src={logo}
      alt={name}
      className={`opacity-70 hover:opacity-100 transition-opacity ${className}`}
      onError={() => setFailed(true)}
    />
  )
}

const categories = [
  { id: "workflow-automation", label: "Workflow Automation", mobileLabel: "Automation", icon: Workflow },
  { id: "ai-ml", label: "AI / ML", mobileLabel: "AI / ML", icon: Cpu },
]

type Project = {
  id: string
  title: string
  description: string
  image: string
  github: string
  link: string
  techStack: { name: string; logo: string }[]
}

const projectsByCategory: Record<string, Project[]> = {
  "workflow-automation": [
    {
      id: "n8n-claude-kit",
      title: "n8n Claude Kit",
      description: "Zero-to-workflow n8n scaffolding for Claude Code. Bundles 7 n8n skills, 3 subagents, and a /n8n-init slash command that bootstraps a ready-to-build n8n project in under 90 seconds.",
      image: "/images/n8nclaudekit.png",
      github: "https://github.com/HustleDanie/n8n-claude-kit",
      link: "/projects/n8n-claude-kit",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "Claude", logo: "https://cdn.simpleicons.org/anthropic/191919" },
        { name: "MCP", logo: "https://cdn.simpleicons.org/modelcontextprotocol/000000" },
        { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
      ],
    },
    {
      id: "linkedin-ai-job-alert",
      title: "LinkedIn AI Job Alert Pipeline",
      description: "Automated n8n workflow that scrapes LinkedIn for remote AI/ML internships across 6 countries, scores with GPT-4o-mini, and sends alerts to Telegram.",
      image: "/images/linkedin-job-alert.png",
      github: "https://github.com/HustleDanie/LinkedIn-AI-Job-Alert-Pipeline",
      link: "/projects/linkedin-ai-job-alert",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "Apify", logo: "https://cdn.simpleicons.org/apify/00C853" },
        { name: "Telegram", logo: "https://cdn.simpleicons.org/telegram/26A5E4" },
        { name: "Google Sheets", logo: "https://cdn.simpleicons.org/googlesheets/34A853" },
      ],
    },
    // Deterministic Automation
    {
      id: "lead-generation-engine",
      title: "Lead Capture → CRM Pipeline",
      description: "Robust lead generation engine automating high-intent prospect processing through multi-step enrichment via Clearbit/Apollo, CRM storage in HubSpot/Salesforce, and real-time Slack notifications.",
      image: "/images/leadgeneration.png",
      github: "https://github.com/HustleDanie/lead-generation-engine",
      link: "/projects/lead-generation-engine",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
        { name: "Slack", logo: "https://cdn.simpleicons.org/slack/4A154B" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
      ],
    },
    {
      id: "email-triage-automation",
      title: "Email Triage Automation",
      description: "Production-grade n8n workflow turning a shared inbox into a classified, routed ticketing pipeline — GPT-4o-mini classification, RFC-3834 loop prevention, confidence-threshold human review, and thread-aware auto-replies.",
      image: "/images/emailparsing.png",
      github: "https://github.com/HustleDanie/Email-Triage-Automation",
      link: "/projects/email-triage-automation",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "Gmail", logo: "https://cdn.simpleicons.org/gmail/EA4335" },
        { name: "Zendesk", logo: "https://cdn.simpleicons.org/zendesk/03363D" },
        { name: "Slack", logo: "https://cdn.simpleicons.org/slack/4A154B" },
      ],
    },
  ],
  "ai-ml": [
    {
      id: "omnisearch",
      title: "OmniSearch",
      description: "Multimodal product discovery engine using CLIP embeddings. Search with text, images, or both for cross-modal e-commerce search.",
      image: "/images/omnisearch.png",
      github: "https://github.com/HustleDanie/OmniSearch-A-Multimodal-Retrieval-and-Ranking-System-for-Cross-Modal-E-Commerce-Product-Discovery",
      link: "/projects/omnisearch",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
        { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
        { name: "Weaviate", logo: "https://cdn.simpleicons.org/weaviate/00D1A0" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
      ],
    },
    {
      id: "medsecure",
      title: "MedSecure",
      description: "HIPAA-compliant medical document summarization platform with automatic PII masking and AI-powered summarization.",
      image: "/images/medsecure.png",
      github: "https://github.com/HustleDanie/MedSecure---HIPAA-Compliant-Medical-Summary-Platform-",
      link: "/projects/medsecure",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
        { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      ],
    },
    {
      id: "knowledge-retrieval",
      title: "Enterprise Knowledge Retrieval",
      description: "Production-ready GenAI/MLOps platform for enterprise document search, synthesis, and RAG pipelines with hybrid search.",
      image: "/images/retrieval.png",
      github: "https://github.com/HustleDanie/Enterprise-Knowledge-Retrieval-Synthesis-Platform",
      link: "/projects/knowledge-retrieval",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
        { name: "Pinecone", logo: "https://cdn.simpleicons.org/pinecone/000000" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      ],
    },
  ],
}

function ProjectsPageContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const validCategories = categories.map(c => c.id)
  const initialCategory = categoryParam && validCategories.includes(categoryParam) ? categoryParam : "workflow-automation"
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  const currentProjects = projectsByCategory[activeCategory] || []

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

          {/* Category Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-6 md:mb-12"
          >
            <div className="relative inline-flex items-center bg-gray-200 dark:bg-gray-800 md:bg-gray-100 md:dark:bg-gray-900 rounded-full p-0.5 md:p-1 border border-gray-300 dark:border-gray-700 md:border-0 md:ring-1 md:ring-black/5 md:dark:ring-white/10">
              {/* Sliding indicator */}
              <motion.div
                className="absolute top-0.5 md:top-1 bottom-0.5 md:bottom-1 rounded-full bg-gray-500 dark:bg-gray-600 md:bg-white md:dark:bg-gray-800 md:shadow-sm md:ring-1 md:ring-black/5"
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  width: `calc(${100 / categories.length}% - 4px)`,
                  left: `calc(${(categories.findIndex(c => c.id === activeCategory) * 100) / categories.length}% + 2px)`,
                }}
              />
              {categories.map((category) => {
                const count = projectsByCategory[category.id]?.length ?? 0
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`relative z-10 px-3 md:px-5 py-1.5 rounded-full font-space-mono text-[10px] md:text-sm font-medium transition-colors duration-200 min-w-[100px] md:min-w-[150px] md:tracking-tight ${
                      activeCategory === category.id
                        ? "text-white md:text-black md:dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  >
                    <span className="hidden md:inline-flex items-center justify-center gap-1.5">
                      <Icon className="h-3.5 w-3.5" />
                      <span>{category.label}</span>
                      <span className="opacity-50">· {count}</span>
                    </span>
                    <span className="md:hidden">{category.mobileLabel}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              {currentProjects.map((project, index) => (
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
                      <p className="font-space-mono text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Stack Icons */}
                      <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        {project.techStack.map((tech) => (
                          <div
                            key={tech.name}
                            className="relative group/tech"
                          >
                            <TechIcon
                              name={tech.name}
                              logo={tech.logo}
                              className="w-5 h-5 sm:w-6 sm:h-6"
                            />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-space-mono rounded opacity-0 group-hover/tech:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </div>

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
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProjectsPageContent />
    </Suspense>
  )
}
