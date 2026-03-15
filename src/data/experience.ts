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
      'Built end-to-end AI-powered chatbot for candidate screening using NLP to improve response accuracy and engagement.',
      'Engineered healthcare recruitment portal with secure auth and real-time professional job matching dashboard.',
      'Designed MongoDB schemas and aggregation pipelines for large-scale healthcare talent databases.',
    ],
  },
  {
    company: 'Self-Employed',
    role: 'AI Consultant',
    period: 'Oct 2025 – Present',
    location: 'Hyderabad',
    bullets: [
      'Delivered end-to-end custom AI and software solutions for clients — requirement gathering to deployment.',
      'Developed automation scripts and data pipelines, reducing manual workflow time for client businesses.',
      'Applied prompt engineering and RAG pipelines for lead generation and client funneling.',
    ],
  },
  {
    company: 'Yellow.ai',
    role: 'AI Developer & Business Analyst',
    period: 'Apr 2025 – Sept 2025',
    location: 'Bangalore',
    bullets: [
      'Built modular conversational AI workflows integrating APIs, auth layers, and backend microservices — improved task completion rates by 25%.',
      'Designed scalable bot architectures enabling multi-client reuse, reducing development effort by 20%.',
      'Coordinated with frontend, backend, and design teams to deliver consistent conversational user journeys.',
    ],
  },
  {
    company: 'Secureworks',
    role: 'Salesforce QA Engineer',
    period: 'Oct 2024 – Apr 2025',
    location: 'Hyderabad',
    bullets: [
      'Developed automated and manual test suites validating Salesforce flows and third-party integrations — improved release stability by 30%.',
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
