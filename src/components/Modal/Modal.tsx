import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface ModalProps {
  onClose: () => void; // Функція закриття модалки
  children: React.ReactNode; // Внутрішній контент (може бути будь-яким)
}

export default function Modal({ onClose, children }: ModalProps) {
  // Закриття при кліку на затемнений фон (backdrop)
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    // Закриття при натисканні клавіші Escape
    const handleEscapeClick = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeClick);
    
    // Забороняємо скролінг сторінки, поки відкрита модалка
    document.body.style.overflow = 'hidden';

    return () => {
      // Прибираємо слухач і повертаємо скролінг при закритті
      document.removeEventListener('keydown', handleEscapeClick);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // createPortal малює цей шматок HTML не там, де він викликаний у коді, а прямо в document.body
  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}