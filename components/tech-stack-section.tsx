"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"

function TechIcon({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 font-space-mono">
        {initials}
      </div>
    )
  }

  return (
    <img
      src={logo}
      alt={name}
      className="w-full h-full object-contain"
      onError={() => setFailed(true)}
    />
  )
}

const techStack = [
  { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "TensorFlow", logo: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
  { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
  { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
  { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
  { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
  { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "Pinecone", logo: "https://cdn.simpleicons.org/pinecone/000000" },
  { name: "Weaviate", logo: "https://cdn.simpleicons.org/weaviate/00D1A0" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Streamlit", logo: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
  { name: "Google Cloud", logo: "https://cdn.simpleicons.org/googlecloud/4285F4" },
]

export function TechStackSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="tech-stack" ref={ref} className="py-12 md:py-20 relative bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 w-full">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -60, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Tech Stack
            </h2>
            <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4 md:gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: -40, scale: 0.9, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, x: -40, scale: 0.9, filter: "blur(8px)" }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.025, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col items-center gap-1 sm:gap-2 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-muted-foreground/50 transition-all duration-300 group-hover:scale-110 p-2 sm:p-3">
                  <TechIcon name={tech.name} logo={tech.logo} />
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-space-mono text-center truncate w-full">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

