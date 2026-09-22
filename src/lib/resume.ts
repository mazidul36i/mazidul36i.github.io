import type { MouseEvent } from "react";

/** Filename the resume is saved as when downloaded. */
export const RESUME_FILENAME = "Mazidul_Islam_Software_Engineer.pdf";

/**
 * Returns a click handler that opens the resume in a new tab *and* saves it
 * under {@link RESUME_FILENAME}. The `download` attribute alone would suppress
 * the new tab, so the save is triggered from a detached anchor.
 */
export function openAndDownloadResume(href: string) {
  return (e: MouseEvent) => {
    e.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");

    const a = document.createElement("a");
    a.href = href;
    a.download = RESUME_FILENAME;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
}
