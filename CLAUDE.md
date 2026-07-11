# CLAUDE.md - Portfolio Project Intelligence

## Project Overview

Personal portfolio for Hustle Daniel (AI/ML researcher). Pure client-side site — no backend, no API routes, no database.

**Repo:** github.com/HustleDanie/My-Portfolio | **Branch:** main (single branch, direct commits)

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router), React 19.2.4, TypeScript 5 (strict)
- **Styling:** Tailwind CSS 3.4.17, CSS variables (HSL), dark mode via next-themes (default: dark)
- **UI:** shadcn/ui (components in /components/ui/), Radix UI, Lucide React icons
- **Animations:** Framer Motion (scroll-triggered, staggered, layout)
- **Forms:** React Hook Form + Zod
- **Fonts:** Inter (body) and Space Grotesk (headings). Legacy class names remain: Inter loads into `--font-space-mono` (`font-space-mono`), Space Grotesk into `--font-orbitron` (`font-orbitron`)
- **State:** React hooks only — no Redux/Zustand
- **Path alias:** `@/*` maps to project root

## Commands

```bash
npm run dev        # Dev server (Turbopack)
npm run build      # Production build (TS errors ignored in config)
npm run lint       # ESLint via next lint
npm run start      # Serve production build
npx shadcn@latest add <name>  # Add shadcn/ui component
```

## Directory Structure

```
app/
  layout.tsx              # Root layout: ThemeProvider, fonts, Navigation, Footer, Toaster
  page.tsx                # Homepage: composes *-section.tsx components
  globals.css             # CSS variables for light/dark themes
  about/page.tsx
  blog/page.tsx           # Blog listing (hardcoded blogPosts array)
  research/page.tsx       # Research page
  projects/
    page.tsx              # Projects gallery with category filter (?category= param)
    loading.tsx           # Loading skeleton
    [slug]/page.tsx       # Individual project pages (static files, not dynamic route)

components/
  *-section.tsx           # Homepage sections: hero, about, projects, research, certifications, tech-stack, contact
  navigation.tsx          # Main nav (hash scrolling + page routing)
  footer.tsx              # Footer (embeds ContactSection)
  theme-provider.tsx      # next-themes wrapper
  theme-toggle.tsx        # Dark/light toggle
  project-card.tsx        # Reusable project card
  ui/                     # shadcn/ui components — do NOT edit manually, use shadcn CLI
  [model]-trainer/        # ML trainer interactive widgets (10 types, ~6 sub-components each)

data/blog-posts.ts        # BlogPost interface (array currently empty/unused)
hooks/use-mobile.tsx      # Mobile breakpoint hook (768px)
lib/utils.ts              # cn() — clsx + tailwind-merge
utils/device-detection.ts # UA-based detection
public/images/            # Project screenshots, certifications, portraits
```

## Coding Conventions

### Naming
- **Files:** kebab-case (`hero-section.tsx`, `tech-stack-section.tsx`)
- **Exports:** PascalCase (`export function HeroSection()`)
- **Suffixes:** `-section.tsx` for homepage sections, `-panel.tsx`/`-selector.tsx`/`-viewer.tsx` for trainer sub-components

### Components
- ALL components use `"use client"` — no server components in this project
- Functional components only
- Default exports for pages, named exports for reusable components

### Styling
- Use `cn()` from `@/lib/utils` for conditional classes
- Tailwind semantic tokens: `bg-background`, `text-foreground`, `bg-card`
- Dark overrides: `text-black dark:text-white`, `bg-gray-200 dark:bg-gray-800`
- Responsive: mobile-first (`sm:`, `md:`, `lg:`, `xl:`)

### Animations (Framer Motion)
- Scroll-triggered: `useInView(ref, { once: true, margin: "-100px" })`
- Entry: `initial={{ opacity: 0, y: 20 }}` → `animate={isInView ? { opacity: 1, y: 0 } : ...}`
- Stagger: `delay: 0.1 + index * 0.1`
- Category transitions: `<AnimatePresence mode="wait">` with layout animations
- Heading blur: `filter: "blur(10px)"` → `"blur(0px)"`

### Tech Stack Icons
- Source: `https://cdn.simpleicons.org/{icon-name}/{hex-color}`
- Always include fallback — TechIcon component shows initials on load error
- Shape: `{ name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" }`

## Adding a New Project

**IMPORTANT:** Project data is duplicated in two files with slightly different shapes.

1. Add to `components/projects-section.tsx` → `projectsByCategory` (homepage):
   ```ts
   { id: "my-project", title: "...", description: "...", image: "/images/my-project.png", github: "https://github.com/...", techStack: [...] }
   ```

2. Add to `app/projects/page.tsx` → `projectsByCategory` (gallery) — same fields **plus** `link`:
   ```ts
   { ...same, link: "/projects/my-project" }
   ```

3. Add screenshot: `public/images/my-project.png`

4. Create detail page: `app/projects/my-project/page.tsx`
   - Use `app/projects/devassist/page.tsx` as template
   - Includes: sticky header, back button, GitHub link, category badge, read time, article content

## Adding a Homepage Section

1. Create `components/{name}-section.tsx` with `"use client"`, useRef, useInView, motion
2. Standard wrapper: `<section id="{name}" className="min-h-screen flex items-center justify-center py-12 md:py-20 px-4 ...">`
3. Heading: `font-orbitron`, centered divider bar (`w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto`)
4. Import in `app/page.tsx`
5. Add nav item in `components/navigation.tsx` navItems array: `{ name, href: "/#{id}", icon: LucideIcon }`

## Known Issues

- **Duplicate project data:** `projectsByCategory` exists in both `components/projects-section.tsx` and `app/projects/page.tsx`. Always update both.
- **TechIcon duplicated:** Same component defined in both files above.
- **Contact form is simulated:** `components/contact-section.tsx` uses setTimeout, no actual email delivery.
- **TS build errors ignored:** `next.config.mjs` → `ignoreBuildErrors: true`
- **Images unoptimized:** `next.config.mjs` → `images.unoptimized: true`
- **No tests:** No test framework installed.
- **Blog data file unused:** `data/blog-posts.ts` exports empty array; blog page has its own hardcoded data.
- **Social links placeholder:** Hero section social icons may point to generic URLs.
- **All "use client":** Zero server components or server actions.
- **Dependencies on "latest":** Many packages use `"latest"` instead of pinned versions.

## Architecture Decisions

- **App Router only** — no pages/ directory
- **No API routes** — purely static/client-side
- **shadcn/ui for primitives** — installed via CLI into /components/ui/, don't manually edit
- **Framer Motion for all animations** — no CSS keyframe animations (except Tailwind accordion)
- **Monochrome palette** — black/white/gray, dark mode default
- **Monospace typography** — Space Mono body, Orbitron headings
- **Static project pages** — each project has its own file, not a shared dynamic `[slug]` route
