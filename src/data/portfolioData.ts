import { Project, SkillCategory, TimelineItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Akhil Sabu',
  handle: 'AKHXI1',
  role: 'Odoo Developer & Python Full-Stack Engineer',
  institution: "St. Joseph's College of Engineering, Palai, Kottayam",
  degree: 'B.Tech in Computer Science Engineering (2021 – 2025)',
  school: "High School — St. Ann's Senior Secondary School, Muttikulangara, Palakkad",
  location: 'Kottayam, Kerala, India',
  workLocation: 'Infopark Phase 2, Kakkanad, Kochi',
  timezone: 'IST (UTC+05:30)',
  email: 'akhilsabu2052003@gmail.com',
  whatsapp: 'https://wa.me/8138902941',
  whatsappDisplay: '+91 8138902941',
  twitter: 'https://twitter.com/Akhxi1S',
  facebook: 'https://www.facebook.com/people/Akhil-Sabu/pfbid02xdDFWcpvJtYYC2MymYubTP3CgEwbF8SJPLWbTHEKnytrdgr7JCJw3ywP2gS9BEuTl/',
  github: 'https://github.com/AKHXI1',
  linkedin: 'https://linkedin.com/in/akhxi1/',
  designPortfolioUrl: 'https://drive.google.com/drive/folders/1NEGsmJufG8RTOw-tJ6gIzeoJKDn_nq4N?usp=drive_link',
  resumeUrl: '/resume.pdf',
  avatarUrl: '/man.png',
  devStatus: 'Odoo Developer @ EMPIRE AE (Infopark Kochi)',
  designStatus: 'Freelance Graphic Designer @ Kovax Freelance',
  devTagline: 'Computer Science Engineering graduate building custom Odoo ERP modules, Saudi construction & jewellery ERP workflows, Django REST APIs, and AI accessibility tools.',
  designTagline: 'Freelance Graphic Designer crafting print-ready packaging dielines for Kovax, creasing layouts, brand visuals, Figma UI/UX, and 3D character art.',
  devBio: "I am a Computer Science Engineering graduate from Kottayam, Kerala, currently working as an Odoo Developer at EMPIRE AE (Infopark Phase 2, Kochi). I build custom enterprise ERP modules—including jewellery management workflows and an ERP system for a construction company in Saudi Arabia. Previously, I worked as a Python Developer at Altos Technologies India developing Django RESTful APIs and optimizing SQL queries, and as a Business Development Associate at Techmaghi LLP.",
  designBio: "Freelance Graphic Designer at Kovax Freelance and former Design Head for NSS & IEEE communities. Experienced in print-ready packaging dielines, creasing layouts, digital marketing creatives, and UI/UX prototypes using Adobe Illustrator, Photoshop, Premiere Pro, After Effects, Canva, and Figma.",
  devStats: [
    { label: 'Current Role', value: 'Odoo Dev' },
    { label: 'Mulearn Campus Rank', value: '#1 State' },
    { label: 'Core Stacks', value: 'Odoo / AI' },
    { label: 'YIP Outreach', value: '300+ Devs' },
  ],
  designStats: [
    { label: 'Packaging Client', value: 'Kovax' },
    { label: 'Design Leadership', value: 'NSS & IEEE' },
    { label: 'Creative Suite', value: '6+ Tools' },
    { label: 'Print & Digital', value: '100%' },
  ]
};

