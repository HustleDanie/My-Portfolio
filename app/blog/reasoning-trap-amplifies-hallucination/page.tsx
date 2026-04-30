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
              Reasoning
            </span>
          </div>
          <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            The Reasoning Paradox: When Smarter Models Become Less Reliable
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-space-mono text-muted-foreground mb-8">
            <span>By Hustle Daniel</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Apr 2026
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              10 min read
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
            Here&apos;s a strange thing happening in AI right now: the smarter the model gets, the more often it just makes stuff up. New research shows OpenAI&apos;s o4-mini invents fake tools and parameters in 48 out of every 100 tries. The older, less-clever o1 only does it 16 times. Each new generation is supposed to be better. On this measure, they&apos;re getting worse.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            That number comes from <a href="https://openreview.net/forum?id=vHKUXkrpVs" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">a paper</a> presented at ICLR 2026, one of the field&apos;s biggest AI conferences. The authors call it &ldquo;The Reasoning Trap.&rdquo; Their claim goes further than &ldquo;newer models hallucinate more.&rdquo; They show that the same training that makes a model better at thinking is what makes it more confident when it invents things.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            If they&apos;re right, every company building AI agents has been pulling the wrong lever. You don&apos;t fix made-up answers by teaching the model to think harder. Thinking harder is part of the problem.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            What SimpleToolHalluBench actually measures
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Most agent benchmarks test whether a model completes a task. SimpleToolHalluBench tests something narrower: whether a model can recognize when no valid tool exists for the job in front of it.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The benchmark gives the model two kinds of trick scenarios. In the first, the user asks for something the model cannot do with the available tools. The correct answer is to say so. In the second, the toolbox contains tempting distractors that look relevant but aren&apos;t. The correct answer, again, is restraint.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Hallucinating a tool call here means inventing an API endpoint, fabricating a parameter that doesn&apos;t exist, or confidently calling a function in a way that will silently fail. None of these are recoverable inside an agent loop. A wrong tool call cascades. The downstream observation is gibberish, the model interprets the gibberish, and the agent commits further to the false path.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            The causal claim, not just the correlation
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Plenty of writeups have already noticed that reasoning models hallucinate at higher rates than older instruction-tuned ones. The Reasoning Trap goes further. The authors trained a series of smaller models from scratch with progressively more reasoning RL, then ran them through SimpleToolHalluBench at every checkpoint.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Tool hallucination rose monotonically with task performance. Every gain on reasoning-style evaluations bought a corresponding loss on tool reliability. The relationship held when the RL training was done on tasks unrelated to tool use. Mathematics-only RL still degraded the model&apos;s downstream tool-call discrimination.
          </p>

          <blockquote className="border-l-2 border-foreground/40 pl-4 sm:pl-6 my-6 sm:my-8 italic text-foreground/80">
            <p className="font-space-mono text-sm sm:text-base">
              &ldquo;Progressively enhancing reasoning through RL increases tool hallucination proportionally with task performance gains.&rdquo;
            </p>
            <footer className="mt-2 text-xs text-muted-foreground not-italic">— Yin et al., The Reasoning Trap (2026)</footer>
          </blockquote>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The implication: this isn&apos;t a bug specific to OpenAI&apos;s reasoning recipe. It looks like a property of optimization itself. Whatever incentive surface RL is shaping, it doesn&apos;t reward the model for tracking which tools actually exist.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            Inside the model: what gets crushed
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The mechanistic side of the paper is the part that should make agent infrastructure teams uncomfortable.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The authors probe the network and find that reasoning RL &ldquo;disproportionately collapses tool-reliability representations.&rdquo; In plain English: there&apos;s a part of the residual stream, concentrated in the model&apos;s later layers, that historically tracked things like &ldquo;is this tool callable, with these arguments, on this input.&rdquo; That subspace gets flattened during reasoning training.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The model still produces a tool call. It does so with what looks like high confidence. But the internal signal that should have raised a flag &mdash; this tool doesn&apos;t exist; this argument is the wrong type &mdash; is gone, or so attenuated that it loses the contest with the more polished generation pathway.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            This matches the qualitative experience anyone running production agents over the last six months has had. The new models don&apos;t just get tools wrong more often. They get them wrong with a kind of fluent assurance that&apos;s harder to catch in review. The output looks plausible. The reasoning trace looks coherent. The call is bogus.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            Why the obvious fixes don&apos;t fix this
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The first reflex of an engineer reading this is to reach for guardrails. Add a tool registry validator. Inject the available tool schemas into every prompt. Fail closed on unknown function names.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            All of this helps at the system layer. None of it addresses the underlying claim, which is that the model is internally uncertain about tools but no longer surfaces that uncertainty. A validator can catch a wrong function name. It can&apos;t catch a real function being called with arguments that the model only thought were correct because reasoning RL polished its self-assurance.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The second reflex is to crank up safety RL specifically against hallucination. The paper anticipates this. The authors run the experiment. Reducing hallucination rates through targeted training works, and it consistently degrades model utility on the original tasks. The trade-off appears to be sharp, not soft. You don&apos;t get to keep the reasoning gains and shed the hallucination tax. You pay one way or the other.
          </p>

          <aside className="bg-gray-50 dark:bg-gray-900 border border-border rounded-lg p-4 sm:p-5 my-6 text-sm font-space-mono">
            <strong className="block mb-1 text-foreground">Worth pausing on:</strong>
            The trade-off is method-agnostic. Supervised fine-tuning shows it. Inference-time chain-of-thought scaffolding shows it. RLHF shows it. If you taught the model to think harder, you also taught it to hallucinate harder. The authors didn&apos;t find a training recipe that escapes the trade-off.
          </aside>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            What this means for agent builders
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The pragmatic reading is that the bigger reasoning model isn&apos;t always the better choice for agent work, and the gap is widening with each generation. There are now agent benchmarks where Claude Opus 4.7 and Gemini 3 Pro Deep Think outperform OpenAI&apos;s flagship despite scoring lower on math and code reasoning, because they hallucinate fewer tool calls.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The strategic reading is harder. If reasoning RL fundamentally trades off against agent reliability, the field has been optimizing the wrong leaderboard for the last eighteen months. The flashy capabilities &mdash; one-shot olympiad math, frontier coding benchmarks &mdash; come from a training regime that the same lab&apos;s agent products then have to work around.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            That&apos;s the version of the finding most likely to actually move things. Not &ldquo;newer models hallucinate more,&rdquo; which is interesting trivia, but &ldquo;the training methodology that produces our best benchmarks may be incompatible with the products we&apos;re trying to build.&rdquo;
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            What evaluation needs to do next
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            SimpleToolHalluBench is going to spread. It&apos;s simple to construct, the trick scenarios are easy to vary, and the score gap between leading models is wide enough that vendors will care. Expect to see versions of it in every serious agent eval suite by the next major release cycle.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The harder question is whether evaluation alone can change incentives. Labs will keep optimizing for the public benchmarks they get rewarded for. If those are still dominated by reasoning-heavy tasks, hallucination-resistance will stay a footnote on the model card. The Reasoning Trap doesn&apos;t solve that. It just makes the cost line legible.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            For now, the practical advice is unromantic. Test your agent with a model that scores second on the leaderboard. You may find it scores first on yours.
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
              <a href="https://openreview.net/forum?id=vHKUXkrpVs" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                Yin, Sha, Cui, Meng, Li &mdash; The Reasoning Trap: How Enhancing LLM Reasoning Amplifies Tool Hallucination, ICLR 2026 <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://www.humai.blog/reasoning-made-ai-smarter-it-also-tripled-the-hallucinations/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                Humai &mdash; Reasoning Made AI Smarter; It Also Tripled the Hallucinations <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://asanify.com/blog/news/ai-agent-hallucination-april-29-2026/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                Asanify &mdash; The AI Agent Hallucination Trap In Smarter Models (Apr 29, 2026) <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://hallucination-reliable-agentic-ai.github.io/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                ICLR 2026 Workshop on Reliable Agentic AI: From Hallucination to Trustworthy Autonomy <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
          </ol>
        </motion.section>
      </article>
    </div>
  )
}
