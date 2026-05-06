import { useCallback, useEffect, useState } from "react";
import { track } from "../lib/analytics";

const STORAGE_KEY = "dxb-estate-intel-theme";

type Theme = "light" | "dark";

/** Read the current theme from <html data-theme> if set, otherwise
 *  fall through to the OS preference. Mirrors the behavior of the
 *  bootstrap script in index.html so React state is in sync with what
 *  the page actually painted with. */
function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "light" || explicit === "dark") return explicit;
  if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* localStorage disabled — preference still applies for this session */
    }
  }, [theme]);

  // Sync with OS-level theme changes ONLY while the user hasn't picked
  // explicitly. Once they've toggled at least once, we respect their
  // choice and stop following the OS.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch { /* fall through */ }
      setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next: Theme = t === "light" ? "dark" : "light";
      track("theme:toggle", { from: t, to: next });
      return next;
    });
  }, []);

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle-glyph" aria-hidden="true">
        {isDark ? "☀" : "☾"}
      </span>
    </button>
  );
}
