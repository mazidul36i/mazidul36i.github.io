// data.jsx — content for the portfolio
const PROFILE = {
  name: "Mazidul Islam",
  title: "Software Engineer",
  location: "India",
  email: "connect@mazidul.com",
  github: "https://github.com/mazidul36i",
  linkedin: "https://www.linkedin.com/in/mazidul36i/",
  resume: "assets/resume.pdf",
  photo: "assets/profile.jpg",
  yearsExp: 3,
};

const TYPER_PHRASES = [
  "Backend systems @ Prospecta Software",
  "Spring Boot · PostgreSQL · Elasticsearch",
  "Building tools that turn days into uploads.",
  "AI-powered interfaces & data quality at scale.",
];

const STATS = [
  { num: "3", unit: "+ yrs", label: "Engineering" },
  { num: "99", unit: "%", label: "Data-profiling accuracy" },
  { num: "500", unit: "K+", label: "App installs shipped" },
  { num: "11", unit: "+", label: "Highlight features shipped" },
];

// Categorized experience bullets for tab filter
const EXP_GROUPS = {
  Featured: [0, 1, 7], // hero achievements
  AI: [1],
  "Data Quality": [2, 6, 10],
  Integration: [8, 5],
  Workflow: [3, 4, 9, 7],
};

const EXPERIENCE_BULLETS = [
  {
    title: "33K-record SAP load-sheet processor",
    body: 'Built a Python/Pandas service that ingests SAP Fiori records from Excel load-sheets and automatically triggers MDO create/update/delete operations.',
    stat: "Days → single upload",
    tags: ["Python", "Pandas", "ETL"],
  },
  {
    title: "KAI — AI chat for master data",
    body: 'Engineered an AI-powered chat interface that lets users create, update, or delete master data records in natural language. Handles field mapping, real-time validation, auto-fills related data, and routes through approval workflows.',
    stat: "Hours saved per task",
    tags: ["AI", "NLP", "Workflows"],
    link: "https://helpcentre.prospecta.com/documentation/getting-started/kai/",
  },
  {
    title: "User Defined Rules engine",
    body: 'Extended the rules engine to support 20+ comparison operators, nested AND/OR groups, configurable warning vs. hard-stop behavior, and role-based access.',
    stat: "~60% no-code coverage",
    tags: ["Rules engine", "Validation"],
    link: "https://helpcentre.prospecta.com/documentation/data-quality/business-rules-2/user-defined-rules/",
  },
  {
    title: "Task Analytics dashboard",
    body: "Built a dashboard showing SLA breach counts, open task breakdowns, per-user turnaround, and role-based workload — so admins can spot bottlenecks instead of guessing.",
    tags: ["Analytics", "Dashboards"],
    link: "https://helpcentre.prospecta.com/documentation/active-governance/task-management/task-analytics/",
  },
  {
    title: "Hierarchy View",
    body: "Tree-based UI to explore and manage parent-child relationships across datasets with drag-and-drop, collapsible nodes, and granular view/edit privilege controls.",
    tags: ["UI", "Trees"],
    link: "https://helpcentre.prospecta.com/documentation/getting-started/hierarchy-view/",
  },
  {
    title: "Long Lived Token (4-day hackathon)",
    body: "Auth flow that lets external systems securely call MDO APIs without going through the standard auth dance every time.",
    tags: ["Auth", "Hackathon"],
  },
  {
    title: "Technical Profiling",
    body: "Quick health snapshot of a dataset — null counts, distinct values, data type breakdown, field length ranges.",
    stat: "99% accuracy",
    tags: ["Profiling", "Data quality"],
    link: "https://helpcentre.prospecta.com/documentation/getting-started/technical-profiling",
  },
  {
    title: "MDO ONE — 360° record view",
    body: "Single page per record bringing together quality scores, compliance status, related records, activity history, and team collaboration.",
    stat: "70% fewer dashboard requests",
    tags: ["UX", "Aggregation"],
    link: "https://helpcentre.prospecta.com/documentation/getting-started/mdo-one",
  },
  {
    title: "System Connectivity",
    body: "Module connecting MDO to SAP via BTP/CPI and any non-SAP system over REST, with Basic Auth and OAuth certificate flows.",
    tags: ["Integration", "SAP", "REST"],
    link: "https://helpcentre.prospecta.com/documentation/integration/connectivity/system",
  },
  {
    title: "Hierarchy Restriction",
    body: "Lets admins cap how many hierarchies can be attached or modified on a master record, enforced through existing workflow config.",
    tags: ["Workflow", "Governance"],
  },
  {
    title: "Scheduled Data Quality runs",
    body: "Scheduling support for the Data Intelligence Workbench — consistency, completeness, uniqueness, and accuracy checks run daily, weekly, monthly, or on custom cron.",
    tags: ["Scheduling", "Data quality"],
    link: "https://helpcentre.prospecta.com/documentation/data-quality/diw-schemas",
  },
];

