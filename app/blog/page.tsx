"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: "open-source-ai-catches-up",
    title: "Free AI Is Catching Up to the Expensive Kind",
    description:
      "Five major free AI models shipped in April 2026 that are good enough to do real work. The gap between paid AI and free AI just narrowed from a chasm to a step.",
    image: "/images/blog-placeholder.svg",
    category: "Open Source AI",
    date: "Apr 2026",
    readTime: "7 min read",
    link: "/blog/open-source-ai-catches-up",
  },
  {
    id: "ai-security-governance-gap",
    title: "Most Companies Adding AI Are Already Getting Hacked Because of It",
    description:
      "3 out of 4 organizations have had a security incident involving AI in the last two years. More than 1 in 4 lost over a million dollars to one. Inside the gap and what to do.",
    image: "/images/blog-placeholder.svg",
    category: "Industry",
    date: "Apr 2026",
    readTime: "5 min read",
    link: "/blog/ai-security-governance-gap",
  },
  {
    id: "ai-scientist-publishes-peer-reviewed-papers",
    title: "Can AI Actually Do Science? Someone Just Tested It",
    description:
      "An AI system wrote a research paper, snuck it through peer review, then got it pulled when reviewers found out. What the experiment proved and what it didn't.",
    image: "/images/blog-placeholder.svg",
    category: "Agents",
    date: "Apr 2026",
    readTime: "9 min read",
    link: "/blog/ai-scientist-publishes-peer-reviewed-papers",
  },
  {
    id: "automating-alignment-research",
    title: "AI Is Starting to Do Its Own Safety Research",
    description:
      "AI agents just beat human safety researchers four-to-one on a closed-form problem in a fifth of the time. The catch is in what kind of problem still needs the human.",
    image: "/images/blog-placeholder.svg",
    category: "AI Safety",
    date: "Apr 2026",
    readTime: "9 min read",
    link: "/blog/automating-alignment-research",
  },
  {
    id: "reasoning-trap-amplifies-hallucination",
    title: "Why Smarter AI Is Making Up More Answers, Not Fewer",
    description:
      "OpenAI's newest model invents fake tools and parameters 48 percent of the time. The older, less clever model only does it 16 percent. The training that makes AI smarter is making it less reliable.",
    image: "/images/blog-placeholder.svg",
    category: "Reasoning",
    date: "Apr 2026",
    readTime: "10 min read",
    link: "/blog/reasoning-trap-amplifies-hallucination",
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
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
