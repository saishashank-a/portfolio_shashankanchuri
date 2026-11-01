export type SkillGroup = {
  label: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'HTML5'],
  },
  {
    label: 'Backend & Cloud',
    skills: ['FastAPI', 'Spring Boot', 'Next.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes'],
  },
  {
    label: 'AI / ML',
    skills: ['RAG', 'LangGraph', 'MCP', 'Ollama', 'Sentence-Transformers', 'ChromaDB', 'HDBSCAN', 'PyTorch'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'Salesforce', 'PowerBI', 'Streamlit', 'Expo', 'React Native'],
  },
]
