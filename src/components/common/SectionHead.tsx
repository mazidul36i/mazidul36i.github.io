import type { ReactNode } from "react";

interface SectionHeadProps {
  /** Section number badge, e.g. "/02". Omit for a full-width head. */
  num?: string;
  /** Short uppercase label shown next to the number, e.g. "Work". */
  label?: string;
  /** Title content; use <span className="em"> for the italic accent word. */
  title: ReactNode;
  /** Optional supporting paragraph. */
  sub?: ReactNode;
}

/** Shared two-column section header used across every section. */
export function SectionHead({ num, label, title, sub }: SectionHeadProps) {
  const full = num == null;
  return (
    <div className={"section-head fade-up" + (full ? " section-head--full" : "")}>
      {!full && (
        <div className="section-num">
          <span className="mono">{num}</span>
          {label && <span className="label mono">— {label}</span>}
        </div>
      )}
      <div>
        <h2 className="section-title">{title}</h2>
        {sub && <p className="section-sub">{sub}</p>}
      </div>
    </div>
  );
}
