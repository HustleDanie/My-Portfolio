"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-background">
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
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <div className="mb-4">
            <span className="inline-block px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] font-space-mono uppercase tracking-wider text-foreground">
              Open Source AI
            </span>
          </div>
          <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            DeepSeek V4 and the Month Open Source AI Stopped Playing Catch-Up
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-space-mono text-muted-foreground mb-8">
            <span>By Hustle Daniel</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Apr 2026
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              7 min read
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-5 sm:space-y-6"
        >
          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            DeepSeek released V4 on April 24, 2026 as an MIT-licensed open weights drop. The flagship Pro variant ships at 1.6 trillion total parameters with 49 billion active in any given forward pass. It supports a 1 million token context window and a 384K-token maximum output. Inference costs are reported at roughly 27 percent of the FLOPs and 10 percent of the KV cache footprint of V3.2 at 1M context. Within a fortnight of release, it&apos;s a working substitute for closed frontier models on most agentic workloads. <a href="https://api-docs.deepseek.com/news/news260424" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">DeepSeek&apos;s release notes</a> are unusually direct about the architecture choices that made the cost numbers possible.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            That&apos;s the one-paragraph version. The longer story is that V4 didn&apos;t arrive in a vacuum. April 2026 has been the densest month of open-weights releases in the model era, and the cumulative effect is that the gap to closed frontier shifts from &ldquo;visible on capabilities benchmarks&rdquo; to &ldquo;visible mostly on the bill.&rdquo;
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            What V4 actually is, in two paragraphs
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            DeepSeek shipped two variants. V4-Pro is the headline model: 1.6T total parameters, 49B active, 1M-token context, MIT license. V4-Flash trades capability for cost: 284B total / 13B active, same context window, same license. Both were pre-trained on more than 32 trillion tokens using mixed FP4 and FP8 precision &mdash; FP4 for the MoE experts, FP8 for most other parameters. That precision split is part of what makes the cost numbers credible.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The architecture introduces two named pieces. The attention stack pairs Compressed Sparse Attention with Heavily Compressed Attention, designed to keep long-context inference tractable. Residual connections are wrapped in what DeepSeek calls Manifold-Constrained Hyper-Connections, a stability mechanism that lets the network stay well-behaved at this scale. None of these are revolutionary individually. The combination is what produces a 1.6T MoE that you can actually run.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            The benchmarks tell two stories
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            On <a href="https://akitaonrails.com/en/2026/04/24/llm-benchmarks-parte-3-deepseek-kimi-mimo/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">an early independent coding benchmark</a> by Fabio Akita, V4-Flash scored 78 out of 100 at roughly $0.01 per run. GPT-5.5 scored 96 at $10 per run on the same workload. That&apos;s a 1000x cost gap for a 23 percent quality gap, on a task where most teams would happily take the 23 percent.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            V4-Pro is harder to benchmark fairly. Its thinking-mode protocol expects clients to echo `reasoning_content` back into the next request, and most ai-sdk-based harnesses strip that field on the way through. Akita&apos;s harness fell back to Claude Opus when V4-Pro returned the protocol violation. The reported 69/100 score &mdash; below V4-Flash, suspiciously &mdash; reflects mixed authorship rather than V4-Pro running cleanly. Real numbers will land once tooling catches up, which probably means within two weeks.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            The rest of April
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            V4 is the most consequential single release, but the cumulative month is the actual story. The notable shipments:
          </p>

          <ul className="list-disc list-outside ml-5 sm:ml-6 space-y-2 font-space-mono text-sm sm:text-base text-foreground/90">
            <li><strong>Llama 4 (Apr 5)</strong> &mdash; Meta released Scout (109B MoE / 17B active, 10M-token context) and Maverick (400B MoE / 17B active, matching GPT-4o on MMLU at 87.2). Llama 4 Community License.</li>
            <li><strong>Qwen 3 (Apr 8)</strong> &mdash; Alibaba shipped eight model sizes from 0.6B to 235B, all under Apache 2.0, with a hybrid thinking mode that toggles chain-of-thought inside ordinary conversations.</li>
            <li><strong>Phi-4-reasoning (Apr 10)</strong> &mdash; Microsoft released a 14B dense reasoning model under MIT. AIME 2025: 80.6. GPQA Diamond: 75.3. Numbers a 14B model had no business posting eighteen months ago.</li>
            <li><strong>OLMo 2 32B (Apr 3)</strong> &mdash; Ai2&apos;s fully reproducible 32B drop, complete with training data and code, Apache 2.0.</li>
            <li><strong>DeepSeek V4 (Apr 24)</strong> &mdash; the headline above.</li>
          </ul>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Each of those would have been the dominant story of any month in 2024. The fact that they all dropped inside thirty days, on permissive licenses, with running deployments by hobbyists within hours, is the inflection.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            What this changes for everyone downstream
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            For application teams, the calculus on which model to ship just got more interesting. The closed APIs still win on absolute capability for the most demanding workloads, particularly multi-step reasoning and frontier coding. The open weights now cover a wider band of the &ldquo;good enough&rdquo; envelope at a fraction of the inference bill. The right architecture for many products is becoming: closed model for the hard 5 percent, open weights self-hosted for the routine 95 percent.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            For inference vendors &mdash; Together, Fireworks, the various GPU clouds &mdash; the V4 release is a windfall. The model is good enough to attract enterprise demand and small enough (in active parameters) to serve at margins that closed-API resellers can&apos;t match. The pricing pressure on the closed labs is not theoretical anymore.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            For the closed labs themselves, the strategic question is whether to keep competing on raw capability or to accept that the moat lives upstream and downstream of the model: in product surface, in agentic infrastructure, in distribution. OpenAI and Anthropic have both been quietly shifting in that direction for months. April 2026 is the month where it stopped looking like a pivot and started looking like a survival reflex.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            What to watch
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Two things over the next sixty days. First, agent benchmarks. V4-Pro is positioned for agentic workflows, and its 1M-token context plus released `reasoning_content` protocol suggests it was designed for long-running tool-use loops. Whether it actually holds up there &mdash; against Claude Opus 4.7 and GPT-5.5 on Terminal-Bench, GAIA, and similar &mdash; is the next data point worth waiting for.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Second, the response from US labs. OpenAI&apos;s GPT-5 Turbo and Anthropic&apos;s Claude Opus 4 both shipped earlier in April. Neither was priced as a competitor to open weights at this scale. The next move &mdash; either a closed-model price cut or an open-weights release of their own &mdash; will tell you whether the inflection is being acknowledged or fought.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 sm:mt-16 pt-8 border-t border-border"
        >
          <h2 className="font-orbitron text-lg sm:text-xl font-semibold mb-4">References</h2>
          <ol className="space-y-2 font-space-mono text-xs sm:text-sm text-muted-foreground list-decimal list-inside">
            <li>
              <a href="https://api-docs.deepseek.com/news/news260424" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                DeepSeek API Docs &mdash; V4 Preview Release Notes (Apr 24, 2026) <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                deepseek-ai/DeepSeek-V4-Pro &mdash; Hugging Face model card <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://akitaonrails.com/en/2026/04/24/llm-benchmarks-parte-3-deepseek-kimi-mimo/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                Akita &mdash; LLM Coding Benchmark April 2026: GPT 5.5, DeepSeek V4, Kimi v2.6, MiMo <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://fazm.ai/blog/new-open-source-llm-releases-april-2026" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                Fazm &mdash; New Open Source LLM Releases in April 2026 <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
          </ol>
        </motion.section>
      </article>
    </div>
  )
}
