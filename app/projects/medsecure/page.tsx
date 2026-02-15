"use client"

import { ArrowLeft, Github, Clock, Calendar, Shield, Lock, FileText, Database, Server, Brain, CheckCircle2, Upload, Eye, Cpu, Workflow, AlertTriangle, Code, Layers, Fingerprint, Search, FileCheck, Zap, Globe, Container } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function MedSecurePage() {
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
              <Link href="https://github.com/HustleDanie/MedSecure---HIPAA-Compliant-Medical-Summary-Platform-" target="_blank">
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
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
              Healthcare AI
            </span>
            <span>•</span>
            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
              HIPAA Compliance
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              12 min read
            </span>
          </div>
          
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
            🔒 MedSecure: HIPAA-Compliant Medical Summary Platform
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            A production-grade full-stack medical document summarization platform with security-first architecture. Process patient medical records while automatically masking PII, extracting medical entities, generating summaries, and verifying accuracy.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold">
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
            <video
              src="/images/medsecure.mp4"
              controls
              className="w-full h-full object-cover"
              poster="/images/medsecure.png"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Watch MedSecure process medical documents with automatic PII masking and summarization
          </p>
        </section>

        {/* HIPAA Compliance Badge */}
        <section className="mb-12">
          <div className="p-6 rounded-xl border-2 border-emerald-400 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-orbitron text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                  🔐 HIPAA-Compliant by Design
                </h3>
                <p className="text-emerald-700 dark:text-emerald-400 leading-relaxed text-sm">
                  Built with healthcare security requirements at the core. Automatic PII masking, role-based access control, encryption hooks, and comprehensive audit logging ensure patient data protection at every layer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </span>
            The Problem
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Hospitals and healthcare providers need to summarize patient history while <strong className="text-black dark:text-white">strictly masking PII (Personally Identifiable Information)</strong> to remain compliant with HIPAA regulations. Manual processes are slow, error-prone, and risky.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            <strong className="text-black dark:text-white">MedSecure</strong> solves this by providing:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">Automatic PII Masking</strong> — SSN, emails, phone numbers, medical IDs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">Medical Entity Extraction</strong> — Diagnoses, medications, procedures</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">AI-Powered Summarization</strong> — Concise clinical summaries</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">Hallucination Verification</strong> — Ensures summary accuracy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">Role-Based Access Control</strong> — Admin, Editor, Viewer roles</span>
            </li>
          </ul>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </span>
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Frontend Features */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10">
              <h3 className="font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                Frontend (Next.js)
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-blue-500" />
                  Drag-and-drop document upload
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-500" />
                  Real-time PII detection preview
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  AI-generated summary display
                </li>
                <li className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-blue-500" />
                  Medical entities extraction
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  Verification status indicator
                </li>
              </ul>
            </div>

            {/* Backend Features */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/10">
              <h3 className="font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
                <Server className="h-5 w-5 text-green-500" />
                Backend (FastAPI)
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  Role-based access control (RBAC)
                </li>
                <li className="flex items-center gap-2">
                  <Fingerprint className="h-4 w-4 text-green-500" />
                  PII masking (SSN, email, phone)
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-green-500" />
                  Medical entity recognition
                </li>
                <li className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-green-500" />
                  Hallucination detection
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-500" />
                  AES-256 encryption hooks
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
              <Workflow className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </span>
            System Architecture
          </h2>
          
          {/* Architecture Diagram */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-8 mb-8 border border-gray-200 dark:border-gray-800">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">Full-Stack Architecture</p>
            </div>
            
            {/* Pipeline Visualization */}
            <div className="space-y-4">
              {[
                { icon: Globe, label: "User Browser", desc: "Document Upload", color: "blue" },
                { icon: Layers, label: "Next.js Frontend", desc: "Port 3000", color: "purple" },
                { icon: Server, label: "FastAPI Backend", desc: "Port 8000", color: "green" },
                { icon: Database, label: "MongoDB", desc: "Port 27017", color: "orange" },
              ].map((step, index, arr) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${step.color}-100 dark:bg-${step.color}-900/30 flex items-center justify-center`}>
                    <step.icon className={`h-6 w-6 text-${step.color}-600 dark:text-${step.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 dark:text-white">{step.label}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({step.desc})</span>
                  </div>
                  {index < arr.length - 1 && (
                    <div className="text-gray-400">↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Code Block - Project Structure */}
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">Project Structure</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`MedSecure/
├── app/                          # FastAPI Backend
│   ├── main.py                  # App entry point
│   ├── api/routes.py            # API endpoints
│   ├── core/
│   │   ├── config.py            # Settings
│   │   ├── security.py          # RBAC
│   │   └── logging.py           # Structured logging
│   ├── services/
│   │   ├── pipeline.py          # Pipeline orchestrator
│   │   ├── pii_masking.py       # PII detection
│   │   ├── ner.py               # Entity extraction
│   │   ├── summarizer.py        # Text summarization
│   │   ├── verification.py      # Quality checks
│   │   └── storage.py           # MongoDB layer
│   └── ml/
│       ├── finetune.py          # PEFT/LoRA training
│       └── evaluation.py        # Metrics
│
├── frontend/                     # Next.js Frontend
│   ├── pages/
│   │   ├── index.js             # Main upload page
│   │   └── _app.js
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── FileUpload.jsx
│   │   ├── ResultsDisplay.jsx
│   │   └── LoadingSpinner.jsx
│   └── lib/api.js               # API client
│
├── tests/                        # Unit tests
├── docker-compose.yml           # Local stack
└── requirements.txt             # Python deps`}</code>
            </pre>
          </div>
        </section>

        {/* ML Pipeline */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
              <Brain className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            </span>
            ML Processing Pipeline
          </h2>

          <div className="space-y-4">
            {[
              { step: 1, title: "PII Detection", desc: "Regex + NER patterns for comprehensive PII identification", icon: Fingerprint },
              { step: 2, title: "Medical NER", desc: "Named entity recognition using spaCy/BERT for clinical entities", icon: Search },
              { step: 3, title: "Summarization", desc: "Text condensation using Llama-3 (fine-tuning ready)", icon: FileText },
              { step: 4, title: "Verification", desc: "Hallucination detection via semantic similarity checks", icon: CheckCircle2 },
              { step: 5, title: "Storage", desc: "Encrypted MongoDB storage with audit logging", icon: Database },
              { step: 6, title: "RBAC", desc: "Role-based access control enforcement", icon: Shield },
              { step: 7, title: "Retrieval", desc: "Safe document serving with access verification", icon: Eye },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center font-bold text-pink-600 dark:text-pink-400 text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="h-4 w-4 text-pink-500" />
                    <span className="font-semibold text-black dark:text-white">{item.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Security Features */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
              <Lock className="h-4 w-4 text-red-600 dark:text-red-400" />
            </span>
            Security Features
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Fingerprint, title: "PII Masking", desc: "Automatically detects and masks SSN, emails, phone numbers" },
              { icon: Search, title: "Medical Entities", desc: "Extracts diagnoses, medications, procedures" },
              { icon: Shield, title: "RBAC", desc: "Admin, Editor, Viewer roles with header-based enforcement" },
              { icon: Lock, title: "Encryption", desc: "Hooks for AES-256 at-rest encryption" },
              { icon: FileCheck, title: "HIPAA Compliance", desc: "Comprehensive compliance checklist included" },
              { icon: AlertTriangle, title: "Security Scanning", desc: "Bandit + pip-audit in CI/CD pipeline" },
            ].map((feature) => (
              <div key={feature.title} className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <feature.icon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-black dark:text-white text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* API Example */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
              <Code className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </span>
            API Usage
          </h2>

          <div className="space-y-6">
            {/* Submit Document */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-3">Submit Document</h3>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                  <span className="text-sm text-gray-400 font-mono">POST /api/v1/summaries</span>
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300">{`curl -X POST http://localhost:8000/api/v1/summaries \\
  -H "Content-Type: application/json" \\
  -H "X-User: editor@example.com" \\
  -d '{
    "text": "Patient John Doe, DOB 01/15/1980, SSN 123-45-6789.
             Chief complaint: Chest pain and shortness of breath.
             History: Diabetes Type 2, Hypertension..."
  }'`}</code>
                </pre>
              </div>
            </div>

            {/* Response */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-3">Response</h3>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                  <span className="text-sm text-gray-400 font-mono">JSON Response</span>
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300">{`{
  "summary_id": "507f1f77bcf86cd799439011",
  "masked_text": "Patient [NAME] with [CONDITION]...",
  "summary": "65-year-old male patient presenting with 
              cardiovascular symptoms. History includes...",
  "verified": true,
  "entities": [
    {"text": "diabetes", "label": "CONDITION"},
    {"text": "hypertension", "label": "CONDITION"},
    {"text": "chest pain", "label": "SYMPTOM"}
  ]
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Formats */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
              <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </span>
            Supported Formats
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { format: "PDF", desc: "Medical reports, discharge summaries", icon: "📄" },
              { format: "DOCX", desc: "Word documents with clinical notes", icon: "📝" },
              { format: "TXT", desc: "Plain text documents", icon: "📃" },
            ].map((item) => (
              <div key={item.format} className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center">
                <span className="text-3xl mb-2 block">{item.icon}</span>
                <h4 className="font-semibold text-black dark:text-white">{item.format}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">The System Will:</h4>
            <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
              <li>• Mask all personally identifiable information (PII)</li>
              <li>• Extract medical entities (conditions, medications, procedures)</li>
              <li>• Generate a concise summary</li>
              <li>• Verify for hallucinations</li>
            </ul>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
              <Cpu className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </span>
            Technology Stack
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Backend Stack */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-4">Backend</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "FastAPI", desc: "API Framework" },
                  { name: "MongoDB", desc: "Database" },
                  { name: "spaCy", desc: "NLP Engine" },
                  { name: "Transformers", desc: "HuggingFace" },
                  { name: "PEFT/LoRA", desc: "Fine-tuning" },
                  { name: "Loguru", desc: "Logging" },
                ].map((tech) => (
                  <div key={tech.name} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center">
                    <p className="font-medium text-black dark:text-white text-sm">{tech.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Frontend Stack */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-4">Frontend</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Next.js 14", desc: "React Framework" },
                  { name: "Tailwind CSS", desc: "Styling" },
                  { name: "Axios", desc: "HTTP Client" },
                  { name: "Docker", desc: "Containers" },
                ].map((tech) => (
                  <div key={tech.name} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center">
                    <p className="font-medium text-black dark:text-white text-sm">{tech.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <Container className="h-4 w-4 text-green-600 dark:text-green-400" />
            </span>
            Getting Started
          </h2>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">Terminal</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`# Clone the repository
git clone https://github.com/HustleDanie/MedSecure---HIPAA-Compliant-Medical-Summary-Platform-
cd MedSecure---HIPAA-Compliant-Medical-Summary-Platform-

# Install Python dependencies
pip install -r requirements.txt

# Start MongoDB
docker-compose up -d mongo

# Start FastAPI backend (Terminal 1)
uvicorn app.main:app --reload --port 8000

# Setup frontend (Terminal 2)
cd frontend
npm install
cp .env.local.example .env.local
npm run dev

# Access the application
# Frontend: http://localhost:3000 (Upload UI)
# API Docs: http://localhost:8000/docs (Interactive API)`}</code>
            </pre>
          </div>
        </section>

        {/* Performance */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
              <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </span>
            Performance
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { metric: "~100ms", label: "Page Load" },
              { metric: "1-3s", label: "Per Document" },
              { metric: "<100ms", label: "DB Queries" },
              { metric: "1000+", label: "Req/min" },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border border-yellow-200 dark:border-yellow-800 text-center">
                <p className="font-orbitron text-2xl font-bold text-yellow-600 dark:text-yellow-400">{item.metric}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-gray-200 dark:border-gray-800 text-center">
          <h3 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-4">
            🔒 Build HIPAA-Compliant Healthcare Apps
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            Explore the full source code, architecture documentation, and deployment guides to build secure medical applications.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://github.com/HustleDanie/MedSecure---HIPAA-Compliant-Medical-Summary-Platform-" target="_blank">
              <Button size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
            <Link href="https://github.com/HustleDanie/MedSecure---HIPAA-Compliant-Medical-Summary-Platform-#readme" target="_blank">
              <Button variant="outline" size="lg" className="gap-2">
                <FileText className="h-5 w-5" />
                Read Documentation
              </Button>
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
