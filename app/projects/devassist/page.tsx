"use client"

import { ArrowLeft, Github, Play, Clock, Calendar, User, GitBranch, Bot, Code, TestTube, Zap, Terminal, FileCode, Database, Workflow, CheckCircle2, ArrowRight, Cpu, Shield, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import Image from "next/image"

export default function DevAssistPage() {
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
              <Link href="https://github.com/HustleDanie/DevAssist" target="_blank">
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
              AI/ML Engineering
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              12 min read
            </span>
          </div>
          
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
            DevAssist: Building an Enterprise-Grade Multi-Agent Code Migration System
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            A deep dive into designing and implementing an AI-powered code migration tool that uses LangGraph workflow orchestration, AST analysis, and specialized agents to automate legacy code modernization.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
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

        {/* Video Section */}
        <section className="mb-16">
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <iframe
              src="https://www.youtube.com/embed/uU5b3w8zT8k"
              title="DevAssist Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Watch the multi-agent system migrate an entire codebase in real-time
          </p>
        </section>

        {/* Introduction */}
        <section className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </span>
            The Problem
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Code migration is one of the most tedious and error-prone tasks in software engineering. Whether you're upgrading from Python 2 to Python 3, or modernizing a Flask application to FastAPI, the process typically involves:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Manually identifying deprecated patterns across thousands of files</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Rewriting code while maintaining business logic integrity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Writing tests to validate every change doesn't break functionality</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Iterating on failed migrations with limited visibility into issues</span>
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            <strong className="text-black dark:text-white">DevAssist</strong> solves this by orchestrating multiple specialized AI agents that work together—each responsible for a specific part of the migration pipeline—to deliver enterprise-grade automated code migration.
          </p>
        </section>

        {/* Architecture Section */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Workflow className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </span>
            System Architecture
          </h2>
          
          {/* Architecture Diagram */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-8 mb-8 border border-gray-200 dark:border-gray-800">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">DevAssist Workflow Architecture</p>
            </div>
            
            {/* Pipeline Visualization */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
              {[
                { icon: GitBranch, label: "Git Clone", color: "blue", desc: "Repository" },
                { icon: FileCode, label: "AST Parse", color: "cyan", desc: "Analysis" },
                { icon: Bot, label: "Planner", color: "purple", desc: "Agent 1" },
                { icon: Code, label: "Coder", color: "green", desc: "Agent 2" },
                { icon: TestTube, label: "Tester", color: "orange", desc: "Agent 3" },
                { icon: Github, label: "Pull Request", color: "pink", desc: "Output" },
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

            {/* Retry Loop Indicator */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <RefreshCw className="h-4 w-4" />
                <span>Automatic retry loop: Tester → Coder (max 3 iterations)</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            The architecture follows a directed graph pattern using <strong className="text-black dark:text-white">LangGraph</strong> for workflow orchestration. This enables state management across agents, conditional routing based on test results, and automatic retry logic for failed validations.
          </p>

          {/* Code Block */}
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">workflow.py</span>
              <span className="text-xs text-gray-500">LangGraph State Machine</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`class MigrationWorkflow:
    """LangGraph workflow orchestrating the migration pipeline."""

    def _build_graph(self) -> StateGraph:
        workflow = StateGraph(MigrationState)
        
        # Add nodes for each agent
        workflow.add_node("clone", self._clone_repo)
        workflow.add_node("planner", self._run_planner)
        workflow.add_node("coder", self._run_coder)
        workflow.add_node("tester", self._run_tester)
        workflow.add_node("create_pr", self._create_pr)
        
        # Conditional routing based on test results
        workflow.add_conditional_edges(
            "tester",
            self._should_retry_or_finish,
            {
                "retry": "coder",      # Loop back on failure
                "create_pr": "create_pr",
                "fail": "finalize",
            }
        )
        
        return workflow.compile()`}</code>
            </pre>
          </div>
        </section>

        {/* The Three Agents */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <Bot className="h-4 w-4 text-green-600 dark:text-green-400" />
            </span>
            The Multi-Agent System
          </h2>

          {/* Agent 1: Planner */}
          <div className="mb-10 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-900/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                <Bot className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-black dark:text-white mb-1">
                  Agent 1: Planner
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">Pattern Identification & Analysis</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              The Planner agent combines <strong className="text-black dark:text-white">AST (Abstract Syntax Tree) analysis</strong> with LLM reasoning to identify deprecated code patterns. For Python 2→3 migrations, it detects:
            </p>
            <div className="grid md:grid-cols-2 gap-3 mb-4">
              {[
                "print statements → print() functions",
                "xrange() → range()",
                "except Exception, e: → except Exception as e:",
                "raw_input() → input()",
                "dict.iteritems() → dict.items()",
                "unicode/str handling issues"
              ].map((pattern) => (
                <div key={pattern} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="font-mono text-xs">{pattern}</span>
                </div>
              ))}
            </div>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{`def _analyze_with_llm(self, file_path: str, content: str, 
                      migration_type: MigrationType):
    """Use LLM to identify complex patterns AST might miss."""
    
    messages = [
        SystemMessage(content=self.system_prompt),
        HumanMessage(content=f"""Analyze for {migration_context}:
        
        File: {file_path}
        
        List each issue with:
        - Pattern type, Line number(s), Code snippet
        - Severity, Suggested approach
        """)
    ]
    
    response = self.llm.invoke(messages)
    return self._parse_llm_response(response.content)`}</code>
              </pre>
            </div>
          </div>

          {/* Agent 2: Coder */}
          <div className="mb-10 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                <Code className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-black dark:text-white mb-1">
                  Agent 2: Coder
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">Code Rewriting & Transformation</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              The Coder agent takes patterns identified by the Planner and generates updated code. It integrates with <strong className="text-black dark:text-white">MCP (Model Context Protocol)</strong> to pull company style guides from internal documentation wikis, ensuring the migrated code follows organizational standards.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-black dark:text-white mb-2 text-sm">Key Responsibilities:</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">→</span>
                  Preserve original logic and behavior during transformation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">→</span>
                  Follow target framework best practices (FastAPI async patterns, etc.)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">→</span>
                  Add type hints where appropriate for better maintainability
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">→</span>
                  Maintain code readability and documentation
                </li>
              </ul>
            </div>
          </div>

          {/* Agent 3: Tester */}
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-orange-900/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center flex-shrink-0">
                <TestTube className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-black dark:text-white mb-1">
                  Agent 3: Tester
                </h3>
                <p className="text-sm text-orange-600 dark:text-orange-400">Validation & Quality Assurance</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              The Tester agent validates all changes in an isolated <strong className="text-black dark:text-white">Docker environment</strong>. If tests fail, the workflow automatically loops back to the Coder agent with error context, enabling iterative refinement up to 3 times before failing gracefully.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Shield, label: "Isolated Testing", desc: "Docker containers" },
                { icon: RefreshCw, label: "Auto-Retry", desc: "Up to 3 iterations" },
                { icon: Terminal, label: "Error Context", desc: "Detailed feedback" },
              ].map((item) => (
                <div key={item.label} className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <item.icon className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                  <p className="font-medium text-black dark:text-white text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Details */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
              <Terminal className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </span>
            Implementation Deep Dive
          </h2>

          <h3 className="font-semibold text-lg text-black dark:text-white mb-4">State Management</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            The entire migration state is tracked through a <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">MigrationState</code> dataclass that flows through the LangGraph workflow:
          </p>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-8">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">models.py</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`@dataclass
class MigrationState:
    """State object passed through the LangGraph workflow."""
    
    # Repository information
    repo_url: str
    repo_path: Path | None = None
    branch_name: str = ""
    
    # Migration configuration
    migration_type: MigrationType = MigrationType.PY2_TO_PY3
    status: MigrationStatus = MigrationStatus.PENDING
    
    # Planner agent outputs
    deprecated_patterns: list[DeprecatedPattern] = field(default_factory=list)
    
    # Coder agent outputs
    code_changes: list[CodeChange] = field(default_factory=list)
    applied_changes: list[CodeChange] = field(default_factory=list)
    
    # Tester agent outputs
    test_results: list[TestResult] = field(default_factory=list)
    tests_passed: bool = False
    
    # Workflow state
    current_agent: str = ""
    iteration: int = 0
    max_iterations: int = 3`}</code>
            </pre>
          </div>

          <h3 className="font-semibold text-lg text-black dark:text-white mb-4">Supported Migrations</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🐍</span>
                <div>
                  <span className="text-sm text-gray-500">Python 2</span>
                  <span className="mx-2">→</span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">Python 3</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Handles syntax changes, library updates, unicode/string handling, and division behavior modifications.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <span className="text-sm text-gray-500">Flask</span>
                  <span className="mx-2">→</span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">FastAPI</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Converts routes, blueprints to routers, adds Pydantic models, and implements async/await patterns.
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-lg text-black dark:text-white mb-4">Pull Request Generation</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Upon successful migration, DevAssist automatically creates a detailed pull request via the GitHub API with a comprehensive report of all changes made:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Github className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="font-semibold text-black dark:text-white">Auto-Generated PR Content</span>
            </div>
            <div className="font-mono text-sm space-y-2 text-gray-600 dark:text-gray-400">
              <p>## 🔄 DevAssist Migration Report</p>
              <p className="pl-4">- **Files Processed:** 47</p>
              <p className="pl-4">- **Patterns Found:** 156</p>
              <p className="pl-4">- **Changes Applied:** 152</p>
              <p className="pl-4">- **Tests Passed:** ✅ Yes</p>
              <p className="mt-4">### Changes Made</p>
              <p className="pl-4 text-xs">- `src/utils.py`: Converted print statements</p>
              <p className="pl-4 text-xs">- `src/api.py`: Updated Flask routes to FastAPI</p>
              <p className="pl-4 text-xs">- ... and 150 more changes</p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
              <Database className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            </span>
            Technology Stack
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Python 3.11+", desc: "Core Language" },
              { name: "LangGraph", desc: "Workflow Orchestration" },
              { name: "LangChain", desc: "LLM Framework" },
              { name: "FastAPI", desc: "Backend API" },
              { name: "Docker", desc: "Isolated Testing" },
              { name: "OpenAI GPT-4", desc: "LLM Provider" },
              { name: "Next.js", desc: "Frontend UI" },
              { name: "GitHub API", desc: "PR Generation" },
            ].map((tech) => (
              <div key={tech.name} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center">
                <p className="font-medium text-black dark:text-white text-sm">{tech.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <Cpu className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </span>
            Getting Started
          </h2>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">Terminal</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`# Install DevAssist
pip install devassist

# Initialize configuration
devassist init

# Set your credentials in .env
DEVASSIST_OPENAI_API_KEY=sk-...
DEVASSIST_GITHUB_TOKEN=ghp_...

# Run migration
devassist migrate https://github.com/user/legacy-repo --type py2to3

# Or use the Python API
from devassist import MigrationWorkflow

workflow = MigrationWorkflow()
result = workflow.run(
    repo_url="https://github.com/user/repo",
    migration_type="py2to3"
)

if result.success:
    print(f"Migration completed! PR: {result.pr_url}")`}</code>
            </pre>
          </div>
        </section>

        {/* Limitations Section */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </span>
            Current Limitations
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            While DevAssist handles many migration scenarios effectively, there are some known limitations to be aware of:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Python Only",
                desc: "Currently supports Python codebases only. JavaScript, Java, and other language migrations are on the roadmap.",
                icon: "🐍"
              },
              {
                title: "Repository Size",
                desc: "Optimized for repositories under 500 files. Larger codebases may experience longer processing times.",
                icon: "📦"
              },
              {
                title: "Complex Dependencies",
                desc: "External dependencies with breaking API changes between versions may require manual review.",
                icon: "🔗"
              },
              {
                title: "Dynamic Code Patterns",
                desc: "Heavily metaprogrammed or dynamically generated code may not be fully detected by AST analysis.",
                icon: "⚡"
              },
              {
                title: "Test Coverage",
                desc: "Accuracy of validation depends on existing test coverage. Untested code paths may have undetected issues.",
                icon: "🧪"
              },
              {
                title: "LLM Rate Limits",
                desc: "Large migrations may hit OpenAI API rate limits. Consider batch processing for enterprise-scale repos.",
                icon: "⏱️"
              },
            ].map((limitation) => (
              <div key={limitation.title} className="p-4 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-900/10">
                <div className="flex items-start gap-3">
                  <span className="text-xl">{limitation.icon}</span>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white text-sm mb-1">{limitation.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{limitation.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-black dark:text-white">Note:</strong> These limitations represent areas of active development. 
              Contributions and feedback are welcome to help improve DevAssist's capabilities.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-gray-200 dark:border-gray-800 text-center">
          <h3 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-4">
            Ready to Automate Your Code Migration?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            Check out the full source code, documentation, and examples on GitHub to get started with DevAssist.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://github.com/HustleDanie/DevAssist" target="_blank">
              <Button size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
            <Link href="https://github.com/HustleDanie/DevAssist#readme" target="_blank">
              <Button variant="outline" size="lg" className="gap-2">
                <FileCode className="h-5 w-5" />
                Read Documentation
              </Button>
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
