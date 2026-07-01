import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { Project } from "../../../types";
import { domainOf } from "../../../lib/scroll";
import { ArrowUpRight, Close, Expand } from "../../common/Icons";
import { ProjectPreview } from "./ProjectPreview";

interface ProjectCardProps {
  project: Project;
  hue: number;
  /** Whether this card is the one expanded into the detail view. */
  active: boolean;
  onActivate: () => void;
  onScheduleClose: () => void;
  onClose: () => void;
}

const DURATION = 620;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
/** Transition used for the two interior panels while they reflow. */
const CHILD_TRANSITION = ["top", "left", "width", "height", "border-radius"]
  .map((p) => `${p} ${DURATION}ms ${EASE}`)
  .join(", ");
const RADIUS_COMPACT = "16px";
const RADIUS_EXPANDED = "0px"; // the card's own 24px clip supplies the outer rounding

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

/** The centered resting rect the card morphs into when expanded. */
function expandedRect(): Box {
  const w = Math.min(window.innerWidth * 0.86, 1180);
  const h = Math.min(window.innerHeight * 0.82, 820);
  return {
    top: (window.innerHeight - h) / 2,
    left: (window.innerWidth - w) / 2,
    width: w,
    height: h,
  };
}

/** A child's border-box measured relative to its card's border-box. */
function relBox(r: DOMRect, base: DOMRect): Box {
  return { top: r.top - base.top, left: r.left - base.left, width: r.width, height: r.height };
}

function setBox(el: HTMLElement, b: Box) {
  el.style.top = `${b.top}px`;
  el.style.left = `${b.left}px`;
  el.style.width = `${b.width}px`;
  el.style.height = `${b.height}px`;
}

function clearBox(el: HTMLElement) {
  for (const prop of ["position", "top", "left", "width", "height", "transition", "will-change"]) {
    el.style.removeProperty(prop);
  }
}

/** Pin a panel out of flow at a card-relative box so it can be FLIP-animated. */
function placeChild(el: HTMLElement, b: Box, radius: string) {
  el.style.position = "absolute";
  el.style.borderRadius = radius;
  setBox(el, b);
}

function clearChild(el: HTMLElement) {
  clearBox(el);
  el.style.removeProperty("border-radius");
}

/**
 * A single project card that morphs in place into a full detail view on hover.
 * The same DOM element grows from its grid slot to a centered panel and back —
 * there is no separate overlay. A sibling `.proj-cell` wrapper holds the grid
 * space so the layout never reflows while this card is popped out of flow.
 */
export function ProjectCard({
  project,
  hue,
  active,
  onActivate,
  onScheduleClose,
  onClose,
}: ProjectCardProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  // Compact card-relative boxes of the two panels, captured on expand so the
  // collapse can animate them back without re-measuring the compact layout.
  const compactGeom = useRef<{ preview: Box; info: Box } | null>(null);
  // Kept in state so React never re-renders the class off mid-animation, but
  // also toggled imperatively below to avoid a one-frame flash on collapse.
  const [expanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const cell = cellRef.current;
    const preview = previewRef.current;
    const info = infoRef.current;
    if (!card || !cell || !preview || !info) return;
    clearTimeout(timer.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (active) {
      // --- expand: fix at the grid slot, then release to the centered rect ---
      // Measure and freeze the slot BEFORE the card leaves the flow, otherwise
      // the cell collapses and both the frozen height and start rect are wrong.
      const from = cell.getBoundingClientRect();
      const previewFrom = relBox(preview.getBoundingClientRect(), from);
      const infoFrom = relBox(info.getBoundingClientRect(), from);
      compactGeom.current = { preview: previewFrom, info: infoFrom };

      cell.style.height = `${from.height}px`; // freeze the slot so siblings hold
      setExpanded(true);
      card.classList.add("is-expanded");
      const to = expandedRect();

      card.style.position = "fixed";
      card.style.willChange = "top, left, width, height";

      // Snap the card to its final size so the panels' expanded grid positions
      // can be measured, then rewind everything to the compact geometry.
      card.style.transition = "none";
      setBox(card, to);
      const cardTo = card.getBoundingClientRect();
      const previewTo = relBox(preview.getBoundingClientRect(), cardTo);
      const infoTo = relBox(info.getBoundingClientRect(), cardTo);

      if (reduce) {
        card.style.removeProperty("transition");
        return; // panels stay in their grid slots at full size
      }

      setBox(card, from);
      preview.style.transition = "none";
      info.style.transition = "none";
      placeChild(preview, previewFrom, RADIUS_COMPACT);
      placeChild(info, infoFrom, RADIUS_COMPACT);
      card.getBoundingClientRect(); // force the start frame

      requestAnimationFrame(() => {
        card.style.removeProperty("transition"); // fall back to the CSS transition
        setBox(card, to);
        preview.style.transition = CHILD_TRANSITION;
        info.style.transition = CHILD_TRANSITION;
        placeChild(preview, previewTo, RADIUS_EXPANDED);
        placeChild(info, infoTo, RADIUS_EXPANDED);
        // Hand the panels back to the grid once settled so they stay responsive.
        timer.current = window.setTimeout(() => {
          clearChild(preview);
          clearChild(info);
        }, DURATION + 40);
      });
    } else {
      // --- collapse: animate back into the (still-reserved) grid slot ---
      if (!card.classList.contains("is-expanded")) return;
      const to = cell.getBoundingClientRect();
      const compact = compactGeom.current;
      const finish = () => {
        clearBox(card);
        clearChild(preview);
        clearChild(info);
        card.classList.remove("is-expanded");
        cell.style.removeProperty("height");
        setExpanded(false);
      };
      if (reduce || !compact) {
        finish();
        return;
      }

      // Pin the panels at wherever they are now (grid or mid-flight), then send
      // them back to their compact boxes in step with the shrinking card.
      const cardNow = card.getBoundingClientRect();
      const previewNow = relBox(preview.getBoundingClientRect(), cardNow);
      const infoNow = relBox(info.getBoundingClientRect(), cardNow);
      preview.style.transition = "none";
      info.style.transition = "none";
      placeChild(preview, previewNow, RADIUS_EXPANDED);
      placeChild(info, infoNow, RADIUS_EXPANDED);
      card.getBoundingClientRect(); // force the start frame

      requestAnimationFrame(() => {
        card.style.removeProperty("transition");
        setBox(card, to);
        preview.style.transition = CHILD_TRANSITION;
        info.style.transition = CHILD_TRANSITION;
        placeChild(preview, compact.preview, RADIUS_COMPACT);
        placeChild(info, compact.info, RADIUS_COMPACT);
      });
      timer.current = window.setTimeout(finish, DURATION + 40);
    }
  }, [active]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="proj-cell" ref={cellRef}>
      <a
        ref={cardRef}
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className={"proj-card" + (expanded ? " is-expanded" : "")}
        style={{ "--h": hue } as CSSProperties}
        onMouseEnter={onActivate}
        onMouseLeave={onScheduleClose}
      >
        <span
          className="po-close"
          role="button"
          aria-label="Close preview"
          onClick={handleClose}
        >
          <Close size={16} />
        </span>

        <div className="proj-preview" ref={previewRef}>
          <ProjectPreview project={project} />
          <span className="pp-expand">
            <Expand size={14} />
            Preview
          </span>
        </div>

        <div className="proj-info" ref={infoRef}>
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

          <div className="proj-extra">
            <dl className="po-meta">
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
            <span className="po-cta">
              Visit project
              <ArrowUpRight size={16} strokeWidth={2} />
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
