"use client"

import { MDXRemote } from "next-mdx-remote"
import type { SerializedPost } from "@/lib/mdx"
import { useState, useEffect } from "react"

// Define custom components for MDX
const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
  p: (props: any) => <p className="my-4" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 my-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 my-4" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
  code: (props: any) => {
    const { children, className } = props
    const match = /language-(\w+)/.exec(className || "")
    return match ? (
      <pre className={`${className} p-4 rounded-md overflow-x-auto my-4`}>
        <code className={className}>{children}</code>
      </pre>
    ) : (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{children}</code>
    )
  },
}

export default function MdxBlogPost({ post }: { post: SerializedPost }) {
  const [mounted, setMounted] = useState(false)

  // Only render the MDX content on the client side to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.frontmatter.title}</h1>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>{post.frontmatter.date}</span>
          <span>•</span>
          <span>{post.frontmatter.readTime}</span>
          <span>•</span>
          <span>{post.frontmatter.author}</span>
        </div>
        <div className="mt-2">
          {post.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {mounted && <MDXRemote {...post.mdxSource} components={components} />}
    </article>
  )
}
