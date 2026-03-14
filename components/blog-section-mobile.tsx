"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    id: "1",
    title: "Enterprise Knowledge Retrieval",
    subtitle: "Building production-ready GenAI/MLOps systems for enterprise document search with RAG pipelines.",
    cta: "READ MORE →",
    image: "/images/retrieval.png",
    overlay: "dark",
    link: "/projects/knowledge-retrieval",
  },
  {
    id: "2",
    title: "OmniSearch: Multimodal Discovery",
    subtitle: "Creating multimodal retrieval systems using CLIP embeddings and vector search.",
    cta: "EXPLORE →",
    image: "/images/omnisearch.png",
    overlay: "medium",
    link: "/projects/omnisearch",
  },
  {
    id: "3",
    title: "MedSecure: HIPAA-Compliant AI",
    subtitle: "Designing secure medical document processing with automatic PII masking.",
    cta: "LEARN MORE →",
    image: "/images/medsecure.png",
    overlay: "dark",
    link: "/projects/medsecure",
  },
  {
    id: "4",
    title: "Oncology irAE Detection",
    subtitle: "AI-powered clinical decision support for detecting immune-related adverse events.",
    cta: "DISCOVER →",
    image: "/images/oncology.png",
    overlay: "medium",
    link: "/projects/oncology-irae-detection",
  },
  {
    id: "5",
    title: "DevAssist: Code Migration",
    subtitle: "Enterprise-grade automated code migration using LangGraph multi-agent workflow.",
    cta: "VIEW ARTICLE →",
    image: "/images/devassist.png",
    overlay: "dark",
    link: "/projects/devassist",
  },
]

export function BlogSectionMobile() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="blog-mobile" ref={ref} className="py-12 md:hidden relative bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="font-orbitron text-2xl font-bold mb-3 text-black dark:text-white">Blogs</h2>
          <div className="w-16 h-1 bg-black dark:bg-white mx-auto mb-4"></div>
          <p className="text-sm text-black dark:text-gray-300">
            Thoughts, insights, and technical deep dives into the world of artificial intelligence research.
          </p>
        </motion.div>

        {/* Mobile Card Layout */}
        <div className="space-y-4 mb-8">
          {blogPosts.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={blog.link}>
                <Card className="bg-card border border-border overflow-hidden hover:border-muted-foreground/50 transition-all duration-300 group rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.08)]">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div
                      className={`absolute inset-0 ${
                        blog.overlay === "dark"
                          ? "bg-black/70"
                          : blog.overlay === "medium"
                            ? "bg-black/50"
                            : "bg-black/40"
                      }`}
                    />
                    {/* Title on Image */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
                      <h3 className="font-orbitron text-lg font-bold text-white mb-1 leading-tight">
                        {blog.title}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2 font-space-mono">
                      {blog.subtitle}
                    </p>
                    <div className="flex items-center text-xs font-space-mono text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                      <span>{blog.cta}</span>
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="font-space-mono font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 px-6 py-2.5 rounded-lg group w-full"
          >
            <Link href="/blog" className="flex items-center justify-center gap-2">
              Explore More Blogs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

