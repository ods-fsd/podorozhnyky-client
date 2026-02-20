// hooks/useStoriesPerPage.ts
'use client'; // Вказує Next.js, що цей код виконується в браузері (бо ми слухаємо ширину вікна)

import { useEffect, useState } from 'react';

// Налаштування: скільки карток показувати на різних екранах
type PerPageConfig = {
  desktop?: number; // >=1440px
  tablet?: number;  // 768–1439px
  mobile?: number;  // <768px
};

const DEFAULT_CONFIG: Required<PerPageConfig> = {
  desktop: 6, // 6 карток на великому екрані
  tablet: 4,  // 4 на планшеті
  mobile: 4,  // 4 на телефоні
};

// Цей хук автоматично перераховує кількість карток для завантаження при зміні розміру вікна
export function useStoriesPerPage(config?: PerPageConfig) {
  const settings: Required<PerPageConfig> = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const [perPage, setPerPage] = useState(() => {
    // Запобіжник для серверного рендерингу (SSR), де немає об'єкта window
    if (typeof window === 'undefined') return settings.desktop;

    const width = window.innerWidth;
    if (width >= 1440) return settings.desktop;
    if (width >= 768) return settings.tablet;
    return settings.mobile;
  });

  useEffect(() => {
    // Функція, яка спрацьовує при зміні розміру вікна
    const calc = () => {
      const width = window.innerWidth;

      if (width >= 1440) setPerPage(settings.desktop);
      else if (width >= 768) setPerPage(settings.tablet);
      else setPerPage(settings.mobile);
    };

    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc); // Очищення при видаленні компонента
  }, [settings.desktop, settings.tablet, settings.mobile]);

  return perPage;
}