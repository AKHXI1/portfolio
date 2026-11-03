import { Project, SkillCategory, TimelineItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Akhil',
  handle: 'AKHXI1',
  role: 'Creative Developer & Software Engineer',
  tagline: 'Bridging engineering rigor with intuitive user experiences across AI systems, mobile applications, and interactive 3D.',
  bio: 'I am a multidisciplinary software engineer and builder passionate about pushing the boundaries of human-computer interaction. From building AI-driven browser extensions that decode music lyrics in real-time with Google Gemini, to developing accessibility solutions like SignSync for the deaf community and crafting 3D stealth worlds in Unity, I thrive on turning complex technical challenges into engaging, high-impact products.',
  status: 'Open to high-impact software roles & innovative collaborations',
  location: 'India',
  timezone: 'IST (UTC+05:30)',
  email: 'akhil.dev.work@gmail.com', // user can update anytime
  github: 'https://github.com/AKHXI1',
  linkedin: 'https://linkedin.com/in/akhil-developer',
  stats: [
    { label: 'Core Projects Built', value: '6+' },
    { label: 'Technologies & Stacks', value: '12+' },
    { label: 'Platforms Engineered', value: 'Web / Mobile / Extension / 3D' },
    { label: 'Code Quality & Craft', value: '100%' },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'verselens',
    title: 'VerseLens',
    tagline: 'Spotify Real-Time Lyrics & Meaning Translator powered by AI',
    description: 'An advanced Chrome Extension & Spicetify integration that translates Spotify lyrics line-by-line with Romanized phonetics and Gemini-powered poetic explanations.',
    longDescription: 'VerseLens revolutionizes how music lovers experience global songs. Built as a Manifest V3 browser extension and Spicetify desktop script, it intercepts Spotify player telemetry, fetches synchronized lyrics from LRCLIB, executes Romanized phonetics for non-Latin scripts (Japanese Kanji/Kana, Korean Hangul, Hindi, Arabic), and queries Google Gemini AI to unveil deep metaphors and poetic contexts line-by-line directly beneath the active track.',
    category: 'ai-extension',
    tags: ['Chrome Extension MV3', 'Google Gemini AI', 'JavaScript', 'Spotify Web API', 'LRCLIB', 'Spicetify', 'CSS3'],
    metrics: 'Active extension with real-time sync & AI explanations',
    featured: true,
    githubUrl: 'https://github.com/AKHXI1',
    demoType: 'verselens',
    imageGradient: 'from-sky-500/30 via-indigo-600/20 to-purple-800/30',
    highlights: [
      'Line-by-line synchronized lyric translation matching Spotify playback timing down to the millisecond.',
      'Google Gemini AI integration for contextual song analysis, cultural idioms, and poetic symbolism.',
      'Automated phonetic transliterator rendering pronunciation guides for foreign scripts.',
      'Dual architecture: Chrome Extension Manifest V3 background service workers + Spicetify desktop client injection.',
      'Custom glassmorphism UI overlay blending seamlessly into Spotify aesthetic.'
    ],
    architecture: [
      'Manifest V3 Background Service Worker + Content Script DOM observer',
      'Gemini 1.5 Flash REST API with dynamic few-shot prompt chaining',
      'LRCLIB real-time synchronous LRC time-tag parser',
      'Zero-latency client-side caching in chrome.storage'
    ]
  },
  {
    id: 'signsync',
    title: 'SignSync',
    tagline: 'AI-Assisted Cross-Platform Sign Language & Accessibility Hub',
    description: 'An inclusive mobile accessibility application bridging the communication gap between the deaf/hard-of-hearing community and the hearing world.',
    longDescription: 'SignSync is an accessibility ecosystem engineered with Flutter and Dart. It features dual core modalities: Sign-to-Text (translating camera gesture inputs into readable speech/text) and Text-to-Sign (converting natural language into fluid, animated sign gestures and illustrations). Designed with high-contrast accessibility standards and responsive mobile ergonomics.',
    category: 'mobile',
    tags: ['Flutter', 'Dart', 'Computer Vision', 'Mobile UI/UX', 'Accessibility', 'Cross-Platform'],
    metrics: 'Multi-screen accessibility suite with Text-to-Sign & Sign-to-Text',
    featured: true,
    githubUrl: 'https://github.com/AKHXI1',
    demoType: 'signsync',
    imageGradient: 'from-emerald-500/30 via-teal-600/20 to-cyan-800/30',
    highlights: [
      'Bidirectional communication: Real-time Sign-to-Text and interactive Text-to-Sign engine.',
      'Custom interactive gesture visualization screens for rapid communication in public settings.',
      'Clean architectural separation using Provider state management and modular services.',
      'Designed for Android, iOS, and Web with responsive adaptive layouts.',
      'Specialized accessible UX with high-contrast modes, large touch targets, and tactile haptic feedback.'
    ],
    architecture: [
      'Flutter 3.x with Dart strict-mode type safety',
      'Provider / Change Notifier reactive state management',
      'Custom gesture asset dictionary with indexing for instant word lookup',
      'Modular Service-Repository pattern for ML and camera pipelines'
    ]
  },
  {
    id: 'midnight-kallan',
    title: 'Midnight Kallan',
    tagline: 'Atmospheric 3D Stealth Action Game built in Unity & Blender',
    description: 'An immersive 3D stealth adventure featuring custom-modeled assets in Blender, dynamic volumetric lighting, patrol AI, and stealth mechanics in Unity.',
    longDescription: 'Midnight Kallan is a solo-developed 3D stealth game built from scratch. It puts players in the shoes of a stealth operative navigating intricate nighttime environments. Akhil authored original 3D environmental assets and character models in Blender, configured custom PBR materials and lighting in Unity, and implemented finite-state-machine guard AI with line-of-sight cone detection and alarm networks.',
    category: 'game',
    tags: ['Unity 3D', 'C#', 'Blender', 'Game AI', 'Volumetric Lighting', 'Level Design', 'Shaders'],
    metrics: 'Custom 3D models, AI patrol systems & stealth physics',
    featured: true,
    githubUrl: 'https://github.com/AKHXI1',
    demoType: 'generic',
    imageGradient: 'from-purple-600/30 via-violet-800/20 to-black',
    highlights: [
      'Original 3D assets, props, and level geometry modeled from scratch in Blender.',
      'Smart guard patrol AI using state machines (Patrol, Investigate, Chase, Alert).',
      'Vision cone Raycasting and stealth sound-radius detection mechanics in C#.',
      'Atmospheric nighttime aesthetics using Unity Universal Render Pipeline (URP) and post-processing bloom/shadows.',
      'Physics-based interaction and smooth character controller with crouching and stealth vaults.'
    ],
    architecture: [
      'Unity Universal Render Pipeline (URP)',
      'Blender 3D Modeling, UV unwrapping, and asset optimization',
      'C# modular gameplay scripts: State Machine AI, PlayerController, SoundSensors',
      'Dynamic NavMesh baked pathfinding with dynamic obstacle avoidance'
    ]
  },
  {
    id: 'altos-fullstack',
    title: 'Altos Enterprise Suite',
    tagline: 'Robust Full-Stack Web Architecture with Django & MySQL',
    description: 'A comprehensive full-stack enterprise web application delivering relational database modeling, authenticated REST APIs, and reactive dashboards.',
    longDescription: 'The Altos architecture demonstrates end-to-end full-stack engineering proficiency. Built using Python, Django, MySQL, and modern JavaScript, it implements secure role-based access control, relational database schema optimization, indexing, dynamic form validation, and transactional integrity.',
    category: 'fullstack',
    tags: ['Python', 'Django', 'MySQL', 'REST API', 'JavaScript', 'HTML5/CSS3', 'Bootstrap'],
    metrics: 'Relational schema, secure authentication & CRUD APIs',
    featured: false,
    githubUrl: 'https://github.com/AKHXI1',
    demoType: 'generic',
    imageGradient: 'from-amber-500/30 via-orange-600/20 to-red-900/30',
    highlights: [
      'Structured Django MVC architecture with reusable modular apps and clean separation of concerns.',
      'Relational MySQL schema design with primary/foreign key constraints and indexing.',
      'Secure authentication, session management, CSRF protection, and permission gateways.',
      'Interactive dashboard views with real-time data filtering and dynamic client updates.'
    ],
    architecture: [
      'Django 5.x Web Framework with ORM query optimization',
      'MySQL relational database with normalized schema',
      'RESTful endpoints for asynchronous client interactions',
      'Responsive frontend template layer with modular CSS'
    ]
  },
  {
    id: 'family-tree-engine',
    title: 'Kinship: Interactive Family Tree Engine',
    tagline: 'Dynamic Hierarchical Graph & Lineage Visualization',
    description: 'An interactive genealogical explorer that renders complex multi-generational family trees with recursive tree layouts and node traversal.',
    longDescription: 'Kinship is a visual exploration tool solving the visual layout problem of multi-generational lineage. It dynamically computes node positioning, handles complex spouse/sibling relationship lines without overlapping collisions, and offers smooth pan-and-zoom navigation through deep familial histories.',
    category: 'fullstack',
    tags: ['JavaScript', 'HTML5 Canvas', 'SVG', 'Graph Algorithms', 'Data Structures', 'UI/UX'],
    metrics: 'Recursive hierarchical layout & collision-free line routing',
    featured: false,
    githubUrl: 'https://github.com/AKHXI1',
    demoType: 'generic',
    imageGradient: 'from-emerald-600/30 via-blue-600/20 to-slate-900',
    highlights: [
      'Custom recursive hierarchy layout algorithm rendering clean generations without cross-line chaos.',
      'Interactive node expansion, metadata inspector, and biographical modal cards.',
      'Hardware-accelerated pan, pinch, and zoom viewport handling large graph topologies.'
    ],
    architecture: [
      'Adjacency list & node graph data structure in JavaScript',
      'Dynamic SVG vector rendering with bezier curve connection routing',
      'Spatial indexing for instantaneous node hover detection and click queries'
    ]
  },
  {
    id: 'song-transliterator',
    title: 'OmniScript Transliterator',
    tagline: 'High-speed client-side multi-script phonetic transliteration engine',
    description: 'A specialized engine converting foreign scripts (Kanji/Kana, Hangul, Devanagari) into phonetic Latin text for pronunciation and sing-along experiences.',
    longDescription: 'Built to power real-time musical and linguistic accessibility, OmniScript maps phonetic phonemes from non-Latin scripts directly to English/Latin alphabets. Optimized for low-memory execution inside browser extension sandboxes with zero external network overhead.',
    category: 'ai-extension',
    tags: ['JavaScript', 'Phonetics', 'NLP', 'Unicode Mapping', 'Performance Optimization'],
    metrics: '<2ms transliteration latency per sentence',
    featured: false,
    githubUrl: 'https://github.com/AKHXI1',
    demoType: 'generic',
    imageGradient: 'from-cyan-500/30 via-blue-600/20 to-indigo-900/30',
    highlights: [
      'Sub-millisecond dictionary lookup with trie-based prefix matching for compound characters.',
      'Handles complex syllable blocks in Korean Hangul (Jamo decomposition).',
      'Pure JavaScript zero-dependency module running flawlessly in service workers.'
    ],
    architecture: [
      'Unicode code-point decomposition & lookup tables',
      'Regex tokenizer with contextual syllable boundary recognition',
      'Direct module exports for Chrome Extension & Node.js environments'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Languages & Core Systems',
    icon: 'Terminal',
    skills: [
      { name: 'Python', level: 92, category: 'Backend & AI', description: 'Django, REST APIs, Automation scripts, data processing', tag: 'Primary' },
      { name: 'TypeScript & JavaScript', level: 90, category: 'Web & Extensions', description: 'ESNext, React, Node.js, Chrome MV3 extensions, DOM manipulation', tag: 'Primary' },
      { name: 'Dart', level: 86, category: 'Mobile', description: 'Flutter SDK, reactive state management, asynchronous streams', tag: 'Primary' },
      { name: 'C#', level: 80, category: 'Game Dev', description: 'Unity gameplay mechanics, state machines, math & vectors' },
      { name: 'C Programming', level: 78, category: 'Systems', description: 'Memory management, pointers, fundamental data structures & algorithms' },
      { name: 'SQL', level: 84, category: 'Database', description: 'MySQL, schema design, relations, query optimization' }
    ]
  },
  {
    name: 'Frameworks, Engines & Platforms',
    icon: 'Layers',
    skills: [
      { name: 'React & Vite', level: 88, category: 'Frontend', description: 'Modern functional components, custom hooks, Tailwind integration', tag: 'Featured' },
      { name: 'Flutter SDK', level: 88, category: 'Mobile', description: 'Cross-platform mobile apps for Android & iOS, custom animations', tag: 'Featured' },
      { name: 'Unity Engine', level: 82, category: 'Game Dev', description: 'Universal Render Pipeline, NavMesh AI, Physics, Particle systems' },
      { name: 'Django', level: 85, category: 'Backend', description: 'MVC architecture, ORM, authentication, admin, REST framework' },
      { name: 'Tailwind CSS', level: 94, category: 'Styling', description: 'Glassmorphism, responsive grids, custom theme animations' }
    ]
  },
  {
    name: 'AI, Web Extensions & APIs',
    icon: 'Cpu',
    skills: [
      { name: 'Google Gemini AI', level: 90, category: 'AI Integration', description: 'Prompt engineering, structured output, multi-modal lyric analysis', tag: 'Hot' },
      { name: 'Chrome Extensions MV3', level: 94, category: 'Extensions', description: 'Service workers, content scripts, storage API, messaging bus', tag: 'Specialist' },
      { name: 'REST APIs & Webhooks', level: 88, category: 'Integration', description: 'API contract design, async fetching, error handling & caching' },
      { name: 'Spicetify & Web Scraping', level: 82, category: 'Client Modding', description: 'Desktop Spotify injection, DOM observers, telemetry listeners' }
    ]
  },
  {
    name: 'Tools, 3D & Craft',
    icon: 'Palette',
    skills: [
      { name: 'Blender 3D', level: 76, category: '3D Modeling', description: 'Hard surface modeling, low-poly game assets, UV unwrapping' },
      { name: 'Git & GitHub', level: 88, category: 'DevOps', description: 'Version control, branch workflows, releases, repository management' },
      { name: 'VS Code & Android Studio', level: 92, category: 'Tooling', description: 'Advanced debugging, profilers, linting and formatting' },
      { name: 'UI/UX & Prototyping', level: 85, category: 'Design', description: 'Figma wireframing, cyber aesthetics, micro-interactions' }
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    year: '2026',
    title: 'VerseLens & AI Innovation',
    role: 'Creator & Extension Architect',
    organization: 'Independent Project',
    description: 'Engineered VerseLens, uniting Spotify playback telemetry with Google Gemini AI to bring live poetic translations, transliteration, and cultural insights to millions of listeners worldwide.',
    technologies: ['Gemini AI', 'Chrome MV3', 'JavaScript', 'LRCLIB', 'Spicetify'],
    category: 'ai'
  },
  {
    year: '2026',
    title: 'Midnight Kallan 3D Game',
    role: 'Game Designer & Unity Developer',
    organization: 'Solo Indie Production',
    description: 'Designed and developed a 3D stealth action adventure from scratch. Crafted 3D models in Blender, programmed guard AI state machines, and designed nighttime stealth lighting systems.',
    technologies: ['Unity Engine', 'C#', 'Blender', 'URP', 'Game AI'],
    category: 'game'
  },
  {
    year: '2025',
    title: 'SignSync Accessibility Suite',
    role: 'Mobile Lead & Flutter Developer',
    organization: 'Accessibility Initiative',
    description: 'Architected SignSync on Flutter to empower the deaf and hard-of-hearing community. Engineered bidirectional Text-to-Sign and Sign-to-Text translation screens with inclusive UI ergonomics.',
    technologies: ['Flutter', 'Dart', 'Computer Vision', 'Mobile UX', 'Accessibility'],
    category: 'mobile'
  },
  {
    year: '2025',
    title: 'Altos Full-Stack Enterprise Platform',
    role: 'Full-Stack Developer',
    organization: 'Web Architecture',
    description: 'Developed scalable database-backed web architectures using Python and Django with MySQL. Implemented dynamic dashboards, secure authentication flows, and relational schemas.',
    technologies: ['Python', 'Django', 'MySQL', 'REST APIs', 'JavaScript'],
    category: 'code'
  },
  {
    year: '2024',
    title: 'Foundational Systems & Algorithms',
    role: 'Software Exploration',
    organization: 'Foundations',
    description: 'Mastered low-level systems programming in C, memory management, pointers, and graph algorithms (paving the way for projects like Kinship Family Tree visualizer and custom compilers).',
    technologies: ['C Programming', 'Data Structures', 'Graph Algorithms', 'Memory Management'],
    category: 'code'
  }
];

export const TERMINAL_COMMANDS: { [key: string]: string | (() => string) } = {
  help: `Available commands:
  • about        - Summary of who Akhil is
  • projects     - List of core engineering projects
  • skills       - Technical capabilities & stack
  • verselens    - Deep dive into the VerseLens AI Spotify project
  • signsync     - Overview of SignSync accessibility mobile app
  • contact      - How to reach Akhil for work or collaboration
  • social       - GitHub, LinkedIn & profile links
  • confetti     - Launch celebratory confetti animation!
  • matrix       - Toggle cyber green matrix rain effect
  • sudo hire    - Trigger instant hiring sequence
  • clear        - Clear the terminal screen`,
  about: `Akhil (AKHXI1)
Creative Developer & Multidisciplinary Software Engineer.
Passionate about human-centric software, combining artificial intelligence (Gemini),
mobile apps (Flutter), game development (Unity & Blender), and browser extensions.`,
  projects: `Core Projects:
1. VerseLens       - Spotify AI Lyrics & Meaning Translator (Chrome MV3 + Gemini AI)
2. SignSync        - Inclusive Sign Language & Accessibility Hub (Flutter / Dart)
3. Midnight Kallan - 3D Stealth Action Adventure (Unity & Blender)
4. Altos Suite     - Full-Stack Django + MySQL Enterprise Application
5. Kinship Engine  - Dynamic Family Tree Lineage Visualizer
Type '[project-name]' for specific project details.`,
  verselens: `[PROJECT: VerseLens]
• Category: AI-Powered Browser Extension & Spicetify Desktop Mod
• Stack: Chrome MV3, Google Gemini 1.5 Flash, LRCLIB API, JavaScript
• Purpose: Solves foreign language barrier in music by showing real-time translated lyrics,
  Romanized phonetics, and poetic explanations beneath Spotify songs.`,
  signsync: `[PROJECT: SignSync]
• Category: Cross-Platform Mobile Accessibility Suite
• Stack: Flutter, Dart, State Management, Computer Vision
• Purpose: Bridges the communication divide with real-time Sign-to-Text and Text-to-Sign screens.`,
  skills: `Technical Arsenal:
• Languages: Python, TypeScript, Dart, C#, C, JavaScript, SQL
• Frameworks: Flutter, React, Unity Engine, Django, Vite, Tailwind CSS
• Specializations: AI Integration (Gemini), Chrome Extensions (MV3), 3D Modeling (Blender)`,
  contact: `Get in Touch:
• GitHub: https://github.com/AKHXI1
• Email: akhil.dev.work@gmail.com
• Status: Available for freelance, high-impact roles, and innovative projects.`,
  social: `Connect with Akhil:
• GitHub:   https://github.com/AKHXI1
• LinkedIn: https://linkedin.com/in/akhil-developer
• Portfolio: (You are here!)`,
  'sudo hire': `ACCESS GRANTED: Candidate Akhil has been unlocked with 100% enthusiasm, top-tier engineering craft, and unmatched problem-solving speed. Email dispatch ready!`,
  'sudo hire akhil': `ACCESS GRANTED: Candidate Akhil has been unlocked with 100% enthusiasm, top-tier engineering craft, and unmatched problem-solving speed. Email dispatch ready!`
};
