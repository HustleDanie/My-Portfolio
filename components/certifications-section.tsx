"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { certifications } from "@/data/certifications"
import { CertificationsGrid } from "@/components/certifications-grid"

export function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const featured = certifications.slice(0, 3)

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
              Featured Certifications
            </h2>
            <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          </motion.div>

          <div className="mb-8 md:mb-12">
            <CertificationsGrid certs={featured} animateOnView isInView={isInView} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Button
              asChild
              size="lg"
              className="font-space-mono font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 px-6 sm:px-8 py-3 rounded-lg group text-sm sm:text-base h-12 sm:h-11"
            >
              <Link href="/certifications" className="flex items-center gap-2">
                Explore More Certifications
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
