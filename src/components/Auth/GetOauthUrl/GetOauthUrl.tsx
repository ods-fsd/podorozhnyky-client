'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { loginWithGoogle } from '@/lib/api/clientApi';

export const GoogleCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      loginWithGoogle({ code })
        .then(({ data }) => {
          setAuth(data.user, data.token);
          router.push('/profile');
        })
        .catch((err) => {
          console.error('Помилка авторизації через Google:', err);
          router.push('/auth/login?error=oauth_failed');
        });
    }
  }, [searchParams, router, setAuth]);

  return <div>Авторизація... Будь ласка, зачекайте.</div>;

};