export const DEV_PROJECTS: Project[] = [
  {
    id: 'empire-odoo-erp',
    title: 'Enterprise Odoo ERP Systems (EMPIRE AE)',
    tagline: 'Jewellery Management Workflows & Saudi Construction Company ERP',
    description: 'Developing and deploying custom enterprise Odoo ERP modules at EMPIRE AE (Infopark Phase 2, Kochi)—including comprehensive jewellery management workflows and an ERP system for a construction company in Saudi Arabia.',
    longDescription: 'At EMPIRE AE (Infopark Phase 2, Kakkanad, Kochi), engineered and customized enterprise Odoo ERP solutions tailored to real-world client operations. Delivered end-to-end jewellery management workflows as well as a dedicated ERP system for a construction company in Saudi Arabia, building custom backend Python models, XML views, automated server actions, and optimized PostgreSQL queries.',
    category: 'erp-web',
    categoryLabel: 'Odoo ERP • EMPIRE AE',
    tags: ['Python', 'Odoo', 'XML', 'PostgreSQL', 'QWeb', 'REST APIs'],
    metrics: 'Jewellery & Saudi Construction ERP',
    featured: true,
    githubUrl: 'https://github.com/AKHXI1',
    demoType: 'generic',
    imageGradient: 'from-emerald-500/30 via-cyan-600/20 to-slate-900',
    highlights: [
      'Custom enterprise Odoo ERP modules for comprehensive jewellery management workflows.',
      'End-to-end ERP system tailored for a construction company in Saudi Arabia.',
      'Optimized backend Python models, custom XML views, automated server actions, and PostgreSQL queries.'
    ],
    architecture: [
      'Enterprise Odoo Python ORM & Custom Addons',
      'Custom XML Views & QWeb Reporting Templates',
      'PostgreSQL Relational Query Optimization',
      'Automated Server Actions & Business Workflows'
    ]
  },
  {
    id: 'signsync',
    title: 'Sign Sync (Major Project)',
    tagline: 'AI-Powered Bidirectional Sign Language Translator with 3D Avatar',
    description: 'Combines TensorFlow, LSTM, and MediaPipe for real-time sign-to-text recognition with a Flutter 3D avatar and FastAPI WebSocket backend for text-to-sign translation.',
    longDescription: 'Major B.Tech project built to enhance accessibility for the deaf and mute community. Combines a real-time sign-to-text computer vision pipeline (TensorFlow, LSTM sequence modeling, MediaPipe hand/pose landmarks) with a 3D avatar rendering system for text-to-sign translation powered by a Flutter frontend and FastAPI backend connected over WebSockets.',
    category: 'mobile',
    categoryLabel: 'AI & Mobile • Major Project',
    tags: ['TensorFlow', 'LSTM', 'MediaPipe', 'Flutter', 'FastAPI', 'WebSockets'],
    metrics: 'Bidirectional AI + 3D Avatar over WebSockets',
    featured: true,
    githubUrl: 'https://github.com/AKHXI1',
    demoType: 'signsync',
    imageGradient: 'from-cyan-500/30 via-teal-600/20 to-emerald-800/30',
    highlights: [
      'Real-time sign-to-text conversion powered by TensorFlow, LSTM temporal sequence modeling, and MediaPipe.',
      '3D avatar rendering system for text-to-sign translation inside a responsive Flutter mobile frontend.',
      'Low-latency FastAPI backend connected via WebSockets for bidirectional real-time communication.'
    ],
    architecture: [
      'TensorFlow + LSTM Gesture Sequence Classifier',
      'MediaPipe Real-Time Landmark Extraction',
      'Flutter 3D Avatar Renderer Frontend',
      'FastAPI Async Backend + WebSocket Streaming'
    ]
  },
  {
    id: 'altos-django',
    title: 'Altos Full-Stack Platform (Django)',
    tagline: 'Python Django Backend Features, RESTful APIs & SQL Optimization',
    description: 'Developed backend features and Django RESTful APIs at Altos Technologies (Oct 2025 – Apr 2026), integrating responsive frontend templates and optimizing SQL queries.',
    longDescription: 'Worked as a Python Developer at Altos Technologies (October 2025 – April 2026). Engineered backend modules and RESTful APIs with Python and Django, integrated responsive HTML/CSS/JS frontend templates, optimized SQL database connectivity and queries, and collaborated via Git workflows.',
    category: 'erp-web',
    categoryLabel: 'Django • Altos Technologies',
    tags: ['Python', 'Django', 'RESTful APIs', 'SQL', 'HTML5/CSS3', 'Git'],
    metrics: 'Altos Technologies (Oct 2025 – Apr 2026)',
    featured: true,
    githubUrl: 'https://github.com/AKHXI1',
    demoType: 'generic',
    imageGradient: 'from-emerald-500/30 via-sky-600/20 to-slate-900',
    highlights: [
      'Developed scalable backend features and RESTful APIs using the Python Django framework.',
      'Integrated responsive frontend templates with clean server-client data flow.',
      'Implemented SQL database connectivity and query optimization using Git version control workflows.'
    ],
    architecture: [
      'Python Django MVC & REST API Layer',
      'SQL Relational Connectivity & Query Tuning',
      'Git Feature-Branch Collaboration Workflow'
    ]
  },
  {
    id: 'journey-sync',
    title: 'Journey Sync (Mini Project)',
    tagline: 'Smart Ticketing Booking System with Adjacent Multi-Stop Seat Allocation',
    description: 'Web-based booking platform enabling passengers boarding from different locations to book adjacent seats in one transaction using HTML, CSS, JavaScript, Handlebars (HBS), MongoDB & Mongoose.',
    longDescription: 'Engineered a smart multi-stop ticketing platform solving fragmented seat allocation. Passengers boarding from different route stops can coordinate and book adjacent seats within a single unified transaction, backed by a structured MongoDB and Mongoose schema handling complex seat graphs and user state.',
    category: 'erp-web',
    categoryLabel: 'Full-Stack • Mini Project',
    tags: ['JavaScript', 'Handlebars (HBS)', 'MongoDB', 'Mongoose', 'HTML5', 'CSS3'],
    metrics: 'Multi-stop adjacent seat booking engine',
    featured: true,
    githubUrl: 'https://github.com/AKHXI1',
    demoType: 'generic',
    imageGradient: 'from-sky-500/30 via-indigo-600/20 to-slate-900',
    highlights: [
      'Enables passengers boarding from different locations to book adjacent seats in a single atomic transaction.',
      'Dynamic server-rendered views using Handlebars (HBS), JavaScript, HTML5, and CSS3.',
      'MongoDB + Mongoose schema architecture managing route segments, seat availability matrices, and bookings.'
    ],
    architecture: [
      'MongoDB & Mongoose Relational Seat Mapping Schema',
      'Handlebars (HBS) Dynamic Template Layer',
      'Multi-Leg Seat Collision & Adjacency Validation'
    ]
  },
  {
    id: 'verselens',
    title: 'VerseLens',
    tagline: 'Spotify Real-Time Lyrics & Meaning Translator powered by AI',
    description: 'Chrome Extension MV3 & Spicetify integration that translates Spotify lyrics line-by-line with Romanized phonetics and Gemini-powered poetic explanations.',
    longDescription: 'Built as a Manifest V3 browser extension and Spicetify script, VerseLens intercepts Spotify player telemetry, fetches synchronized lyrics from LRCLIB, transliterates non-Latin scripts into Romanized phonetics, and queries Google Gemini AI for line-by-line poetic context.',
    category: 'ai-extension',
    categoryLabel: 'AI & Extension',
    tags: ['Chrome Extension MV3', 'Google Gemini AI', 'JavaScript', 'LRCLIB', 'Spicetify'],
    metrics: 'Real-time sync & AI explanations',
    featured: false,
    githubUrl: 'https://github.com/AKHXI1',
    demoType: 'verselens',
    imageGradient: 'from-cyan-500/30 via-sky-600/20 to-emerald-900/30',
    highlights: [
      'Line-by-line synchronized lyric translation matching Spotify playback timing.',
      'Google Gemini AI integration for poetic meaning and cultural context.',
      'Client-side phonetic transliteration for Japanese, Korean, and Hindi scripts.'
    ],
    architecture: [
      'Manifest V3 Service Worker + DOM Observer',
      'Gemini AI REST Integration + LRCLIB Parser'
    ]
  }
];

