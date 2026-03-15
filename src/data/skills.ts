export type SkillGroup = {
  label: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'GoLang', 'Rust', 'C', 'HTML5'],
  },
  {
    label: 'Backend & Cloud',
    skills: ['FastAPI', 'Django', 'Flask', 'Docker', 'Kubernetes', 'Ray', 'ChromaDB', 'SQLite'],
  },
  {
    label: 'AI / ML',
    skills: ['TensorFlow', 'Scikit-Learn', 'Pandas', 'Sentence-Transformers', 'HDBSCAN', 'Ollama'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'Salesforce', 'PowerBI', 'Streamlit', 'Expo', 'React Native'],
  },
]
