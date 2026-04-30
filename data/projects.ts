export type TechItem = { name: string; logo: string }

export type Project = {
  id: string
  category: "workflow-automation" | "ai-ml"
  title: string
  description: string
  summary: string
  highlights: string[]
  image: string
  github: string
  techStack: TechItem[]
}

export const projects: Project[] = [
  {
    id: "n8n-claude-kit",
    category: "workflow-automation",
    title: "n8n Claude Kit",
    description:
      "Zero-to-workflow n8n scaffolding for Claude Code. Bundles 7 n8n skills, 3 subagents, and a /n8n-init slash command that bootstraps a ready-to-build n8n project in under 90 seconds.",
    summary:
      "A bootstrapping toolkit that turns Claude Code into a competent n8n collaborator. Wraps the n8n-mcp server with curated knowledge about n8n's node ecosystem and ships pre-loaded subagents for workflow planning, validation, and deployment. Cuts the setup tax from hours to minutes.",
    highlights: [
      "Seven specialized skills covering node configuration, expression syntax, code patterns, validation, and architectural patterns",
      "Three subagents: workflow-builder for greenfield work, workflow-deployer for iteration, workflow-validator for auditing",
      "/n8n-init slash command auto-scaffolds CLAUDE.md, .mcp.json with credentials, and project settings",
      "Plug-and-play install: existing n8n credentials become a Claude-orchestrated workflow lab in under 90 seconds",
    ],
    image: "/images/n8nclaudekit.png",
    github: "https://github.com/HustleDanie/n8n-claude-kit",
    techStack: [
      { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
      { name: "Claude", logo: "https://cdn.simpleicons.org/anthropic/191919" },
      { name: "MCP", logo: "https://cdn.simpleicons.org/modelcontextprotocol/000000" },
      { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
    ],
  },
  {
    id: "linkedin-ai-job-alert",
    category: "workflow-automation",
    title: "LinkedIn AI Job Alert Pipeline",
    description:
      "Automated n8n workflow that scrapes LinkedIn for remote AI/ML internships across 6 countries, scores with GPT-4o-mini, and sends alerts to Telegram.",
    summary:
      "A scheduled n8n workflow that scans LinkedIn for AI/ML internship listings across multiple regions, scores each role's fit using an LLM, and pushes only the relevant ones to Telegram. Built to replace the daily LinkedIn-scrolling habit with a one-message-per-day shortlist.",
    highlights: [
      "Apify-powered LinkedIn scraping across six countries with role and location filters",
      "GPT-4o-mini scoring of role fit against a personal criteria profile",
      "Deduplication against a Google Sheets log of previously surfaced listings",
      "Telegram bot integration delivers the daily shortlist with apply links",
      "Cron-scheduled with configurable cadence and per-region throttling",
    ],
    image: "/images/linkedin-job-alert.png",
    github: "https://github.com/HustleDanie/LinkedIn-AI-Job-Alert-Pipeline",
    techStack: [
      { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
      { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
      { name: "Apify", logo: "https://cdn.simpleicons.org/apify/00C853" },
      { name: "Telegram", logo: "https://cdn.simpleicons.org/telegram/26A5E4" },
      { name: "Google Sheets", logo: "https://cdn.simpleicons.org/googlesheets/34A853" },
    ],
  },
  {
    id: "lead-generation-engine",
    category: "workflow-automation",
    title: "Lead Capture → CRM Pipeline",
    description:
      "Robust, scalable lead generation engine that automates processing of high-intent prospects through multi-step enrichment via Clearbit/Apollo, CRM storage in HubSpot/Salesforce, and real-time Slack team notifications.",
    summary:
      "An n8n pipeline that catches inbound leads from any source, enriches them with firmographic data, and routes the result into the right CRM and Slack channel. Handles deduplication, scoring, and human handoff so sales ops doesn't have to.",
    highlights: [
      "Multi-source intake: web forms, email parsing, calendar bookings, and paid-ad webhooks",
      "Two-stage enrichment via Clearbit and Apollo with fallback resolution rules",
      "GPT-4o-mini lead scoring against configurable qualification thresholds",
      "HubSpot or Salesforce contact and deal creation in a single transactional step",
      "Real-time Slack notifications routed to the assigned AE based on territory rules",
    ],
    image: "/images/leadgeneration.png",
    github: "https://github.com/HustleDanie/lead-generation-engine",
    techStack: [
      { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
      { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
      { name: "Slack", logo: "https://cdn.simpleicons.org/slack/4A154B" },
      { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
    ],
  },
  {
    id: "email-triage-automation",
    category: "workflow-automation",
    title: "Email Triage Automation",
    description:
      "Production-grade n8n workflow that turns a shared inbox into a classified, routed ticketing pipeline — GPT-4o-mini classification, confidence-threshold human review, RFC-3834 loop prevention, and thread-aware auto-replies into Gmail, HubSpot, Zendesk, and Slack.",
    summary:
      "An inbox-to-ticket pipeline that turns a shared email address into a properly classified, routed support stream. Uses GPT-4o-mini for intent classification with confidence-threshold human review and full thread-aware reply handling.",
    highlights: [
      "Classification by intent, urgency, and recipient team using structured LLM outputs",
      "Confidence threshold automatically escalates borderline cases for human review",
      "RFC-3834 auto-reply loop prevention to stop bot-on-bot conversations",
      "Thread-aware replies that pull message history into the model's context window",
      "Routing destinations across Gmail, HubSpot, Zendesk, and Slack from a single workflow",
    ],
    image: "/images/emailparsing.png",
    github: "https://github.com/HustleDanie/Email-Triage-Automation",
    techStack: [
      { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
      { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
      { name: "Gmail", logo: "https://cdn.simpleicons.org/gmail/EA4335" },
      { name: "Zendesk", logo: "https://cdn.simpleicons.org/zendesk/03363D" },
      { name: "Slack", logo: "https://cdn.simpleicons.org/slack/4A154B" },
    ],
  },
  {
    id: "omnisearch",
    category: "ai-ml",
    title: "OmniSearch",
    description:
      "Multimodal product discovery engine using CLIP embeddings and vector search. Find products using text, images, or both with intelligent two-stage ranking for cross-modal e-commerce search.",
    summary:
      "A multimodal product discovery engine that lets shoppers search with text, an image, or both at the same time. Built around CLIP embeddings indexed in Weaviate, with a two-stage retrieve-then-rerank pipeline tuned for cross-modal e-commerce.",
    highlights: [
      "CLIP encoder produces a shared embedding space for text and product imagery",
      "Weaviate vector index with hybrid search across modality and structured metadata",
      "Two-stage architecture: bi-encoder retrieval, cross-encoder reranking",
      "FastAPI service supports batch ingestion and incremental catalog updates",
      "Benchmarked against single-modality baselines on a custom evaluation set",
    ],
    image: "/images/omnisearch.png",
    github:
      "https://github.com/HustleDanie/OmniSearch-A-Multimodal-Retrieval-and-Ranking-System-for-Cross-Modal-E-Commerce-Product-Discovery",
    techStack: [
      { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
      { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
      { name: "Weaviate", logo: "https://cdn.simpleicons.org/weaviate/00D1A0" },
      { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
    ],
  },
  {
    id: "medsecure",
    category: "ai-ml",
    title: "MedSecure",
    description:
      "HIPAA-compliant medical document summarization platform with automatic PII masking, medical entity extraction, AI-powered summarization using Llama-3, and hallucination verification for secure patient data processing.",
    summary:
      "A HIPAA-compliant pipeline for medical document summarization. Strips PII at ingestion, extracts clinical entities, summarizes with Llama-3, and runs a verification pass that catches hallucinations before output reaches the patient or clinician.",
    highlights: [
      "Two-pass PII masking: regex rules layered with a named-entity classifier",
      "Clinical entity extraction across diagnoses, medications, dosages, and symptoms",
      "Llama-3 fine-tuned summarization on de-identified clinical notes",
      "Hallucination verification using NLI checks against the source document",
      "PostgreSQL audit log of every input, output, and reviewer override for compliance",
    ],
    image: "/images/medsecure.png",
    github: "https://github.com/HustleDanie/MedSecure---HIPAA-Compliant-Medical-Summary-Platform-",
    techStack: [
      { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
      { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
      { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
    ],
  },
  {
    id: "knowledge-retrieval",
    category: "ai-ml",
    title: "Enterprise Knowledge Retrieval",
    description:
      "Production-ready GenAI/MLOps platform for enterprise document search, synthesis, and RAG pipelines with hybrid search across multiple document types.",
    summary:
      "An enterprise GenAI platform for document search and synthesis with citation-grounded answers. Combines hybrid retrieval, an evaluation harness, and a deployment story for production-grade RAG over heterogeneous document types.",
    highlights: [
      "Hybrid retrieval blends BM25 keyword search with Pinecone vector search via reciprocal rank fusion",
      "Document parsing across PDFs, Word, Confluence, and SharePoint with structure preservation",
      "LLM synthesis returns answers with inline citations and confidence indicators",
      "Evaluation harness scores faithfulness, relevance, and context precision against held-out sets",
      "Containerized deployment with Helm charts and observability hooks for production rollout",
    ],
    image: "/images/retrieval.png",
    github: "https://github.com/HustleDanie/Enterprise-Knowledge-Retrieval-Synthesis-Platform",
    techStack: [
      { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
      { name: "Pinecone", logo: "https://cdn.simpleicons.org/pinecone/000000" },
      { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
      { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
    ],
  },
]

export const projectsByCategory = projects.reduce<Record<string, Project[]>>((acc, project) => {
  if (!acc[project.category]) acc[project.category] = []
  acc[project.category].push(project)
  return acc
}, {})