export const DESIGN_PROJECTS: Project[] = [
  {
    id: 'kovax-packaging',
    title: 'Kovax Packaging & Dielines',
    tagline: 'Print-Ready Product Packaging Dielines, Creasing Layouts & Creatives',
    description: 'Freelance Graphic Designer at Kovax Freelance—designing precision print-ready product packaging dielines, creasing layouts, and digital marketing creatives.',
    longDescription: 'Working as Freelance Graphic Designer for Kovax Freelance, engineering print-ready structural product packaging dielines, accurate fold/creasing layouts, bleed tolerances, and high-impact digital marketing creatives in Adobe Illustrator and Photoshop.',
    category: 'branding-packaging',
    categoryLabel: 'Kovax Freelance • Packaging',
    tags: ['Adobe Illustrator', 'Photoshop', 'Packaging Dielines', 'Creasing Layouts', 'Print'],
    metrics: 'Print-Ready Production',
    featured: true,
    liveUrl: PERSONAL_INFO.designPortfolioUrl,
    demoType: 'kovax',
    imageGradient: 'from-coral-500/25 via-orange-400/20 to-purple-500/25',
    designAccent: '#ff5c4d',
    highlights: [
      'Precision-measured product packaging dielines and creasing layouts ready for commercial print production.',
      'Digital marketing creatives and retail shelf visuals crafted in Adobe Illustrator and Photoshop.',
      'Strict CMYK, bleed, cut-line, and crease-line layer separation.'
    ],
    architecture: [
      'Adobe Illustrator Vector Dielines & Creasing Guides',
      'Adobe Photoshop Product Creatives & Mockups',
      'Print-Ready CMYK Pre-Press Separation'
    ]
  },
  {
    id: 'nss-ieee-design',
    title: 'NSS & IEEE Visual Assets & Figma UI/UX',
    tagline: 'Design Head Leadership, Event Branding & Interactive Figma Prototypes',
    description: 'Led the design team for NSS & IEEE communities—creating cohesive event visual assets, posters, and UI/UX prototypes in Figma.',
    longDescription: 'Served as Design Head for NSS & IEEE communities at St. Joseph’s College of Engineering, Palai, Kottayam. Directed visual identity across campus-wide technical and community events, designing posters, social campaigns, and structured UI/UX prototypes in Figma.',
    category: 'ui-visual',
    categoryLabel: 'Design Head • NSS & IEEE',
    tags: ['Figma', 'Photoshop', 'Illustrator', 'UI/UX Prototypes', 'Canva'],
    metrics: 'Led Design Team & UI/UX Systems',
    featured: true,
    liveUrl: PERSONAL_INFO.designPortfolioUrl,
    previewImage: '/assets/folio-3.jpg',
    demoType: 'palette',
    imageGradient: 'from-purple-500/25 via-coral-500/20 to-amber-400/25',
    designAccent: '#8b5cf6',
    highlights: [
      'Directed visual branding and creative output across NSS and IEEE campus initiatives.',
      'Designed interactive UI/UX prototypes and component systems in Figma.',
      'Produced high-engagement event posters, banners, and promotional suites.'
    ],
    architecture: [
      'Figma UI/UX Wireframing & Interactive Prototypes',
      'Adobe Illustrator & Photoshop Event Visuals'
    ]
  },
  {
    id: 'wedding-invitation-suites',
    title: 'Bespoke Wedding Invitation Suites',
    tagline: 'Editorial Print Typography, Foil Motifs & Animated Save-the-Dates',
    description: 'Custom wedding stationery combining editorial typography, bespoke vector crests, print layouts, and motion video invitations.',
    longDescription: 'Crafted bespoke wedding invitation suites and digital motion save-the-dates using Adobe Illustrator, Photoshop, and After Effects—balancing timeless editorial typography with modern visual warmth.',
    category: 'print-editorial',
    categoryLabel: 'Print & Editorial',
    tags: ['Illustrator', 'Photoshop', 'After Effects', 'Typography', 'Print Layout'],
    metrics: 'Custom Print & Motion Invites',
    featured: true,
    liveUrl: PERSONAL_INFO.designPortfolioUrl,
    demoType: 'palette',
    imageGradient: 'from-rose-400/25 via-amber-300/20 to-purple-400/25',
    designAccent: '#ec4899',
    highlights: [
      'Custom interlocking monograms, botanical vector motifs, and print-ready card spreads.',
      'Matching animated digital invitations edited in After Effects & Premiere Pro.'
    ],
    architecture: [
      'Adobe Illustrator Vector Borders & Crests',
      'After Effects & Premiere Pro Motion Invites'
    ]
  },
  {
    id: 'motion-3d-visuals',
    title: 'Motion Reels, Video & 3D Art',
    tagline: 'Premiere Pro Edits, After Effects Motion Graphics & 3D Character Concepts',
    description: 'Dynamic promotional reels, kinetic typography, and stylized 3D character renders built with Premiere Pro, After Effects, and Blender.',
    longDescription: 'Combines motion graphics and video editing in Adobe Premiere Pro and After Effects with 3D asset and character modeling in Blender for engaging digital storytelling.',
    category: '3d-motion',
    categoryLabel: 'Motion & 3D',
    tags: ['After Effects', 'Premiere Pro', 'Blender 3D', 'Photoshop', 'Canva'],
    metrics: 'Motion Graphics, Reels & 3D Renders',
    featured: false,
    liveUrl: PERSONAL_INFO.designPortfolioUrl,
    previewImage: '/assets/folio-1.jpg',
    demoType: 'generic',
    imageGradient: 'from-violet-500/25 via-purple-500/20 to-coral-400/25',
    designAccent: '#7c3aed',
    highlights: [
      'Rhythmic video editing and color grading in Adobe Premiere Pro.',
      'Kinetic title sequences and motion assets in After Effects paired with 3D visuals.'
    ],
    architecture: [
      'Adobe Premiere Pro & After Effects Motion Pipeline',
      'Blender 3D Modeling & Lighting'
    ]
  }
];

