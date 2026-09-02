import type { ReactNode } from "react";

interface SectionHeadProps {
  /** Title content; use <span className="em"> for the italic accent word. */
  title: ReactNode;
  /** Optional supporting paragraph. */
  sub?: ReactNode;
  /** Optional class to add to the section sub container. */
  subClass?: string;
}

/** Shared section header used across every section. */
export function SectionHead({ title, sub, subClass }: SectionHeadProps) {
  return (
    <div className="section-head fade-up">
      <h2 className="section-title">{title}</h2>
      {sub && <p className={"section-sub " + subClass}>{sub}</p>}
    </div>
  );
}
