"use client"

import { ArrowLeft, Github, Clock, Calendar, Shield, Zap, Workflow, Server, Cpu, Package, Terminal, Rocket, Blocks, Bot, FileText, CheckCircle2, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import Image from "next/image"

export default function N8nClaudeKitPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/#projects" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Projects</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="https://github.com/HustleDanie/n8n-claude-kit" target="_blank">
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="h-4 w-4" />
                  View Source
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-full text-xs font-medium">
              Workflow Automation
            </span>
            <span>•</span>
            <span className="px-2 py-1 bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 rounded-full text-xs font-medium">
              Developer Tooling
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              6 min read
            </span>
          </div>

          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
            n8n Claude Kit: Zero-to-Workflow Scaffolding for Claude Code
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            A Claude Code plugin that bootstraps a ready-to-build n8n project in under 90 seconds — 7 bundled n8n skills, 3 orchestrator subagents, and a single <span className="font-mono">/n8n-init</span> slash command that wires credentials, writes CLAUDE.md, and drops you into plan mode.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
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

        <section className="mb-16">
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <Image
              src="/images/n8nclaudekit.png"
              alt="n8n Claude Kit"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            One-time global install, per-project credentials — `cd` into a new folder, `/n8n-init`, ship.
          </p>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "7", label: "Bundled Skills", icon: Blocks },
              { value: "3", label: "Subagents", icon: Bot },
              { value: "90s", label: "Time-to-Build", icon: Zap },
              { value: "1", label: "Slash Command", icon: Terminal },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center">
                <stat.icon className="h-5 w-5 mx-auto mb-2 text-pink-500" />
                <p className="font-orbitron text-2xl font-bold text-black dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
              <Rocket className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            </span>
            The Problem
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Building n8n workflows with an AI coding agent should be fast — but every new project starts with the same friction:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Hand-writing a <span className="font-mono">CLAUDE.md</span> that explains n8n&apos;s build loop to the agent every time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Manually wiring <span className="font-mono">.mcp.json</span> for n8n-mcp with the right credentials per instance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Re-teaching Claude the node-type gotchas (<span className="font-mono">nodes-base.slack</span> vs <span className="font-mono">n8n-nodes-base.slack</span>) in every project</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Global credentials leak across clients / personal / staging / prod</span>
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            <strong className="text-black dark:text-white">n8n-claude-kit</strong> solves this with a one-time plugin install and a per-project <span className="font-mono">/n8n-init</span> command that writes the whole scaffold from a 3-question prompt.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
              <Package className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </span>
            What&apos;s in the Box
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-3">
                <Blocks className="h-5 w-5 text-pink-500" />
                <h3 className="font-orbitron text-base font-bold text-black dark:text-white">7 Bundled n8n Skills</h3>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 font-mono">
                <li>n8n-mcp-tools-expert</li>
                <li>n8n-workflow-patterns</li>
                <li>n8n-node-configuration</li>
                <li>n8n-validation-expert</li>
                <li>n8n-expression-syntax</li>
                <li>n8n-code-javascript</li>
                <li>n8n-code-python</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-3">
                <Bot className="h-5 w-5 text-violet-500" />
                <h3 className="font-orbitron text-base font-bold text-black dark:text-white">3 Custom Subagents</h3>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li><span className="font-mono text-violet-600 dark:text-violet-400">n8n-workflow-builder</span> — orchestrates discover → validate → create → activate</li>
                <li><span className="font-mono text-violet-600 dark:text-violet-400">n8n-workflow-validator</span> — runs validation profiles, interprets errors</li>
                <li><span className="font-mono text-violet-600 dark:text-violet-400">n8n-workflow-deployer</span> — partial updates, activation, execution diagnosis</li>
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3 mb-3">
              <Terminal className="h-5 w-5 text-emerald-500" />
              <h3 className="font-orbitron text-base font-bold text-black dark:text-white">
                <span className="font-mono">/n8n-init</span> Slash Command
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Prompts for project description, n8n instance URL, and API key — then writes <span className="font-mono">CLAUDE.md</span>, <span className="font-mono">.mcp.json</span>, <span className="font-mono">.claude/settings.json</span>, and <span className="font-mono">.gitignore</span>, and drops you into plan mode ready to describe the workflow you want to build.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </span>
            Install &amp; Use
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">Install once, per machine:</p>

          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">one-time install</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`/plugin marketplace add HustleDanie/n8n-claude-kit
