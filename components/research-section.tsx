"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    id: "1",
    title: "The Reasoning Paradox: When Smarter Models Become Less Reliable",
    subtitle: "OpenAI's newest model invents fake tools 48 percent of the time. The older, less clever model only does it 16 percent. The training that makes AI smarter is making it less reliable.",
    image: "/images/blog-placeholder.svg",
    category: "Reasoning",
    readTime: "10 min read",
    link: "/blog/reasoning-trap-amplifies-hallucination",
  },
  {
    id: "2",
    title: "Automating Alignment: When Models Audit Their Own Safety",
    subtitle: "AI agents just beat human safety researchers four-to-one on a closed-form problem in a fifth of the time. The catch is in what kind of problem still needs the human.",
    image: "/images/blog-placeholder.svg",
    category: "AI Safety",
    readTime: "9 min read",
    link: "/blog/automating-alignment-research",
  },
  {
    id: "3",
    title: "Closing the Open-Source Gap",
    subtitle: "Five major free AI models shipped in April 2026 that are good enough to do real work. The gap between paid AI and free AI just narrowed from a chasm to a step.",
    image: "/images/blog-placeholder.svg",
    category: "Open Source AI",
    readTime: "7 min read",
    link: "/blog/open-source-ai-catches-up",
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8 md:mb-12">
            {blogPosts.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(10px)" }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link href={blog.link} className="block h-full">
                  <Card className="bg-card border border-border hover:border-foreground/30 transition-all duration-300 hover:shadow-xl dark:hover:shadow-white/5 overflow-hidden group h-full rounded-xl flex flex-col p-0 gap-0">
                    <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-2.5 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full text-[10px] font-space-mono uppercase tracking-wider text-black dark:text-white">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <h3 className="font-orbitron text-base sm:text-lg font-semibold text-foreground mb-2 leading-snug group-hover:text-foreground/80 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="font-space-mono text-xs sm:text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {blog.subtitle}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-border/60 text-[11px] sm:text-xs font-space-mono">
                        <span className="text-muted-foreground">{blog.readTime}</span>
                        <span className="flex items-center gap-1 text-foreground/80 group-hover:text-foreground transition-colors">
                          Read article
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

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
