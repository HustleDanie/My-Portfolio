"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BlogSidebarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  activeCategory: string
  onCategoryChange: (category: string) => void
  categories: { name: string; count: number }[]
  isOpen?: boolean
  onClose?: () => void
}

export function BlogSidebar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  categories,
  isOpen = false,
  onClose,
}: BlogSidebarProps) {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(debouncedQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [debouncedQuery, onSearchChange])

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category)
    if (onClose) onClose() // Close mobile sidebar after selection
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:sticky top-0 left-0 h-screen w-80 bg-background border-r border-border z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        overflow-y-auto
      `}
      >
        <div className="p-6 space-y-6">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between lg:hidden">
            <h2 className="font-orbitron text-xl font-bold text-black dark:text-white">Filter & Search</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="space-y-2">
            <h3 className="font-space-mono text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Search Articles
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by title or tags..."
                value={debouncedQuery}
                onChange={(e) => setDebouncedQuery(e.target.value)}
                className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:border-gray-400 dark:focus:border-gray-600 font-space-mono text-sm"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-space-mono text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`
                    w-full text-left p-3 rounded-lg transition-all duration-200 group
                    ${
                      activeCategory === category.name
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-space-mono text-sm font-medium">{category.name}</span>
                    <Badge
                      variant="outline"
                      className={`
                        text-xs transition-colors
                        ${
                          activeCategory === category.name
                            ? "border-white dark:border-black text-white dark:text-black"
                            : "border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 group-hover:border-gray-400 dark:group-hover:border-gray-500"
                        }
                      `}
                    >
                      {category.count}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(searchQuery || activeCategory !== "All Articles") && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDebouncedQuery("")
                  onSearchChange("")
                  onCategoryChange("All Articles")
                }}
                className="w-full font-space-mono text-sm"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
