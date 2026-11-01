export type Project = {
  title: string
  impact?: string
  description: string
  tech: string[]
  github?: string
  demo?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'FramesBond',
    impact: 'AI video editing and publishing studio: finds highlights, cuts them to the beat, ships long-form and Shorts',
    description:
      'Vision-model highlight scoring that rates, tags and filters clips with cost estimates and a spending cap per run. Beat, drop and energy analysis cuts highlights to music; renders long-form videos and vertical Shorts, publishes on a schedule, and runs custom detectors as sandboxed WebAssembly plugins. In progress.',
    tech: ['TypeScript', 'Python', 'Vision LLMs', 'WebAssembly'],
    featured: true,
  },
  {
    title: 'Research Cartographer',
    impact: 'Map a research field from one search, fully local RAG with no API keys',
    description:
      'Retrieves arXiv and OpenAlex papers, reranks with a cross-encoder, then a local LLM extracts structured paper cards and synthesises a field map (clusters, tensions, open problems), streamed live to the UI over SSE.',
    tech: ['FastAPI', 'Next.js', 'Ollama', 'Sentence-Transformers', 'SSE'],
    github: 'https://github.com/saishashank-a/research-cartographer',
    featured: true,
  },
  {
    title: 'Catch Me If You Scan',
    impact: 'Claude Code plugin that QA-tests web apps like a senior manual tester; caught 10+ pre-release bugs in a production ATS',
    description:
      'Derives scenarios from user stories, sweeps UI edge cases, tests multi-role flows, monitors network traffic and files evidence-backed bug reports with Playwright.',
    tech: ['Claude Code', 'Playwright', 'Agents'],
    github: 'https://github.com/saishashank-a/catch-me-if-you-scan',
    featured: true,
  },
  {
    title: 'Spoiled Duckie',
    impact: 'Cinematic e-commerce storefront with animated loading ribbons, smooth-scroll, and full category/product/account flows',
    description:
      'Premium boutique storefront with motion-led UX. Built on Next.js 16 and React 19 with Supabase for data/auth, Framer Motion choreography, and Lenis smooth scrolling.',
    tech: ['Next.js', 'React 19', 'Supabase', 'Framer Motion', 'Tailwind'],
    demo: 'https://spoiled-duckie.vercel.app/',
    featured: true,
  },
  {
    title: 'The Interface Review',
    impact: 'Interactive catalogue of UI patterns and micro-animations in a single-file motion reference',
    description:
      'A hand-built reference library of interface components, transitions, and animation studies. Everything lives in one self-contained HTML file, no framework and no build step.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://the-interface-review.netlify.app/',
    featured: true,
  },
  {
    title: 'Toops Coffee',
    impact: 'Multi-page brand site for a Hyderabad café and roastery: menu, shop, loyalty, events, story',
    description:
      'Hand-coded brand and storefront site for a neighbourhood café. Fifteen pages spanning menu, shop, wholesale, loyalty, and events, built from scratch with no framework.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: '/toops/index.html',
    featured: true,
  },
  {
    title: 'PrepWise',
    impact: 'Zero-cost AI interview prep with resume parsing, gap analysis, and live code execution in the browser',
    description:
      'Browser-first interview prep platform. Parses resumes (PDF/DOCX), analyzes job descriptions for skill gaps, and runs real Python, SQL, and JavaScript code via WebAssembly, with no backend and no API costs.',
    tech: ['Next.js', 'TypeScript', 'Pyodide', 'PGlite', 'Firebase', 'Three.js'],
    github: 'https://github.com/saishashank-a/PrepWise',
    demo: 'https://prep-wise-tawny-ten.vercel.app/',
    featured: true,
  },
  {
    title: 'E-commerce RAG Engine',
    impact: 'Production-grade semantic search with hallucination detection',
    description:
      'Containerized RAG system using Docker and Kubernetes for scalable product search and Q&A. Vector retrieval via ChromaDB and Sentence-Transformers with FastAPI backend.',
    tech: ['Python', 'Docker', 'Kubernetes', 'ChromaDB', 'FastAPI'],
    github: 'https://github.com/saishashank-a/ecommerce-rag-application',
    featured: true,
  },
  {
    title: 'High-Performance Review Analysis',
    impact: 'GPU-accelerated topic clustering, 240x faster than LLM-based consolidation',
    description:
      'Local LLM-based topic extraction with Metal GPU acceleration (4.3x speedup). 48 parallel workers with semantic deduplication and HDBSCAN clustering.',
    tech: ['Python', 'Metal GPU', 'HDBSCAN', 'Flask'],
    github: 'https://github.com/saishashank-a/Trend-Analysis-Report-System.',
  },
  {
    title: 'Predictive Log Analysis & AIOps',
    impact: 'Live anomaly detection pipeline for enterprise security operations',
    description:
      'Enterprise-grade anomaly detection using Ray and Isolation Forests. "Universal Knowledge Base" rule engine translates cryptic error codes into actionable steps.',
    tech: ['Ray', 'Scikit-Learn', 'Streamlit', 'Python'],
    github: 'https://github.com/saishashank-a/Predictive-Analysis-Report',
  },
  {
    title: 'LockIn, Habit Tracker',
    impact: 'Full mobile app, iOS + Android, offline-first with HealthKit integration',
    description:
      'Cross-platform habit tracker with offline SQLite persistence, streak tracking, financial data, health metrics, and automated workout logging via HealthKit.',
    tech: ['React Native', 'Expo', 'SQLite', 'TypeScript'],
  },
  {
    title: 'Earthquake Magnitude Prediction',
    impact: 'Paper accepted at ICICT 2024 (Bentham Science proceedings)',
    description:
      'Hybrid CNN-GRU model on the STEAD seismic dataset: magnitude MAE 0.30 / RMSE 0.37, beating a CNN baseline (MAE 0.47), with 99.94% accuracy on earthquake vs noise detection.',
    tech: ['Python', 'TensorFlow', 'CNN', 'GRU'],
  },
]
