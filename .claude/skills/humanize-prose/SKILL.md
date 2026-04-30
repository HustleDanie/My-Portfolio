---
name: humanize-prose
description: Use this skill when drafting or editing prose that needs to read as human-written, not LLM-generated. Provides a checklist of common AI tells (em-dash overuse, rule of three, buzzword density, uniform sentence rhythm, generic transitions) and concrete techniques to remove them. Activated automatically when an agent is producing long-form prose.
---

# Humanize prose

LLMs have predictable rhythms. Readers — especially technical readers — recognize them within a paragraph and discount the writing. Apply this checklist on every draft.

## The checklist (run before saving any article)

### 1. Sentence length variation
- Look at any 5 consecutive sentences. Are they all 12–22 words? That's the AI default.
- Mix in: 3–6 word punches. 25+ word complex sentences. The contrast is what reads as human.
- **Test:** read the paragraph aloud. If the cadence is uniform, break it.

### 2. Em-dash budget
- Allow at most **one em-dash per ~500 words**. LLMs use them constantly.
- Replace most with: periods, semicolons, commas, or rewriting.
- "The model failed — and it failed badly." → "The model failed. It failed badly."

### 3. Kill the Rule of Three
- LLMs default to 3-item lists. Always.
- Use 2, 4, 5, or 7. Vary list lengths across sections.
- "fast, scalable, and reliable" → "fast and brutally simple" or "fast, scalable, reliable, and — when it crashes — uninformative"
- If a list genuinely has exactly 3 items, fine. But check: did you add a third just to round out?

### 4. Buzzword strike list

Strike these on every draft:

| Strike | Replace with |
|---|---|
| leverage | use |
| harness | use |
| revolutionize | change / replace / break |
| delve into | examine / look at / unpack |
| furthermore / moreover | (cut entirely, or "and") |
| in conclusion | (cut — let the conclusion stand on its own) |
| it's important to note | (cut — if it's important, just state it) |
| in today's rapidly evolving landscape | (cut — start somewhere specific) |
| game-changer / game-changing | (cut — name the actual change) |
| at the end of the day | (cut) |
| seamless / seamlessly | (cut — describe what's smooth) |
| navigate the complexities of | (cut — name the complexity) |
| robust | (specific: "handles X without crashing") |
| cutting-edge / state-of-the-art | (specific: name the bench, give the number) |

### 5. Paragraph length variation
- Don't write 5 paragraphs of similar length in a row.
- A single-sentence paragraph in the middle of longer ones lands hard. Use sparingly.
- A 6-sentence paragraph followed by a 1-sentence paragraph is a powerful rhythm.

### 6. Specific over generic
- Every section needs at least one specific named entity: a paper title, a person's name, a benchmark, a dollar figure, a date, a model name.
- "Recent research has shown..." → "A March 2026 paper from DeepMind reports..."
- "Industry leaders are saying..." → "Sundar Pichai told analysts on the Q1 call..."
- Specific is humanity's signature. Generic is the AI tell.

### 7. Use contractions
- "We have found..." → "We've found..."
- "It is not..." → "It isn't..."
- LLMs default to formal expansion. Humans contract.
- Exception: if you're going for a deliberately formal tone (academic IMRaD), expand back. But be consistent.

### 8. Frontload personality in transitions
- Replace neutral connectors with character.
- "Furthermore, the model also..." → "But here's the catch:"
- "It is also worth noting that..." → "Worth pausing on:"
- "In summary, this approach..." → "What this gets you:"

### 9. Anchor abstract claims to scenes
- Abstract: "Latency matters in agentic systems."
- Scene: "If a coding agent has to wait 4 seconds between tool calls, a 12-step task takes a minute. Run that loop 200 times a day across an engineering team and you've burned an afternoon."
- Show the cost in concrete units.

### 10. Don't bury the verb
- "An evaluation of the model's performance was conducted by the researchers." → "The researchers evaluated the model."
- Active voice, named subject, specific verb.

## Patterns to specifically recognize and remove

### The "tricolon climax"
LLMs love three-part rhetorical climbs: "It's faster, smarter, and more powerful." Cut to two or extend to four asymmetrically: "It's faster and brutally simpler."

### The "shimmering metaphor"
Phrases like "AI is reshaping the very fabric of...", "we stand at the precipice of...", "the dawn of a new era". Strike on sight. Replace with a specific scene.

### The "balanced view" mush
"While X has its benefits, Y also presents challenges." Real human writers take a side, even if hedged. Pick one and defend.

### The summary that isn't
"In essence, what we're seeing is..." followed by a restatement. Cut the restatement; the reader saw it.

### The over-explained acronym
"Large Language Models (LLMs) are..." in paragraph 1, then again in paragraph 4. Define once, use the acronym.

## Test for "is this AI-tell-y?"

Read the first paragraph and the closing sentence aloud. If either feels generic enough to slot into 5 different articles on similar topics, rewrite it specific to THIS topic.

## What to keep

Some "AI tells" are also good writing — don't over-correct:
- Clear topic sentences are good. Don't fragment for the sake of fragmentation.
- Parallel structure ("Not X, not Y, but Z") is rhetorically powerful when used once. Just don't use it three times in a row.
- Em-dashes aren't banned — they're rationed.

The goal isn't to make prose feel "anti-AI". It's to make it feel written, by someone who cares.
