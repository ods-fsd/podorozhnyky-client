'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function TanStackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Створюємо клієнт для кешування даних. 
  // useState гарантує, що він не буде перестворюватися при кожному рендері.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // щоб не робити зайвих запитів, коли перемикаєш вкладки
            staleTime: 60 * 1000, // дані вважаються "свіжими" 1 хвилину
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}