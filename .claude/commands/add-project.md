Add a new project to the portfolio.

Arguments: $ARGUMENTS

Parse the following from the arguments (ask if missing):
- **Project ID** (kebab-case, e.g., "my-new-project")
- **Title**
- **Short description** (1-2 sentences)
- **Category:** one of "agentic-ai", "workflow-automation", or "ai-ml"
- **GitHub URL**
- **Tech stack:** list of technology names

Steps:

1. **Add to homepage projects** — In `components/projects-section.tsx`, add to the correct category in `projectsByCategory`:
   ```ts
   { id, title, description, image: "/images/{id}.png", github, techStack }
   ```
   Use `https://cdn.simpleicons.org/{slug}/{hex}` for tech logos. Look up correct Simple Icons slugs and brand hex colors.

2. **Add to gallery projects** — In `app/projects/page.tsx`, add to the same category in `projectsByCategory` with the same data **plus** `link: "/projects/{id}"`.

3. **Create detail page** — Create `app/projects/{id}/page.tsx` using `app/projects/devassist/page.tsx` as a template. Include:
   - Sticky header with back link (`/projects`), theme toggle, and GitHub button
   - Category badge, estimated read time, title
   - Hero image placeholder
   - Skeleton article body with TODO comments for the user to fill in detailed content

4. **Remind the user** to:
   - Add a project screenshot at `public/images/{id}.png`
   - Fill in the detail page article content
   - Optionally add the project to the `blogPosts` array in `app/blog/page.tsx`
