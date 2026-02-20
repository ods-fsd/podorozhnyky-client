// components/MessageNoStories/MessageNoStories.tsx
'use client';

// Це компонент "Заглушка", який показується, якщо масив історій прийшов порожнім.
import React from 'react';
import { useCallback } from 'react';
import styles from './MessageNoStories.module.css';
import { useRouter } from 'next/navigation';

export type MessageNoStoriesProps = {
  text?: string; // Текст сповіщення
  buttonText?: string; // Текст на кнопці
  route?: '/stories' | '/stories-create/create' | string; // Куди веде кнопка
  onClick?: () => void; // Власна дія для кнопки
  className?: string; // Додаткові класи
};

const MessageNoStories = ({
  text = 'Цей користувач ще не публікував історій',
  buttonText = 'До історій',
  route = '/stories',
  onClick,
  className,
}: MessageNoStoriesProps) => {
  const router = useRouter();

  // Функція обробки кліку по кнопці
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(); // Виконує власну дію, якщо її передали
      return;
    }
    router.push(route); // Інакше просто перекидає на іншу сторінку
  }, [onClick, route, router]);

  const wrapperClassName = [styles.container, className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={wrapperClassName} role="alert">
      <p className={styles.text}>{text}</p>
      <button type="button" className={styles.button} onClick={handleClick}>
        {buttonText}
      </button>
    </section>
  );
};

export default MessageNoStories;