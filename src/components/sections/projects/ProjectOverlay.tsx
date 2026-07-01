import { useLayoutEffect, useRef, type CSSProperties } from "react";
import type { Project } from "../../../types";
import { domainOf } from "../../../lib/scroll";
import { ArrowUpRight, Close } from "../../common/Icons";
import { ProjectPreview } from "./ProjectPreview";

interface ProjectOverlayProps {
  project: Project;
  hue: number;
  /** Whether the enter transition is active. */
  show: boolean;
  /** The rect of the originating card, used to expand from / collapse to it. */
  originRect: DOMRect | null;
  onClose: () => void;
  onCancelClose: () => void;
  onScheduleClose: () => void;
}

/** Expanded hover-to-preview overlay for a single project. */
export function ProjectOverlay({
  project,
  hue,
  show,
  originRect,
  onClose,
  onCancelClose,
  onScheduleClose,
}: ProjectOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // FLIP: expand the panel out of the originating card (and collapse back to it
  // on close) by animating from the card's rect to the panel's resting rect.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || !originRect) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Measure the panel's natural (untransformed) rect.
    panel.style.transform = "none";
    const p = panel.getBoundingClientRect();
    const sx = originRect.width / p.width;
    const sy = originRect.height / p.height;
    const dx = originRect.left + originRect.width / 2 - (p.left + p.width / 2);
    const dy = originRect.top + originRect.height / 2 - (p.top + p.height / 2);
    const collapsed = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;

    if (show) {
      // Start collapsed (no transition), then release to the resting position.
      panel.style.transition = "none";
      panel.style.transform = collapsed;
      panel.style.opacity = "0";
      requestAnimationFrame(() => {
        panel.style.transition = "";
        panel.style.transform = "none";
        panel.style.opacity = "1";
      });
    } else {
      // Collapse back into the card.
      panel.style.transform = collapsed;
      panel.style.opacity = "0";
    }
  }, [show, originRect]);

  return (
    <div
      className={"proj-overlay" + (show ? " in" : "")}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="po-backdrop" onClick={onClose} />
      <div
        ref={panelRef}
        className="po-panel"
        style={{ "--h": hue } as CSSProperties}
        onMouseEnter={onCancelClose}
        onMouseLeave={onScheduleClose}
      >
        <button className="po-close" onClick={onClose} aria-label="Close preview">
          <Close size={16} />
        </button>
        <div className="po-grid">
          <div className="proj-preview po-preview">
            <ProjectPreview project={project} />
          </div>
          <div className="po-detail">
            <span className="proj-pill">{project.em}</span>
            <h3 className="po-title">{project.title}</h3>
            <p className="po-blurb">{project.blurb}</p>
            <dl className="po-meta">
              <div className="po-meta-stack">
                <dt>Stack</dt>
                <dd>
                  <div className="proj-stack">
                    {project.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              {project.badge && (
                <div>
                  <dt>Reach</dt>
                  <dd>{project.badge}</dd>
                </div>
              )}
              <div>
                <dt>Link</dt>
                <dd>{domainOf(project.href)}</dd>
              </div>
            </dl>
            <a className="po-cta" href={project.href} target="_blank" rel="noreferrer">
              Visit project
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
