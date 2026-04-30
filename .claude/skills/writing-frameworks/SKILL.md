---
name: writing-frameworks
description: Use this skill when drafting a long-form blog article, research piece, or analytical essay. Provides selection guidance and section templates for six widely-used writing frameworks (BLUF/Inverted Pyramid, Pyramid Principle, Smart Brevity, Stratechery essay, IMRaD, Hemingway/Strunk & White clarity). Activated automatically when an agent needs to choose article structure or transition between sections.
---

# Writing frameworks

Pick ONE primary framework for an article. Mixing weakens both. The framework determines the section structure, opening line, and ratio of claim-to-evidence.

---

## 1. BLUF / Inverted Pyramid
**Use when:** the article delivers news, an announcement explainer, or a "what just happened and why it matters" piece.

**Structure:**
- **Lead (1 paragraph)** — the bottom line. What happened, who did it, when, and why a reader should care. State the conclusion in the first 50 words.
- **Key facts (2–4 paragraphs)** — supporting details, ranked by importance. Reader can stop after any paragraph and still have the gist.
- **Context (1–2 paragraphs)** — why this is or isn't a big deal. History, comparisons.
- **What's next (1 paragraph)** — implications or open questions.

**Length:** 800–1,400 words.

**Opener template:** "[Specific event] happened on [date], and the consequence is [thesis]. Here's what's actually new and what isn't."

---

## 2. Pyramid Principle (Barbara Minto / McKinsey)
**Use when:** the article is an analysis aimed at decision-makers — "what should we conclude about X?" Common for industry-implications pieces.

**Structure:**
- **Top-line answer (1 paragraph)** — the question and the answer. Stated together.
- **Three (or four) supporting arguments** — each is a section header that, taken together, fully justify the answer.
- **Evidence under each argument** — facts, examples, sources.
- **Brief synthesis** — how the arguments combine. No surprises here; the answer was already given up top.

**Length:** 1,200–1,800 words.

**Opener template:** "The question facing [audience] is whether [X]. The short answer: [thesis]. Three things make this case."

**Watch out:** the structure aggressively wants 3 supporting arguments. Resist if the natural number is 2 or 4. Don't pad to fit.

---

## 3. Smart Brevity (Axios)
**Use when:** the article is an explainer for busy readers — "give me the gist, then a few key facts, then I'm out." Good for briefings, weekly recaps, or "what is [X]" pieces aimed at semi-technical audiences.

**Structure:**
- **One-line hook** — what this is about, in 15 words or fewer.
- **Why it matters** — 2–3 sentences on stakes.
- **The big picture** — 1 short paragraph of context.
- **Key facts** — 3–5 bullets, each with a bold lead phrase.
- **What's next** — 1–2 sentences.
- **Optional: "Go deeper"** — 2–3 hyperlinked sources.

**Length:** 600–1,000 words.

**Opener template:** "**[Topic]** — [single-sentence hook]."

**Watch out:** Smart Brevity reads as journalism, not analysis. Don't use it for pieces that need sustained argument.

---

## 4. Stratechery-style Essay
**Use when:** the article is a longer thesis-driven analysis. Best for "here's how to think about [X]" pieces where the reader is learning a framework, not just facts.

**Structure:**
- **Anecdote or specific scene (1–2 paragraphs)** — open with concrete detail, often a single story or quote
- **Tension or puzzle (1 paragraph)** — what doesn't quite fit, what the conventional view misses
- **Thesis (1 sentence, often near the end of section 2)** — the framework or claim the rest of the essay defends
- **Body sections (3–5 of them, each named with an `<h2>`)** — each elaborates one facet of the thesis. Mix evidence with interpretation. Use specific named examples in every section.
- **Implication/synthesis (1–2 paragraphs)** — what follows from the thesis. The reader should feel they've been given a tool, not just information.

**Length:** 1,800–2,500 words.

**Opener template:** Start with a specific, concrete detail. The phrase "On [date], [person] [did specific thing]." is a good starting cadence. Avoid abstract openings like "AI is changing everything."

**Watch out:** essays this long need pacing — break with subheaders every 300–500 words.

---

## 5. IMRaD (Introduction, Methods, Results, Discussion)
**Use when:** the article is reporting on a piece of research, a benchmark, or a reproducibility analysis. Less common for blog posts but useful for technical deep-dives.

**Structure:**
- **Introduction** — context, why this question matters, hypothesis or thesis. 1–2 paragraphs.
- **Methods** — how the work was done (or how the analysis is constructed). Enough detail that a reader can critique reasoning.
- **Results** — what the evidence shows. Numbers, named examples, direct quotes. No editorializing.
- **Discussion** — interpretation, limitations, what's next.

**Length:** 1,500–2,200 words.

**Opener template:** "[Research question]. [What we already know]. [What this piece adds]."

**Watch out:** IMRaD reads as formal. If your audience is engineers reading on lunch break, BLUF or Smart Brevity may serve better.

---

## 6. Hemingway / Strunk & White clarity rules
**Not a structure but a layer applied to whatever framework you pick.**

- Short sentences over long. Long sentences are fine when they earn it — never as default.
- Active voice over passive. "The model failed" beats "the model was caused to fail by".
- Concrete nouns over abstract ones. "GPU" beats "computational resource". "$3M" beats "significant cost".
- Strong verbs. "Crashed" beats "experienced an outage".
- Cut filler: "very", "really", "actually", "basically", "essentially", "in order to" → "to".
- Prefer one word to two: "use" not "make use of", "now" not "at this point in time".

---

## Choosing a framework

| Article intent | Use |
|---|---|
| Explainer for busy semi-technical reader | Smart Brevity |
| News/release analysis | BLUF |
| Industry-implications piece for decision-makers | Pyramid Principle |
| "How to think about X" framework essay | Stratechery |
| Reporting on a paper/benchmark/reproduction | IMRaD |

Apply Hemingway/Strunk & White as a layer regardless of framework.

## Transition phrases worth using

Replace generic AI-prose transitions with these:

- "But here's the catch:" / "Here's where it breaks down:" / "And yet —"
- "Two things follow."
- "Set that aside for a moment."
- "Compare this to [specific named contrast]."
- "[Specific person] put it this way: '...'"
- "The harder version of this question is..."

## Banned transitions and openers

Strike these on first pass:

- "In today's rapidly evolving landscape..."
- "It's important to note that..."
- "Furthermore..." / "Moreover..." / "Additionally..."
- "In conclusion..." / "To summarize..."
- "As we delve into..." / "Let's dive into..."
- "Imagine a world where..."
- "Have you ever wondered..."
