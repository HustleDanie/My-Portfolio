"use client"

import { ArrowLeft, Github, Clock, Calendar, Bot, Database, Brain, Shield, BarChart3, FileText, Cpu, Server, CheckCircle2, ArrowRight, Zap, Code, Layers, Activity, Bell, Globe, Filter, Search, MessageSquare, Workflow, RefreshCw, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import Image from "next/image"

export default function LinkedInAIJobAlertPage() {
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
              <Link href="https://github.com/HustleDanie/LinkedIn-AI-Job-Alert-Pipeline" target="_blank">
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
              10 min read
            </span>
          </div>
          
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
            LinkedIn AI Job Alert Pipeline: Automated Job Intelligence System
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            An end-to-end automated n8n workflow that scrapes LinkedIn for remote AI/ML internships across 6 countries every 12 minutes, deduplicates results, scores them with GPT-4o-mini, and sends qualifying job alerts straight to Telegram.
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
              src="/images/linkedin-job-alert.png"
              alt="LinkedIn AI Job Alert Pipeline Workflow"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            The complete n8n workflow — 17 nodes orchestrating scraping, filtering, AI scoring, and alerting
          </p>
        </section>

        {/* Key Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "17", label: "Workflow Nodes", icon: Workflow },
              { value: "6", label: "Countries Tracked", icon: Globe },
              { value: "18", label: "Search Combos", icon: Search },
              { value: "12min", label: "Scan Interval", icon: Timer },
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
              <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </span>
            The Problem
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Finding remote AI/ML internships as a recent graduate is a full-time job in itself. The challenges compound when you're targeting roles across multiple countries:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Manually searching LinkedIn across 6 different country filters multiple times daily</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Missing time-sensitive postings that get flooded with 200+ applicants within hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Wasting time reviewing irrelevant roles that don't match your skill profile</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>No way to score job relevance objectively against your specific background</span>
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            <strong className="text-black dark:text-white">LinkedIn AI Job Alert Pipeline</strong> solves this by automating the entire discovery, evaluation, and notification loop — running autonomously every 12 minutes to catch low-visibility postings before competition spikes.
          </p>
        </section>

        {/* Architecture Section */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Workflow className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </span>
            Pipeline Architecture
          </h2>
          
          {/* Architecture Diagram */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-8 mb-8 border border-gray-200 dark:border-gray-800">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">End-to-End Workflow Pipeline</p>
            </div>
            
            {/* Pipeline Visualization */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
              {[
                { icon: Timer, label: "Schedule", color: "blue", desc: "Every 12min" },
                { icon: Code, label: "Generate", color: "cyan", desc: "18 Combos" },
                { icon: Globe, label: "Scrape", color: "green", desc: "Apify" },
                { icon: Filter, label: "Filter", color: "orange", desc: "4-Layer" },
                { icon: Brain, label: "AI Score", color: "purple", desc: "GPT-4o-mini" },
                { icon: MessageSquare, label: "Alert", color: "pink", desc: "Telegram" },
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

            {/* Dedup Loop Indicator */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <RefreshCw className="h-4 w-4" />
                <span>Google Sheets deduplication — prevents duplicate alerts across runs</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            The pipeline follows a <strong className="text-black dark:text-white">generate → scrape → filter → score → alert</strong> pattern. Each run generates 18 search combinations (3 keywords × 6 countries), scrapes LinkedIn via Apify with country-specific residential proxies, applies 4-layer post-scrape filtering, then scores qualifying jobs with GPT-4o-mini before sending rich Telegram alerts.
          </p>

          {/* Architecture Code Block */}
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">pipeline-flow.txt</span>
              <span className="text-xs text-gray-500">Workflow Architecture</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`Schedule Trigger (every 12 min)
  → Generate 18 search combos (3 keywords × 6 countries)
  → Apify LinkedIn Jobs Scraper (per-country geoId + residential proxies)
  → Fetch Dataset Items
  → Flatten, Normalize & Filter (AI-related + remote + internship + <24hrs)
  → Read Dedup Sheet (Google Sheets)
  → Filter out already-seen jobs
  → IF has new jobs
    → AI Job Scorer (GPT-4o-mini, structured output)
    → Parse Score Result
    → IF score >= 6
      → TRUE: Log to Google Sheets → Format Message → Send Telegram Alert
      → FALSE: Log to Google Sheets (dedup only)`}</code>
            </pre>
          </div>
        </section>

        {/* 4-Layer Filtering */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
              <Filter className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </span>
            4-Layer Post-Scrape Filtering
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Raw LinkedIn scrape results contain significant noise. The pipeline applies four progressive filters to extract only highly relevant opportunities:
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                layer: "Layer 1",
                title: "AI/ML Relevance",
                desc: "Keyword match on title and description for AI, ML, automation, and related terms",
                icon: Brain,
                color: "blue",
              },
              {
                layer: "Layer 2",
                title: "Recency Check",
                desc: "Job must be posted within the last 24 hours to catch low-visibility postings early",
                icon: Timer,
                color: "green",
              },
              {
                layer: "Layer 3",
                title: "Level Filter",
                desc: "Must be internship or entry-level positions only — filters out senior roles",
                icon: Layers,
                color: "purple",
              },
              {
                layer: "Layer 4",
                title: "Remote Verification",
                desc: "Confirms the role is truly remote, not hybrid or on-site mislabeled positions",
                icon: Globe,
                color: "cyan",
              },
            ].map((filter) => (
              <div key={filter.layer} className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className={`w-12 h-12 rounded-xl bg-${filter.color}-100 dark:bg-${filter.color}-900/50 flex items-center justify-center flex-shrink-0`}>
                  <filter.icon className={`h-6 w-6 text-${filter.color}-600 dark:text-${filter.color}-400`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400">{filter.layer}</span>
                    <h3 className="font-orbitron text-base font-bold text-black dark:text-white">{filter.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{filter.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-black dark:text-white">Additional Filter:</strong> Company size is restricted to small companies and startups only (1–200 employees), focusing on environments where interns have higher impact and learning potential.
            </p>
          </div>
        </section>

        {/* AI Scoring System */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Brain className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </span>
            AI Job Scoring Engine
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Jobs that pass all four filters are sent to <strong className="text-black dark:text-white">GPT-4o-mini</strong> for intelligent relevance scoring. The AI evaluates each job against a specific candidate profile and returns structured JSON output:
          </p>

          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">scoring-output.json</span>
              <span className="text-xs text-gray-500">Structured AI Response</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`{
  "relevance_score": 8,
  "categories": ["AI/ML", "Remote", "Internship"],
  "reason": "Strong match: Role requires Python and ML fundamentals 
    for building automation pipelines. Remote internship at a 
    startup aligns with candidate's preference for high-impact 
    environments. Mentions Hugging Face and LangChain which 
    match candidate's skill set."
}`}</code>
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">✅</span>
                <div>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">Score ≥ 6 → Alert</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Logged to Google Sheets, formatted into a rich message, and sent as a Telegram notification with job details, score, reasoning, and apply link.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📝</span>
                <div>
                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{"Score < 6 → Log Only"}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Logged to the deduplication sheet to prevent re-processing, but no Telegram alert is sent. Keeps the signal-to-noise ratio high.
              </p>
            </div>
          </div>

          {/* Target Profile */}
          <div className="p-6 rounded-xl border-2 border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-900/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-orbitron text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">
                  Target Candidate Profile
                </h3>
                <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
                  <li>• Recent BSc Computer Science graduate</li>
                  <li>• Seeking remote internships in AI automation, agentic AI, AI/ML engineering</li>
                  <li>• Skills: Python, JavaScript, AI/ML fundamentals, API integration, workflow automation</li>
                  <li>• Target countries: UK, USA, Canada, Nigeria, South Africa, Ghana</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Nodes */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
              <Cpu className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </span>
            Workflow Nodes (17 Total)
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-orbitron text-xs text-gray-500 dark:text-gray-400">#</th>
                  <th className="text-left py-3 px-4 font-orbitron text-xs text-gray-500 dark:text-gray-400">Node Name</th>
                  <th className="text-left py-3 px-4 font-orbitron text-xs text-gray-500 dark:text-gray-400">Type</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400 font-space-mono">
                {[
                  { num: 1, name: "Schedule Every 12min", type: "Schedule Trigger" },
                  { num: 2, name: "Generate Search Combos", type: "Code" },
                  { num: 3, name: "Run Apify LinkedIn Scraper", type: "HTTP Request" },
                  { num: 4, name: "Fetch Dataset Items", type: "HTTP Request" },
                  { num: 5, name: "Flatten and Normalize Jobs", type: "Code" },
                  { num: 6, name: "Read Dedup Sheet", type: "Google Sheets" },
                  { num: 7, name: "Filter New Jobs", type: "Code" },
                  { num: 8, name: "Has New Jobs?", type: "IF" },
                  { num: 9, name: "AI Job Scorer", type: "AI Agent" },
                  { num: 10, name: "OpenAI Chat Model", type: "LM Chat OpenAI" },
                  { num: 11, name: "Structured Output Parser", type: "Output Parser" },
                  { num: 12, name: "Parse Score Result", type: "Code" },
                  { num: 13, name: "Score ≥ 6?", type: "IF" },
                  { num: 14, name: "Log Scored Job", type: "Google Sheets" },
                  { num: 15, name: "Format Telegram Message", type: "Code" },
                  { num: 16, name: "Send Telegram Alert", type: "Telegram" },
                  { num: 17, name: "Log Rejected to Dedup", type: "Google Sheets" },
                ].map((node) => (
                  <tr key={node.num} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-2.5 px-4 text-gray-400">{node.num}</td>
                    <td className="py-2.5 px-4 text-black dark:text-white font-medium">{node.name}</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {node.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Country Coverage */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
            </span>
            Global Coverage & Search Strategy
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {[
              { country: "🇬🇧 United Kingdom", flag: "UK" },
              { country: "🇺🇸 United States", flag: "USA" },
              { country: "🇨🇦 Canada", flag: "CA" },
              { country: "🇳🇬 Nigeria", flag: "NG" },
              { country: "🇿🇦 South Africa", flag: "ZA" },
              { country: "🇬🇭 Ghana", flag: "GH" },
            ].map((item) => (
              <div key={item.flag} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center">
                <p className="font-medium text-black dark:text-white text-sm">{item.country}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">LinkedIn geoId + residential proxy</p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-lg text-black dark:text-white mb-4">Search Keywords</h3>
          <div className="grid md:grid-cols-3 gap-3 mb-6">
            {[
              "AI automation intern",
              "machine learning intern remote",
              "AI engineer intern remote",
            ].map((keyword) => (
              <div key={keyword} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <Search className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="font-mono text-xs">{keyword}</span>
              </div>
            ))}
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Each run generates <strong className="text-black dark:text-white">3 keywords × 6 countries = 18 unique search combinations</strong>, each using country-specific LinkedIn geoIds and residential proxies for authentic geo-targeted results. Results are sorted newest-first to prioritize catching low-visibility postings before competition spikes.
          </p>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </span>
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Multi-Country Scraping",
                desc: "Targets 6 countries with LinkedIn geoId targeting and country-specific residential proxies via Apify",
                icon: Globe,
              },
              {
                title: "AI-Powered Scoring",
                desc: "GPT-4o-mini evaluates each job 1–10 against candidate profile with structured JSON reasoning",
                icon: Brain,
              },
              {
                title: "Smart Deduplication",
                desc: "Google Sheets-based tracking prevents duplicate alerts across runs and keeps history",
                icon: Database,
              },
              {
                title: "Rich Telegram Alerts",
                desc: "Formatted notifications with score, job details, AI reasoning, and direct apply links",
                icon: Bell,
              },
              {
                title: "4-Layer Filtering",
                desc: "Progressive filtering: AI relevance → recency → level → remote verification",
                icon: Filter,
              },
              {
                title: "Startup Focus",
                desc: "Company size filter (1–200 employees) targets high-impact startup environments",
                icon: Activity,
              },
            ].map((feature) => (
              <div key={feature.title} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
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
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "n8n Cloud", desc: "Workflow Engine" },
              { name: "Apify", desc: "LinkedIn Scraping" },
              { name: "GPT-4o-mini", desc: "AI Scoring" },
              { name: "Google Sheets", desc: "Dedup & Logging" },
              { name: "Telegram API", desc: "Notifications" },
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
              <code className="text-gray-300">{`# 1. Import workflow.json into your n8n instance

# 2. Configure credentials:
#    - Apify API Token (HTTP Query Auth)
#    - OpenAI API Key
#    - Google Sheets OAuth2
#    - Telegram Bot Token

# 3. Create a Google Sheet with "JobLog" tab and headers:
#    job_id | title | company | location | url | source |
#    relevance_score | categories | reason | found_at | sent_to_telegram

# 4. Set your Telegram chat ID in the Send Telegram Alert node

# 5. Activate the workflow — it will run every 12 minutes`}</code>
            </pre>
          </div>
        </section>

        {/* Results / Evidence */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-green-600 dark:text-green-400" />
            </span>
            Results in Action
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-black dark:text-white text-sm">n8n Workflow</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">17-node automation pipeline</p>
              </div>
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
                <Image
                  src="/images/linkedin-job-alert.png"
                  alt="n8n Workflow Screenshot"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-black dark:text-white text-sm">Telegram Alert</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Real alert with AI scoring</p>
              </div>
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
                <Image
                  src="/images/linkedin-telegram-alert.jpg"
                  alt="Telegram Alert Screenshot"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-gray-200 dark:border-gray-800 text-center">
          <h3 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-4">
            Build Your Own AI Job Alert Pipeline
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            Clone the repo, import the workflow into n8n, and start receiving AI-scored job alerts in minutes. Customize the search keywords, countries, and scoring criteria to match your profile.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://github.com/HustleDanie/LinkedIn-AI-Job-Alert-Pipeline" target="_blank">
              <Button size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
            <Link href="https://github.com/HustleDanie/LinkedIn-AI-Job-Alert-Pipeline/tree/main/Jobs" target="_blank">
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
