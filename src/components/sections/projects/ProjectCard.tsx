import type { CSSProperties } from "react";
import type { Project } from "../../../types";
import { ArrowUpRight, Expand } from "../../common/Icons";
import { ProjectPreview } from "./ProjectPreview";

interface ProjectCardProps {
  project: Project;
  hue: number;
  onOpen: () => void;
  onScheduleClose: () => void;
}

export function ProjectCard({ project, hue, onOpen, onScheduleClose }: ProjectCardProps) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="proj-card fade-up"
      style={{ "--h": hue } as CSSProperties}
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
    >
      <div className="proj-preview">
        <ProjectPreview project={project} />
        <span className="pp-expand">
          <Expand size={14} />
          Preview
        </span>
      </div>

      <div className="proj-info">
        <div className="proj-info-top">
          <span className="proj-pill">{project.em}</span>
          <span className="proj-arrow">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.blurb}</p>
        <div className="proj-stack">
          {project.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </a>
  );
}
