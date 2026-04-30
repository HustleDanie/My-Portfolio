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
              Agents
            </span>
          </div>
          <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Can AI Actually Do Science? Someone Just Tested It
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
          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-4 sm:mt-6 mb-3">
            The question nobody had a clean answer to
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Pitch decks have been throwing around &ldquo;AI will do science&rdquo; for two years. The phrase usually means very little. It could mean &ldquo;AI helps a researcher type faster.&rdquo; It could mean &ldquo;AI replaces the researcher entirely.&rdquo; Most of the time the speaker doesn&apos;t know which they mean either.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            A real test of the question finally happened recently. <a href="https://arxiv.org/abs/2504.08066" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">A research team built a fully automated system</a> that comes up with research ideas, runs the experiments, looks at the results, and writes the paper. No human touches it after the topic is set. Then they submitted three of its papers to a real machine-learning conference, without telling the reviewers the papers were written by AI.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            One of the three got accepted. The reviewers liked it. Then the conference organizers found out it was written by AI and pulled it.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Both halves of that story matter. This piece walks through what the system actually did, what it proved, and what the withdrawal tells you about the gap between &ldquo;the technology works&rdquo; and &ldquo;the world is ready for it to work.&rdquo;
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            How the system is built
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The original AI Scientist (Lu et al., 2024) ran an end-to-end pipeline but leaned on human-authored code templates. The pipeline could only operate inside a narrow set of pre-built experimental scaffolds. v2 removes the templates. The new system explores a search space of possible experiments using what the authors call a progressive agentic tree search, supervised by a dedicated experiment manager agent.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Concretely, the loop looks roughly like this:
          </p>

          <ol className="list-decimal list-outside ml-5 sm:ml-6 space-y-2 font-space-mono text-sm sm:text-base text-foreground/90">
            <li>An ideation pass generates candidate research questions in a target domain.</li>
            <li>The experiment manager prunes candidates by feasibility and novelty against retrieved literature.</li>
            <li>For each surviving idea, sub-agents propose experimental designs as a tree of options.</li>
            <li>Promising branches are run end-to-end, with code, data, and results captured.</li>
            <li>A writeup agent assembles results into a paper, including figures generated from raw data.</li>
            <li>The output is returned for review or, in this case, submission.</li>
          </ol>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Two design choices distinguish v2 from prior attempts. The tree search is progressive &mdash; the system commits to a branch, runs the experiment, then uses the result to prune the rest of the tree, rather than evaluating all branches against a static heuristic. The experiment manager is a separate agent with its own context and tools, which lets it act as a check on individual sub-agents that might commit to bad branches early.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            What the experiment actually showed
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The Sakana team submitted three fully AI-generated manuscripts to the ICLR 2025 workshop &ldquo;I Can&apos;t Believe It&apos;s Not Better,&rdquo; a venue specifically focused on negative results and unexpected behavior in deep learning. The submissions went through normal peer review. Reviewers were not told the papers were machine-authored.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            One of the three cleared the bar. The accepted paper investigated compositional regularization in neural network training. It received reviewer scores of 6, 7, and 6, averaging 6.33, putting it roughly in the top 45% of submissions to that workshop. The other two were rejected.
          </p>

          <blockquote className="border-l-2 border-foreground/40 pl-4 sm:pl-6 my-6 sm:my-8 italic text-foreground/80">
            <p className="font-space-mono text-sm sm:text-base">
              &ldquo;One manuscript achieved high enough scores to exceed the average human acceptance threshold, marking the first instance of a fully AI-generated paper successfully navigating a peer review.&rdquo;
            </p>
            <footer className="mt-2 text-xs text-muted-foreground not-italic">— Sakana AI</footer>
          </blockquote>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The 1-in-3 hit rate is honest, and it&apos;s the right way to read the result. v2 doesn&apos;t reliably produce workshop-quality papers. It produces a distribution of papers, some fraction of which are good enough. That&apos;s the same distribution structure human researchers operate inside, just with different parameters.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            The withdrawal, and what it actually objects to
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            After the review verdict came in, the workshop organizers withdrew the accepted paper. The reason given was unresolved questions about the publication of AI-generated work. Notice what the objection isn&apos;t about. It isn&apos;t that the paper was bad. The peer-review system already ratified that it cleared the workshop&apos;s threshold.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The objection is institutional. Peer review is a contract between human researchers, and that contract carries assumptions: that an author can be held accountable for claims, that disclosed methods can be probed by asking the author follow-up questions, that authorship credit means a person took responsibility. An AI-generated paper breaks all three at once. The reviewers can score it on the same rubric, but the publishing infrastructure isn&apos;t built to ingest the output.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            That&apos;s the pattern worth tracking. Capability gets there before legitimacy. The technology can already do the thing. The institutions can&apos;t yet absorb the thing being done.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            Beyond Sakana: the wider category
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            AI Scientist-v2 is the most legible result, but it&apos;s a single point in a fast-broadening category. <a href="https://nvidianews.nvidia.com/news/nvidia-expands-open-model-families-to-power-the-next-wave-of-agentic-physical-and-healthcare-ai" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">Edison Scientific&apos;s Kosmos</a>, built on NVIDIA Nemotron, is in production with more than 50,000 researchers and is structured around running hundreds of research tasks in parallel, compressing what used to take months into a single working day. <a href="https://research.google/blog/improving-the-academic-workflow-introducing-two-ai-agents-for-better-figures-and-peer-review/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">Google Research</a> shipped a pair of agents in April 2026 specifically targeted at academic workflow: one for figure generation, one for peer-review assistance.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            None of these systems remove the human researcher. They redistribute the work. The hypothesis-generation step, the experimental-execution step, and the writeup step are now automatable to varying degrees. The judgment step &mdash; deciding which finding is interesting, which weakness is fatal, which next experiment is worth running &mdash; still sits with the researcher. For now.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            Limitations worth being honest about
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The accepted Sakana paper landed at a workshop, not the main conference. Workshop acceptance rates are higher and rubrics are more permissive than NeurIPS or ICLR&apos;s main track. The 6.33 average puts it above the workshop&apos;s line; it would not have cleared most main conferences. v2&apos;s output also depends heavily on the underlying language model: better models produce better papers, and degradation cascades. The system isn&apos;t magic; it&apos;s the model with workflow scaffolding.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Two further constraints. First, AI Scientist-v2 was evaluated on machine learning research specifically. The progressive tree search relies on the loop being short enough &mdash; train a small model, evaluate, iterate &mdash; that the agent can run dozens of experiments per task. That&apos;s a property of ML, not science generally. Materials chemistry doesn&apos;t fit this loop. Neither does anything that needs wet labs or human subjects.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            Second, the system can&apos;t evaluate its own novelty against the literature with full reliability. The retrieval step prunes obvious duplicates. It cannot guarantee the &ldquo;new&rdquo; finding isn&apos;t a rediscovery of a well-known result phrased differently. That&apos;s a problem human peer reviewers also have, but the failure mode at scale is worse.
          </p>

          <h2 className="font-orbitron text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3">
            What this is evidence of
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The narrow takeaway: machine learning research has crossed the threshold where part of the pipeline is amenable to autonomous execution. A progressive tree search over experimental designs, run by an LLM-driven agent, can generate workshop-acceptable papers some of the time.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-space-mono">
            The wider takeaway is less about science automation than about how institutions deal with capability that runs ahead of legitimacy. The withdrawal is the interesting move. Twenty years from now, the historical question won&apos;t be whether an AI got a paper accepted at an ICLR workshop in 2026. It will be how the publishing system, the credit system, and the funding system updated to accommodate that fact. v2 is the easy half. The hard half is everything around it.
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
              <a href="https://arxiv.org/abs/2504.08066" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                Yamada et al. &mdash; The AI Scientist-v2: Workshop-Level Automated Scientific Discovery via Agentic Tree Search (arXiv 2504.08066) <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://github.com/SakanaAI/AI-Scientist-v2" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                SakanaAI/AI-Scientist-v2 &mdash; reference implementation on GitHub <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://github.com/SakanaAI/AI-Scientist-ICLR2025-Workshop-Experiment" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                SakanaAI/AI-Scientist-ICLR2025-Workshop-Experiment &mdash; submitted manuscripts <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://research.google/blog/improving-the-academic-workflow-introducing-two-ai-agents-for-better-figures-and-peer-review/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                Google Research &mdash; Two AI agents for academic workflow (figures and peer review) <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://nvidianews.nvidia.com/news/nvidia-expands-open-model-families-to-power-the-next-wave-of-agentic-physical-and-healthcare-ai" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
                NVIDIA &mdash; Expanding open model families for agentic AI (mentions Edison Scientific&apos;s Kosmos) <ExternalLink className="inline h-3 w-3" />
              </a>
            </li>
          </ol>
        </motion.section>
      </article>
    </div>
  )
}