/plugin install n8n-claude-kit`}</code>
            </pre>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">Use in any new project folder:</p>

          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">per project</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`mkdir my-workflow && cd my-workflow
claude

# inside Claude Code:
/n8n-init`}</code>
            </pre>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            <strong className="text-black dark:text-white">Target:</strong> active workflow in n8n within 3 minutes of <span className="font-mono">cd</span>.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </span>
            Per-Project Credentials, By Design
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Many users run multiple n8n instances — personal cloud, client self-hosted, staging, prod. The kit deliberately asks for credentials per project instead of storing them globally:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: "No cross-project leakage", desc: "Client A's API key never surfaces in client B's workflow." },
              { icon: FileText, title: "Secrets out of global store", desc: "Credentials live in the project's .mcp.json, gitignored by default." },
              { icon: Workflow, title: "Switch by cd", desc: "Different folder = different n8n instance. No reconfiguration." },
            ].map((entry) => (
              <div key={entry.title} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <entry.icon className="h-5 w-5 text-blue-500 mb-2" />
                <h3 className="font-orbitron text-sm font-bold text-black dark:text-white mb-1">{entry.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{entry.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <Wrench className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </span>
            Subagent Playbook
          </h2>

          <div className="space-y-3">
            {[
              {
                name: "n8n-workflow-builder",
                trigger: "\"build me a workflow that...\"",
                desc: "Runs the full discover → schema → validate → create → activate loop. Picks correct nodes, wires them, validates against n8n-mcp, and only ships a workflow that passes.",
              },
              {
                name: "n8n-workflow-validator",
                trigger: "\"validate this workflow\" / \"why does this fail\"",
                desc: "Runs validation profiles against live or JSON-form workflows. Translates opaque validation errors into actionable fixes — operator structures, missing credentials, wrong expression syntax.",
              },
              {
                name: "n8n-workflow-deployer",
                trigger: "\"update this workflow\" / \"activate X\" / \"why did this run fail\"",
                desc: "Handles partial-update patching, activation toggles, and execution diagnosis from the n8n executions log. Preserves manual edits you made in the n8n UI.",
              },
            ].map((entry) => (
              <div key={entry.name} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="font-mono text-sm font-bold text-violet-600 dark:text-violet-400">{entry.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{entry.trigger}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{entry.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
              <Server className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            </span>
            Technology Stack
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "n8n", desc: "Workflow Engine" },
              { name: "Claude Code", desc: "Agent Host" },
              { name: "MCP", desc: "Tool Protocol" },
              { name: "n8n-mcp", desc: "Node Search + Validate" },
              { name: "Claude Skills", desc: "Bundled Expertise" },
              { name: "Subagents", desc: "Task Orchestration" },
              { name: "Slash Commands", desc: "/n8n-init" },
              { name: "Plan Mode", desc: "Design-Before-Build" },
            ].map((tech) => (
              <div key={tech.name} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center">
                <p className="font-medium text-black dark:text-white text-sm">{tech.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </span>
            What <span className="font-mono">/n8n-init</span> Writes
          </h2>

          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">generated files</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`my-workflow/
├── CLAUDE.md              # build-loop manual, project description injected
├── .mcp.json              # n8n-mcp server wired with your URL + API key
├── .gitignore             # keeps .mcp.json out of git
└── .claude/
    └── settings.json      # default permissions for n8n-mcp tools`}</code>
            </pre>
          </div>
        </section>

        <section className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-violet-50 dark:from-pink-900/20 dark:to-violet-900/20 border border-gray-200 dark:border-gray-800 text-center">
          <h3 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-4">
            Install the Kit
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            One plugin install, then <span className="font-mono">/n8n-init</span> in any folder and you&apos;re building workflows in plan mode within minutes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://github.com/HustleDanie/n8n-claude-kit" target="_blank">
              <Button size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
            <Link href="https://hustledanie.github.io/n8n-claude-kit/" target="_blank">
              <Button variant="outline" size="lg" className="gap-2">
                <Cpu className="h-5 w-5" />
                Docs Site
              </Button>
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
