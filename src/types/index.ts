export type PortfolioMode = 'dev' | 'design';

export type ProjectCategory =
  | 'all'
  | 'erp-web'
  | 'ai-extension'
  | 'mobile'
  | 'game'
  | 'fullstack'
  | 'branding-packaging'
  | 'print-editorial'
  | '3d-motion'
  | 'ui-visual';

export interface ProjectScreenshot {
  title: string;
  caption: string;
  /** Optional local image path in public/, e.g. '/assets/projects/brio-1.png' */
  image?: string;
  /** Visual fallback theme when no local screenshot image is provided yet */
  accent?: string;
}

export interface DevProject {
  id: string;
  title: string;
  /** Strictly 1-line summary for the minimalist grid */
  summary: string;
  /** 2–3 primary tags displayed on the minimalist card */
  primaryTags: string[];
  /** Complete list of technologies displayed inside the Wizard Modal */
  fullTechStack: string[];
  /** Tab 1: Overview & Implementation */
  overview: {
    whatItDoes: string;
    problemSolved: string;
    whatIBuilt: string[];
  };
  /** Tab 2: Architecture & Technical Highlights */
  architecture: string[];
  /** Tab 3: Screenshots / Demo Previews (visible only inside the Wizard Modal) */
  screenshots: ProjectScreenshot[];
  githubUrl: string;
  /** Set liveUrl when a live deployment exists; omit or leave undefined for GitHub-only projects */
  liveUrl?: string;
  badge?: string;
}

export type DesignWorkCategory =
  | 'all'
  | 'kovax'
  | 'drplus'
  | 'college-events'
  | 'personal-wedding'
  | 'catalogs-pdfs';

export type CollegeSubCategory = 'ieee' | 'nss';
export type KovaxSubCategory = 'products' | 'assilex-buflex' | 'campaigns';

export interface DesignWorkItem {
  id: string;
  title: string;
  category: Exclude<DesignWorkCategory, 'all'>;
  subCategory?: CollegeSubCategory | KovaxSubCategory;
  categoryLabel: string;
  /** Local image path in public/assets/... */
  image?: string;
  mockupVariant?:
    | 'kovax-microfiber'
    | 'kovax-kn90'
    | 'kovax-poster'
    | 'college-mulearn'
    | 'college-nss-ieee'
    | 'wedding-ja'
    | 'wedding-foil'
    | 'catalog-cover';
  aspect?: 'square' | 'portrait' | 'landscape';
  tools: string[];
  designNote: string;
  /** Optional PDF path for catalog/print items */
  pdfUrl?: string;
  pageCount?: string;
  formatTag?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel?: string;
  tags: string[];
  metrics?: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  previewImage?: string;
  demoType?: 'verselens' | 'signsync' | 'kovax' | 'palette' | 'generic';
  imageGradient: string;
  designAccent?: string;
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
  category: 'code' | 'mobile' | 'ai' | 'game' | 'branding' | 'packaging' | 'print' | '3d';
}

export interface TerminalCommand {
  command: string;
  description: string;
}
