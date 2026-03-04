// hooks/useStoriesPerPage.ts
"use client"; 

import { useEffect, useState } from "react";


type PerPageConfig = {
  desktop?: number; // >=1440px
  tablet?: number; // 768–1439px
  mobile?: number; // <768px
};

const DEFAULT_CONFIG: Required<PerPageConfig> = {
  desktop: 6, // 6 карток на великому екрані
  tablet: 4, // 4 на планшеті
  mobile: 4, // 4 на телефоні
};


export function useStoriesPerPage(config?: PerPageConfig) {
  const settings: Required<PerPageConfig> = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const [perPage, setPerPage] = useState(() => {
    
    if (typeof window === "undefined") return settings.desktop;

    const width = window.innerWidth;
    if (width >= 1440) return settings.desktop;
    if (width >= 768) return settings.tablet;
    return settings.mobile;
  });

  useEffect(() => {
  
    const calc = () => {
      const width = window.innerWidth;

      if (width >= 1440) setPerPage(settings.desktop);
      else if (width >= 768) setPerPage(settings.tablet);
      else setPerPage(settings.mobile);
    };

    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc); 
  }, [settings.desktop, settings.tablet, settings.mobile]);

  return perPage;
}
