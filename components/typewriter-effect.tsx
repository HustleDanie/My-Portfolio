"use client"

import { useEffect, useState } from "react"
import { motion, stagger, useAnimate } from "framer-motion"

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) {
  const [scope, animate] = useAnimate()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let didCancel = false

    const renderWords = async () => {
      if (!scope.current) return

      // Clear previous content
      if (didCancel || !scope.current) return
      await animate("span", { opacity: 0, display: "none" }, { duration: 0 })

      setIsTyping(true)

      // Type the current word
      if (didCancel || !scope.current) return
      await animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
        },
        {
          duration: 0.1,
          delay: stagger(0.1),
        },
      )

      // Wait a bit before starting to delete
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Delete the current word
      if (didCancel || !scope.current) return
      await animate(
        "span",
        {
          opacity: 0,
          display: "none",
        },
        {
          duration: 0.05,
          delay: stagger(0.05, { from: "last" }),
        },
      )

      setIsTyping(false)

      // Move to next word
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }

    renderWords()

    return () => {
      didCancel = true
    }
  }, [animate, words, currentWordIndex])

  const currentWord = words[currentWordIndex]
  const letters = currentWord.text.split("")

  return (
    <div className={className}>
      <div className="inline">
        <motion.div ref={scope} className="inline">
          {letters.map((letter, index) => (
            <motion.span
              initial={{ opacity: 0, display: "none" }}
              key={`${currentWord.text}-${index}`}
              className={currentWord.className}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className={`inline-block w-[4px] h-[24px] md:h-[32px] lg:h-[40px] bg-black dark:bg-white ml-1 ${cursorClassName}`}
        />
      </div>
    </div>
  )
}
