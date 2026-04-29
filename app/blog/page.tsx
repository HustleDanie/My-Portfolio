"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Clock } from "lucide-react"

const featuredPost = {
  id: "knowledge-retrieval",
  title: "Enterprise Knowledge Retrieval & Synthesis Platform",
  description:
    "A production-grade GenAI/MLOps platform for enterprise document search, synthesis, and citation-grounded RAG. Hybrid retrieval, evaluation harness, and a deployment story that holds up in real workloads.",
  image: "/images/retrieval.png",
  category: "RAG · MLOps",
  date: "Apr 2026",
  readTime: "8 min read",
  link: "/projects/knowledge-retrieval",
}

const blogPosts = [
  {
    id: "omnisearch",
    title: "OmniSearch: Multimodal Product Discovery",
    description:
      "Multimodal retrieval system using CLIP embeddings, Weaviate, and two-stage ranking for cross-modal e-commerce search.",
    image: "/images/omnisearch.png",
    category: "Multimodal AI",
    date: "Apr 2026",
    readTime: "7 min read",
    link: "/projects/omnisearch",
  },
  {
    id: "medsecure",
    title: "MedSecure: HIPAA-Compliant Summarization",
    description:
      "Secure medical document processing with automatic PII masking, entity extraction, and hallucination verification.",
    image: "/images/medsecure.png",
    category: "Healthcare AI",
    date: "Mar 2026",
    readTime: "6 min read",
    link: "/projects/medsecure",
  },
  {
    id: "n8n-claude-kit",
    title: "n8n Claude Kit",
    description:
      "Zero-to-workflow scaffolding for Claude Code. Bundles 7 n8n skills, 3 subagents, and a /n8n-init slash command that bootstraps a project in under 90 seconds.",
    image: "/images/n8nclaudekit.png",
    category: "Developer Tools",
    date: "Mar 2026",
    readTime: "5 min read",
    link: "/projects/n8n-claude-kit",
  },
  {
    id: "email-triage-automation",
    title: "Email Triage Automation",
    description:
      "Production-grade n8n workflow that turns a shared inbox into a classified, routed ticketing pipeline with GPT-4o-mini and confidence-threshold human review.",
    image: "/images/emailparsing.png",
    category: "Workflow Automation",
    date: "Mar 2026",
    readTime: "6 min read",
    link: "/projects/email-triage-automation",
  },
  {
    id: "lead-generation-engine",
    title: "Lead Capture → CRM Pipeline",
    description:
      "Scalable lead generation engine with multi-step Clearbit/Apollo enrichment, CRM storage in HubSpot/Salesforce, and real-time Slack notifications.",
    image: "/images/leadgeneration.png",
    category: "Workflow Automation",
    date: "Feb 2026",
    readTime: "5 min read",
    link: "/projects/lead-generation-engine",
  },
  {
    id: "linkedin-ai-job-alert",
    title: "LinkedIn AI Job Alert Pipeline",
    description:
      "Automated n8n workflow that scrapes LinkedIn for remote AI/ML internships across 6 countries, scores with GPT-4o-mini, and sends alerts to Telegram.",
    image: "/images/linkedin-job-alert.png",
    category: "Workflow Automation",
    date: "Feb 2026",
    readTime: "5 min read",
    link: "/projects/linkedin-ai-job-alert",
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
            <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-4 md:mb-6"></div>
            <p className="font-space-mono text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Notes on shipping production AI/ML systems and workflow automation that holds up in the real world.
            </p>
          </div>

          {/* Featured Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-10 sm:mb-12 md:mb-16"
          >
            <Link href={featuredPost.link} className="block group">
              <article className="grid lg:grid-cols-2 gap-0 bg-card border border-border hover:border-foreground/30 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-white/5 overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-[10px] font-space-mono uppercase tracking-[0.15em] font-medium">
                      Featured
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block w-fit px-2.5 py-1 mb-4 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] font-space-mono uppercase tracking-wider text-foreground">
                    {featuredPost.category}
                  </span>
                  <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white mb-3 sm:mb-4 leading-tight group-hover:text-foreground/80 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="font-space-mono text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6 line-clamp-3 sm:line-clamp-4">
                    {featuredPost.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-space-mono text-muted-foreground mb-5 sm:mb-6">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {featuredPost.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-space-mono font-medium text-foreground group-hover:gap-3 transition-all">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Link>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link href={post.link} className="block h-full">
                  <article className="bg-card border border-border hover:border-foreground/30 transition-all duration-300 hover:shadow-xl dark:hover:shadow-white/5 overflow-hidden group h-full rounded-xl flex flex-col">
                    <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-2.5 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full text-[10px] font-space-mono uppercase tracking-wider text-black dark:text-white">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <h3 className="font-orbitron text-base sm:text-lg font-semibold text-foreground mb-2 leading-snug group-hover:text-foreground/80 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="font-space-mono text-xs sm:text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-border/60 text-[11px] sm:text-xs font-space-mono">
                        <span className="text-muted-foreground">
                          {post.date} · {post.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-foreground/80 group-hover:text-foreground transition-colors">
                          Read
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
