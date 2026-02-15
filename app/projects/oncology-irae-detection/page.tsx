"use client"

import { ArrowLeft, Github, Clock, Calendar, Activity, Brain, Stethoscope, AlertTriangle, Database, FileText, BarChart3, Shield, Heart, Workflow, CheckCircle2, Thermometer, FlaskConical, Cpu, Server, Microscope, ClipboardList, Siren } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function OncologyIrAEPage() {
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
              <Link href="https://github.com/HustleDanie/Oncology-irAE-Detection" target="_blank">
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
              Healthcare AI
            </span>
            <span>•</span>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
              Clinical Decision Support
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              15 min read
            </span>
          </div>
          
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
            🏥 Oncology irAE Clinical Safety Assistant
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            An AI-powered clinical decision support system for detecting, classifying, and triaging immune-related adverse events (irAEs) in oncology immunotherapy patients using MedGemma and multi-organ analysis.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
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
              src="https://www.youtube.com/embed/_J9sUVeCXFI"
              title="Oncology irAE Detection Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Watch the Oncology irAE Clinical Safety Assistant detect and triage immune-related adverse events
          </p>
        </section>

        {/* Safety Disclaimer */}
        <section className="mb-12">
          <div className="p-6 rounded-xl border-2 border-amber-400 dark:border-amber-500 bg-amber-50/50 dark:bg-amber-900/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-orbitron text-lg font-bold text-amber-800 dark:text-amber-300 mb-2">
                  ⚠️ Important Safety Disclaimer
                </h3>
                <p className="text-amber-700 dark:text-amber-400 leading-relaxed text-sm">
                  This tool is designed to <strong>support clinical decision-making, not replace it</strong>. All findings require clinician confirmation. Do not use this system for definitive diagnoses or treatment decisions. All findings must be verified by a qualified clinician.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </span>
            Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Immunotherapy drugs (checkpoint inhibitors like <strong className="text-black dark:text-white">pembrolizumab, nivolumab, and ipilimumab</strong>) have revolutionized cancer treatment. However, they can cause immune-related adverse events (irAEs) affecting multiple organ systems. Early detection and proper classification are crucial for patient safety.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            This assistant helps clinicians:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">Detect</strong> potential irAEs from clinical notes, labs, vitals, and symptoms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">Classify</strong> by organ system (GI, liver, lung, endocrine, skin, neuro, cardiac)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">Grade severity</strong> using CTCAE criteria (Grade 1-4)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">Triage urgency</strong> (routine → emergency)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span><strong className="text-black dark:text-white">Cite</strong> supporting evidence from patient data</span>
            </li>
          </ul>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Brain className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </span>
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: ClipboardList, title: "Multi-source Parsing", desc: "Parse clinical notes, lab values, medications, vitals, symptoms", color: "blue" },
              { icon: Microscope, title: "Organ-Specific Analysis", desc: "Dedicated analyzers for 7 organ systems", color: "purple" },
              { icon: BarChart3, title: "CTCAE Grading", desc: "Standardized severity grading (Grade 1-4)", color: "green" },
              { icon: Siren, title: "Urgency Triage", desc: "🟢 Routine, 🟡 Soon, 🟠 Urgent, 🔴 Emergency", color: "orange" },
              { icon: Brain, title: "MedGemma Integration", desc: "Google's medical LLM for enhanced clinical reasoning", color: "pink" },
              { icon: Server, title: "Streamlit Web Interface", desc: "User-friendly UI for clinicians", color: "cyan" },
            ].map((feature) => (
              <div key={feature.title} className={`p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-${feature.color}-50/50 to-transparent dark:from-${feature.color}-900/10`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900/50 flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className={`h-5 w-5 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Supported Organ Systems */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
              <Heart className="h-4 w-4 text-red-600 dark:text-red-400" />
            </span>
            Supported Organ Systems
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-black dark:text-white">System</th>
                  <th className="text-left py-3 px-4 font-semibold text-black dark:text-white">Key Conditions</th>
                  <th className="text-left py-3 px-4 font-semibold text-black dark:text-white">Key Markers</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { icon: "🫁", system: "Pulmonary", conditions: "Pneumonitis, ILD", markers: "Dyspnea, O2 sat, imaging findings" },
                  { icon: "❤️", system: "Cardiac", conditions: "Myocarditis, arrhythmia", markers: "Troponin, BNP, ECG changes" },
                  { icon: "🧠", system: "Neurologic", conditions: "Neuropathy, Encephalitis", markers: "Weakness pattern, mental status" },
                  { icon: "🍴", system: "GI", conditions: "Colitis, Diarrhea", markers: "Diarrhea frequency, bloody stool, CRP" },
                  { icon: "🫀", system: "Hepatic", conditions: "Hepatitis, cholangitis", markers: "ALT, AST, bilirubin, ALP" },
                  { icon: "🦋", system: "Endocrine", conditions: "Thyroiditis, Hypophysitis", markers: "TSH, T4, cortisol, glucose" },
                  { icon: "🧴", system: "Dermatologic", conditions: "Rash, Dermatitis", markers: "BSA involvement, mucosal lesions" },
                ].map((organ) => (
                  <tr key={organ.system} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-2">
                        <span>{organ.icon}</span>
                        <span className="font-medium text-black dark:text-white">{organ.system}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{organ.conditions}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{organ.markers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">irAE Detection Pipeline</p>
            </div>
            
            {/* Pipeline Visualization */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: FileText, label: "Clinical Input", desc: "Notes, Labs, Vitals", color: "blue" },
                { icon: Database, label: "Parsers", desc: "Data Extraction", color: "purple" },
                { icon: Microscope, label: "Analyzers", desc: "Organ-Specific", color: "green" },
                { icon: Stethoscope, label: "Assessment", desc: "MedGemma LLM", color: "pink" },
              ].map((step, index) => (
                <div key={step.label} className="flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-xl bg-${step.color}-100 dark:bg-${step.color}-900/30 flex items-center justify-center mb-2`}>
                    <step.icon className={`h-6 w-6 text-${step.color}-600 dark:text-${step.color}-400`} />
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">{step.label}</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">{step.desc}</span>
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
              <code className="text-gray-300">{`Oncology/
├── src/
│   ├── models/           # Pydantic data models
│   │   ├── patient.py    # Patient, labs, medications, vitals
│   │   └── assessment.py # irAE assessment, findings, causality
│   ├── parsers/          # Clinical data parsers
│   │   ├── lab_parser.py
│   │   ├── medication_parser.py
│   │   ├── symptom_parser.py
│   │   └── note_parser.py
│   ├── analyzers/        # Organ-specific irAE detection
│   │   ├── gi_analyzer.py
│   │   ├── liver_analyzer.py
│   │   ├── lung_analyzer.py
│   │   ├── cardiac_analyzer.py
│   │   └── ... (7 organ analyzers)
│   └── llm/              # LLM integration
│       ├── client.py     # MedGemma/GPT/Claude client
│       ├── prompts.py    # Clinical prompt templates
│       └── assessment_engine.py
├── app/                  # Streamlit web application
│   ├── main.py          # Application entry point
│   └── pages/           # UI pages
└── fine_tuning/         # Model fine-tuning infrastructure`}</code>
            </pre>
          </div>
        </section>

        {/* CTCAE Severity Grading */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
              <Thermometer className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </span>
            CTCAE Severity Grading
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { grade: 1, label: "Mild", desc: "Asymptomatic or mild symptoms; observation only", color: "green" },
              { grade: 2, label: "Moderate", desc: "Minimal intervention indicated; limiting ADL", color: "yellow" },
              { grade: 3, label: "Severe", desc: "Hospitalization indicated; disabling", color: "orange" },
              { grade: 4, label: "Life-threatening", desc: "Urgent intervention indicated", color: "red" },
            ].map((item) => (
              <div key={item.grade} className={`p-4 rounded-lg border-l-4 border-${item.color}-500 bg-${item.color}-50/50 dark:bg-${item.color}-900/10`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`w-8 h-8 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900/50 flex items-center justify-center font-bold text-${item.color}-600 dark:text-${item.color}-400`}>
                    {item.grade}
                  </span>
                  <span className="font-semibold text-black dark:text-white">{item.label}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 pl-11">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-lg text-black dark:text-white mb-4">Urgency Levels</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Routine", color: "🟢", time: "Days to weeks" },
              { label: "Soon", color: "🟡", time: "24-48 hours" },
              { label: "Urgent", color: "🟠", time: "Same day" },
              { label: "Emergency", color: "🔴", time: "Immediate" },
            ].map((urgency) => (
              <div key={urgency.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <span>{urgency.color}</span>
                <span className="font-medium text-black dark:text-white text-sm">{urgency.label}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">({urgency.time})</span>
              </div>
            ))}
          </div>
        </section>

        {/* Code Example */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
              <FlaskConical className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </span>
            Programmatic Usage
          </h2>

          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">example.py</span>
              <span className="text-xs text-gray-500">Python API</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`from src.models.patient import PatientData, LabResult, Medication
from src.llm.assessment_engine import IRAEAssessmentEngine
from config.settings import Settings

# Initialize the assessment engine
settings = Settings()
engine = IRAEAssessmentEngine(settings)

# Create patient data
patient = PatientData(
    patient_id="P001",
    age=65,
    sex="male",
    labs=[
        LabResult(name="ALT", value=250, unit="U/L", date="2024-01-15"),
        LabResult(name="AST", value=200, unit="U/L", date="2024-01-15"),
    ],
    medications=[
        Medication(
            name="pembrolizumab", 
            dose="200mg", 
            frequency="q3w", 
            start_date="2023-10-01", 
            category="immunotherapy"
        )
    ]
)

# Run assessment
assessment = await engine.assess_patient(patient)

# View results
print(f"irAE Detected: {assessment.irae_detected}")
for finding in assessment.organ_findings:
    print(f"  {finding.organ_system}: {finding.condition}")
    print(f"    Severity: Grade {finding.severity_grade}")
print(f"Urgency: {assessment.urgency_level}")`}</code>
            </pre>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
              <Cpu className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            </span>
            Technology Stack
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Python 3.11+", desc: "Core Language" },
              { name: "MedGemma", desc: "Medical LLM" },
              { name: "Streamlit", desc: "Web Interface" },
              { name: "Pydantic", desc: "Data Validation" },
              { name: "Docker", desc: "Containerization" },
              { name: "OpenAI/Claude", desc: "Alternative LLMs" },
              { name: "FastAPI", desc: "API Server" },
              { name: "Hugging Face", desc: "Model Hosting" },
            ].map((tech) => (
              <div key={tech.name} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center">
                <p className="font-medium text-black dark:text-white text-sm">{tech.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Guidelines */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </span>
            Safety Guidelines
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-900/10">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                This System IS For
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Clinical decision support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Rapid screening and pattern detection
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Educational reference for irAE patterns
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Documentation assistance
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10">
              <h3 className="font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                This System IS NOT For
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Definitive diagnosis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Autonomous treatment decisions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Replacing clinical judgment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Prescribing medications
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-black dark:text-white mb-2">Best Practices:</h4>
            <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
              <li>Always verify findings with clinical examination</li>
              <li>Consider alternative causes (infection, disease progression)</li>
              <li>Document clinical reasoning beyond AI suggestions</li>
              <li>Escalate appropriately based on clinical gestalt</li>
              <li>Report discrepancies to improve the system</li>
            </ol>
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Server className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </span>
            Getting Started
          </h2>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">Terminal</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">{`# Clone the repository
git clone https://github.com/HustleDanie/Oncology-irAE-Detection
cd Oncology-irAE-Detection

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\\Scripts\\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your API keys:
# OPENAI_API_KEY=sk-your-key-here
# ANTHROPIC_API_KEY=sk-ant-your-key-here

# Start the Streamlit application
streamlit run app/main.py

# Then open your browser to http://localhost:8501`}</code>
            </pre>
          </div>
        </section>

        {/* References */}
        <section className="mb-16">
          <h2 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900/50 flex items-center justify-center">
              <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </span>
            Clinical References
          </h2>

          <div className="space-y-3">
            {[
              { title: "ASCO irAE Management Guidelines", url: "https://www.asco.org/" },
              { title: "NCCN Guidelines: Immunotherapy-Related Toxicities", url: "https://www.nccn.org/" },
              { title: "CTCAE v5.0", url: "https://ctep.cancer.gov/protocoldevelopment/electronic_applications/ctc.htm" },
              { title: "SITC Toxicity Management Guidelines", url: "https://www.sitcancer.org/" },
            ].map((ref) => (
              <Link 
                key={ref.title}
                href={ref.url}
                target="_blank"
                className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FileText className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">{ref.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-gray-200 dark:border-gray-800 text-center">
          <h3 className="font-orbitron text-2xl font-bold text-black dark:text-white mb-4">
            🏥 Explore the Clinical Safety Assistant
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            Check out the full source code, documentation, and contribute to improving clinical decision support for oncology care.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://github.com/HustleDanie/Oncology-irAE-Detection" target="_blank">
              <Button size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
            <Link href="https://github.com/HustleDanie/Oncology-irAE-Detection#readme" target="_blank">
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
