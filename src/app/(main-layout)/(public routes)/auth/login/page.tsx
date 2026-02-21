import React from 'react';
import { LoginForm } from '@/components/forms/LoginForm/LoginForm';
import mainCss from '@/app/Home.module.css'; // Для контейнера

export default function LoginPage() {
  return (
    <main style={{ padding: '100px 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className={mainCss.container}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
