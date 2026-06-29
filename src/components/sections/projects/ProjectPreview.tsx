import type { Project } from "../../../types";
import { domainOf } from "../../../lib/scroll";

/** Browser-mockup preview shared by the project card and the expanded overlay. */
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
      <div className="pp-cover">
        {project.badge && <span className="pp-badge">{project.badge}</span>}
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
      </div>
    </>
  );
}
