import { useMemo, useState } from "react";
import { EXPERIENCE_BULLETS, EXP_GROUPS } from "../../data/experience";
import { SectionHead } from "../common/SectionHead";
import "./Experience.css";

interface ExperienceProps {
  workSubtitle: string;
  highlightCount: number;
}

export function Experience({ workSubtitle, highlightCount }: ExperienceProps) {
  const [tab, setTab] = useState<string>("Featured");
  const [showAll, setShowAll] = useState(false);
  const tabs = Object.keys(EXP_GROUPS);

  const indices = useMemo(
    () => (showAll ? EXPERIENCE_BULLETS.map((_, i) => i) : EXP_GROUPS[tab]),
    [tab, showAll],
  );
  const bullets = indices.map((i) => ({ ...EXPERIENCE_BULLETS[i], i }));

  return (
    <section className="section" id="work">
      <div className="shell">
        <SectionHead
          title={
            <>
              Where I've been <span className="em">shipping</span>.
            </>
          }
          sub={workSubtitle}
        />

        <div className="exp-header fade-up">
          <div className="org-logo">
            <img src="/assets/icons/prospecta.webp" alt="Prospecta" />
          </div>
          <div>
            <h3 className="role">Development Engineer</h3>
            <div className="org-line">
              <a href="https://www.prospecta.com" target="_blank" rel="noreferrer">
                Prospecta Software
              </a>
              <span>·</span>
              <span>Master Data Online (MDO)</span>
              <span>·</span>
              <span>Bengaluru, IN</span>
            </div>
          </div>
          <div className="duration">FEB 2023 — PRESENT</div>
        </div>

        <div className="exp-tabs fade-up">
          {tabs.map((t) => (
            <button
              key={t}
              className={"exp-tab" + (!showAll && tab === t ? " active" : "")}
              onClick={() => {
                setTab(t);
                setShowAll(false);
              }}
            >
              {t}
            </button>
          ))}
          <button
            className={"exp-tab" + (showAll ? " active" : "")}
            onClick={() => setShowAll(true)}
          >
            All ({highlightCount})
          </button>
        </div>

        <div className="exp-list">
          {bullets.map((b, idx) => (
            <div className="exp-item" key={b.i + "-" + idx}>
              <div className="idx mono">/{String(b.i + 1).padStart(2, "0")}</div>
              <div className="body">
                <h4>
                  {b.link ? (
                    <a href={b.link} target="_blank" rel="noreferrer">
                      {b.title} ↗
                    </a>
                  ) : (
                    b.title
                  )}
                </h4>
                <p>{b.body}</p>
                <div className="meta">
                  {b.stat && <span className="stat mono">→ {b.stat}</span>}
                  {b.stat && b.tags && (
                    <span style={{ margin: "0 12px", color: "var(--ink-3)" }}>·</span>
                  )}
                  {b.tags && b.tags.join(" · ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
