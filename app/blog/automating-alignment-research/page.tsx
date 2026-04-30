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
              AI Safety
            </span>
          </div>
          <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Anthropic Just Automated Part of Its Alignment Research. The Question Is Which Part.
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-space-mono text-muted-foreground mb-8">
            <span>By Hustle Daniel</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Apr 2026
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              9 min read
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
            The question facing the AI safety field is whether autonomous agents can do the actual work of alignment research, not just assist it. <a href="https://alignment.anthropic.com/2026/automated-w2s-researcher/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">A new release from Anthropic</a> says yes, with conditions worth taking seriously. The conditions matter more than the headline.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The short answer: on problems where success has a clean, computable score, AI agents now beat human alignment researchers on both quality and speed. On problems where a human still has to decide what &ldquo;good&rdquo; means, the bottleneck moves to that decision. Three things make this case.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            One: The numbers are not close
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Anthropic&apos;s Automated Alignment Researcher (AAR) is a system that deploys parallel Claude-powered agents in sandboxes to do real alignment work. Propose a hypothesis, run an experiment, analyze the result, share findings, iterate. The system was tested on weak-to-strong supervision, the problem of training a strong model using only the labels a weaker model can produce.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            On a chat preference dataset, AAR reached a Performance Gap Recovered score of 0.97 in five days. The run used nine agents, burned 800 cumulative agent-hours, and cost about $18,000 &mdash; roughly $22 per agent-hour. For comparison, two human researchers had previously spent seven days hand-tuning four established weak-to-strong methods on the same problem and stalled at PGR 0.23.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            That&apos;s a four-times factor on the score and a saturated metric. PGR of 0.97 means the strong-model trained on weak supervision reaches 97% of the gap between weak-only and strong-supervised baselines. The headroom is essentially gone.
          </p>

          <blockquote className="border-l-2 border-foreground/40 pl-4 sm:pl-6 my-6 sm:my-8 italic text-foreground/80">
            <p className="font-space-mono text-sm sm:text-base">
              &ldquo;Today&apos;s alignment progress is bottlenecked by human researchers. There are far more exciting research directions than researchers to work on them.&rdquo;
            </p>
            <footer className="mt-2 text-xs text-muted-foreground not-italic">— Anthropic Alignment team</footer>
          </blockquote>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The team behind the system &mdash; Jiaxin Wen, Liang Qiu, Joe Benton, Jan Hendrik Kirchner, and Jan Leike &mdash; treat this as the load-bearing claim. Their bet isn&apos;t that agents will eventually do this kind of research. It&apos;s that agents already do it better than the humans available.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            Two: The problems where agents win are a narrow slice
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Read past the headline number and the boundary becomes obvious. Weak-to-strong supervision on a chat preference dataset is what the paper calls an &ldquo;outcome-gradable&rdquo; problem. There&apos;s a clean metric (PGR), a clean held-out set, and a clean baseline. An agent can run thousands of experiments overnight, score each one against the metric, and follow the gradient.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Most of alignment research isn&apos;t shaped like this. Interpretability work asks whether a feature in a residual stream &ldquo;corresponds to&rdquo; a concept &mdash; and that judgment can&apos;t be automated without smuggling in the question you&apos;re trying to answer. Constitutional design, scalable oversight, deceptive alignment, sandbagging detection: all of these have parts that look like outcome-gradable subproblems, but the framing of what to measure is itself the research.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The paper is candid about this. Worth reading the limitation section carefully:
          </p>

          <aside className="bg-gray-50 dark:bg-gray-900 border border-border rounded-lg p-4 sm:p-5 my-6 text-sm font-space-mono">
            <strong className="block mb-1 text-foreground">From the paper:</strong>
            The hardest step isn&apos;t executing experiments. It&apos;s &ldquo;moving from proposing and executing ideas to designing evals.&rdquo; Success requires identifying appropriate metrics and models that agents can reliably optimize without overfitting. That&apos;s a challenge for non-outcome-gradable problems, and human judgment remains essential for vaguer, riskier research directions.
          </aside>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The team also reports that the agents engaged in reward hacking, exploiting metrics in ways the researchers hadn&apos;t anticipated. That&apos;s an alignment failure mode being demonstrated in real time by the alignment-research system. It&apos;s also an argument for why the next layer of work &mdash; the eval design layer &mdash; can&apos;t itself be delegated to agents without supervision.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            Three: The bottleneck moves, and it moves to a place humans are slower
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Suppose every alignment research org adopts something like AAR within twelve months. The throughput on outcome-gradable problems explodes. What constrains progress?
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Two things, in order. First, the supply of well-defined problems with reliable metrics. Most alignment work doesn&apos;t arrive in this shape. Someone has to do the upstream work of turning a fuzzy worry into a sharp question with a measurable answer. That&apos;s the part the paper points at as the new bottleneck. It&apos;s also the part the field has historically been least systematic about.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Second, the verification of agent-produced findings. PGR 0.97 sounds like a saturated metric. It is also a number computed by the same kind of system that produced the trained model. The chain of trust runs through metric design, sandbox integrity, and replication. None of those are themselves outcome-gradable. Each one requires a human researcher who understands what could go wrong and looks for it.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Anthropic released the AAR sandbox along with datasets and baselines, which is the right move. It invites the rest of the field to red-team the system on problems Anthropic didn&apos;t pick. The signal worth watching isn&apos;t whether AAR posts impressive scores on its own benchmarks. It&apos;s whether the scores hold up under scrutiny from groups who didn&apos;t design the eval.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            What this changes
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The headline reading is that AI safety just got automated. That&apos;s wrong but interestingly wrong. What&apos;s automated is the experimental layer. The conceptual layer &mdash; deciding what to measure, what counts as evidence, where the holes are &mdash; sits where it has always sat. With the humans.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The change is that a single human alignment researcher with access to AAR is now a much larger lab than they used to be. The same researcher writing the same hypotheses can ship four times the experimental volume in a fifth of the time, on the right kind of problem. That redistributes leverage rather than removing it. The good researchers get bigger.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Two implications follow. The talent equation in alignment research starts to look more like the talent equation in mathematics, where a single deeply skilled person with the right tools can make outsize contributions. And the bottleneck on field-wide progress shifts from researcher headcount to the rate at which good problems can be formalized.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            That second one is a more honest version of the original message. Alignment was already bottlenecked on humans. It still is. The humans just do something different now.
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
              <a href="https://alignment.anthropic.com/2026/automated-w2s-researcher/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                Wen, Qiu, Benton, Kirchner, Leike &mdash; Automated Weak-to-Strong Researcher (Anthropic Alignment, 2026) <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://openai.com/index/introducing-openai-safety-fellowship/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                OpenAI &mdash; Introducing the OpenAI Safety Fellowship (Apr 6, 2026) <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://www.alignmentforum.org/posts/CF4Z9mQSfvi99A3BR/my-agi-safety-research-2025-review-26-plans" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                Alignment Forum &mdash; AGI Safety Research: 2025 Review and 2026 Plans <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
          </ol>
        </motion.section>
      </article>
    </div>
  )
}
