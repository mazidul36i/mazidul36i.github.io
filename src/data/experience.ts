import type { ExperienceBullet, ExperienceGroups } from "../types";

export const WORK_SUBTITLE =
  "Three years of contributions to Master Data Online — these eleven are the highlights, the ones I'm proudest of, grouped by area.";

/** Categorized experience bullets for the tab filter (indices into EXPERIENCE_BULLETS). */
export const EXP_GROUPS: ExperienceGroups = {
  Featured: [0, 1, 7], // hero achievements
  AI: [1],
  "Data Quality": [2, 6, 10],
  Integration: [8, 5],
  Workflow: [3, 4, 9, 7],
};

export const EXPERIENCE_BULLETS: ExperienceBullet[] = [
  {
    title: "33K-record SAP load-sheet processor",
    body: "Built a Python/Pandas service that ingests SAP Fiori records from Excel load-sheets and automatically triggers MDO create/update/delete operations.",
    stat: "Days → single upload",
    tags: ["Python", "Pandas", "ETL"],
  },
  {
    title: "KAI — AI chat for master data",
    body: "Engineered an AI-powered chat interface that lets users create, update, or delete master data records in natural language. Handles field mapping, real-time validation, auto-fills related data, and routes through approval workflows.",
    stat: "Hours saved per task",
    tags: ["AI", "NLP", "Workflows"],
    link: "https://helpcentre.prospecta.com/documentation/getting-started/kai/",
  },
  {
    title: "User Defined Rules engine",
    body: "Extended the rules engine to support 20+ comparison operators, nested AND/OR groups, configurable warning vs. hard-stop behavior, and role-based access.",
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
