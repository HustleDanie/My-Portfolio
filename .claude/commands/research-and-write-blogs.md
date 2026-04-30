---
description: Research a curated set of trending AI/ML topics and ship them as long-form blog articles in this portfolio.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebSearch, WebFetch, Agent, TodoWrite
---

# Research and write trending AI/ML blog articles

Run an end-to-end pipeline that produces 5 (or N) original, humanized blog articles from current trends, materializes them as static TSX pages, wires them into the blog index and homepage Featured Blogs, builds, and pushes.

## Inputs

`$ARGUMENTS` — optional. If empty, default to 5 articles. If a number, use that count. If a topic list, skip curation and use the user's topics directly.

## Steps

### 1. Curate
Spawn the `trend-curator` subagent. Tell it the count (default 5) and the recency window (last ~30 days from today). It returns a markdown shortlist of topics with rationale, angles, source seeds, and suggested writing frameworks.

Show the shortlist to the user. Pause briefly to allow veto/edits. In auto-mode, proceed if no objection within the same response.

### 2. Research + write each article (sequentially)
For each topic in the shortlist:

a) Spawn `article-researcher` with the topic, chosen angle, framework, and source seeds. It writes a research brief to `.claude/scratch/brief-<slug>.md`.

b) Spawn `article-writer` with the brief path and slug. It loads the `writing-frameworks`, `humanize-prose`, and `blog-article-template` skills, drafts the article, and materializes:
   - `app/blog/<slug>/page.tsx`
   - A new entry at the top of the `blogPosts` array in `app/blog/page.tsx`

Run sequentially so each writer can read prior `app/blog/<slug>/page.tsx` files and avoid topic overlap.

### 3. Replace homepage Featured Blogs (optional, if 3+ articles produced)
If the run produced ≥3 articles, replace the `blogPosts` array in `components/research-section.tsx` with the 3 strongest new articles. Pick by: thesis sharpness, source quality, expected reader pull.

### 4. Add cover image asset
If `public/images/blog-placeholder.svg` doesn't exist yet, write it (a neutral abstract gradient SVG, 1200×675).

### 5. Replace `/blog` index entries (full replacement, not append)
Remove any existing project-linked entries from `blogPosts` in `app/blog/page.tsx` if they pointed to `/projects/<slug>`. The new blog index should contain only the just-written articles, sorted newest first.

### 6. Build and push
- `npm run build` — must pass.
- Commit with message: `Add agent-system AI/ML blog articles (N posts)`.
- `git push origin main`.

## Failure modes and recovery

- **trend-curator returns fewer than N strong topics:** ship what it found. Don't pad.
- **article-researcher can't verify a key fact:** the writer drops that claim. Don't fabricate.
- **build fails on an article TSX:** open the offending file, fix root cause (escape JSX, missing import), don't paper over with `// @ts-ignore` or anything similar.
- **WebSearch rate limited:** wait, retry, or skip a topic and continue. Don't fall back to making up sources.

## Anti-patterns

- Don't run all 5 article-writers in parallel — they'll produce tonally similar prose and may overlap topics.
- Don't skip the trend-curator's "verify with WebFetch" step — search snippets lie.
- Don't promote articles to homepage Featured Blogs that you're not confident in.
- Don't squeeze N>5 articles into a single run — quality drops.
