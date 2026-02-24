'use client';

import { loginWithGoogle } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import css from './GetOauthUrl.module.css';

export default function GetOauthUrl() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      router.replace('/auth/login');
      return;
    }

    const sendCodeToBackend = async () => {
      try {
        const { data } = await loginWithGoogle({ code });
        setUser(data.data.user);
        router.push('/');
      } catch (error) {
        console.error('Помилка авторизації через Google:', error);
        router.replace('/auth/login');
      }
    };

    sendCodeToBackend();
  }, [router, searchParams, setUser]);

  return (
    <div className={css.overlay}>
      <div className={css.loaderBox}>
        <span className={css.spinner}></span>
        <p className={css.text}>Виконується вхід через Google...</p>
      </div>
    </div>
  );
}