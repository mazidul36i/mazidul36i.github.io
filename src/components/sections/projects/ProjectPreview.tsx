import type { Project } from "../../../types";
import { domainOf } from "../../../lib/scroll";

/**
 * Browser-mockup preview shared by the project card and the expanded overlay.
 * Shows a real screenshot when the project has a poster, otherwise a generated
 * cover styled from the card's accent hue.
 */
export function ProjectPreview({ project }: { project: Project }) {
  return (
    <>
      <div className="pp-chrome">
        <span className="pp-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="pp-url">{domainOf(project.href)}</span>
      </div>
      <div className={"pp-cover" + (project.poster ? " has-shot" : "")}>
        {project.badge && <span className="pp-badge">{project.badge}</span>}
        {project.poster ? (
          <div className="pp-shot-frame">
            <div className="pp-shot-box">
              <img
                className="pp-shot"
                src={project.poster}
                alt={`Screenshot of ${project.title}`}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="pp-nav">
              <span className="pp-wordmark">
                <span className="m" />
                {project.title}
              </span>
              <span className="pp-visit">Visit ↗</span>
            </div>
            <div className="pp-hero">
              <h4>{project.title}</h4>
              <div className="pp-sub mono">
                {project.em} · {project.stack[0]}
              </div>
              <span className="pp-cta">Open {project.em}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