const SKILLS = [
  {
    label: "Languages",
    items: [
      { name: "Java", icon: "assets/icons/java.svg" },
      { name: "Kotlin", icon: "assets/icons/kotlin.svg" },
      { name: "Python", icon: "assets/icons/python.svg" },
      { name: "JavaScript", icon: "assets/icons/javascript.svg" },
      { name: "HTML", icon: "assets/icons/html5.svg" },
      { name: "CSS", icon: "assets/icons/css3.svg" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "Spring Boot", icon: "assets/icons/spring.svg" },
      { name: "Spring Security", icon: "assets/icons/spring-security.png" },
      { name: "Hibernate", icon: "assets/icons/hibernate.svg" },
      { name: "Android", icon: "assets/icons/android.svg" },
    ],
  },
  {
    label: "Data & Messaging",
    items: [
      { name: "PostgreSQL", icon: null },
      { name: "MySQL", icon: "assets/icons/mysql.svg" },
      { name: "Elasticsearch", icon: "assets/icons/elasticsearch.svg" },
      { name: "RabbitMQ", icon: "assets/icons/rabbitmq.svg" },
      { name: "gRPC", icon: "assets/icons/grpc.svg" },
      { name: "Apache Spark", icon: null },
    ],
  },
  {
    label: "Cloud & Tools",
    items: [
      { name: "AWS", icon: "assets/icons/aws.svg" },
      { name: "GCP", icon: "assets/icons/gcp.svg" },
      { name: "Firebase", icon: "assets/icons/firebase.svg" },
      { name: "Docker", icon: "assets/icons/docker.svg" },
      { name: "Git", icon: "assets/icons/git.svg" },
    ],
  },
];

const PROJECTS = [
  {
    title: "Internet Speed Meter",
    em: "Android",
    blurb: "Real-time internet speed and data-usage monitor with 30-day persisted history and per-app usage tracking.",
    stack: ["Java", "Android"],
    href: "https://play.google.com/store/apps/details?id=com.AFG.internetspeedmeter",
    badge: "500K+ installs",
    year: "2022",
  },
  {
    title: "Open Solutions",
    em: "blog",
    blurb: "A tech blog documenting practical fixes — like installing Docker Desktop on Ubuntu 24. Built on Firebase Firestore + Auth + Storage.",
    stack: ["JS", "Firebase", "HTML/CSS"],
    href: "https://opensolutions.web.app/",
    year: "2024",
  },
  {
    title: "MARRS Bank",
    em: "API",
    blurb: "RESTful payment-wallet API with the core CRUD operations of a banking system and per-step user validation.",
    stack: ["Java", "Spring", "MySQL"],
    href: "https://github.com/mazidul36i/marrsbank",
    year: "2023",
  },
  {
    title: "JWT Spring Security",
    em: "starter",
    blurb: "Spring Boot reference for JWT authentication and role-based authorization. Drop-in for any SQL backend.",
    stack: ["Java", "Spring", "Security"],
    href: "https://github.com/mazidul36i/jwt-spring-security",
    year: "2023",
  },
  {
    title: "BetterTPA",
    em: "plugin",
    blurb: "Open-source Minecraft Paper plugin that simplifies player teleportation and warp management.",
    stack: ["Java", "PaperMC"],
    href: "https://github.com/mazidul36i/BetterTPA",
    year: "2022",
  },
];

const BIO = `A backend-leaning Software Engineer with 3+ years building scalable systems on Spring Boot, PostgreSQL, Elasticsearch, RabbitMQ, gRPC, and Apache Spark. Currently shipping the AI, governance, and integration layers of Prospecta's Master Data Online platform — work that's saved client teams days of manual effort and replaced ad-hoc dashboards with a single unified view. I care about clean APIs, predictable data, and software that quietly makes other people's work faster.`;

Object.assign(window, {
  PROFILE, TYPER_PHRASES, STATS, EXPERIENCE_BULLETS, EXP_GROUPS, SKILLS, PROJECTS, BIO,
});
