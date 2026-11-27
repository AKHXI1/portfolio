import { Project, SkillCategory, TimelineItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Akhil Sabu',
  handle: 'AKHXI1',
  role: 'Software Engineer & Creative Frontend Developer',
  institution: "St. Joseph's College of Engineering & Technology, Palai",
  degree: 'B.Tech in Computer Science & Engineering',
  location: 'Kerala, India',
  timezone: 'IST (UTC+05:30)',
  email: 'akhil.dev.work@gmail.com',
  whatsapp: 'https://wa.me/8138902941',
  whatsappDisplay: '+91 8138902941',
  twitter: 'https://twitter.com/Akhxi1S',
  facebook: 'https://www.facebook.com/people/Akhil-Sabu/pfbid02xdDFWcpvJtYYC2MymYubTP3CgEwbF8SJPLWbTHEKnytrdgr7JCJw3ywP2gS9BEuTl/',
  github: 'https://github.com/AKHXI1',
  linkedin: 'https://linkedin.com/in/akhil-developer',
  resumeUrl: '/resume.pdf',
  avatarUrl: '/man.png',
  status: 'Open to high-impact software roles & innovative collaborations',
  tagline: 'Bridging engineering rigor with intuitive user experiences across AI systems, mobile applications, and interactive 3D.',
  bio: "Passionate software engineer and dedicated frontend developer based in Kerala, India, currently pursuing B.Tech in Computer Science at St. Joseph's College of Engineering and Technology, Palai, Kottayam. Deeply motivated to create engaging, user-friendly applications that solve real-world problems and leave a lasting positive impact through technology, collaboration, and continuous learning.",
  stats: [
    { label: 'Core Projects Engineered', value: '8+' },
    { label: 'Technologies & Stacks', value: '14+' },
    { label: 'Platforms Deployed', value: 'Web / Mobile / Extension / 3D' },
    { label: 'Code Quality & Passion', value: '100%' },
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
    id: 'built-myweb',
    title: 'Built.myweb Portal',
    tagline: 'Responsive Multi-Device Web Application & Interface',
    description: 'A responsive frontend web project exploring modern responsive breakpoints, fluid typography, modular CSS, and accessible navigation.',
    longDescription: 'Built.myweb was created as a cornerstone frontend engineering project at SJCET Palai. It showcases thorough mastery of responsive layouts across desktop, tablet, and mobile displays, incorporating structured semantic HTML5, utility grid systems, and smooth CSS animations.',
    category: 'fullstack',
    tags: ['Bootstrap', 'HTML5', 'CSS3', 'Responsive Design', 'JavaScript'],
    metrics: 'Responsive frontend architecture with fluid grid',
    featured: false,
    liveUrl: 'https://akhxi1.github.io/learning-fest/bootstrap/task6/index.html',
    demoType: 'generic',
    imageGradient: 'from-blue-600/30 via-cyan-600/20 to-slate-900',
    highlights: [
      'Pixel-perfect responsive layout adapting seamlessly from 320px mobile screens to ultra-wide desktop monitors.',
      'Custom Bootstrap components and CSS transitions delivering fluid interactions.',
      'Cross-browser tested and optimized for speed with semantic structure.'
    ],
    architecture: [
      'HTML5 semantic document structure',
      'CSS3 Media Query breakpoints & Flexbox/Grid layouts',
      'Lightweight JavaScript DOM interactivity'
    ]
  },
  {
    id: 'photoshop-creative-suite',
    title: 'Adobe Photoshop Design & Branding Works',
    tagline: 'Digital Art, Graphic Design & Creative Visual Identity Portfolio',
    description: 'A curated visual design portfolio spanning creative branding, typography compositions, photo manipulation, and poster artwork in Adobe Photoshop.',
    longDescription: 'Demonstrating visual design acumen, this collection features creative projects designed in Adobe Photoshop. From brand identities, marketing collateral, and UI mockups to atmospheric digital manipulations, it reflects an eye for color harmony, visual rhythm, and graphic precision.',
    category: 'fullstack',
    tags: ['Adobe Photoshop', 'Graphic Design', 'UI/UX Mockups', 'Visual Branding', 'Color Theory'],
    metrics: 'Curated design portfolio on Google Drive',
    featured: false,
    liveUrl: 'https://drive.google.com/drive/folders/1NEGsmJufG8RTOw-tJ6gIzeoJKDn_nq4N?usp=drive_link',
    demoType: 'generic',
    imageGradient: 'from-pink-600/30 via-rose-600/20 to-purple-950',
    highlights: [
      'Original poster concepts, social assets, and digital artwork with multi-layered blending and color grading.',
      'Vector and raster manipulation, masking, and typography hierarchies.',
      'Complete creative portfolio available for preview on Google Drive.'
    ],
    architecture: [
      'Adobe Photoshop CC digital design suite',
      'Layer comps, non-destructive adjustment masks, and custom typography'
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
      { name: 'Python', level: 92, category: 'Backend & Scripting', description: 'Django, REST APIs, Automation scripts, data processing', tag: 'Primary' },
      { name: 'TypeScript & JavaScript', level: 90, category: 'Web & Extensions', description: 'ESNext, React, Node.js, Chrome MV3 extensions, DOM manipulation', tag: 'Primary' },
      { name: 'Dart', level: 86, category: 'Mobile', description: 'Flutter SDK, reactive state management, asynchronous streams', tag: 'Primary' },
      { name: 'Java', level: 82, category: 'Object-Oriented', description: 'Core Java, OOP principles, multi-platform applications', tag: 'Legacy Root' },
      { name: 'C Programming', level: 80, category: 'Systems', description: 'Memory management, pointers, fundamental data structures & algorithms' },
      { name: 'C#', level: 80, category: 'Game Dev', description: 'Unity gameplay mechanics, state machines, math & vectors' },
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
      { name: 'Tailwind CSS & Bootstrap', level: 94, category: 'Styling', description: 'Glassmorphism, responsive grids, custom theme animations' }
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
    name: 'Design, 3D & Craft',
    icon: 'Palette',
    skills: [
      { name: 'Adobe Photoshop', level: 88, category: 'Graphic Design', description: 'Photo editing, visual identity, layer blending, poster design', tag: 'Creative Root' },
      { name: 'Blender 3D', level: 76, category: '3D Modeling', description: 'Hard surface modeling, low-poly game assets, UV unwrapping' },
      { name: 'Git & GitHub', level: 88, category: 'DevOps', description: 'Version control, branch workflows, releases, repository management' },
      { name: 'UI/UX & Prototyping', level: 86, category: 'Design', description: 'Figma wireframing, cyber aesthetics, micro-interactions' }
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    year: '2026',
    title: 'VerseLens AI & Extension Architecture',
    role: 'Creator & Lead Architect',
    organization: 'Independent Innovation',
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
    year: '2023 - 2024',
    title: 'Foundations at SJCET Palai & Creative Design',
    role: 'B.Tech Computer Science Scholar',
    organization: "St. Joseph's College of Engineering & Technology, Palai",
    description: 'Mastered low-level systems programming in C, Java OOP principles, data structures, and algorithms. Built early responsive web apps (Built.myweb) and authored creative design suites in Adobe Photoshop.',
    technologies: ['C', 'Java', 'Python', 'Bootstrap', 'Adobe Photoshop', 'Data Structures'],
    category: 'code'
  }
];

export const TERMINAL_COMMANDS: { [key: string]: string | (() => string) } = {
  help: `Available commands:
  • about        - Complete profile of Akhil Sabu
  • college      - Academic background at SJCET Palai
  • projects     - All 8 engineering & creative works
  • skills       - Technical capabilities & stack
  • verselens    - Deep dive into VerseLens AI Spotify project
  • signsync     - SignSync mobile accessibility overview
  • whatsapp     - Direct WhatsApp transmission link
  • resume       - Direct download link for Akhil's CV
  • contact      - Reach Akhil via WhatsApp, Email & Socials
  • confetti     - Launch celebratory fireworks!
  • matrix       - Activate cyber green matrix rain
  • sudo hire    - Trigger instant hiring sequence
  • clear        - Clear the terminal screen`,
  about: `Akhil Sabu (AKHXI1)
Creative Technologist, Software Engineer & Frontend Developer from Kerala, India.
B.Tech Computer Science at St. Joseph's College of Engineering & Technology, Palai.
Specializing in AI extensions (Gemini), Flutter mobile apps, Unity 3D, and full-stack architectures.`,
  college: `Education:
• Institution: St. Joseph's College of Engineering & Technology (SJCET), Palai, Kottayam, Kerala
• Degree: B.Tech in Computer Science & Engineering
• Focus: Software Engineering, Data Structures, Modern Web Systems & Human-Computer Interaction`,
  whatsapp: `WhatsApp Direct: https://wa.me/8138902941 (Phone: +91 8138902941)`,
  resume: `Download Resume: /resume.pdf (Click 'Download CV' on the About section or open directly)`,
  projects: `Engineered Works:
1. VerseLens       - Spotify AI Lyrics & Meaning Translator (Chrome MV3 + Gemini AI)
2. SignSync        - Inclusive Sign Language & Accessibility Hub (Flutter / Dart)
3. Midnight Kallan - 3D Stealth Action Adventure (Unity & Blender)
4. Altos Suite     - Full-Stack Django + MySQL Enterprise Application
5. Built.myweb     - Responsive Web Interface (Bootstrap & CSS3)
6. Photoshop Suite - Branding & Graphic Design Collection
7. Kinship Engine  - Dynamic Family Tree Lineage Visualizer
8. OmniScript      - High-Speed Phonetic Transliterator`,
  skills: `Technical Arsenal:
• Languages: Python, TypeScript, Dart, Java, C, C#, SQL
• Frameworks: React, Flutter, Unity 3D, Django, Tailwind CSS, Bootstrap
• Tools & AI: Google Gemini AI, Chrome Extensions MV3, Adobe Photoshop, Blender 3D, Git`,
  contact: `Communication Channels:
• WhatsApp: https://wa.me/8138902941
• Email:    akhil.dev.work@gmail.com
• Twitter:  https://twitter.com/Akhxi1S
• GitHub:   https://github.com/AKHXI1
• Location: Kerala, India`,
  'sudo hire': `ACCESS GRANTED: Candidate Akhil Sabu unlocked with 100% enthusiasm, SJCET engineering rigor, and multidisciplinary design craft!`,
  'sudo hire akhil': `ACCESS GRANTED: Candidate Akhil Sabu unlocked with 100% enthusiasm, SJCET engineering rigor, and multidisciplinary design craft!`
};
