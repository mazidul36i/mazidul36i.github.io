import type { MouseEvent } from "react";

/**
 * Returns a click handler that smooth-scrolls to the element with the given id,
 * preventing the default anchor jump.
 */
export function scrollToId(id: string) {
  return (e: MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

/** Hostname of a URL with the leading "www." stripped; falls back to the input. */
export function domainOf(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}
