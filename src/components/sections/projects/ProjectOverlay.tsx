import type { CSSProperties } from "react";
import type { Project } from "../../../types";
import { domainOf } from "../../../lib/scroll";
import { ArrowUpRight, Close } from "../../common/Icons";
import { ProjectPreview } from "./ProjectPreview";

interface ProjectOverlayProps {
  project: Project;
  hue: number;
  /** Whether the enter transition is active. */
  show: boolean;
  onClose: () => void;
  onCancelClose: () => void;
  onScheduleClose: () => void;
}

/** Expanded hover-to-preview overlay for a single project. */
export function ProjectOverlay({
  project,
  hue,
  show,
  onClose,
  onCancelClose,
  onScheduleClose,
}: ProjectOverlayProps) {
  return (
    <div
      className={"proj-overlay" + (show ? " in" : "")}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="po-backdrop" onClick={onClose} />
      <div
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
