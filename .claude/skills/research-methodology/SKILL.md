---
name: research-methodology
description: Use this skill when researching a topic for a blog article, paper, or analysis. Provides source-quality hierarchy, recency thresholds, citation discipline, IMRaD basics, and how to spot/skip low-quality LLM-generated web content. Activated automatically when an agent is doing literature review, gathering evidence, or building a research brief.
---

# Research methodology for AI/ML blog articles

## Source hierarchy

When you have a choice, prefer sources in this order:

1. **Primary technical sources** — peer-reviewed papers (NeurIPS, ICML, ICLR, ACL, CVPR), arXiv preprints from established labs, official lab announcements (OpenAI, Anthropic, DeepMind, Meta AI, Google Research), spec/RFC documents, technical reports.
2. **Engineering primary sources** — GitHub repos with reproducible code, benchmark leaderboards from neutral hosts (HELM, BIG-bench, OpenLLM Leaderboard), official model cards.
3. **Serious analytical writing** — Stratechery, Import AI (Jack Clark), Interconnects (Nathan Lambert), Construction Physics, individual researcher blogs from people whose names appear on the papers.
4. **Quality industry publications** — IEEE Spectrum, MIT Technology Review long-form (skip their listicles), Nature News, Science News, The Information, The Verge's deep-dive pieces.
5. **News for facts only** — TechCrunch, Bloomberg, Reuters — useful for "X happened on Y date" but not for technical analysis.

## Sources to actively skip

- **AI-generated content farms** — articles with no author byline or generic "Tech Writer" names, repetitive phrasing, broad claims with zero specific numbers, identical structure to 5 other recent articles on the same topic.
- **Aggregators that just rewrap** — sites that summarize TechCrunch's summary of OpenAI's announcement. Go to OpenAI's announcement.
- **LinkedIn thought-leadership posts** — unless the author is a recognized researcher with paper authorship on the topic.
- **Medium articles by unknown authors** — unless they're cited by primary sources or written by someone with verified domain credentials.
- **PR-laundered "studies"** — vendor-funded white papers presented as research. Check the funding line.

## Recency thresholds

- **AI/ML capability claims:** prefer sources from the last 90 days. Anything older than 6 months is "historical context", not "current state."
- **Infrastructure / tooling:** 6 months is fine.
- **Foundational concepts:** age doesn't matter — Bahdanau attention is from 2014 and still authoritative.
- **Benchmark numbers:** must be re-verified — old benchmarks are routinely saturated. If you cite a benchmark score, also note when the benchmark itself was published and whether newer versions exist.

## Citation discipline

- **Verify before citing.** WebFetch every URL you plan to cite. Don't cite based on the search snippet.
- **Quote ranges, not point estimates** — papers usually report ranges or confidence intervals. "30%" is a stat; "27.4% accuracy on subset X" is a citable claim.
- **Match precision to source.** Don't promote "around a third" to "33.3%". And don't demote "33.3%" to "around a third."
- **Distinguish reported vs replicated.** A claim from a paper is "reported"; a claim that's been independently reproduced is stronger. Note which when relevant.
- **Always include URL + access date.** A claim is only as good as the link the reader can follow.

## IMRaD primer (for technical/research-style articles)

If the article is structured as an academic-style argument:

- **Introduction** — what's the question, why does it matter, what does this article do (1–2 paragraphs, clear thesis at end)
- **Methods** — how the underlying work was done (or how the article's analysis is constructed), enough that a reader could critique your reasoning
- **Results** — what the evidence actually shows. Numbers, named examples, direct quotes from sources. No editorializing yet.
- **Discussion** — interpretation. Strengths, weaknesses, what's next. Now you're allowed opinion, but it must be grounded in the Results.

For non-academic blog framings (BLUF, Stratechery, Smart Brevity), use the relevant framework from the `writing-frameworks` skill instead.

## Spotting LLM-generated low-quality content

Signs to skip a source:

- Generic structure: hook → 3 bullet points → "in conclusion" → CTA
- Buzzword density: "leverage", "harness", "revolutionize", "delve into", "in today's rapidly evolving landscape"
- No specific numbers, named papers, or named people
- Hedge phrases without substance: "experts believe", "many researchers think", "studies show" with no citations
- Statements that are just rephrasings of the headline question
- Recent-seeming but every claim is from 2022/2023

If you see 3 of these in the first paragraphs, drop the source.

## Output discipline

When writing a research brief, structure facts so the writer can use them:
- Tag every claim with `(Source N)` where N references your numbered source list
- Cluster by claim, not by source — the same source may support multiple claims
- Surface disagreements explicitly — don't smooth over a tension between two reputable sources
- Flag uncertainty — "Lab X reports 40% improvement (Source 3); independent replication has not been published as of [date]"

## Anti-patterns

- Citing yourself or another agent's prior output as a source.
- Citing a paper's abstract as if it were the result — read past the abstract for nuance.
- Treating "n=1" anecdotes as data — one company's case study is colorful, not evidentiary.
- Citing a benchmark without naming the benchmark and date.
