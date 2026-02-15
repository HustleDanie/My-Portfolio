"use client"

import { ArrowLeft, Github, Clock, Calendar, Search, FileText, Database, Server, Brain, Workflow, CheckCircle2, Cpu, Zap, Shield, BarChart3, Upload, BookOpen, Layers, Settings, ArrowRight, Lock, Eye, RefreshCw, Activity, Container } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function KnowledgeRetrievalPage() {
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
              <Link href="https://github.com/HustleDanie/Enterprise-Knowledge-Retrieval-Synthesis-Platform" target="_blank">
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
              GenAI/RAG
            </span>
            <span>•</span>
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
              MLOps
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              15 min read
            </span>
          </div>
          
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
            📚 Enterprise Knowledge Retrieval & Synthesis Platform
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            A production-ready GenAI/MLOps system for enterprise document search, synthesis, and RAG pipelines. Upload documents and ask questions — get answers from your data with citations and traceability.
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
              <span>February 2026</span>
            </div>
          </div>
        </header>

        {/* Video Section */}
        <section className="mb-16">
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <video
              src="/images/retrieval.mp4"
              controls
              className="w-full h-full object-cover"
              poster="/images/retrieval.png"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Watch the Enterprise Knowledge Retrieval platform in action with document search and RAG synthesis
          </p>
        </section>

        {/* Key Value Proposition */}
        <section className="mb-12">
          <div className="p-6 rounded-xl border-2 border-blue-400 dark:border-blue-500 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10">
            <div className="text-center">
              <h3 className="font-orbitron text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Knowledge Search
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Upload documents and ask questions. Get answers from your data.
              </p>
              <div className="flex flex-wrap gap-3 justify-center text-sm">
                <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  💡 What are the main features of this platform?
                </span>
                <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  🔧 How do I set up the development environment?
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
              <Search className="h-4 w-4 text-red-600 dark:text-red-400" />
            </span>
            Real-World Problem
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Large enterprises (finance, legal, consulting) struggle with:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span><strong className="text-black dark:text-white">Fragmented documentation</strong> — policies scattered across systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span><strong className="text-black dark:text-white">Wasted hours</strong> — employees searching through documents manually</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span><strong className="text-black dark:text-white">Knowledge silos</strong> — preventing efficient access to company information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span><strong className="text-black dark:text-white">Scaling challenges</strong> — difficulty as organizations grow</span>
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            This platform solves these problems by providing <strong className="text-black dark:text-white">intelligent document search and synthesis at scale</strong>.
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </span>
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {/* Core Capabilities */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10">
              <h3 className="font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-500" />
                Core Capabilities
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-blue-500" />
                  PDF, DOCX, TXT, Markdown
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-blue-500" />
                  Hybrid Search (Semantic + BM25)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-blue-500" />
                  Advanced RAG Chain
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-blue-500" />
                  Citations & Traceability
                </li>
              </ul>
            </div>

            {/* Enterprise Features */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/10">
              <h3 className="font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Enterprise Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  Role-Based Access Control
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  PII Redaction
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  Query Rewriting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  Hallucination Mitigation
                </li>
              </ul>
            </div>

            {/* MLOps & Monitoring */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-orange-900/10">
              <h3 className="font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-orange-500" />
                MLOps & Monitoring
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-orange-500" />
                  MLflow Integration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-orange-500" />
                  Prometheus/Grafana
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-orange-500" />
                  Drift Detection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-orange-500" />
                  ELK Stack Ready
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* System Architecture */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
              <Workflow className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </span>
            System Architecture
          </h2>

          {/* Architecture Flow */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-800">
            <div className="space-y-4">
              {[
                { icon: BookOpen, label: "User Interface", desc: "Web Frontend / API Clients", color: "blue" },
                { icon: Server, label: "FastAPI Backend", desc: "Query, Upload, Admin Routes", color: "purple" },
                { icon: Layers, label: "RAG Chain", desc: "Retriever → Reranker → Generator", color: "green" },
                { icon: Search, label: "Hybrid Search", desc: "Semantic (Vector) + Keyword (BM25)", color: "cyan" },
                { icon: Database, label: "Data Layer", desc: "Chroma Vector DB + PostgreSQL", color: "orange" },
                { icon: Activity, label: "MLOps & Monitoring", desc: "MLflow + Prometheus + Evidently AI", color: "pink" },
              ].map((step, index, arr) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${step.color}-100 dark:bg-${step.color}-900/30 flex items-center justify-center flex-shrink-0`}>
                    <step.icon className={`h-6 w-6 text-${step.color}-600 dark:text-${step.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 dark:text-white">{step.label}</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
                  </div>
                  {index < arr.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-gray-400 hidden md:block rotate-90 md:rotate-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Project Structure */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">Project Structure</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`Retrieval/
├── src/
│   ├── main.py             # FastAPI application
│   ├── config/             # Pydantic settings
│   ├── ingestion/          # Document processing
│   │   ├── document_loader.py
│   │   └── chunker.py
│   ├── embeddings/         # Embedding service
│   │   ├── embedding_service.py
│   │   └── vector_store.py
│   ├── rag/                # RAG chain
│   │   ├── retriever.py
│   │   └── reranker.py
│   ├── db/                 # Database layer
│   ├── api/                # API routes
│   └── monitoring/         # MLOps & metrics
├── frontend/               # TypeScript frontend
├── docker/                 # Docker configs
├── monitoring/             # Prometheus config
└── tests/                  # Test suites`}</code>
            </pre>
          </div>
        </section>

        {/* Core Modules */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
              <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </span>
            Core Modules
          </h2>

          <div className="space-y-6">
            {/* Ingestion Pipeline */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-500" />
                Ingestion Pipeline
              </h3>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300">{`from src.ingestion import DocumentLoader, DocumentChunker

loader = DocumentLoader()
doc = loader.load_document("sample.pdf")

chunker = DocumentChunker(chunk_size=1024, chunk_overlap=128)
chunks = chunker.chunk_document(doc.doc_id, doc.content, doc.metadata)`}</code>
                </pre>
              </div>
            </div>

            {/* Embedding Service */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                Embedding Service
              </h3>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300">{`from src.embeddings import EmbeddingService, VectorStore

embedding_svc = EmbeddingService(model="text-embedding-ada-002")
embeddings = embedding_svc.embed_texts(texts)

vector_store = VectorStore(vector_db_type="chroma")
vector_store.add(ids, embeddings, metadata)`}</code>
                </pre>
              </div>
            </div>

            {/* RAG Chain */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <Workflow className="h-5 w-5 text-green-500" />
                RAG Chain
              </h3>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300">{`from src.rag import HybridRetriever, DocumentReranker, RAGChain

retriever = HybridRetriever(vector_store, embedding_svc)
reranker = DocumentReranker(model_type="cross-encoder")
rag = RAGChain(retriever, reranker, llm_client)

result = rag.generate("What are our company policies?")`}</code>
                </pre>
              </div>
            </div>
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
              { icon: Lock, title: "API Key Authentication", desc: "X-API-Key header validation" },
              { icon: Shield, title: "JWT Tokens", desc: "Optional token-based authentication" },
              { icon: Eye, title: "RBAC", desc: "Document-level permissions" },
              { icon: RefreshCw, title: "PII Redaction", desc: "Automatic masking of sensitive data" },
              { icon: Activity, title: "Audit Logging", desc: "Track all document accesses" },
              { icon: Lock, title: "TLS Encryption", desc: "Data in transit protection" },
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

        {/* API Examples */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <Server className="h-4 w-4 text-green-600 dark:text-green-400" />
            </span>
            API Endpoints
          </h2>

          <div className="space-y-6">
            {/* Query Documents */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded text-xs font-mono">POST</span>
                /api/v1/query
              </h3>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300">{`curl -X POST http://localhost:8000/api/v1/query \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your-api-key" \\
  -d '{
    "query": "What are the return policies?",
    "top_k": 5,
    "rerank_k": 3
  }'`}</code>
                </pre>
              </div>
            </div>

            {/* Upload Document */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded text-xs font-mono">POST</span>
                /api/v1/documents/upload
              </h3>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300">{`curl -X POST http://localhost:8000/api/v1/documents/upload \\
  -H "X-API-Key: your-api-key" \\
  -F "file=@document.pdf"`}</code>
                </pre>
              </div>
            </div>
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
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-black dark:text-white">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-black dark:text-white">Technology</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                {[
                  { cat: "Language", tech: "Python 3.10+ (74%), TypeScript (23%)" },
                  { cat: "Web Framework", tech: "FastAPI + Uvicorn" },
                  { cat: "Vector DB", tech: "Pinecone / Chroma" },
                  { cat: "SQL DB", tech: "PostgreSQL" },
                  { cat: "Embeddings", tech: "OpenAI Ada-002 / BGE / HuggingFace" },
                  { cat: "LLM", tech: "GPT-4o / Llama-3 / Azure OpenAI" },
                  { cat: "ML Models", tech: "XGBoost, Scikit-learn" },
                  { cat: "MLOps", tech: "MLflow, Evidently AI" },
                  { cat: "Monitoring", tech: "Prometheus, Grafana, ELK Stack" },
                  { cat: "Containerization", tech: "Docker, Docker Compose" },
                  { cat: "CI/CD", tech: "GitHub Actions" },
                ].map((row) => (
                  <tr key={row.cat} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 px-4 font-medium text-black dark:text-white">{row.cat}</td>
                    <td className="py-2 px-4">{row.tech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <Container className="h-4 w-4 text-green-600 dark:text-green-400" />
            </span>
            Quick Start
          </h2>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">Terminal</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`# Clone and setup
git clone https://github.com/HustleDanie/Enterprise-Knowledge-Retrieval-Synthesis-Platform
cd Retrieval
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Start services with Docker Compose
docker-compose up -d
# Starts: PostgreSQL, Chroma, MLflow, Prometheus, Grafana

# Run the application
uvicorn src.main:app --reload

# Access the application
# API: http://localhost:8000
# Swagger Docs: http://localhost:8000/docs
# Grafana: http://localhost:3000`}</code>
            </pre>
          </div>
        </section>

        {/* Cloud Deployment */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Settings className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </span>
            Cloud Deployment Options
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <h3 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <span className="text-orange-500">☁️</span> AWS
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• App: ECS Fargate / EC2</li>
                <li>• Vector DB: OpenSearch</li>
                <li>• LLM: Amazon Bedrock</li>
                <li>• Monitoring: CloudWatch</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <h3 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <span className="text-blue-500">☁️</span> Azure
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• App: App Service / AKS</li>
                <li>• Vector DB: Cognitive Search</li>
                <li>• LLM: Azure OpenAI</li>
                <li>• Monitoring: App Insights</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-gray-200 dark:border-gray-800 text-center">
          <h3 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-4">
            📚 Build Enterprise Knowledge Systems
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            Explore the full source code, architecture documentation, and deployment guides to build your own enterprise RAG platform.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://github.com/HustleDanie/Enterprise-Knowledge-Retrieval-Synthesis-Platform" target="_blank">
              <Button size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
            <Link href="https://github.com/HustleDanie/Enterprise-Knowledge-Retrieval-Synthesis-Platform#readme" target="_blank">
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
