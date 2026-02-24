'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './AuthTabs.module.css';

export default function AuthTabs() {
  const pathname = usePathname();
  const isRegister = pathname === '/auth/register';
  const isLogin = pathname === '/auth/login';

  return (
    <div className={css.tabsContainer}>
      <Link 
        href="/auth/register" 
        className={`${css.tab} ${isRegister ? css.active : ''}`}
      >
        Реєстрація
      </Link>
      <Link 
        href="/auth/login" 
        className={`${css.tab} ${isLogin ? css.active : ''}`}
      >
        Вхід
      </Link>
    </div>
  );
}
