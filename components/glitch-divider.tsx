"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function GlitchDivider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className="w-full h-[1px] my-16 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black dark:via-white to-transparent"></div>
    </motion.div>
  )
}
