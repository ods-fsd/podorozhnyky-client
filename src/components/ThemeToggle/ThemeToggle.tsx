"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import css from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    try {
      const isAuth = pathname?.startsWith("/auth") ?? false;
      const saved = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      let initial: string;

      if (saved) {
        if (saved === "color-scheme-3") {
          initial = "color-scheme-3";
        } else if (saved === "color-scheme-1" || saved === "color-scheme-2") {
          initial = isAuth ? "color-scheme-1" : "color-scheme-2";
        } else {
          initial = prefersDark
            ? "color-scheme-3"
            : isAuth
              ? "color-scheme-1"
              : "color-scheme-2";
        }
      } else {
        initial = prefersDark
          ? "color-scheme-3"
          : isAuth
            ? "color-scheme-1"
            : "color-scheme-2";
      }

      requestAnimationFrame(() => {
        setTheme(initial);
        document.documentElement.dataset.theme = initial;
      });

      const listener = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem("theme")) {
          const newTheme = e.matches
            ? "color-scheme-3"
            : isAuth
              ? "color-scheme-1"
              : "color-scheme-2";
          setTheme(newTheme);
          document.documentElement.dataset.theme = newTheme;
        }
      };

      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    } catch (err) {
      console.error("Theme init error:", err);
    }
  }, [pathname]);

  const toggleTheme = () => {
    if (!theme) return;

    const isAuth = pathname?.startsWith("/auth") ?? false;
    const lightTheme = isAuth ? "color-scheme-1" : "color-scheme-2";
    const newTheme = theme === "color-scheme-3" ? lightTheme : "color-scheme-3";

    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;

    localStorage.setItem("theme", newTheme);
  };

  if (!theme) return null;

  return (
    <button
      onClick={toggleTheme}
      className={css.themeToggle}
      aria-label={
        theme === "color-scheme-3"
          ? "Увімкнути світлу тему"
          : "Увімкнути темну тему"
      }
    >
      {theme === "color-scheme-3" ? (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={css.icon}
          aria-hidden="true"
        >
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={css.icon}
          aria-hidden="true"
        >
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
        </svg>
      )}
    </button>
  );
}
