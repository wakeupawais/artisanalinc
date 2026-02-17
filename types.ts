
export interface ProjectAssessment {
  score: number;
  reasoning: string;
  alignment: 'High' | 'Medium' | 'Low';
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'archived';
  completedDate?: string;
  featured?: boolean;
}

export enum ProjectCategory {
  ALL = 'all',
  WEB_APP = 'web-app',
  AI_ML = 'ai-ml',
  BLOCKCHAIN = 'blockchain',
  MOBILE = 'mobile',
  CREATIVE = 'creative',
  INFRASTRUCTURE = 'infrastructure'
}

export enum Section {
  HERO = 'hero',
  PHILOSOPHY = 'philosophy',
  CRAFT = 'craft',
  PROJECTS = 'projects',
  GATEKEEPER = 'gatekeeper',
  CONTACT = 'contact'
}
