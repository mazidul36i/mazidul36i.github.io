import { useEffect } from "react";

/** Applies a `data-theme` attribute to the document root on mount. */
export function useTheme(theme: "dark" | "light" = "dark"): void {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
}
