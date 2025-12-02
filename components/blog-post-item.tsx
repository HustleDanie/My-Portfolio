"use client"

import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { BlogPost } from "@/data/blog-posts"

interface BlogPostItemProps {
  post: BlogPost
}

export function BlogPostItem({ post }: BlogPostItemProps) {
  return (
    <article className="w-full py-6 border-b border-gray-200 dark:border-gray-800 last:border-b-0 group">
      <div className="space-y-3">
        {/* Title */}
        <h2 className="font-orbitron text-2xl lg:text-3xl font-bold text-black dark:text-white leading-tight group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
          <Link href={`/blog/${post.id}`} className="hover:underline decoration-2 underline-offset-4">
            {post.title}
          </Link>
        </h2>

        {/* Featured Image */}
        <div className="relative w-full h-48 lg:h-64 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
          <img
            src={post.image || "/placeholder.svg?height=300&width=600&query=AI research blog post"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <Badge className="bg-black dark:bg-white text-white dark:text-black font-space-mono text-xs px-3 py-1">
            {post.category}
          </Badge>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="font-space-mono">{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="font-space-mono">{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="font-space-mono">{post.author}</span>
          </div>
        </div>

        {/* Excerpt */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-space-mono text-base lg:text-lg">
            {post.excerpt}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="font-space-mono text-xs bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Read More Button */}
        <div className="pt-1">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors group/button"
            asChild
          >
            <Link href={`/blog/${post.id}`} className="flex items-center gap-2">
              <span className="font-space-mono text-sm font-medium">Read Full Article</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
