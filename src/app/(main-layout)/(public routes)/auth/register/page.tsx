import React from 'react';
import { RegistrationForm } from '@/components/forms/RegistrationForm/RegistrationForm';
import mainCss from '@/app/Home.module.css'; // Для контейнера

export default function RegisterPage() {
  return (
    <main style={{ padding: '100px 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className={mainCss.container}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}
