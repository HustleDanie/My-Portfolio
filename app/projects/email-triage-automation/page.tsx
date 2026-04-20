"use client"

import { ArrowLeft, Github, Clock, Calendar, Database, Shield, ArrowRight, Zap, Layers, Workflow, Server, Cpu, AlertCircle, Filter, FileText, Mail, Inbox, MessageSquare, Brain, GitBranch, Bell, CheckCircle2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import Image from "next/image"

export default function EmailTriageAutomationPage() {
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
              <Link href="https://github.com/HustleDanie/Email-Triage-Automation" target="_blank">
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
              AI-Powered
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              8 min read
            </span>
          </div>

          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
            Email Triage Automation: From Shared Inbox to Routed Tickets
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            A production-grade n8n workflow that transforms a cluttered shared inbox into a classified, routed ticketing pipeline — with RFC-3834 loop prevention, atomic deduplication, GPT-4o-mini classification, confidence-gated auto-replies, and per-branch failure isolation.
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
              src="/images/emailparsing.png"
              alt="Email Triage Automation n8n Workflow"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            The full n8n canvas — 19 nodes covering ingestion, loop-prevention guards, AI classification, tier routing, and audit logging
          </p>
        </section>

        {/* Key Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "19", label: "Workflow Nodes", icon: Workflow },
              { value: "5", label: "Loop-Prevention Checks", icon: Shield },
              { value: "4", label: "Routing Branches", icon: GitBranch },
              { value: "0.7", label: "Confidence Gate", icon: Brain },
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
            Most &quot;auto-reply bots&quot; look simple on paper and fail the moment they touch real traffic. At scale they compound:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Auto-reply loops with vacation responders and other bots — every round-trip hurts domain reputation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Trigger re-fires create duplicate tickets; sales teams get 3 Slack pings for the same lead</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Silent miscategorization — a low-confidence &quot;support&quot; guess ships to Zendesk with no human eyes on it</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>One failing integration (Slack outage, HubSpot rate-limit) cascades and blocks the entire pipeline</span>
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            <strong className="text-black dark:text-white">Email Triage Automation</strong> addresses each of these directly with RFC-3834 loop detection, messageId-atomic dedup, a confidence threshold that routes uncertain emails to human review, and per-branch resilience so one integration failure doesn&apos;t take down the rest.
          </p>
        </section>

        {/* Architecture Section */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Workflow className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </span>
            Four-Stage Pipeline
          </h2>

          {/* Architecture Diagram */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-8 mb-8 border border-gray-200 dark:border-gray-800">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">Ingest → Classify → Route → Log</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
              {[
                { icon: Inbox, label: "Ingest", color: "blue", desc: "Gmail Trigger" },
                { icon: Shield, label: "Guard", color: "cyan", desc: "RFC-3834" },
                { icon: Filter, label: "Dedup", color: "amber", desc: "messageId" },
                { icon: Brain, label: "Classify", color: "purple", desc: "GPT-4o-mini" },
                { icon: GitBranch, label: "Route", color: "green", desc: "Switch 4-way" },
                { icon: Mail, label: "Reply", color: "pink", desc: "Gmail Thread" },
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
                <FileText className="h-4 w-4" />
                <span>Every email audited to the <span className="font-mono">email_log</span> Data Table with sender, category, confidence, and routing destination</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            The pipeline is ordered so that <strong className="text-black dark:text-white">cheap guards run before expensive ones</strong>: RFC-3834 header checks and dedup lookups (free) fire before any OpenAI call (paid), and branch routing happens before auto-reply so a classification failure can&apos;t trigger a wrong-mailbox response.
          </p>

          {/* Architecture Code Block */}
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">pipeline-flow.txt</span>
              <span className="text-xs text-gray-500">Workflow Architecture</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`Gmail Trigger
  → Extract Headers + 5-Check Anti-Loop Guard (Code)
      Auto-Submitted • Precedence • Daemon • Self-Loop • Unsubscribe
  → Dedup Gate (messageId vs email_log Data Table)
  → IF already processed → Exit
  → LangChain Agent (GPT-4o-mini) with Structured Output Parser
  → Normalize & Decide (compute confidence + route_index)
  → Switch (4-way)
      ├── Support  → Zendesk Create Ticket → Slack #support
      ├── Sales    → HubSpot Upsert Contact → Slack #sales
      ├── Billing  → Forward to Finance → Slack #billing
      └── Low-Conf → Gmail Quarantine Label → Slack #email-review
  → Write audit row to email_log Data Table
  → IF confidence ≥ 0.7 AND no loop signals
      → Gmail Reply (preserves threadId)`}</code>
            </pre>
          </div>
        </section>

        {/* Loop Prevention Checks */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
              <Shield className="h-4 w-4 text-red-600 dark:text-red-400" />
            </span>
            RFC-3834 Loop Prevention
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            An auto-responder that replies to another auto-responder is how you get blacklisted. Five sequential header checks run before classification even starts — any one of them kills the reply path while still allowing classification and routing:
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                check: "Check 1",
                title: "Auto-Submitted Header",
                desc: "RFC-3834 explicit signal — any non-\"no\" value marks the message as machine-generated.",
                icon: Shield,
                color: "blue",
              },
              {
                check: "Check 2",
                title: "Precedence Flag",
                desc: "Legacy mailing-list header — bulk, list, and junk precedence levels indicate automated traffic.",
                icon: Filter,
                color: "green",
              },
              {
                check: "Check 3",
                title: "Daemon Detection",
                desc: "From-address patterns (mailer-daemon, postmaster, noreply) — bounce and system messages.",
                icon: AlertCircle,
                color: "amber",
              },
              {
                check: "Check 4",
                title: "Self-Loop Detection",
                desc: "Rejects any email from the bot's own address — the most common auto-reply loop cause.",
                icon: Users,
                color: "purple",
              },
              {
                check: "Check 5",
                title: "Unsubscribe Presence",
                desc: "List-Unsubscribe header indicates marketing/bulk email that should never receive a reply.",
                icon: Bell,
                color: "cyan",
              },
            ].map((entry) => (
              <div key={entry.check} className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className={`w-12 h-12 rounded-xl bg-${entry.color}-100 dark:bg-${entry.color}-900/50 flex items-center justify-center flex-shrink-0`}>
                  <entry.icon className={`h-6 w-6 text-${entry.color}-600 dark:text-${entry.color}-400`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400">{entry.check}</span>
                    <h3 className="font-orbitron text-base font-bold text-black dark:text-white">{entry.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{entry.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-black dark:text-white">Validation ritual:</strong> before going live, send a test email, verify a single reply, trigger a vacation responder on that reply, and confirm the bot does not respond twice. Re-trigger the same messageId to prove dedup fires.
            </p>
          </div>
        </section>

        {/* Four-Way Routing */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <GitBranch className="h-4 w-4 text-green-600 dark:text-green-400" />
            </span>
            Four-Way Routing
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            The classifier returns a category and a confidence score. A Normalize &amp; Decide Code node compares the score against the <span className="font-mono">CONFIDENCE_THRESHOLD</span> (default 0.7) — under threshold, the email is forced into the human-review branch regardless of predicted category:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { tier: "Support", dest: "Zendesk Create Ticket → Slack #support", icon: MessageSquare, iconBg: "bg-blue-100 dark:bg-blue-900/50", iconFg: "text-blue-600 dark:text-blue-400", desc: "Tickets are created with full email body + thread metadata. Slack notification links back to the Zendesk ticket for instant context." },
              { tier: "Sales", dest: "HubSpot Upsert Contact → Slack #sales", icon: Users, iconBg: "bg-purple-100 dark:bg-purple-900/50", iconFg: "text-purple-600 dark:text-purple-400", desc: "Contact is upserted (create-or-update) against email as the key — idempotent, so resends don't duplicate CRM records." },
              { tier: "Billing", dest: "Forward to Finance → Slack #billing", icon: Mail, iconBg: "bg-amber-100 dark:bg-amber-900/50", iconFg: "text-amber-600 dark:text-amber-400", desc: "Forwarded to a finance alias with the original thread intact; Slack ping ensures billing is aware of incoming disputes or invoices." },
              { tier: "Low-Confidence", dest: "Quarantine Label → Slack #email-review", icon: AlertCircle, iconBg: "bg-red-100 dark:bg-red-900/50", iconFg: "text-red-600 dark:text-red-400", desc: "Anything under the confidence threshold is labeled in Gmail and flagged for human review. No automated reply, no misrouted ticket." },
            ].map((r) => (
              <div key={r.tier} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg ${r.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <r.icon className={`h-5 w-5 ${r.iconFg}`} />
                  </div>
                  <div>
                    <h3 className="font-orbitron text-base font-bold text-black dark:text-white">{r.tier}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-mono">{r.dest}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-black dark:text-white">Per-branch resilience:</strong> each branch runs independently — a Slack outage or HubSpot rate-limit on one route does not cascade into others. Every branch writes its own audit row even on partial failure.
            </p>
          </div>
        </section>

        {/* Auto-Reply Gate */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </span>
            Thread-Aware Auto-Reply
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Two conditions must both hold before an auto-reply is sent: <strong className="text-black dark:text-white">(1) confidence ≥ 0.7</strong> and <strong className="text-black dark:text-white">(2) none of the five loop-prevention signals tripped</strong>. The reply uses Gmail&apos;s Reply method (not plain Send) so the <span className="font-mono">threadId</span> is preserved — the recipient sees a normal conversation, not an orphan message.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">✅</span>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Auto-reply sent</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Confidence ≥ 0.7 + zero loop signals → contextual reply on the same thread. Audit row marks <span className="font-mono">replied: true</span>.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🛑</span>
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">Reply suppressed</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Low confidence or any loop signal → no reply. Email is still classified, routed, and logged — just no outbound message.
              </p>
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
              { name: "GPT-4o-mini", desc: "Classifier" },
              { name: "LangChain Agent", desc: "Structured Output" },
              { name: "Gmail API", desc: "Trigger + Reply" },
              { name: "HubSpot", desc: "CRM Upsert" },
              { name: "Zendesk", desc: "Ticket Creation" },
              { name: "Slack", desc: "Team Notifications" },
              { name: "Data Tables", desc: "Dedup + Audit" },
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
            Quick Setup
          </h2>

          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">Setup Steps</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`# 1. Import workflows/email-triage.json into n8n

# 2. Create email_log Data Table with 9 columns:
#    messageId | threadId | fromAddress | subject |
#    category  | confidence | routed_to | replied | timestamp

# 3. Wire OAuth2 credentials:
#    - Gmail (bot mailbox)
#    - OpenAI
#    - HubSpot
#    - Zendesk
#    - Slack

# 4. Replace placeholders in nodes:
#    - Bot mailbox address (self-loop check)
#    - Finance email alias (billing branch)
#    - Slack channel names (#support, #sales, #billing, #email-review)

# 5. Tune CONFIDENCE_THRESHOLD in "Normalize & Decide"
#    Lower  → more auto-replies (higher risk of misroute)
#    Higher → more human review  (safer, more queue)

# 6. Pre-prod validation:
#    Send test email → verify single reply
#    Trigger vacation responder → confirm bot does NOT reply twice
#    Re-trigger same messageId → confirm dedup fires`}</code>
            </pre>
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-gray-200 dark:border-gray-800 text-center">
          <h3 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-4">
            Deploy Your Own Triage Pipeline
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            Clone the repo, import the workflow, wire the five OAuth credentials, and run the loop-prevention test before flipping it live. The full audit trail and per-branch resilience means you can trust it with a real shared inbox.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://github.com/HustleDanie/Email-Triage-Automation" target="_blank">
              <Button size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
            <Link href="https://github.com/HustleDanie/Email-Triage-Automation/tree/main/workflows" target="_blank">
              <Button variant="outline" size="lg" className="gap-2">
                <FileText className="h-5 w-5" />
                View Workflow
              </Button>
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