export const DEV_SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Languages & Databases',
    icon: 'Terminal',
    skills: [
      { name: 'Python', level: 94, category: 'Backend & ERP', description: 'Odoo ERP modules, Django, FastAPI, TensorFlow/MediaPipe pipelines', tag: 'Core' },
      { name: 'JavaScript', level: 90, category: 'Web & UI', description: 'ESNext, React, Handlebars (HBS), DOM & async REST/WebSocket clients', tag: 'Core' },
      { name: 'PostgreSQL & SQL', level: 89, category: 'Relational DB', description: 'Odoo PostgreSQL query optimization, schema design & relational tuning', tag: 'Core' },
      { name: 'XML, HTML5 & CSS3', level: 92, category: 'Views & Markup', description: 'Odoo custom XML views/QWeb, semantic HTML5, responsive CSS & Tailwind' },
      { name: 'MongoDB & Mongoose', level: 84, category: 'NoSQL', description: 'Complex seat mapping schemas and transactional booking models' }
    ]
  },
  {
    name: 'Frameworks, ERP & AI',
    icon: 'Layers',
    skills: [
      { name: 'Odoo ERP', level: 93, category: 'Enterprise ERP', description: 'Jewellery management workflows, Saudi construction ERP, custom models & XML views', tag: 'EMPIRE AE' },
      { name: 'Django & FastAPI', level: 88, category: 'Python Web', description: 'RESTful APIs, WebSockets, Altos Technologies & Sign Sync backend', tag: 'Core' },
      { name: 'TensorFlow, LSTM & MediaPipe', level: 85, category: 'AI & Vision', description: 'Real-time sign-to-text recognition and sequence modeling in Sign Sync', tag: 'AI' },
      { name: 'Flutter & Handlebars (HBS)', level: 85, category: 'Frontend / Mobile', description: '3D avatar Flutter frontend and dynamic HBS server templates' }
    ]
  },
  {
    name: 'Tools & Engineering Workflow',
    icon: 'Cpu',
    skills: [
      { name: 'Git / Version Control', level: 90, category: 'Collaboration', description: 'Branching workflows, PR reviews, team delivery at EMPIRE AE & Altos', tag: 'Daily' },
      { name: 'RESTful APIs & WebSockets', level: 90, category: 'Integration', description: 'Real-time bidirectional communication and enterprise ERP integrations' },
      { name: 'Figma', level: 88, category: 'UI/UX Handoff', description: 'Interactive prototypes, design tokens & developer handoff' }
    ]
  }
];

