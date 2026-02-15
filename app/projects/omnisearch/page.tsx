"use client"

import { ArrowLeft, Github, Clock, Calendar, Search, Image, Type, Layers, Database, Server, Brain, Workflow, CheckCircle2, Cpu, Zap, Filter, BarChart3, ShoppingCart, User, Settings, ArrowRight, FileText, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function OmniSearchPage() {
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
              <Link href="https://github.com/HustleDanie/OmniSearch-A-Multimodal-Retrieval-and-Ranking-System-for-Cross-Modal-E-Commerce-Product-Discovery" target="_blank">
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
              Multimodal AI
            </span>
            <span>•</span>
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
              E-Commerce
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              14 min read
            </span>
          </div>
          
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
            🔍 OmniSearch: Multimodal Product Discovery
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            A production-grade multimodal retrieval and ranking system for cross-modal e-commerce product discovery. Search using words, pictures, or both with CLIP embeddings and intelligent ranking algorithms.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
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
              src="https://www.youtube.com/embed/34hGaY0srog"
              title="OmniSearch Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Watch OmniSearch perform multimodal product discovery with text, image, and combined queries
          </p>
        </section>

        {/* Key Value Proposition */}
        <section className="mb-12">
          <div className="p-6 rounded-xl border-2 border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-900/10">
            <div className="text-center">
              <h3 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-4">
                Find exactly what you're looking for using <span className="text-blue-600 dark:text-blue-400">words</span>, <span className="text-purple-600 dark:text-purple-400">pictures</span>, or <span className="text-green-600 dark:text-green-400">both</span>.
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter a text query, upload an image, or combine both for multimodal product discovery.
              </p>
            </div>
          </div>
        </section>

        {/* Search Modes */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Search className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </span>
            Cross-Modal Search Capabilities
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { 
                icon: Type, 
                title: "Text Search", 
                desc: "Natural language queries like 'red athletic shoes' or 'formal evening dress'",
                color: "blue",
                example: "\"red running shoes\""
              },
              { 
                icon: Image, 
                title: "Image Search", 
                desc: "Upload a product photo to find visually similar items in the catalog",
                color: "purple",
                example: "📷 Upload photo"
              },
              { 
                icon: Layers, 
                title: "Multimodal Search", 
                desc: "Combine text intent with visual reference for refined results",
                color: "green",
                example: "Photo + \"formal occasion\""
              },
            ].map((mode) => (
              <div key={mode.title} className={`p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-${mode.color}-50/50 to-transparent dark:from-${mode.color}-900/10`}>
                <div className={`w-12 h-12 rounded-xl bg-${mode.color}-100 dark:bg-${mode.color}-900/50 flex items-center justify-center mb-4`}>
                  <mode.icon className={`h-6 w-6 text-${mode.color}-600 dark:text-${mode.color}-400`} />
                </div>
                <h3 className="font-semibold text-black dark:text-white mb-2">{mode.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{mode.desc}</p>
                <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-mono text-gray-600 dark:text-gray-400">
                  {mode.example}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works - CLIP */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
              <Brain className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </span>
            CLIP Embeddings: The Secret Sauce
          </h2>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              OmniSearch leverages <strong className="text-black dark:text-white">OpenAI's CLIP (Contrastive Language-Image Pre-training)</strong> model, which maps both text and images into a shared 512-dimensional vector space where semantically similar concepts are close together.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Type className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-black dark:text-white text-sm">Text Input</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">→ 512-dimensional embedding</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Image className="h-4 w-4 text-purple-500" />
                  <span className="font-medium text-black dark:text-white text-sm">Image Input</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">→ 512-dimensional embedding</p>
              </div>
            </div>
          </div>

          {/* Fusion Formula */}
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">Fusion Embeddings</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`# When both text and image are provided:
fused_embedding = (image_weight × image_embedding) + (text_weight × text_embedding)

# Default Weights:
# • Image: 60% (0.6) - Visual features dominate
# • Text:  40% (0.4) - Textual context refines

# Example: Finding formal dresses similar to an uploaded photo
{
  "text": "formal occasion",
  "image": "[uploaded dress photo]",
  "image_weight": 0.7,
  "text_weight": 0.3
}`}</code>
            </pre>
          </div>
        </section>

        {/* Two-Stage Ranking */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </span>
            Two-Stage Ranking Pipeline
          </h2>

          <div className="space-y-6">
            {/* Stage 1 */}
            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">Vector Retrieval (Weaviate)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fast approximate nearest neighbor search</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 pl-14">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  Retrieves top 30 candidates using cosine similarity
                </li>
                <li className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-blue-500" />
                  Applies server-side filters (color, category)
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  Uses HNSW indexing for fast search
                </li>
              </ul>
            </div>

            {/* Stage 2 */}
            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-orange-900/10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center font-bold text-orange-600 dark:text-orange-400">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">Re-ranking (Custom Scorer)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Weighted scoring for precision</p>
                </div>
              </div>
              
              {/* Scoring Table */}
              <div className="overflow-x-auto pl-14">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 font-medium text-black dark:text-white">Component</th>
                      <th className="text-center py-2 font-medium text-black dark:text-white">Weight</th>
                      <th className="text-left py-2 font-medium text-black dark:text-white">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">Vector Similarity</td>
                      <td className="text-center py-2 font-mono text-orange-500">0.5</td>
                      <td className="py-2">Cosine similarity (CLIP)</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">Color Match</td>
                      <td className="text-center py-2 font-mono text-orange-500">0.2</td>
                      <td className="py-2">Binary: 1.0 if matches filter</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">Category Match</td>
                      <td className="text-center py-2 font-mono text-orange-500">0.2</td>
                      <td className="py-2">Binary: 1.0 if matches filter</td>
                    </tr>
                    <tr>
                      <td className="py-2">Text Similarity</td>
                      <td className="text-center py-2 font-mono text-orange-500">0.1</td>
                      <td className="py-2">Bag-of-words cosine similarity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Ranking Example */}
          <div className="bg-gray-900 rounded-lg overflow-hidden mt-6">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">Example: Query "blue running shoes"</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`Product A: Blue Casual Shoes
- Vector: 0.75, Color: 1.0, Category: 1.0, Text: 0.85
- Final Score: 0.375 + 0.2 + 0.2 + 0.085 = 0.860 ✓ Winner

Product B: Red Running Shoes
- Vector: 0.90, Color: 0.0, Category: 1.0, Text: 0.90
- Final Score: 0.450 + 0.0 + 0.2 + 0.090 = 0.740

→ Product A ranks higher due to color match bonus!`}</code>
            </pre>
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <Workflow className="h-4 w-4 text-green-600 dark:text-green-400" />
            </span>
            System Architecture
          </h2>

          {/* Architecture Flow */}
          <div className="space-y-4 mb-8">
            {[
              { icon: Globe, label: "Client Request", desc: "Text / Image / Both", color: "blue" },
              { icon: Server, label: "FastAPI Endpoints", desc: "/search/text, /search/image, /search/multimodal", color: "purple" },
              { icon: Brain, label: "CLIP Embedding Service", desc: "OpenAI CLIP ViT-B/32 → 512-dim vectors", color: "pink" },
              { icon: Database, label: "Weaviate Vector DB", desc: "HNSW Index + Cosine Similarity", color: "cyan" },
              { icon: BarChart3, label: "Ranking Module", desc: "Weighted scoring → Top 10 results", color: "orange" },
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
                  <ArrowRight className="h-4 w-4 text-gray-400 hidden md:block" />
                )}
              </div>
            ))}
          </div>

          {/* Project Structure */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">Project Structure</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`omnisearch/
├── main.py                      # FastAPI application
├── api/
│   └── search.py               # Search endpoints
├── services/
│   ├── clip_service.py         # CLIP embedding service
│   ├── search_service.py       # Vector search orchestration
│   └── ranking.py              # Re-ranking and scoring logic
├── db/
│   ├── mongodb.py              # MongoDB products collection
│   ├── user_service.py         # User profile service
│   └── weaviate_client.py      # Weaviate vector DB client
├── models/
│   ├── product.py              # Product schemas
│   ├── user.py                 # User profile schemas
│   └── search.py               # API request/response models
├── frontend/                    # TypeScript frontend
└── tests/                       # Test suites`}</code>
            </pre>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
              <Server className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </span>
            API Endpoints
          </h2>

          <div className="space-y-6">
            {/* Text Search */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded text-xs font-mono">POST</span>
                /search/text
              </h3>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300">{`curl -X POST "http://localhost:8000/search/text" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "red athletic shoes",
    "top_k": 10,
    "category": "footwear",
    "color": "red"
  }'`}</code>
                </pre>
              </div>
            </div>

            {/* Image Search */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded text-xs font-mono">POST</span>
                /search/image
              </h3>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300">{`curl -X POST "http://localhost:8000/search/image?top_k=5" \\
  -F "file=@path/to/product_image.jpg"`}</code>
                </pre>
              </div>
            </div>

            {/* Response */}
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-3">Response</h3>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300">{`{
  "query": "red athletic shoes",
  "results": [
    {
      "product_id": "PROD-001",
      "title": "Red Running Shoes",
      "description": "Lightweight running shoes",
      "color": "red",
      "category": "footwear",
      "image_path": "/images/products/shoes-001.jpg",
      "similarity": 0.8542,
      "debug_scores": {
        "vector_score": 0.85,
        "color_score": 0.2,
        "category_score": 0.2,
        "final_score": 0.86
      }
    }
  ],
  "total_results": 10
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* User Profiles */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
              <User className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            </span>
            User Profile System
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            OmniSearch includes a user profile system to track preferences and purchase history for personalized recommendations.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-sm text-gray-400 font-mono">User Profile Schema</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{`{
  "user_id": "USER-001",
  "past_purchases": [
    "Blue Running Shoes",
    "Cotton T-Shirt"
  ],
  "preferred_colors": ["blue", "black"],
  "preferred_categories": ["footwear"],
  "price_range": {
    "min": 20,
    "max": 200
  }
}`}</code>
              </pre>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-black dark:text-white">Core Functions</h4>
              {[
                { func: "create_user_profile()", desc: "Create new user with preferences" },
                { func: "get_user_profile()", desc: "Retrieve user profile by user_id" },
                { func: "update_preferences()", desc: "Update colors, categories, price" },
                { func: "add_purchase()", desc: "Record product purchase history" },
              ].map((item) => (
                <div key={item.func} className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <code className="text-xs bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 px-2 py-1 rounded">{item.func}</code>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Design Decisions */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
              <Settings className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </span>
            Key Design Decisions
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Manual Vectorization", desc: "Embeddings generated offline and stored, avoiding runtime CLIP inference overhead" },
              { title: "Two-Stage Ranking", desc: "Vector retrieval for recall, custom scoring for precision" },
              { title: "Configurable Weights", desc: "Fusion and ranking weights can be tuned per use case" },
              { title: "Debug Mode", desc: "Transparent scoring breakdown for explainability" },
              { title: "Filter-First Strategy", desc: "Server-side filtering reduces candidates before re-ranking" },
              { title: "HNSW Indexing", desc: "Fast approximate nearest neighbor search for scalability" },
            ].map((decision) => (
              <div key={decision.title} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-black dark:text-white text-sm">{decision.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{decision.desc}</p>
                  </div>
                </div>
              </div>
            ))}
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Python", desc: "Backend (93%)" },
              { name: "FastAPI", desc: "API Framework" },
              { name: "CLIP", desc: "OpenAI ViT-B/32" },
              { name: "Weaviate", desc: "Vector Database" },
              { name: "MongoDB", desc: "Product Metadata" },
              { name: "TypeScript", desc: "Frontend (6%)" },
              { name: "Docker", desc: "Containerization" },
              { name: "HNSW", desc: "ANN Indexing" },
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
            <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
            </span>
            Quick Start
          </h2>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">Terminal</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`# Clone the repository
git clone https://github.com/HustleDanie/OmniSearch-A-Multimodal-Retrieval-and-Ranking-System-for-Cross-Modal-E-Commerce-Product-Discovery
cd OmniSearch-A-Multimodal-Retrieval-and-Ranking-System-for-Cross-Modal-E-Commerce-Product-Discovery

# Install dependencies
pip install -r requirements.txt

# Start the API server
python main.py
# Or using uvicorn directly:
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Access the application
# API: http://localhost:8000
# Swagger Docs: http://localhost:8000/docs
# ReDoc: http://localhost:8000/redoc`}</code>
            </pre>
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-gray-200 dark:border-gray-800 text-center">
          <h3 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-4">
            🔍 Build Intelligent Product Search
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            Explore the full source code, architecture documentation, and API examples to build your own multimodal search system.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://github.com/HustleDanie/OmniSearch-A-Multimodal-Retrieval-and-Ranking-System-for-Cross-Modal-E-Commerce-Product-Discovery" target="_blank">
              <Button size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
            <Link href="https://github.com/HustleDanie/OmniSearch-A-Multimodal-Retrieval-and-Ranking-System-for-Cross-Modal-E-Commerce-Product-Discovery#readme" target="_blank">
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
