"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const certifications = [
  {
    title: "Deep Learning Specialization",
    issuer: "Coursera • DeepLearning.AI",
    date: "2024",
    status: "Completed",
    credentialId: "DL2024-UC-789",
    skills: ["Neural Networks", "Deep Learning", "TensorFlow", "Computer Vision", "NLP", "CNN", "RNN"],
    image: "/images/coursera-deep-learning-cert.png",
    link: "https://coursera.org/verify/specialization/XXXXXXXX",
    description:
      "Comprehensive specialization covering neural networks, deep learning, and practical applications in computer vision and natural language processing.",
  },
]

export function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="certifications" ref={ref} className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 60, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 md:mb-16 text-center"
          >
            <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Certifications
            </h2>
            <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.credentialId}
              initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 60, filter: "blur(10px)" }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="group"
            >
              <Card className="bg-card border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-lg h-full overflow-hidden group-hover:scale-[1.02] transform-gpu rounded-xl md:rounded-none shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.08)] md:shadow-none">
                <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={`${cert.title} Certificate`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Overlay with short description */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-5 md:p-6">
                    <h3 className="font-orbitron text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">
                      {cert.title}
                    </h3>
                    <p className="font-space-mono text-xs sm:text-sm text-gray-200 line-clamp-2 sm:line-clamp-none">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
