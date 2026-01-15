import { useState, useEffect } from "react";
import "./ThemeSwitcher.css";

export default function ThemeSwitcher() {
  const [mode, setMode] = useState(() => {
    // Initialize from localStorage or default to dark
    return localStorage.getItem("theme-mode") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const toggle = () => setMode(prev => (prev === "dark" ? "light" : "dark"));

  return (
    <button className="theme-switch" onClick={toggle} aria-label="Toggle theme">
      {mode === "dark" ? "☾" : "☀"}
    </button>
  );
}