export const DESIGN_SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Adobe Creative & Video Suite',
    icon: 'Palette',
    skills: [
      { name: 'Adobe Illustrator', level: 94, category: 'Vector & Dielines', description: 'Print-ready packaging dielines & creasing layouts for Kovax Freelance', tag: 'Kovax' },
      { name: 'Adobe Photoshop', level: 92, category: 'Digital Creatives', description: 'Digital marketing creatives, posters, photo manipulation & compositing', tag: 'Core' },
      { name: 'Adobe Premiere Pro', level: 85, category: 'Video Editing', description: 'Event reels, promotional edits & pacing', tag: 'Video' },
      { name: 'Adobe After Effects', level: 85, category: 'Motion Graphics', description: 'Kinetic typography, brand reveals & animated invitations', tag: 'Motion' }
    ]
  },
  {
    name: 'UI/UX, Print & Visual Systems',
    icon: 'Box',
    skills: [
      { name: 'Figma', level: 90, category: 'UI/UX Prototypes', description: 'Led NSS & IEEE design team creating UI/UX prototypes & visual systems', tag: 'Design Head' },
      { name: 'Packaging Dielines & Creasing', level: 90, category: 'Print Production', description: 'Structural packaging geometry, cut/fold tolerances & CMYK prep', tag: 'Specialist' },
      { name: 'Canva & Quick Campaigns', level: 92, category: 'Marketing', description: 'Rapid social media kits, campus community graphics & decks' },
      { name: 'Blender 3D', level: 78, category: '3D Art', description: '3D character concepts, packaging mockups & lighting' }
    ]
  }
];

