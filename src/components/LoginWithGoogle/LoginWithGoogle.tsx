'use client';

import { getGoogleAuthUrl } from '@/lib/api/clientApi';
import { useState } from 'react';
import css from './LoginWithGoogle.module.css';

export default function LoginWithGoogle() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { url } = await getGoogleAuthUrl();

      window.location.href = url;
    } catch {
      alert('Не вдалося отримати Google OAuth URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className={css.text}>АБО</p>
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className={css.googleBtn}
      >
        <svg className={css.googleIcon} viewBox="0 0 533.5 544.3">
          <use xlinkHref="/sprite.svg#icon-google_icons"></use>
        </svg>
        {loading ? 'Зачекайте...' : 'Увійти через Google'}
      </button>
    </>
  );
}