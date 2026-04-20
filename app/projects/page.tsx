"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

function TechIcon({ name, logo, className }: { name: string; logo: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-[8px] sm:text-[10px] font-bold text-gray-600 dark:text-gray-300 font-space-mono ${className}`}>
        {initials}
      </div>
    )
  }

  return (
    <img
      src={logo}
      alt={name}
      className={`opacity-70 hover:opacity-100 transition-opacity ${className}`}
      onError={() => setFailed(true)}
    />
  )
}

const categories = [
  { id: "cinematic-ai", label: "Cinematic AI", mobileLabel: "Cinematic AI" },
  { id: "workflow-automation", label: "Workflow Automation", mobileLabel: "Automation" },
  { id: "ai-ml", label: "AI / ML", mobileLabel: "AI / ML" },
]

type Project = {
  id: string
  title: string
  description: string
  image: string
  github: string
  link: string
  techStack: { name: string; logo: string }[]
}

const projectsByCategory: Record<string, Project[]> = {
  "cinematic-ai": [],
  "workflow-automation": [
    {
      id: "linkedin-ai-job-alert",
      title: "LinkedIn AI Job Alert Pipeline",
      description: "Automated n8n workflow that scrapes LinkedIn for remote AI/ML internships across 6 countries, scores with GPT-4o-mini, and sends alerts to Telegram.",
      image: "/images/linkedin-job-alert.png",
      github: "https://github.com/HustleDanie/LinkedIn-AI-Job-Alert-Pipeline",
      link: "/projects/linkedin-ai-job-alert",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "Apify", logo: "https://cdn.simpleicons.org/apify/00C853" },
        { name: "Telegram", logo: "https://cdn.simpleicons.org/telegram/26A5E4" },
        { name: "Google Sheets", logo: "https://cdn.simpleicons.org/googlesheets/34A853" },
      ],
    },
    // Deterministic Automation
    {
      id: "lead-generation-engine",
      title: "Lead Capture → CRM Pipeline",
      description: "Robust lead generation engine automating high-intent prospect processing through multi-step enrichment via Clearbit/Apollo, CRM storage in HubSpot/Salesforce, and real-time Slack notifications.",
      image: "/images/leadgeneration.png",
      github: "https://github.com/HustleDanie/lead-generation-engine",
      link: "/projects/lead-generation-engine",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
        { name: "Slack", logo: "https://cdn.simpleicons.org/slack/4A154B" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
      ],
    },
    {
      id: "multi-system-data-sync",
      title: "Multi-System Data Sync",
      description: "Bidirectional synchronization between CRMs, spreadsheets, email platforms, and project tools — Salesforce ↔ Google Sheets, HubSpot ↔ Airtable with conflict resolution.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/multi-system-data-sync",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "Google Sheets", logo: "https://cdn.simpleicons.org/googlesheets/34A853" },
        { name: "Airtable", logo: "https://cdn.simpleicons.org/airtable/18BFFF" },
        { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce/00A1E0" },
      ],
    },
    {
      id: "email-triage-automation",
      title: "Email Triage Automation",
      description: "Production-grade n8n workflow turning a shared inbox into a classified, routed ticketing pipeline — GPT-4o-mini classification, RFC-3834 loop prevention, confidence-threshold human review, and thread-aware auto-replies.",
      image: "/images/emailparsing.png",
      github: "https://github.com/HustleDanie/Email-Triage-Automation",
      link: "/projects/email-triage-automation",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "Gmail", logo: "https://cdn.simpleicons.org/gmail/EA4335" },
        { name: "Zendesk", logo: "https://cdn.simpleicons.org/zendesk/03363D" },
        { name: "Slack", logo: "https://cdn.simpleicons.org/slack/4A154B" },
      ],
    },
    {
      id: "sales-pipeline-automation",
      title: "Sales Pipeline & Lead Scoring",
      description: "Account scoring based on defined matrices, automated follow-up sequences triggered by pipeline stage changes, and reporting dashboards for sales teams.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/sales-pipeline-automation",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
        { name: "Google Sheets", logo: "https://cdn.simpleicons.org/googlesheets/34A853" },
        { name: "Slack", logo: "https://cdn.simpleicons.org/slack/4A154B" },
      ],
    },
    {
      id: "webhook-api-integration",
      title: "Webhook API Integration",
      description: "Connecting non-native SaaS tools via webhook-based pipelines — CloudTalk → GoHighLevel, Typeform → Airtable → Slack, Cal.com → CRM with conversion tracking.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/webhook-api-integration",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "Webhook", logo: "https://cdn.simpleicons.org/webhook/C73D1A" },
        { name: "Airtable", logo: "https://cdn.simpleicons.org/airtable/18BFFF" },
        { name: "Slack", logo: "https://cdn.simpleicons.org/slack/4A154B" },
      ],
    },
    {
      id: "reporting-analytics-aggregation",
      title: "Reporting & Analytics Aggregation",
      description: "Pulling metrics from Facebook Ads, Google Analytics, Instagram, LinkedIn, and TikTok into a single formatted Slack/email dashboard report on schedule.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/reporting-analytics-aggregation",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "Google Analytics", logo: "https://cdn.simpleicons.org/googleanalytics/E37400" },
        { name: "Slack", logo: "https://cdn.simpleicons.org/slack/4A154B" },
        { name: "Gmail", logo: "https://cdn.simpleicons.org/gmail/EA4335" },
      ],
    },
    {
      id: "ecommerce-order-management",
      title: "E-Commerce Order Management",
      description: "Shopify/WooCommerce order notifications, inventory threshold alerts, Stripe → QuickBooks receipt automation, and shipping status updates via email or WhatsApp.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/ecommerce-order-management",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "Shopify", logo: "https://cdn.simpleicons.org/shopify/7AB55C" },
        { name: "Stripe", logo: "https://cdn.simpleicons.org/stripe/635BFF" },
        { name: "WhatsApp", logo: "https://cdn.simpleicons.org/whatsapp/25D366" },
      ],
    },
    {
      id: "employee-onboarding-automation",
      title: "Employee Onboarding Automation",
      description: "Account provisioning across Google Workspace, Slack, Notion, and GitHub with document distribution, training material delivery, and IT asset tracking.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/employee-onboarding-automation",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "Google", logo: "https://cdn.simpleicons.org/google/4285F4" },
        { name: "Slack", logo: "https://cdn.simpleicons.org/slack/4A154B" },
        { name: "Notion", logo: "https://cdn.simpleicons.org/notion/000000" },
      ],
    },
    {
      id: "social-media-crossposting",
      title: "Social Media Cross-Posting",
      description: "Content created once, then reformatted and posted across LinkedIn, Twitter/X, Instagram, Facebook, and Telegram on a schedule with platform-specific formatting.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/social-media-crossposting",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "LinkedIn", logo: "https://cdn.simpleicons.org/linkedin/0A66C2" },
        { name: "Telegram", logo: "https://cdn.simpleicons.org/telegram/26A5E4" },
        { name: "Instagram", logo: "https://cdn.simpleicons.org/instagram/E4405F" },
      ],
    },
    {
      id: "n8n-migration-setup",
      title: "n8n Migration & Setup",
      description: "Self-hosted n8n setup on VPS with Docker, plus full workflow migration from Zapier/Make — including workflow translation, testing, and production deployment.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/n8n-migration-setup",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
        { name: "DigitalOcean", logo: "https://cdn.simpleicons.org/digitalocean/0080FF" },
        { name: "Nginx", logo: "https://cdn.simpleicons.org/nginx/009639" },
      ],
    },
    // AI-Powered Automation
    {
      id: "rag-customer-support",
      title: "RAG Customer Support Chatbot",
      description: "Production AI chatbot answering from internal knowledge bases using Supabase/Pinecone vector search, OpenAI embeddings, and hallucination guardrails — automating 70% of tickets.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/rag-customer-support",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase/3FCF8E" },
        { name: "Pinecone", logo: "https://cdn.simpleicons.org/pinecone/000000" },
      ],
    },
    {
      id: "ai-lead-enrichment-outreach",
      title: "AI Lead Enrichment & Outreach",
      description: "Deep personalization outreach using Apollo and Apify for prospect research, Perplexity for company analysis, and GPT-4o for hyper-personalized cold emails with A/B testing.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/ai-lead-enrichment-outreach",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "Apify", logo: "https://cdn.simpleicons.org/apify/00C853" },
        { name: "Gmail", logo: "https://cdn.simpleicons.org/gmail/EA4335" },
      ],
    },
    {
      id: "multi-agent-orchestration",
      title: "Multi-Agent Orchestration",
      description: "CEO orchestrator agent delegating to specialized sub-agents — marketing, operations, finance — to generate comprehensive sales plans and market analyses.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/multi-agent-orchestration",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
        { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase/3FCF8E" },
      ],
    },
    {
      id: "ai-email-triage",
      title: "AI Email Triage & Inbox Management",
      description: "LLM-powered email classification by intent and urgency, action item extraction, response drafting for human review, and intelligent team routing with human-in-the-loop.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/ai-email-triage",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "Gmail", logo: "https://cdn.simpleicons.org/gmail/EA4335" },
        { name: "Slack", logo: "https://cdn.simpleicons.org/slack/4A154B" },
      ],
    },
    {
      id: "ai-voice-agent",
      title: "AI Voice Agent for Booking & Sales",
      description: "AI agent handling inbound calls via Vapi, qualifying leads through natural conversation, booking appointments on Calendly, and updating CRMs automatically.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/ai-voice-agent",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "Twilio", logo: "https://cdn.simpleicons.org/twilio/F22F46" },
        { name: "Google Calendar", logo: "https://cdn.simpleicons.org/googlecalendar/4285F4" },
      ],
    },
    {
      id: "ai-content-pipeline",
      title: "AI Content Generation Pipeline",
      description: "End-to-end system: topic research via Perplexity → outline with Claude → content with GPT-4 → images with DALL-E → SEO optimization → WordPress publishing → social distribution.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/ai-content-pipeline",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "WordPress", logo: "https://cdn.simpleicons.org/wordpress/21759B" },
        { name: "Anthropic", logo: "https://cdn.simpleicons.org/anthropic/191919" },
      ],
    },
    {
      id: "document-analysis-extraction",
      title: "Document Analysis & Extraction",
      description: "Processing invoices, contracts, and reports using OCR + AI — structured data extraction, AI summarization, and database entry. Reduces proposal generation from weeks to minutes.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/document-analysis-extraction",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "Google Sheets", logo: "https://cdn.simpleicons.org/googlesheets/34A853" },
        { name: "Airtable", logo: "https://cdn.simpleicons.org/airtable/18BFFF" },
      ],
    },
    {
      id: "ai-competitor-monitoring",
      title: "AI Competitor Monitoring",
      description: "Automated scraping of competitor websites, social media, and ad libraries with AI analysis of positioning, pricing changes, and feature launches — alerts via Slack or Telegram.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/ai-competitor-monitoring",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "Apify", logo: "https://cdn.simpleicons.org/apify/00C853" },
        { name: "Telegram", logo: "https://cdn.simpleicons.org/telegram/26A5E4" },
      ],
    },
    {
      id: "secops-automation",
      title: "Intelligent SecOps Automation",
      description: "Alert enrichment, automated threat triage, and incident response orchestration for security operations — SOAR-style automation saving millions in manual analysis.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/secops-automation",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "Slack", logo: "https://cdn.simpleicons.org/slack/4A154B" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      ],
    },
    {
      id: "deep-research-agent",
      title: "Deep Research Agent",
      description: "Multi-step AI agent mining data from multiple sources, cross-referencing findings, and producing structured research reports for competitive analysis, market research, and due diligence.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/deep-research-agent",
      techStack: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/EA4B71" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "Apify", logo: "https://cdn.simpleicons.org/apify/00C853" },
        { name: "Google Sheets", logo: "https://cdn.simpleicons.org/googlesheets/34A853" },
      ],
    },
  ],
  "ai-ml": [
    {
      id: "omnisearch",
      title: "OmniSearch",
      description: "Multimodal product discovery engine using CLIP embeddings. Search with text, images, or both for cross-modal e-commerce search.",
      image: "/images/omnisearch.png",
      github: "https://github.com/HustleDanie/OmniSearch-A-Multimodal-Retrieval-and-Ranking-System-for-Cross-Modal-E-Commerce-Product-Discovery",
      link: "/projects/omnisearch",
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
      title: "MedSecure",
      description: "HIPAA-compliant medical document summarization platform with automatic PII masking and AI-powered summarization.",
      image: "/images/medsecure.png",
      github: "https://github.com/HustleDanie/MedSecure---HIPAA-Compliant-Medical-Summary-Platform-",
      link: "/projects/medsecure",
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
      title: "Enterprise Knowledge Retrieval",
      description: "Production-ready GenAI/MLOps platform for enterprise document search, synthesis, and RAG pipelines with hybrid search.",
      image: "/images/retrieval.png",
      github: "https://github.com/HustleDanie/Enterprise-Knowledge-Retrieval-Synthesis-Platform",
      link: "/projects/knowledge-retrieval",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
        { name: "Pinecone", logo: "https://cdn.simpleicons.org/pinecone/000000" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      ],
    },
    {
      id: "production-rag-pipeline",
      title: "Production RAG Pipeline",
      description: "Document Q&A system using LlamaIndex + Pinecone + FastAPI with a full RAGAS evaluation layer scoring faithfulness, relevance, and context precision.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/production-rag-pipeline",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
        { name: "Pinecone", logo: "https://cdn.simpleicons.org/pinecone/000000" },
        { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      ],
    },
    {
      id: "llm-fine-tuning-system",
      title: "LLM Fine-Tuning System",
      description: "Domain-specific Llama 3 fine-tuning pipeline using QLoRA via Hugging Face PEFT with before/after benchmarks and MLflow experiment tracking.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/llm-fine-tuning-system",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
        { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
        { name: "MLflow", logo: "https://cdn.simpleicons.org/mlflow/0194E2" },
      ],
    },
    {
      id: "multilingual-sentiment-api",
      title: "Multilingual Sentiment API",
      description: "Sentiment analysis system handling English + African languages (Yoruba/Hausa) using mBERT/XLM-R, served via FastAPI and deployed on GCP.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/multilingual-sentiment-api",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
        { name: "Google Cloud", logo: "https://cdn.simpleicons.org/googlecloud/4285F4" },
      ],
    },
    {
      id: "conversational-ai-agent",
      title: "Conversational AI Agent",
      description: "Multi-turn conversational agent using LangChain with persistent Redis memory, web search and calculator tools, deployed as a WhatsApp bot via Twilio.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/conversational-ai-agent",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
        { name: "Redis", logo: "https://cdn.simpleicons.org/redis/DC382D" },
        { name: "Twilio", logo: "https://cdn.simpleicons.org/twilio/F22F46" },
      ],
    },
    {
      id: "llm-eval-toolkit",
      title: "LLM Eval & Red-Teaming Toolkit",
      description: "Automated LLM evaluation toolkit testing for hallucination rate, toxicity, bias, and prompt injection vulnerability with structured report cards.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/llm-eval-toolkit",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
        { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
      ],
    },
    {
      id: "personalization-engine",
      title: "Real-Time Personalization Engine",
      description: "Hybrid recommendation system using collaborative filtering + content-based approach with sub-100ms latency and A/B testing simulation.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/personalization-engine",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
        { name: "Redis", logo: "https://cdn.simpleicons.org/redis/DC382D" },
      ],
    },
    {
      id: "semantic-search-engine",
      title: "Semantic Search Engine",
      description: "Meaning-based search system using FAISS vector embeddings + fine-tuned bi-encoder, indexing large public datasets with a clean UI.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/semantic-search-engine",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
        { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
      ],
    },
    {
      id: "object-detection-pipeline",
      title: "Real-Time Object Detection",
      description: "End-to-end computer vision pipeline using YOLOv8 with custom dataset training, inference optimization, and live video stream demo.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/object-detection-pipeline",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
        { name: "OpenCV", logo: "https://cdn.simpleicons.org/opencv/5C3EE8" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
      ],
    },
    {
      id: "medical-image-classification",
      title: "Medical Image Classification",
      description: "CNN trained on public medical imaging dataset with Grad-CAM explainability for interpretable predictions, deployed with Streamlit interface.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/medical-image-classification",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "TensorFlow", logo: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
        { name: "Streamlit", logo: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
        { name: "OpenCV", logo: "https://cdn.simpleicons.org/opencv/5C3EE8" },
      ],
    },
    {
      id: "document-intelligence",
      title: "Document Intelligence System",
      description: "Structured data extraction from unstructured documents using PaddleOCR + LLM post-processing, outputting structured JSON via API.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/document-intelligence",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      ],
    },
    {
      id: "mlops-pipeline",
      title: "End-to-End MLOps Pipeline",
      description: "Complete ML lifecycle system — data ingestion, training, evaluation, model registry, deployment, and drift monitoring using MLflow + GitHub Actions CI/CD.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/mlops-pipeline",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "MLflow", logo: "https://cdn.simpleicons.org/mlflow/0194E2" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
        { name: "GitHub Actions", logo: "https://cdn.simpleicons.org/githubactions/2088FF" },
      ],
    },
    {
      id: "model-serving-infra",
      title: "Model Serving Infrastructure",
      description: "Multi-model serving system with request queuing, load balancing, and auto-scaling using FastAPI + Celery + Redis + Docker Compose.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/model-serving-infra",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
        { name: "Redis", logo: "https://cdn.simpleicons.org/redis/DC382D" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      ],
    },
    {
      id: "model-monitoring-system",
      title: "Model Monitoring & Retraining",
      description: "Automated model monitoring for data drift and performance degradation with auto-retraining using Evidently AI + MLflow + Airflow.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/model-monitoring-system",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "MLflow", logo: "https://cdn.simpleicons.org/mlflow/0194E2" },
        { name: "Apache Airflow", logo: "https://cdn.simpleicons.org/apacheairflow/017CEE" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      ],
    },
    {
      id: "text-to-image-pipeline",
      title: "Text-to-Image Generation",
      description: "Fine-tuned Stable Diffusion on custom style/domain using DreamBooth/LoRA with prompt engineering guardrails and web UI.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/text-to-image-pipeline",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
        { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
      ],
    },
    {
      id: "multimodal-product-search",
      title: "Multimodal Product Search",
      description: "Text-or-image search system using CLIP embeddings + FAISS with proper deployment, benchmarks, and documentation for e-commerce AI.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/multimodal-product-search",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
        { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
      ],
    },
    {
      id: "video-analysis-pipeline",
      title: "AI Video Analysis Pipeline",
      description: "Video processing system that extracts key frames, runs object detection and scene description using vision-language models, outputs structured summaries.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/video-analysis-pipeline",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
        { name: "OpenCV", logo: "https://cdn.simpleicons.org/opencv/5C3EE8" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
      ],
    },
    {
      id: "clinical-nlp-system",
      title: "Clinical NLP Extraction",
      description: "Clinical notes processing system extracting structured medical entities — diagnoses, medications, dosages, symptoms — using fine-tuned BioBERT/ClinicalBERT.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/clinical-nlp-system",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
        { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
      ],
    },
    {
      id: "health-risk-prediction",
      title: "Health Risk Prediction API",
      description: "Disease risk prediction using gradient boosting + neural network ensemble on public health data with SHAP explainability via FastAPI.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/health-risk-prediction",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "scikit-learn", logo: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
        { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
      ],
    },
    {
      id: "multi-agent-code-review",
      title: "Multi-Agent Code Review",
      description: "Multi-agent system using LangGraph where specialized agents check for bugs, security vulnerabilities, and synthesize review reports as a GitHub Action.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/multi-agent-code-review",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
        { name: "GitHub Actions", logo: "https://cdn.simpleicons.org/githubactions/2088FF" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
      ],
    },
    {
      id: "autonomous-research-agent",
      title: "Autonomous Research Agent",
      description: "Agent that takes research questions, searches the web, reads papers, synthesizes findings, and produces structured reports with citations.",
      image: "/images/placeholder.png",
      github: "#",
      link: "/projects/autonomous-research-agent",
      techStack: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/10A37F" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
      ],
    },
  ],
}

function ProjectsPageContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const validCategories = categories.map(c => c.id)
  const initialCategory = categoryParam && validCategories.includes(categoryParam) ? categoryParam : "cinematic-ai"
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  const currentProjects = projectsByCategory[activeCategory] || []

  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white">
              Projects
            </h1>
            <div className="w-12 md:w-20 h-1 bg-black dark:bg-white mx-auto"></div>
          </div>

          {/* Category Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-6 md:mb-12"
          >
            <div className="relative inline-flex items-center bg-gray-200 dark:bg-gray-800 rounded-full p-0.5 md:p-1 border border-gray-300 dark:border-gray-700">
              {/* Sliding indicator */}
              <motion.div
                className="absolute top-0.5 md:top-1 bottom-0.5 md:bottom-1 rounded-full bg-gray-500 dark:bg-gray-600"
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  width: `calc(${100 / categories.length}% - 4px)`,
                  left: `calc(${(categories.findIndex(c => c.id === activeCategory) * 100) / categories.length}% + 2px)`,
                }}
              />
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative z-10 px-3 md:px-6 py-1.5 md:py-2.5 rounded-full font-space-mono text-[10px] md:text-sm font-medium transition-colors duration-200 min-w-[100px] md:min-w-[160px] ${
                    activeCategory === category.id
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <span className="hidden md:inline">{category.label}</span>
                  <span className="md:hidden">{category.mobileLabel}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              {currentProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full bg-white dark:bg-card border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/50">
                    {/* Project Image */}
                    <Link href={project.link}>
                      <div className="relative h-40 sm:h-48 md:h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                        <img
                          src={project.image || "/placeholder-logo.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-logo.svg"
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </Link>

                    {/* Project Content */}
                    <div className="p-4 sm:p-5 md:p-6">
                      <Link href={project.link}>
                        <h3 className="font-orbitron text-base sm:text-lg md:text-xl font-bold text-black dark:text-white mb-2 sm:mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="font-space-mono text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Stack Icons */}
                      <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        {project.techStack.map((tech) => (
                          <div
                            key={tech.name}
                            className="relative group/tech"
                          >
                            <TechIcon
                              name={tech.name}
                              logo={tech.logo}
                              className="w-5 h-5 sm:w-6 sm:h-6"
                            />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-space-mono rounded opacity-0 group-hover/tech:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800">
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-space-mono text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">View on GitHub</span>
                          <span className="sm:hidden">GitHub</span>
                        </Link>
                        <Link
                          href={project.link}
                          className="flex items-center gap-1 text-xs sm:text-sm font-space-mono text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                          <span>Details</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProjectsPageContent />
    </Suspense>
  )
}
