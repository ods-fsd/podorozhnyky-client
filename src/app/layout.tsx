
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import 'modern-normalize';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import { nunitoSans } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Podorozhnyky',
  description:
    'A platform for searching travel places and sharing your own experience',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Podorozhnyky',
    description:
      'A platform for searching travel places and sharing your own experience',
    url: 'https://localhost:3000',
    images: [
      {
        url: '', // placeholder
        width: 1200,
        height: 630,
        alt: 'Podorozhnyky - A platform for searching travel places and sharing your own experience',
      },
    ],
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      try {
        const path = window.location.pathname || '';
        const isAuth = path.startsWith('/auth');
        const savedTheme = localStorage.getItem('theme');
       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let theme;
        if (savedTheme === 'color-scheme-3') {
          theme = 'color-scheme-3';
        } 
        else {
          if (prefersDark) {
            theme = 'color-scheme-3';
          } else {
            theme = isAuth ? 'color-scheme-1' : 'color-scheme-2';
          }
        }
        document.documentElement.dataset.theme = theme;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', e => {
          if (!localStorage.getItem('theme') || localStorage.getItem('theme') !== 'color-scheme-3') {
            const newTheme = e.matches
              ? 'color-scheme-3'
              : (window.location.pathname.startsWith('/auth') ? 'color-scheme-1' : 'color-scheme-2');
            document.documentElement.dataset.theme = newTheme;
          }
        });
      } catch (e) {
        console.error('Theme init failed', e);
      }
    `,
          }}
        />
      </head>
      <body className={`${nunitoSans.variable}`}>
        
        <ThemeToggle />
        <TanStackProvider>
          <Toaster position="top-right" />
          <AuthProvider>{children}</AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}