"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const blogPosts = [
  {
    id: "1",
    title: "Oncology irAE Assistant",
    subtitle: "AI-powered clinical decision support for detecting and triaging immune-related adverse events in oncology immunotherapy patients.",
    link: "/projects/oncology-irae-detection",
  },
  {
    id: "2",
    title: "MedSecure: HIPAA-Compliant Summarization",
    subtitle: "Secure medical document processing with automatic PII masking, entity extraction, and hallucination verification.",
    link: "/projects/medsecure",
  },
  {
    id: "3",
    title: "OmniSearch: Multimodal Discovery",
    subtitle: "Multimodal product discovery engine using CLIP embeddings and vector search for cross-modal e-commerce.",
    link: "/projects/omnisearch",
  },
]

export function ResearchSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="research" ref={ref} className="py-12 md:py-20 relative bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -60, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 md:mb-12 text-center"
          >
            <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Featured Blogs
            </h2>
            <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto"></div>
          </motion.div>

          {/* 3-Column Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 md:mb-12">
            {blogPosts.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -60, filter: "blur(10px)" }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link href={blog.link}>
                  <Card className="bg-card border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-lg overflow-hidden group h-full p-4 sm:p-5 md:p-6 rounded-none">
                    <h3 className="font-orbitron text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
                      {blog.subtitle}
                    </p>
                    <div className="flex items-center text-xs sm:text-sm font-space-mono text-muted-foreground group-hover:text-foreground transition-colors">
                      <span>Read More</span>
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Explore More Blogs Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <Button
              asChild
              size="lg"
              className="font-space-mono font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 px-6 sm:px-8 py-3 rounded-lg group text-sm sm:text-base h-12 sm:h-11"
            >
              <Link href="/blog" className="flex items-center gap-2">
                Explore More Blogs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
