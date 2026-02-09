"use client"

import { ArrowLeft, Github, Clock, Calendar, TrendingUp, Bot, Database, Brain, Shield, BarChart3, FileText, Cpu, Server, LineChart, CheckCircle2, ArrowRight, RefreshCw, Zap, Code, Layers, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import Image from "next/image"

export default function StockAgentXPage() {
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
              <Link href="https://github.com/HustleDanie/StockAgentX-Multi-Agent-Financial-Intelligence-Platform" target="_blank">
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
            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
              AI/ML Engineering
            </span>
            <span>•</span>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
              FinTech
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              15 min read
            </span>
          </div>
          
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
            StockAgentX: Multi-Agent Financial Intelligence Platform
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            An end-to-end AI-powered financial analysis platform leveraging multi-agent orchestration, retrieval-augmented generation (RAG), and deep learning for real-time stock market intelligence with SEC filings integration.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                D
              </div>
              <span>Daniel</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>February 2026</span>
            </div>
          </div>
        </header>

        {/* Hero Image Section */}
        <section className="mb-16">
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <Image
              src="/images/stock.png"
              alt="StockAgentX Dashboard"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            StockAgentX Dashboard — Real-time stock analysis with AI-powered insights
          </p>
        </section>

        {/* Executive Summary */}
        <section className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </span>
            Executive Summary
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            StockAgentX is a comprehensive financial intelligence platform that combines cutting-edge AI technologies to provide actionable investment insights. The system integrates:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">Multi-agent orchestration</strong> with CrewAI and LangChain for complex analysis workflows</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">RAG pipeline</strong> for intelligent SEC filing analysis with hybrid search</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">Deep learning models</strong> including FinBERT for sentiment and LSTM for forecasting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">Local LLM deployment</strong> with Ollama (Llama 3.2) for privacy and cost efficiency</span>
            </li>
          </ul>
        </section>

        {/* Technical Architecture */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </span>
            Technical Architecture
          </h2>
          
          {/* Tech Stack Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-black dark:text-white">Layer</th>
                  <th className="px-4 py-3 text-left font-semibold text-black dark:text-white">Technologies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {[
                  { layer: "Agent Orchestration", tech: "CrewAI, LangChain, LangGraph" },
                  { layer: "LLM Backend", tech: "Ollama (Llama 3.2) - Local deployment" },
                  { layer: "RAG Pipeline", tech: "Pinecone Vector DB, Sentence Transformers, Hybrid Search" },
                  { layer: "ML Models", tech: "PyTorch, FinBERT (Sentiment), LSTM (Forecasting)" },
                  { layer: "Backend API", tech: "FastAPI, PostgreSQL, Async Python" },
                  { layer: "MLOps", tech: "MLflow (Experiment Tracking, Model Registry)" },
                  { layer: "Frontend", tech: "Streamlit, Plotly (Interactive Visualizations)" },
                  { layer: "Infrastructure", tech: "Docker, GitHub Actions CI/CD" },
                ].map((row) => (
                  <tr key={row.layer} className="bg-white dark:bg-gray-900/50">
                    <td className="px-4 py-3 font-medium text-black dark:text-white">{row.layer}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 font-mono text-xs">{row.tech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Architecture Diagram */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-800">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">System Architecture</p>
            </div>
            
            {/* Visual Architecture */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: BarChart3, label: "Streamlit", desc: "Dashboard", color: "red" },
                { icon: Server, label: "FastAPI", desc: "Backend", color: "green" },
                { icon: Brain, label: "Ollama", desc: "LLM (3.2)", color: "purple" },
                { icon: Database, label: "PostgreSQL", desc: "Database", color: "blue" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <item.icon className={`h-8 w-8 mb-2 text-${item.color}-500`} />
                  <span className="text-sm font-medium text-black dark:text-white">{item.label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
              <div className="h-px w-full bg-gray-300 dark:bg-gray-700"></div>
              <ArrowRight className="h-4 w-4 flex-shrink-0" />
              <div className="h-px w-full bg-gray-300 dark:bg-gray-700"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: FileText, label: "RAG Pipeline", desc: "Hybrid Search", color: "cyan" },
                { icon: Bot, label: "CrewAI Agents", desc: "SEC/Market", color: "orange" },
                { icon: Activity, label: "ML Models", desc: "FinBERT/LSTM", color: "pink" },
                { icon: Shield, label: "MCP Service", desc: "Secure Access", color: "yellow" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <item.icon className={`h-8 w-8 mb-2 text-${item.color}-500`} />
                  <span className="text-sm font-medium text-black dark:text-white">{item.label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-400 mt-6">
              <div className="h-px w-full bg-gray-300 dark:bg-gray-700"></div>
              <ArrowRight className="h-4 w-4 flex-shrink-0" />
              <div className="h-px w-full bg-gray-300 dark:bg-gray-700"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 max-w-md mx-auto">
              {[
                { icon: Database, label: "Pinecone", desc: "Vector DB", color: "indigo" },
                { icon: LineChart, label: "MLflow", desc: "Tracking", color: "teal" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <item.icon className={`h-8 w-8 mb-2 text-${item.color}-500`} />
                  <span className="text-sm font-medium text-black dark:text-white">{item.label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </span>
            Key Features & Technical Highlights
          </h2>

          {/* Multi-Agent System */}
          <div className="mb-10 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-orange-900/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center flex-shrink-0">
                <Bot className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-black dark:text-white mb-1">
                  🤖 Multi-Agent System
                </h3>
                <p className="text-sm text-orange-600 dark:text-orange-400">Specialized AI Agents for Financial Analysis</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              The platform employs specialized AI agents that collaborate to provide comprehensive financial analysis:
            </p>
            <div className="space-y-3">
              {[
                { name: "SEC Auditor Agent", desc: "Analyzes 10-K/10-Q filings for risk factors, financial health indicators, and regulatory compliance issues" },
                { name: "Market Analyst Agent", desc: "Performs technical analysis, trend identification, and generates price predictions based on historical patterns" },
                { name: "Agent Communication", desc: "Asynchronous task delegation with shared context enabling complex multi-step analysis workflows" },
              ].map((agent) => (
                <div key={agent.name} className="flex items-start gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-black dark:text-white">{agent.name}:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1 text-sm">{agent.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RAG Pipeline */}
          <div className="mb-10 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-cyan-50/50 to-transparent dark:from-cyan-900/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-black dark:text-white mb-1">
                  📚 RAG Pipeline
                </h3>
                <p className="text-sm text-cyan-600 dark:text-cyan-400">Retrieval-Augmented Generation for Financial Documents</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              A sophisticated document retrieval system purpose-built for financial documents:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { title: "Custom Document Processor", desc: "Specialized parsing for SEC EDGAR filings with metadata extraction" },
                { title: "Hybrid Search", desc: "Dense embeddings + BM25 sparse retrieval for optimal recall" },
                { title: "Semantic Chunking", desc: "Configurable chunk size preserving context across sections" },
                { title: "Real-time Ingestion", desc: "Automated SEC RSS feed monitoring for latest filings" },
                { title: "Vector Storage", desc: "Pinecone cloud with local ChromaDB fallback" },
                { title: "Sentence Transformers", desc: "State-of-the-art embeddings for financial text" },
              ].map((item) => (
                <div key={item.title} className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <p className="font-medium text-black dark:text-white text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ML Models */}
          <div className="mb-10 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-pink-50/50 to-transparent dark:from-pink-900/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center flex-shrink-0">
                <Brain className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-black dark:text-white mb-1">
                  🧠 Machine Learning Models
                </h3>
                <p className="text-sm text-pink-600 dark:text-pink-400">Production-Ready ML with Comprehensive Evaluation</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-black dark:text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">📊</span> FinBERT Sentiment Analysis
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Domain-specific transformer fine-tuned on financial text (news articles, SEC filings, earnings call transcripts) for accurate market sentiment classification.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-black dark:text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">📈</span> LSTM Time Series Forecasting
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Multi-step price prediction incorporating technical indicators (RSI, MACD, Bollinger Bands) with custom financial evaluation metrics.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-black dark:text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">📉</span> Evaluation Metrics
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Custom financial metrics including Sharpe ratio, directional accuracy, and maximum drawdown for rigorous model validation.
                </p>
              </div>
            </div>
          </div>

          {/* MCP Service */}
          <div className="mb-10 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-yellow-50/50 to-transparent dark:from-yellow-900/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-black dark:text-white mb-1">
                  🔒 Secure Database Access (MCP)
                </h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">Model Context Protocol for Safe AI-Database Interactions</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { icon: Shield, title: "Query Sanitization", desc: "Multi-layer SQL injection prevention" },
                { icon: Bot, title: "Role-Based Access", desc: "Agent-specific permissions" },
                { icon: FileText, title: "Audit Logging", desc: "Complete query history" },
                { icon: Code, title: "Query Builder", desc: "Safe abstraction layer" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <item.icon className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-black dark:text-white text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard */}
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-900/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-black dark:text-white mb-1">
                  📊 Real-Time Dashboard
                </h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-400">Interactive Visualization with Streamlit & Plotly</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Candlestick charts with technical indicators (MACD, RSI, Bollinger Bands)",
                "Time-series sentiment visualization with source attribution",
                "Agent task timeline, success rates, and tool usage analytics",
                "System health monitoring and API latency tracking",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Metrics */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
            </span>
            Project Metrics
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Test Coverage", value: "95%+", desc: "on core modules" },
              { label: "Total Tests", value: "100+", desc: "unit & integration" },
              { label: "API Response", value: "<200ms", desc: "RAG queries" },
              { label: "Codebase", value: "~15K", desc: "lines of Python" },
              { label: "Modules", value: "40+", desc: "across 10 packages" },
              { label: "Endpoints", value: "25+", desc: "REST API" },
            ].map((metric) => (
              <div key={metric.label} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{metric.value}</p>
                <p className="font-medium text-black dark:text-white text-sm">{metric.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{metric.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering Practices */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
              <Code className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </span>
            Engineering Practices
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-black dark:text-white">Practice</th>
                  <th className="px-4 py-3 text-left font-semibold text-black dark:text-white">Implementation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {[
                  { practice: "Testing", impl: "100+ unit/integration tests using pytest with fixtures and mocking" },
                  { practice: "Type Safety", impl: "Comprehensive type hints with Pydantic validation for all data models" },
                  { practice: "API Design", impl: "RESTful endpoints with automatic OpenAPI/Swagger documentation" },
                  { practice: "Error Handling", impl: "Graceful fallbacks, structured error responses, comprehensive logging" },
                  { practice: "Configuration", impl: "Environment-based settings with secure credential management" },
                  { practice: "CI/CD", impl: "GitHub Actions for automated testing, linting, and Docker builds" },
                  { practice: "Code Quality", impl: "PEP 8 compliance, modular architecture, separation of concerns" },
                ].map((row) => (
                  <tr key={row.practice} className="bg-white dark:bg-gray-900/50">
                    <td className="px-4 py-3 font-medium text-black dark:text-white">{row.practice}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">{row.impl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Technical Challenges */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
              <Zap className="h-4 w-4 text-red-600 dark:text-red-400" />
            </span>
            Technical Challenges & Solutions
          </h2>
          
          <div className="space-y-4">
            {[
              { challenge: "LLM Latency in Multi-Agent Workflows", solution: "Implemented async execution with parallel agent task processing using Python's asyncio" },
              { challenge: "Retrieval Accuracy for Financial Documents", solution: "Developed hybrid search combining semantic embeddings with BM25 keyword matching" },
              { challenge: "Model Reproducibility", solution: "Integrated MLflow for experiment tracking with artifact versioning and model registry" },
              { challenge: "Secure Database Access for AI Agents", solution: "Built custom MCP service with SQL sanitization, parameterized queries, and access control" },
              { challenge: "Real-time Data Ingestion", solution: "Automated SEC RSS feed monitoring with configurable polling intervals" },
              { challenge: "Scalable Vector Storage", solution: "Pinecone cloud deployment with local ChromaDB fallback for development" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">⚡</span>
                  <div>
                    <p className="font-medium text-black dark:text-white mb-1">{item.challenge}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-emerald-500">→</span> {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Demonstrated */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
              <Cpu className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </span>
            Skills Demonstrated
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800">
              <h4 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                AI & Machine Learning
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Multi-agent system design (CrewAI, LangChain)</li>
                <li>• RAG pipeline implementation</li>
                <li>• Transformer models (FinBERT) for NLP</li>
                <li>• LSTM time series forecasting</li>
                <li>• MLOps with MLflow</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800">
              <h4 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-500" />
                Software Engineering
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• RESTful API design with FastAPI</li>
                <li>• Asynchronous Python programming</li>
                <li>• Test-driven development with pytest</li>
                <li>• Docker containerization</li>
                <li>• CI/CD pipeline configuration</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800">
              <h4 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                Domain Knowledge
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Financial statement analysis (10-K, 10-Q)</li>
                <li>• Technical analysis indicators</li>
                <li>• SEC EDGAR data structures</li>
                <li>• Market sentiment analysis</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800">
              <h4 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-500" />
                Research Skills
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Evaluation of AI frameworks</li>
                <li>• Prompt engineering for finance</li>
                <li>• RAG architecture literature review</li>
                <li>• Benchmarking and ablation studies</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Future Enhancements */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <RefreshCw className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </span>
            Future Enhancements
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Real-time Streaming", desc: "WebSocket integration for live market data updates" },
              { title: "Portfolio Optimization Agent", desc: "Reinforcement learning for dynamic asset allocation" },
              { title: "Multi-modal Analysis", desc: "Earnings call audio transcription and analysis" },
              { title: "Kubernetes Deployment", desc: "Horizontal scaling for production workloads" },
              { title: "Advanced Backtesting", desc: "Historical simulation framework for strategy validation" },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-900/10">
                <p className="font-medium text-black dark:text-white text-sm">{item.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Summary */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Layers className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </span>
            Technology Stack Summary
          </h2>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`Frontend:         Streamlit, Plotly
Backend:          FastAPI, Python 3.10+
AI/ML:            CrewAI, LangChain, PyTorch, Transformers
Vector DB:        Pinecone, Local Store
SQL Database:     PostgreSQL
LLM:              Ollama (Llama 3.2)
MLOps:            MLflow
Containerization: Docker
CI/CD:            GitHub Actions`}</code>
            </pre>
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border border-gray-200 dark:border-gray-800 text-center">
          <h3 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-4">
            Explore the Full Platform
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            Check out the complete source code, documentation, and examples on GitHub to see how StockAgentX brings AI to financial analysis.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://github.com/HustleDanie/StockAgentX-Multi-Agent-Financial-Intelligence-Platform" target="_blank">
              <Button size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
          </div>
        </section>

        {/* Closing Note */}
        <div className="mt-12 p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400 italic text-center">
            This project demonstrates comprehensive full-stack AI engineering capabilities, combining modern machine learning techniques with production-grade software engineering practices—ideal preparation for advanced research in AI/ML systems.
          </p>
        </div>
      </article>
    </div>
  )
}