export const DEV_TIMELINE: TimelineItem[] = [
  {
    year: 'Jun 2026 – Present',
    title: 'Odoo Developer — EMPIRE AE',
    role: 'Odoo ERP Developer',
    organization: 'EMPIRE AE • Infopark Phase 2, Kakkanad, Kochi',
    description: 'Building custom enterprise Odoo ERP modules, including jewellery management workflows and an ERP system for a construction company in Saudi Arabia.',
    technologies: ['Python', 'Odoo', 'XML', 'PostgreSQL', 'QWeb'],
    category: 'code'
  },
  {
    year: 'Oct 2025 – Apr 2026',
    title: 'Python Developer — Altos Technologies',
    role: 'Python Developer',
    organization: 'Altos Technologies India',
    description: 'Developed backend features and RESTful APIs using Django, integrated responsive frontend templates, optimized SQL queries, and collaborated via Git workflows.',
    technologies: ['Python', 'Django', 'REST APIs', 'SQL', 'Git'],
    category: 'code'
  },
  {
    year: 'Jun 2025 – Oct 2025',
    title: 'Business Development Associate — Techmaghi LLP',
    role: 'Business Development Associate',
    organization: 'Techmaghi LLP',
    description: 'Drove institutional outreach, client communications, and partnership coordination across technical training and campus programs.',
    technologies: ['Client Relations', 'Outreach', 'Operations'],
    category: 'mobile'
  },
  {
    year: '2025',
    title: 'Sign Sync — AI Sign Language Translator (Major Project)',
    role: 'AI & Full-Stack Lead',
    organization: 'B.Tech Major Project • SJCET Palai',
    description: 'Combined TensorFlow, LSTM, and MediaPipe for sign-to-text with a Flutter 3D avatar and FastAPI WebSocket backend for text-to-sign translation.',
    technologies: ['TensorFlow', 'LSTM', 'MediaPipe', 'Flutter', 'FastAPI', 'WebSockets'],
    category: 'ai'
  },
  {
    year: '2021 – 2025',
    title: "B.Tech CSE & Mulearn #1 Kerala Campus Lead",
    role: 'B.Tech Graduate & Campus Lead',
    organization: "St. Joseph's College of Engineering, Palai, Kottayam",
    description: "Graduated in Computer Science Engineering. Progressed from Department Coordinator to Mulearn Campus Lead, leading SJCET Palai to #1 on the Kerala state leaderboard, and taught YIP sessions across 23 schools & 11 colleges (300+ students). High School: St. Ann's Senior Secondary School, Muttikulangara, Palakkad.",
    technologies: ['Mulearn #1', 'YIP Educator', 'Python', 'SQL'],
    category: 'code'
  }
];

export const DESIGN_TIMELINE: TimelineItem[] = [
  {
    year: 'Present',
    title: 'Freelance Graphic Designer — Kovax Freelance',
    role: 'Packaging & Graphic Designer',
    organization: 'Kovax Freelance',
    description: 'Designing print-ready product packaging dielines, creasing layouts, and digital marketing creatives using Adobe Illustrator and Photoshop.',
    technologies: ['Adobe Illustrator', 'Photoshop', 'Packaging Dielines', 'Creasing Layouts'],
    category: 'packaging'
  },
  {
    year: '2023 – 2025',
    title: 'Design Head — NSS & IEEE Communities',
    role: 'Design Head & Core Member',
    organization: "St. Joseph's College of Engineering, Palai, Kottayam",
    description: 'Led the campus design team, creating cohesive visual assets, event campaigns, and interactive UI/UX prototypes in Figma.',
    technologies: ['Figma', 'Photoshop', 'Illustrator', 'Canva'],
    category: 'branding'
  },
  {
    year: '2024 – 2025',
    title: 'Motion, Video & Print Suites',
    role: 'Visual & Motion Designer',
    organization: 'Creative Projects',
    description: 'Produced promotional reels, kinetic graphics, bespoke wedding invitations, and posters across Premiere Pro, After Effects, and Blender.',
    technologies: ['Premiere Pro', 'After Effects', 'Blender 3D', 'Print'],
    category: '3d'
  }
];

