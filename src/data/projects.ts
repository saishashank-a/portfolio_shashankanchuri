export type Project = {
  title: string
  impact?: string
  description: string
  tech: string[]
  github: string
  demo?: string
  featured?: boolean
}

export const projects: Project[] = [
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
    impact: 'GPU-accelerated clustering on 1M+ reviews, 240x faster topic grouping',
    description:
      'Local LLM-based topic extraction with Metal GPU acceleration (4.3x speedup). 48 parallel workers with semantic deduplication and HDBSCAN clustering.',
    tech: ['Python', 'Metal GPU', 'HDBSCAN', 'Flask'],
    github: 'https://github.com/saishashank-a/Trend-Analysis-Report-System',
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
    github: 'https://github.com/Scynaero/LockIn-KMP',
  },
  {
    title: 'Nextenti Chatbot POC',
    impact: 'AI-powered candidate screening chatbot for healthcare recruitment',
    description:
      'End-to-end NLP chatbot for candidate screening and recruitment support at Nextenti Tech. Improves response accuracy and user engagement across the hiring pipeline.',
    tech: ['Python', 'NLP', 'FastAPI', 'MongoDB'],
    github: 'https://github.com/saishashank-a/NextEnti_chatbot_POC',
  },
  {
    title: 'Earthquake Magnitude Prediction',
    impact: 'Published ML research, CNN+GRU hybrid outperforms baseline regression',
    description:
      'Hybrid CNN–GRU model analyzing spatial-temporal seismic data. Advanced preprocessing including denoising and normalization to reduce overfitting by 18%.',
    tech: ['Python', 'TensorFlow', 'CNN', 'GRU'],
    github: 'https://github.com/Akhil-Kambhatla/ARIMA-vs-TBATS',
  },
]
