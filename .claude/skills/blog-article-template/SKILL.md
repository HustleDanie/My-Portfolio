---
name: blog-article-template
description: Use this skill when materializing a blog article as a static TSX page in the portfolio at app/blog/<slug>/page.tsx. Provides the JSX scaffold matching the project-page style, plus mechanics for updating the blog index card array. Activated when the article-writer agent needs to convert prose into a Next.js App Router page.
---

# Blog article TSX template

## File location
`c:\Users\DELL\My-Portfolio\app\blog\<slug>\page.tsx`

The slug must be kebab-case, derived from the article title.

## Scaffold

Copy this exactly, then fill in the placeholders. Keep "use client", framer-motion, and lucide-react imports — these match the rest of the site.

```tsx
"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-space-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 max-w-3xl">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <div className="mb-4">
            <span className="inline-block px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] font-space-mono uppercase tracking-wider text-foreground">
              {/* CATEGORY */}
            </span>
          </div>
          <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {/* TITLE */}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-space-mono text-muted-foreground mb-8">
            <span>By Hustle Daniel</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {/* DATE */}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {/* READ TIME */}
            </span>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900">
            <Image
              src="/images/blog-placeholder.svg"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.header>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="prose-blog space-y-5 sm:space-y-6"
        >
          {/* SECTIONS — see content patterns below */}
        </motion.div>

        {/* References */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 sm:mt-16 pt-8 border-t border-border"
        >
          <h2 className="font-orbitron text-lg sm:text-xl font-semibold mb-4">References</h2>
          <ol className="space-y-2 font-space-mono text-xs sm:text-sm text-muted-foreground list-decimal list-inside">
            {/* REFS as <li><a href="..." target="_blank" rel="noopener noreferrer">Title <ExternalLink className="inline h-3 w-3" /></a></li> */}
          </ol>
        </motion.section>
      </article>
    </div>
  )
}
```

## Body content patterns

Inside the `prose-blog` div, use these JSX patterns. Stick to plain Tailwind — no custom MDX/markdown.

### Paragraph
```tsx
<p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
  Body text here.
</p>
```

### Section heading (H2)
```tsx
<h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
  Section title
</h2>
```

### Subheading (H3)
```tsx
<h3 className="font-orbitron text-base sm:text-lg font-semibold mt-6 mb-2">
  Subsection
</h3>
```

### Pull quote
```tsx
<blockquote className="border-l-2 border-foreground/40 pl-4 sm:pl-6 my-6 sm:my-8 italic text-foreground/80">
  <p className="font-space-mono text-sm sm:text-base">
    "Quote text here."
  </p>
  <footer className="mt-2 text-xs text-muted-foreground not-italic">— Source name</footer>
</blockquote>
```

### Code block
```tsx
<pre className="bg-gray-100 dark:bg-gray-900 border border-border rounded-lg p-4 overflow-x-auto text-xs font-mono my-4">
  <code>{`code here`}</code>
</pre>
```

### Inline link
```tsx
<a href="https://example.com" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
  inline source
</a>
```

### Bullet list
```tsx
<ul className="list-disc list-outside ml-5 sm:ml-6 space-y-2 font-space-mono text-sm sm:text-base text-foreground/90">
  <li>item one</li>
  <li>item two</li>
</ul>
```

### Callout box (sparingly)
```tsx
<aside className="bg-gray-50 dark:bg-gray-900 border border-border rounded-lg p-4 sm:p-5 my-6 text-sm font-space-mono">
  <strong className="block mb-1 text-foreground">Worth pausing on:</strong>
  Callout content.
</aside>
```

## Updating the blog index

After writing the page file, edit `c:\Users\DELL\My-Portfolio\app\blog\page.tsx`:

Find the `blogPosts` array (top of file) and add a new entry at the **top** (newest first):

```ts
{
  id: "<slug>",
  title: "<exact article title>",
  description: "<one-sentence hook from article opener, ~25 words>",
  image: "/images/blog-placeholder.svg",
  category: "<2–3 word category, matches the chip on the article page>",
  date: "<Mon YYYY>",
  readTime: "<N min read>",
  link: "/blog/<slug>",
},
```

## JSX gotchas

- **Apostrophes in titles or prose** — use `&apos;` or escape via `{"don't"}`
- **Quotation marks** — use `&ldquo;` `&rdquo;` or `{'"'}`
- **Less-than/greater-than** — `&lt;` `&gt;` (e.g., when discussing `<context>` in code-prose)
- **Curly braces** — escape via `{'{'}` and `{'}'}`
- **JSX comments** — use `{/* ... */}`, not HTML `<!-- -->`

## Categories already in use on the site

- `RAG · MLOps`
- `Multimodal AI`
- `Healthcare AI`
- `Developer Tools`
- `Workflow Automation`

For the new articles, plausible categories include:
- `Frontier Models`
- `AI Safety`
- `Reasoning`
- `Agents`
- `AI Infrastructure`
- `Open Source AI`
- `Industry`
- `Evaluation`

Pick what fits the topic. Don't invent vague categories like "AI Trends".

## Length sanity check

Before saving, the body content (excluding references) should weigh between 1,200 and 2,500 words. Count by skimming — if you have ~6–10 medium-length sections, you're in range.

## After saving

Run a quick mental compile-check: do all imports point to things you used? Are all JSX tags closed? Are all `{}`/`()`/`[]` balanced? If yes, hand back to orchestrator for the build pass.
