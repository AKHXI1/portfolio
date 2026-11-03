export type ProjectCategory = 'all' | 'ai-extension' | 'mobile' | 'game' | 'fullstack';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: 'ai-extension' | 'mobile' | 'game' | 'fullstack';
  tags: string[];
  metrics?: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  demoType?: 'verselens' | 'signsync' | 'generic';
  imageGradient: string;
  highlights: string[];
  architecture: string[];
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    category: string;
    description: string;
    tag?: string;
  }[];
}

export interface TimelineItem {
  year: string;
  title: string;
  role: string;
  organization?: string;
  description: string;
  technologies: string[];
  category: 'code' | 'mobile' | 'ai' | 'game';
}

export interface TerminalCommand {
  command: string;
  description: string;
}

