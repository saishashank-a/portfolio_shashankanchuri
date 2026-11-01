export type ExperienceItem = {
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: 'Nextenti Tech',
    role: 'Software Development Engineer - I',
    period: 'Feb 2026 – Present',
    location: 'Hyderabad',
    bullets: [
      'Lead a 6-engineer team (4 interns converted to full-time) building a multi-tenant healthcare ATS on Next.js, FastAPI and PostgreSQL, live with a major hospital network as the first enterprise client.',
      'Built AI candidate matching and ranking that scores applicants against job requirements, served over REST APIs.',
      'Designed tenant isolation on shared PostgreSQL with Row Level Security, enforcing access at the database layer.',
      'Built a platform-level AI screening chatbot as a standalone service (rules plus LLM intent routing, RAG over a healthcare corpus) serving 50+ daily sessions; tuned its MongoDB store with compound indexes.',
      'Added AI-driven end-to-end QA (my open-source Claude Code plugin) to releases, catching 10+ pre-release bugs.',
    ],
  },
  {
    company: 'Independent AI Consultant',
    role: 'Self-Employed (Singapore-based client)',
    period: 'Oct 2025 – Present',
    location: 'Remote',
    bullets: [
      'Built anomaly detection over VMware error logs to flag emerging failures early, owned end to end.',
      'Added a RAG layer that retrieves similar past incidents and generates suggested fixes on a fully local LLM stack (Ollama, Qwen 2.5 14B), removing per-query API spend and keeping client logs on-premises.',
    ],
  },
  {
    company: 'Yellow.ai',
    role: 'AI Developer',
    period: 'Apr 2025 – Sept 2025',
    location: 'Bangalore',
    bullets: [
      'Built LLM customer support bots and internal automation workflows orchestrating LLM calls with microservices.',
      'Designed reusable multi-tenant components across client deployments, cutting per-client build time.',
    ],
  },
  {
    company: 'Secureworks',
    role: 'Salesforce QA Engineer',
    period: 'Oct 2024 – Apr 2025',
    location: 'Hyderabad',
    bullets: [
      'Developed automated and manual test suites validating Salesforce flows and third-party integrations, improved release stability by 30%.',
      'Built reusable test-data frameworks that increased coverage while cutting QA cycle time by 22%.',
    ],
  },
  {
    company: 'Novartis',
    role: 'Associate Business Analyst',
    period: 'Jul 2024 – Sept 2024',
    location: 'Hyderabad',
    bullets: [
      'Automated ETL pipelines for structured and unstructured sources, reducing analyst workload by 40%.',
      'Built PowerBI dashboards surfacing competitive signals, therapeutic area trends, and strategic KPIs.',
    ],
  },
]
