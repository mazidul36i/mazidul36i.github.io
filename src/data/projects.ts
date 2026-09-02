import type { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    title: "Internet Speed Meter",
    em: "Android",
    blurb: "Real-time internet speed and data-usage monitor with 30-day persisted history and per-app usage tracking.",
    stack: ["Java", "Android"],
    href: "https://play.google.com/store/apps/details?id=com.AFG.internetspeedmeter",
    badge: "500K+ installs",
    year: "2022",
    poster: "/assets/posters/bitvelo.png",
  },
  {
    title: "Open Solutions",
    em: "blog",
    blurb: "A tech blog documenting practical fixes — like installing Docker Desktop on Ubuntu 24. Built on Firebase Firestore + Auth + Storage.",
    stack: ["JS", "Firebase", "HTML/CSS"],
    href: "https://opensolutions.web.app/",
    year: "2024",
    poster: "/assets/posters/open-solutions.png",
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

/** Accent hue (oklch) cycled across project cards. */
export const PROJECT_HUES = [45, 250, 150, 320, 80];
