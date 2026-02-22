'use client';

import Modal from '@/components/Modal/Modal';

interface AuthNavModalProps {
  onClose: () => void;
}

export default function AuthNavModal({ onClose }: AuthNavModalProps) {
  return (
    <Modal onClose={onClose}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2 style={{ marginBottom: '16px' }}>Помилка під час збереження</h2>
        <p style={{ marginBottom: '24px' }}>
          Заглушка: тут будуть кнопки для входу та реєстрації.
        </p>
        <button 
          onClick={onClose}
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--color-royal-blue, #2A6DFF)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Закрити
        </button>
      </div>
    </Modal>
  );
}