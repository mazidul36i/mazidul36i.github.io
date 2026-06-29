// Shared inline SVG icons. Each accepts a size and forwards className/props
// so callers can style stroke color and animate via CSS.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 18, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Diagonal arrow pointing up-right — used for "visit / open" affordances. */
export function ArrowUpRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 17L17 7M9 7h8v8" />
    </Icon>
  );
}

/** Downward arrow — used for the resume download link. */
export function ArrowDown(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 5v14M5 12l7 7 7-7" />
    </Icon>
  );
}

/** Close / dismiss cross. */
export function Close(props: IconProps) {
  return (
    <Icon strokeWidth={2} {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </Icon>
  );
}

/** Expand / fullscreen corners. */
export function Expand(props: IconProps) {
  return (
    <Icon strokeWidth={2} {...props}>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </Icon>
  );
}
