Add a new section to the homepage.

Arguments: $ARGUMENTS

Parse the following from the arguments (ask if missing):
- **Section name** (kebab-case, e.g., "testimonials", "experience")
- **Display title** (e.g., "Testimonials", "Work Experience")
- **Brief description** of what the section should contain

Steps:

1. **Create section component** — Create `components/{name}-section.tsx`:
   - `"use client"` directive
   - Import useRef from react, motion and useInView from framer-motion
   - Named export: `export function {PascalName}Section()`
   - useRef + useInView for scroll-triggered animation
   - Section wrapper: `<section id="{name}" ref={ref} className="min-h-screen flex items-center justify-center py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 overflow-hidden">`
   - Heading with font-orbitron, centered divider bar (`w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto mb-6`)
   - Framer Motion entry animation: `initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}` → `animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : ...}`
   - Implement content based on the description provided

2. **Add to homepage** — Import and place the component in `app/page.tsx` at the appropriate position in the section order.

3. **Add navigation entry** — In `components/navigation.tsx`, add to the `navItems` array:
   ```ts
   { name: "{Display Title}", href: "/#{name}", icon: {AppropriateIcon} }
   ```
   Choose an appropriate Lucide icon. Also add the section path to `matchPaths` if needed.
