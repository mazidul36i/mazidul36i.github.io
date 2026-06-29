// Shared domain types for portfolio content.

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resume: string;
  photo: string;
  yearsExp: number;
}

export interface ExperienceBullet {
  title: string;
  body: string;
  /** Headline metric, e.g. "99% accuracy". */
  stat?: string;
  tags?: string[];
  /** External documentation / reference link. */
  link?: string;
}

/** Named groups of indices into the experience bullet list, for the tab filter. */
export type ExperienceGroups = Record<string, number[]>;

export interface SkillItem {
  name: string;
  /** Path to an icon asset, or null for a plain dot marker. */
  icon: string | null;
}

export interface SkillRow {
  label: string;
  items: SkillItem[];
}

export interface Project {
  title: string;
  /** Short category label, e.g. "Android", "API". */
  em: string;
  blurb: string;
  stack: string[];
  href: string;
  year: string;
  /** Optional reach/scale badge, e.g. "500K+ installs". */
  badge?: string;
}

export interface StatCard {
  num: string;
  label: string;
  /** Optional link target; "#id" scrolls in-page, otherwise opens externally. */
  href?: string;
}
