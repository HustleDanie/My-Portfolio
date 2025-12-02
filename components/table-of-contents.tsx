"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Find all headings in the blog post content
    const elements = Array.from(document.querySelectorAll("h2, h3, h4"))
    const headingElements = elements.map((element) => {
      // Add IDs to headings if they don't have one
      if (!element.id) {
        const id =
          element.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "") || ""
        element.id = id
      }

      return {
        id: element.id,
        text: element.textContent || "",
        level: Number.parseInt(element.tagName.substring(1)),
      }
    })

    setHeadings(headingElements)

    // Set up intersection observer to track which heading is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "0px 0px -80% 0px",
        threshold: 0.1,
      },
    )

    // Observe all headings
    elements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [])

  if (headings.length === 0) {
    return null
  }

  return (
    <>
      {/* Desktop version - always visible */}
      <div className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto p-4 w-64">
        <h4 className="text-sm font-bold mb-4 text-gray-900 dark:text-gray-100">Table of Contents</h4>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                "transition-colors",
                heading.level === 2 ? "ml-0" : heading.level === 3 ? "ml-4" : "ml-8",
                activeId === heading.id
                  ? "text-primary font-medium border-l-2 border-primary pl-2"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 pl-2",
              )}
            >
              <Link href={`#${heading.id}`} scroll={false} className="block py-1">
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile version - collapsible */}
      <div className="lg:hidden sticky top-20 z-20 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-4 text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          <span>Table of Contents</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {isOpen && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <ul className="space-y-2 text-sm">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={cn(
                    "transition-colors",
                    heading.level === 2 ? "ml-0" : heading.level === 3 ? "ml-4" : "ml-8",
                    activeId === heading.id
                      ? "text-primary font-medium border-l-2 border-primary pl-2"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 pl-2",
                  )}
                >
                  <Link href={`#${heading.id}`} scroll={false} className="block py-1" onClick={() => setIsOpen(false)}>
                    {heading.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
