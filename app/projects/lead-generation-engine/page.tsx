"use client"

import { ArrowLeft, Github, Clock, Calendar, Database, Shield, ArrowRight, Zap, Layers, Workflow, Server, Cpu, AlertCircle, Target, Users, Filter, FileText, Flame, Snowflake, Copy, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import Image from "next/image"

export default function LeadGenerationEnginePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/#projects" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Projects</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="https://github.com/HustleDanie/lead-generation-engine" target="_blank">
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="h-4 w-4" />
                  View Source
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
              Workflow Automation
            </span>
            <span>•</span>
            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
              Lead Gen
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              8 min read
            </span>
          </div>

          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
            Lead Capture → CRM Pipeline: An End-to-End Lead Generation Engine
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            An n8n automation pipeline that processes inbound form submissions through three stages — capture, enrichment, and scored routing — with duplicate-aware short-circuiting that cuts repeat submissions in ~110ms and provider fallbacks that prevent silent enrichment failures.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">
                D
              </div>
              <span>Daniel</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>April 2026</span>
            </div>
          </div>
        </header>

        {/* Hero Image Section */}
        <section className="mb-16">
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <Image
              src="/images/leadgeneration.png"
              alt="Lead Generation Engine n8n Workflow"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            The full n8n pipeline — capture, enrichment with fallback, tiered routing, and a dedicated error workflow
          </p>
        </section>

        {/* Key Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "110ms", label: "Dedup Short-Circuit", icon: Zap },
              { value: "4", label: "Lead Tiers", icon: Layers },
              { value: "3", label: "Data Tables", icon: Database },
              { value: "2", label: "n8n Workflows", icon: Workflow },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center">
                <stat.icon className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                <p className="font-orbitron text-2xl font-bold text-black dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Problem */}
        <section className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </span>
            The Problem
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Most CRM integrations are a pile of brittle IF-nodes duct-taped to paid enrichment APIs. At scale the cracks show fast:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Duplicate form submissions burn the same Clearbit/Apollo credit twice — enrichment APIs aren&apos;t free</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Conditional-logic pipelines fail silently on edge cases; leads vanish with no trace</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Flat routing means a hot enterprise lead gets the same nurture drip as a free-tier signup</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>No structured error capture means failed runs are only found when someone complains</span>
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            The <strong className="text-black dark:text-white">Lead Generation Engine</strong> addresses each of these directly: deduplication gates enrichment, provider fallbacks cover cold misses, a rule-engine scores leads into tiers, and a dedicated error workflow catches every unhandled failure into a <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">failed_leads</span> table.
          </p>
        </section>

        {/* Architecture Section */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Workflow className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </span>
            Three-Stage Pipeline
          </h2>

          {/* Architecture Diagram */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-8 mb-8 border border-gray-200 dark:border-gray-800">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">Capture → Enrichment → Notification</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
              {[
                { icon: FileText, label: "Capture", color: "blue", desc: "Form Trigger" },
                { icon: Filter, label: "Validate", color: "cyan", desc: "Normalize" },
                { icon: Copy, label: "Dedup", color: "amber", desc: "DataTable" },
                { icon: Database, label: "Enrich", color: "green", desc: "Clearbit/Apollo" },
                { icon: Target, label: "Score", color: "purple", desc: "Rule Engine" },
                { icon: Users, label: "Route", color: "pink", desc: "Tier → Team" },
              ].map((step, index, arr) => (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-xl bg-${step.color}-100 dark:bg-${step.color}-900/30 flex items-center justify-center mb-2`}>
                      <step.icon className={`h-6 w-6 text-${step.color}-600 dark:text-${step.color}-400`} />
                    </div>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">{step.label}</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{step.desc}</span>
                  </div>
                  {index < arr.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-gray-400 mx-2 hidden md:block" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Shield className="h-4 w-4" />
                <span>Dedicated error workflow captures unhandled failures into the <span className="font-mono">failed_leads</span> table</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Every stage persists to an n8n <strong className="text-black dark:text-white">Data Table</strong>, so the pipeline is fully observable without depending on an external database. Duplicates short-circuit before any paid API call; survivors flow through enrichment, rule-based scoring, and tier-specific routing (Slack, email, or nurture queue).
          </p>

          {/* Architecture Code Block */}
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">pipeline-flow.txt</span>
              <span className="text-xs text-gray-500">Workflow Architecture</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`Form Trigger
  → Email Validation + Normalization
  → Dedup Gate (parallel rowExists / rowNotExists on lead_contacts)
  → IF duplicate
    → TRUE: Short-circuit (~110ms) → Log duplicate → Exit
    → FALSE: Continue
      → Clearbit Enrichment (primary)
      → IF miss
        → Apollo Enrichment (fallback)
        → IF still miss → Graceful cold-tier tag
      → Merge enriched payload
      → Rule-Engine Scoring → {hot | warm | cold}
      → Insert into lead_contacts
      → Route by tier:
          hot  → Slack alert (#sales-hot)
          warm → Email digest queue
          cold → Nurture sequence
      → Log to lead_activity_log

Error Workflow (separate)
  → Catches any unhandled failure across all stages
  → Writes to lead_failed_leads with context snapshot`}</code>
            </pre>
          </div>
        </section>

        {/* Duplicate Short-Circuit */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <Copy className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </span>
            Duplicate Detection Short-Circuit
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            The common pattern — &quot;look up the email, branch on the result&quot; — ends up either sequential and slow, or tangled in nested IFs. This pipeline uses n8n Data Tables&apos; parallel <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">rowExists</span> / <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">rowNotExists</span> primitives to fan out cleanly:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🔁</span>
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">Duplicate path (~110ms)</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-mono">rowExists</span> fires → log to activity table → return. No enrichment call, no scoring, no routing. Repeat submissions cost essentially zero.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🆕</span>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">New lead path</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-mono">rowNotExists</span> fires → proceed through enrichment → score → route. Only net-new prospects trigger paid API calls.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-black dark:text-white">Why it matters:</strong> on a form with bot traffic or refresh-happy users, duplicate submissions can be 30–50% of volume. Short-circuiting them before enrichment is the single biggest lever on both cost and throughput.
            </p>
          </div>
        </section>

        {/* Provider Fallback */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <Layers className="h-4 w-4 text-green-600 dark:text-green-400" />
            </span>
            Provider Fallback Chain
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Single-provider enrichment is fragile — one API outage or coverage gap drops leads into the void. The pipeline chains three layers so no lead is lost, even when every provider misses:
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                layer: "Primary",
                title: "Clearbit Lookup",
                desc: "Best-in-class coverage for enterprise domains. First call for every net-new lead.",
                icon: Database,
                color: "blue",
              },
              {
                layer: "Fallback",
                title: "Apollo Lookup",
                desc: "Triggered only when Clearbit returns a miss. Higher coverage on SMB and international domains.",
                icon: RefreshCw,
                color: "purple",
              },
              {
                layer: "Graceful Miss",
                title: "Cold-Tier Tag",
                desc: "Both providers missed → lead is tagged cold and routed into the nurture queue instead of being dropped.",
                icon: Snowflake,
                color: "cyan",
              },
            ].map((entry) => (
              <div key={entry.layer} className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className={`w-12 h-12 rounded-xl bg-${entry.color}-100 dark:bg-${entry.color}-900/50 flex items-center justify-center flex-shrink-0`}>
                  <entry.icon className={`h-6 w-6 text-${entry.color}-600 dark:text-${entry.color}-400`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400">{entry.layer}</span>
                    <h3 className="font-orbitron text-base font-bold text-black dark:text-white">{entry.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{entry.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Four-Tier Classification */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
              <Target className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            </span>
            Four-Tier Lead Classification
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            After enrichment, a rule engine scores each lead on signals like company size, title seniority, industry fit, and intent markers. The score maps to one of four tiers — each tier gets its own downstream treatment:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { tier: "Hot", score: "90+", route: "Slack #sales-hot (immediate)", icon: Flame, iconBg: "bg-red-100 dark:bg-red-900/50", iconFg: "text-red-600 dark:text-red-400", desc: "Enterprise title + ICP industry + intent signal. Routed instantly to sales for same-day outreach." },
              { tier: "Warm", score: "55–89", route: "Email digest queue", icon: Zap, iconBg: "bg-orange-100 dark:bg-orange-900/50", iconFg: "text-orange-600 dark:text-orange-400", desc: "Partial fit. Batched into a daily digest for sales to triage at their own pace." },
              { tier: "Cold", score: "≤10", route: "Nurture sequence", icon: Snowflake, iconBg: "bg-cyan-100 dark:bg-cyan-900/50", iconFg: "text-cyan-600 dark:text-cyan-400", desc: "Poor fit or unenriched. Dropped into a long-horizon email nurture — no manual attention required." },
              { tier: "Duplicate", score: "—", route: "Short-circuit log only", icon: Copy, iconBg: "bg-gray-100 dark:bg-gray-800", iconFg: "text-gray-600 dark:text-gray-400", desc: "Already seen. Activity logged, no enrichment, no routing, no notification spam." },
            ].map((t) => (
              <div key={t.tier} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg ${t.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <t.icon className={`h-5 w-5 ${t.iconFg}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-orbitron text-base font-bold text-black dark:text-white">{t.tier}</h3>
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{t.score}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t.route}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Error Workflow */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
              <Shield className="h-4 w-4 text-red-600 dark:text-red-400" />
            </span>
            Dedicated Error Workflow
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            The main pipeline is only half the story. A <strong className="text-black dark:text-white">separate error workflow</strong> is wired as the error trigger for the primary workflow — any unhandled exception (API timeout, malformed payload, rate limit) gets a structured capture instead of disappearing into n8n&apos;s execution log.
          </p>

          <div className="p-6 rounded-xl border-2 border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-900/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-orbitron text-lg font-bold text-red-800 dark:text-red-300 mb-2">
                  <span className="font-mono">lead_failed_leads</span> Table
                </h3>
                <ul className="space-y-1 text-sm text-red-700 dark:text-red-400">
                  <li>• Context snapshot — the raw form payload at the point of failure</li>
                  <li>• Stage marker — which stage broke (validate / dedup / enrich / score / route)</li>
                  <li>• Error message + stack trace for replay</li>
                  <li>• Timestamp for MTTR tracking and on-call review</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
              <Server className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            </span>
            Technology Stack
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "n8n Cloud", desc: "Workflow Engine" },
              { name: "Data Tables", desc: "3-table persistence" },
              { name: "Clearbit", desc: "Primary Enrichment" },
              { name: "Apollo", desc: "Fallback Enrichment" },
              { name: "OpenAI", desc: "Reasoning / Intent" },
              { name: "HubSpot", desc: "CRM Storage" },
              { name: "Slack", desc: "Hot Alerts" },
              { name: "Gmail", desc: "Warm Digest" },
            ].map((tech) => (
              <div key={tech.name} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center">
                <p className="font-medium text-black dark:text-white text-sm">{tech.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Setup */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <Cpu className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </span>
            60-Second Mock-Mode Setup
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Every external integration (Clearbit, Apollo, OpenAI, HubSpot, Slack, Gmail) ships as a mock Code node with a one-line swap path documented in <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">docs/</span>. You can demo the full pipeline with zero credentials:
          </p>

          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">Setup Steps</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`# 1. In n8n, create 3 Data Tables:
#    - lead_contacts
#    - lead_activity_log
#    - lead_failed_leads

# 2. Import both workflow JSONs from workflows/
#    - main-pipeline.json
#    - error-workflow.json

# 3. Remap Data Table IDs inside each workflow
#    (n8n assigns new IDs on import)

# 4. Set the error-workflow as the Error Trigger
#    on the main pipeline

# 5. Activate both workflows

# Test it:
#   Submit hot@stripe.com (title: CTO) → hot-tier Slack alert
#   Resubmit the same email   → duplicate short-circuit (~110ms)`}</code>
            </pre>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-black dark:text-white">Validation:</strong> both workflows pass n8n&apos;s <span className="font-mono">profile: runtime</span> validator with zero errors. Execution exports for all four tier outcomes (hot / warm / cold / duplicate) are checked into <span className="font-mono">evidence/</span>.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-gray-200 dark:border-gray-800 text-center">
          <h3 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-4">
            Clone, Import, Activate
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            The full pipeline ships with mock-mode Code nodes, execution evidence, and a swap guide for every real provider. Pull the repo and you&apos;re one n8n import away from a production-shaped lead generation engine.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://github.com/HustleDanie/lead-generation-engine" target="_blank">
              <Button size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
            <Link href="https://github.com/HustleDanie/lead-generation-engine/tree/main/workflows" target="_blank">
              <Button variant="outline" size="lg" className="gap-2">
                <FileText className="h-5 w-5" />
                View Workflows
              </Button>
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
