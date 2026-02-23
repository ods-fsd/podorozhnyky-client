"use client";

import { useEffect, useState } from "react";

type PerPageConfig = {
  desktop?: number; // >=1440
  tablet?: number; // 768–1439
  mobile?: number; // <768
};

const DEFAULT_CONFIG: Required<PerPageConfig> = {
  desktop: 3,
  tablet: 4,
  mobile: 3,
};

export function useStoriesPerPageMain(config?: PerPageConfig) {
  const settings = { ...DEFAULT_CONFIG, ...config };

  const [perPage, setPerPage] = useState<number>(settings.desktop);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const calc = () => {
      const width = window.innerWidth;

      setIsMobile(width < 768);

      if (width >= 1440) {
        setPerPage(settings.desktop);
      } else if (width >= 768) {
        setPerPage(settings.tablet);
      } else {
        setPerPage(settings.mobile);
      }
    };

    calc();

    const rafId = requestAnimationFrame(() => setIsMounted(true));

    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("resize", calc);
      cancelAnimationFrame(rafId);
    };
  }, [settings.desktop, settings.tablet, settings.mobile]);

  return { perPage, isMobile, isMounted };
}