export const PROJECTS = DEV_PROJECTS;
export const SKILL_CATEGORIES = DEV_SKILL_CATEGORIES;
export const TIMELINE = DEV_TIMELINE;

export const TERMINAL_COMMANDS: { [key: string]: string | (() => string) } = {
  help: `Available commands:
  • about        - Profile & current role of Akhil Sabu
  • mode dev     - Switch portfolio to Developer Mode
  • mode design  - Switch portfolio to Designer Mode
  • experience   - EMPIRE AE, Altos Technologies & Techmaghi LLP
  • college      - B.Tech CSE, St. Ann's & Mulearn/YIP leadership
  • projects     - Sign Sync, Journey Sync, Odoo ERP & Kovax
  • skills       - Technical & Creative stack
  • contact      - Email, WhatsApp, LinkedIn & GitHub
  • confetti     - Launch celebratory fireworks!
  • matrix       - Activate cyber green matrix rain
  • clear        - Clear the terminal screen`,
  about: `Akhil Sabu (AKHXI1) — Kottayam, Kerala, India
Odoo Developer @ EMPIRE AE (Infopark Phase 2, Kochi).
B.Tech in Computer Science Engineering (2021–2025), St. Joseph's College of Engineering, Palai, Kottayam.`,
  experience: `Professional Experience:
1. Odoo Developer — EMPIRE AE, Infopark Phase 2, Kochi (Jun 2026 – Present)
   Custom enterprise Odoo ERP modules: jewellery management workflows & Saudi construction company ERP.
2. Python Developer — Altos Technologies (Oct 2025 – Apr 2026)
   Django RESTful APIs, responsive templates & SQL query optimization.
3. Business Development Associate — Techmaghi LLP (Jun 2025 – Oct 2025)
4. Freelance Graphic Designer — Kovax Freelance (Packaging dielines & creatives)`,
  college: `Education & Achievements:
• B.Tech Computer Science Engineering (2021–2025) — St. Joseph's College of Engineering, Palai, Kottayam
• High School — St. Ann's Senior Secondary School, Muttikulangara, Palakkad
• Mulearn Campus Lead — Led SJCET Palai to #1 on the Kerala state leaderboard
• YIP Educator — 23 schools & 11 colleges, 300+ students`,
  whatsapp: `WhatsApp / Phone: https://wa.me/8138902941 (+91 8138902941)`,
  resume: `Download Resume: /resume.pdf`,
  projects: `Key Works:
1. EMPIRE AE Odoo ERP (Jewellery management workflows & Saudi construction company ERP)
2. Sign Sync (Major Project — TensorFlow, LSTM, MediaPipe, Flutter 3D Avatar, FastAPI, WebSockets)
3. Altos Django Platform (Python, Django, REST APIs, SQL)
4. Journey Sync (Mini Project — HTML, CSS, JS, Handlebars HBS, MongoDB, Mongoose)
5. Kovax Packaging Dielines & Creasing Layouts (Illustrator, Photoshop)`,
  skills: `Skills:
• Languages: Python, JavaScript, XML, HTML5, CSS3, SQL
• Frameworks/DB: Odoo, Django, FastAPI, Handlebars (HBS), Mongoose, PostgreSQL, MongoDB
• AI & Tools: TensorFlow, LSTM, MediaPipe, Git, Figma, RESTful APIs, WebSocket
• Design: Adobe Illustrator, Photoshop, Premiere Pro, After Effects, Canva`,
  contact: `Communication Channels:
• Email:    akhilsabu2052003@gmail.com
• Phone/WA: +91 8138902941 (https://wa.me/8138902941)
• LinkedIn: https://linkedin.com/in/akhxi1/
• GitHub:   https://github.com/AKHXI1
• Location: Kottayam / Kochi, Kerala, India`
};
