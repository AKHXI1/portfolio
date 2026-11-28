import { DevProject } from '../types';

/**
 * DEVELOPER PROJECTS DATA
 * Easily swap `liveUrl`, `githubUrl`, and `screenshots` with your local files or deployed URLs.
 * - If `liveUrl` is set, the modal shows "View Live Demo" (primary) + "View on GitHub" (secondary).
 * - If `liveUrl` is undefined, the modal shows "View on GitHub" as the primary action button.
 */
export const devProjects: DevProject[] = [
  {
    id: 'brio-wellness',
    title: 'Brio — Desktop Wellness Companion',
    summary: 'Native Windows desktop companion featuring a 3D GLB mascot and smart wellness reminders.',
    primaryTags: ['Python', '3D GLB', 'Windows Desktop'],
    fullTechStack: ['Python', '3D GLB', 'Windows Desktop', 'Desktop Overlay UI', 'Smart Timers', 'PySide / Native Bridge'],
    badge: 'Flagship Desktop App',
    githubUrl: 'https://github.com/AKHXI1',
    liveUrl: undefined, // GitHub only
    overview: {
      whatItDoes:
        'Brio lives unobtrusively on your Windows desktop as an animated 3D companion character, proactively nudging developers and designers to correct posture, hydrate, and follow 20-20-20 eye-rest intervals.',
      problemSolved:
        'Long coding and design sessions cause unnoticed eye strain, dehydration, and slouching—traditional calendar notifications are noisy and easily ignored.',
      whatIBuilt: [
        'Native Windows desktop application loop with lightweight resource footprint and always-on-top transparent companion canvas.',
        'Interactive 3D GLB character state machine switching smoothly between idle, active focus, stretch, hydration, and eye-rest animations.',
        'Customizable wellness reminder scheduler with snooze, focus-session awareness, and non-intrusive toast popups.'
      ]
    },
    architecture: [
      'Python Core Scheduler & Windows Native Process Loop',
      '3D GLB Asset Pipeline with Idle / Active State Transitions',
      'Non-Intrusive Desktop Notification & Posture Timer Engine',
      'Low-Memory Background Execution for Daily Developer Workflows'
    ],
    screenshots: [
      {
        title: 'Brio Companion Idle & Desk Overlay',
        caption: 'Transparent Windows desktop widget rendering the 3D companion character alongside subtle status cues.',
        // image: '/assets/projects/brio-idle.png',
        accent: 'from-cyan-500/25 via-emerald-500/15 to-slate-900'
      },
      {
        title: 'Posture & 20-20-20 Eye-Rest Toast',
        caption: 'Smart timed wellness popup prompting a 20-second gaze break and shoulder stretch.',
        // image: '/assets/projects/brio-reminder.png',
        accent: 'from-emerald-500/25 via-teal-500/15 to-slate-900'
      },
      {
        title: 'Wellness Preferences & Timer Controls',
        caption: 'Configure hydration intervals, focus mode silencing, and companion animation states.',
        // image: '/assets/projects/brio-settings.png',
        accent: 'from-sky-500/25 via-cyan-500/15 to-slate-900'
      }
    ]
  },
  {
    id: 'pinghr',
    title: 'PingHR — AI Job Discovery & Outreach',
    summary: 'Multi-user AI job discovery, ATS resume checker, and automated outreach platform.',
    primaryTags: ['FastAPI', 'React', 'SQLAlchemy'],
    fullTechStack: ['Python', 'FastAPI', 'React', 'Vite', 'SQLAlchemy', 'PostgreSQL', 'SQLite', 'Fernet Encryption', 'Docker'],
    badge: 'Full-Stack AI Platform',
    githubUrl: 'https://github.com/AKHXI1/PingHR',
    liveUrl: undefined,
    overview: {
      whatItDoes:
        'A multi-user web platform built with FastAPI, SQLAlchemy, and React/Vite where users can sign up, upload resumes, link GitHub profiles, store encrypted SMTP/AI keys, and run personalized job matching and outreach in isolated workspaces.',
      problemSolved:
        'Manual job hunting across dozens of job boards, auditing resumes for ATS parseability, and managing cold HR outreach without exposing credentials or hitting bounce issues is slow and fragmented.',
      whatIBuilt: [
        'Multi-user authentication with scrypt password hashing, HTTP-only session cookies, and Fernet-encrypted storage for per-user SMTP and Gemini/Claude/Adzuna API keys.',
        'Live job scraping pipeline across 20 global job boards and MNC portals (Workday, Greenhouse, Lever, Infopark, Technopark, Remotive, Adzuna, and more) with dynamic per-user skill and GitHub matching.',
        'Built-in Resume ATS-Friendly Checker for PDF/DOCX parseability, JD keyword gap analysis, and 24/7 autopilot outreach with DNS MX checks and bounce quarantine.'
      ]
    },
    architecture: [
      'FastAPI Async Backend & SQLAlchemy ORM (SQLite WAL / PostgreSQL)',
      'React + Vite Frontend with Multi-User Isolated Workspaces',
      'Fernet Encrypted Credential Vault & scrypt Session Auth',
      '20-Source Job Scraper, ATS Analyzer & Deliverability Guard'
    ],
    screenshots: [
      {
        title: 'Multi-Source Job Discovery & Match Scoring',
        caption: 'Shared job catalog scraped from 20 global boards and Kerala tech parks, scored dynamically against your resume and GitHub.',
        accent: 'from-cyan-500/25 via-sky-500/15 to-slate-900'
      },
      {
        title: 'Resume ATS-Friendly Checker & Gap Analysis',
        caption: 'Structural PDF/DOCX parseability audit, impact checks, and job-description keyword gap analyzer.',
        accent: 'from-emerald-500/25 via-cyan-500/15 to-slate-900'
      },
      {
        title: 'Per-User Autopilot & Deliverability Guard',
        caption: 'Encrypted SMTP/AI key vault with DNS MX verification, bounce quarantine, and HR timezone radar.',
        accent: 'from-indigo-500/25 via-cyan-500/15 to-slate-900'
      }
    ]
  },
  {
    id: 'sign-sync',
    title: 'Sign Sync',
    summary: 'Bidirectional AI sign language translator pairing LSTM vision with a 3D Flutter avatar.',
    primaryTags: ['Python', 'TensorFlow', 'FastAPI'],
    fullTechStack: ['Python', 'TensorFlow', 'LSTM', 'MediaPipe', 'FastAPI', 'WebSockets', 'Flutter'],
    badge: 'B.Tech Major Project',
    githubUrl: 'https://github.com/AKHXI1',
    liveUrl: undefined, // GitHub only
    overview: {
      whatItDoes:
        'A real-time bidirectional communication bridge translating hand/pose sign language into text (Sign-to-Text) and converting spoken/written phrases into animated 3D avatar gestures (Text-to-Sign).',
      problemSolved:
        'Removes everyday communication friction between the deaf/mute community and non-signers without requiring expensive specialized hardware.',
      whatIBuilt: [
        'MediaPipe landmark extraction pipeline feeding temporal keypoint sequences into a trained TensorFlow LSTM classifier.',
        'FastAPI async backend streaming predictions and gesture keyframes over low-latency WebSockets.',
        'Cross-platform Flutter frontend featuring a real-time 3D avatar renderer for expressive text-to-sign playback.'
      ]
    },
    architecture: [
      'MediaPipe 21-Point Hand & Upper-Body Landmark Extraction',
      'TensorFlow / Keras LSTM Temporal Sequence Classification Model',
      'FastAPI Async WebSocket Server for Real-Time Frame Streaming',
      'Flutter Mobile Client with 3D Avatar Gesture Renderer'
    ],
    screenshots: [
      {
        title: 'Real-Time Sign-to-Text Recognition',
        caption: 'Live camera landmark overlay classifying dynamic ASL/ISL hand gestures via TensorFlow LSTM.',
        // image: '/assets/projects/signsync-vision.png',
        accent: 'from-emerald-500/25 via-cyan-500/15 to-slate-900'
      },
      {
        title: '3D Avatar Text-to-Sign Playback',
        caption: 'Flutter interface rendering natural-language sentences as fluid 3D sign animations over WebSockets.',
        // image: '/assets/projects/signsync-avatar.png',
        accent: 'from-cyan-500/25 via-sky-500/15 to-slate-900'
      }
    ]
  },
  {
    id: 'odoo-erp-modules',
    title: 'Odoo ERP Custom Modules (Astra Golden MS & Intercompany Label Transfer)',
    summary: 'Enterprise Odoo 17/19 modules for jewellery workflows and intercompany stock transfers.',
    primaryTags: ['Odoo 17/19', 'Python', 'PostgreSQL'],
    fullTechStack: ['Odoo 17/19', 'Python', 'PostgreSQL', 'QWeb', 'XML Views', 'ORM'],
    badge: 'Enterprise ERP • EMPIRE AE',
    githubUrl: 'https://github.com/AKHXI1',
    liveUrl: undefined, // GitHub only
    overview: {
      whatItDoes:
        'Custom enterprise Odoo ERP modules engineered for high-volume jewellery management (Astra Golden MS), intercompany product label transfer automation, and Saudi construction company operations.',
      problemSolved:
        'Standard out-of-the-box ERP flows do not handle multi-branch jewellery weight/purity tracking, automated intercompany label transfers, or specialized contracting workflows.',
      whatIBuilt: [
        'Custom Python ORM models, computed fields, constraints, and automated server actions tailored to Astra Golden MS workflows.',
        'Intercompany product label transfer pipelines synchronizing stock moves, barcodes, and accounting entries across branches.',
        'Custom XML form/tree views and pixel-accurate QWeb PDF reports backed by tuned PostgreSQL queries.'
      ]
    },
    architecture: [
      'Odoo 17/19 Modular Python Addon Architecture (_inherit & _inherits)',
      'PostgreSQL Indexed Queries & Multi-Company Record Rules',
      'QWeb PDF Report Engine for Labels, Invoices & Transfer Slips',
      'Automated Server Actions & Scheduled Inventory Sync'
    ],
    screenshots: [
      {
        title: 'Astra Golden MS Jewellery Workflow',
        caption: 'Custom Odoo views managing item purity, weight reconciliation, and branch stock tracking.',
        // image: '/assets/projects/odoo-astra.png',
        accent: 'from-amber-500/20 via-emerald-500/15 to-slate-900'
      },
      {
        title: 'Intercompany Label Transfer & QWeb Slip',
        caption: 'Automated multi-company product label generation and stock transfer validation.',
        // image: '/assets/projects/odoo-transfer.png',
        accent: 'from-emerald-500/25 via-cyan-500/15 to-slate-900'
      }
    ]
  },
  {
    id: 'journey-sync',
    title: 'Journey Sync',
    summary: 'Smart multi-stop ticketing platform enabling adjacent seat booking across stops.',
    primaryTags: ['JavaScript', 'Handlebars', 'MongoDB'],
    fullTechStack: ['JavaScript', 'Handlebars (HBS)', 'MongoDB', 'Mongoose', 'HTML5', 'CSS3'],
    badge: 'Full-Stack Web App',
    githubUrl: 'https://github.com/AKHXI1',
    // Set your deployed URL below when live (currently configured so "View Live Demo" can be toggled easily):
    liveUrl: 'https://github.com/AKHXI1', // Replace with live deployment URL or set undefined for GitHub-only
    overview: {
      whatItDoes:
        'A smart ticketing booking system where passengers boarding from different intermediate route locations can coordinate and book adjacent seats in a single unified transaction.',
      problemSolved:
        'Conventional transit booking platforms isolate seat inventories per boarding point, making it difficult for friends boarding at separate stops to sit together.',
      whatIBuilt: [
        'Dynamic seat-availability and segment-overlap engine validating multi-stop adjacency in real time.',
        'MongoDB and Mongoose schemas modeling routes, multi-leg seat locks, and atomic booking records.',
        'Server-rendered interactive booking UI built with Handlebars (HBS), JavaScript, HTML5, and CSS3.'
      ]
    },
    architecture: [
      'MongoDB & Mongoose Multi-Segment Seat Mapping Schema',
      'Handlebars (HBS) Dynamic Server Templates',
      'Single-Transaction Multi-Stop Seat Adjacency Validator'
    ],
    screenshots: [
      {
        title: 'Multi-Stop Adjacent Seat Selector',
        caption: 'Interactive seat grid highlighting contiguous availability across staggered boarding stops.',
        // image: '/assets/projects/journeysync-seats.png',
        accent: 'from-sky-500/25 via-indigo-500/15 to-slate-900'
      },
      {
        title: 'Unified Transaction Checkout',
        caption: 'Consolidated booking confirmation linking multiple boarding stops to adjacent seats.',
        // image: '/assets/projects/journeysync-checkout.png',
        accent: 'from-cyan-500/25 via-sky-500/15 to-slate-900'
      }
    ]
  },
  {
    id: 'theyyam-runner',
    title: 'Theyyam: Echoes of Malabar / 3D Endless Runner',
    summary: 'Cultural 3D endless runner inspired by Malabar Theyyam traditions with custom Blender art.',
    primaryTags: ['Unity', 'C#', 'Blender'],
    fullTechStack: ['Unity', 'C#', 'Blender', 'JavaScript', 'URP Shaders', 'Procedural Level Spawning'],
    badge: '3D Game Dev',
    githubUrl: 'https://github.com/AKHXI1',
    // Set your WebGL/itch.io live URL when ready, or leave undefined for GitHub-only:
    liveUrl: undefined,
    overview: {
      whatItDoes:
        'A stylized 3D endless runner blending Kerala’s vibrant Malabar Theyyam folklore with fast-paced lane-switching obstacle mechanics, dynamic lighting, and custom 3D environments.',
      problemSolved:
        'Explores bringing rich regional cultural aesthetics into responsive 3D real-time gameplay with optimized mobile/web frame pacing.',
      whatIBuilt: [
        'Custom 3D character props, temple/shrine lane assets, and UV-textured environments modeled in Blender.',
        'Object-pooled endless tile spawner, swipe/keyboard runner physics, and escalating speed curves in Unity C#.',
        'Atmospheric firelight and rim shaders built on Unity Universal Render Pipeline (URP).'
      ]
    },
    architecture: [
      'Unity C# Object-Pooled Endless Track Generator',
      'Blender 3D Character & Cultural Environment Modeling',
      'URP Atmospheric Lighting & Particle Effects'
    ],
    screenshots: [
      {
        title: 'Malabar Temple Track & Runner Pose',
        caption: 'Stylized 3D runner scene lit by warm torchlight particles and custom Blender assets.',
        // image: '/assets/projects/theyyam-gameplay.png',
        accent: 'from-rose-500/25 via-amber-500/15 to-slate-900'
      },
      {
        title: 'Blender 3D Asset & Rig Preview',
        caption: 'Low-poly optimized character headgear and modular environment tiles.',
        // image: '/assets/projects/theyyam-blender.png',
        accent: 'from-purple-500/25 via-cyan-500/15 to-slate-900'
      }
    ]
  }
];
