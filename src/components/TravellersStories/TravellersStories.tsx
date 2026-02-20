// components/TravellersStories/TravellersStories.tsx
'use client'; // Компонент інтерактивний (кнопка "Показати ще")

import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import css from './TravellersStories.module.css';
import { IStory } from '../../types/story';

// Властивості (props), які очікує отримати цей список
interface TravellersStoriesProps {
  stories: IStory[]; // Масив історій
  onLoadMore?: () => void; // Функція для завантаження наступної сторінки
  hasNextPage?: boolean; // Чи є ще історії для завантаження
  isFetchingNextPage?: boolean; // Стан завантаження (крутилка)
  isOwn?: boolean; // Чи це історії поточного користувача (для показу кнопок ред/вид)
  isHiddenOnMobileButton?: boolean; // Налаштування відображення кнопки
}

const TravellersStories = ({
  stories,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  isOwn,
  isHiddenOnMobileButton,
}: TravellersStoriesProps) => {
  return (
    <>
      <ul className={css.storiesList}>
        {/* Проходимося масивом stories і для кожної малюємо картку */}
        {stories.map(story => (
          <TravellersStoriesItem story={story} isOwn={isOwn} key={story._id} />
        ))}
      </ul>
      {/* Якщо є наступна сторінка і передана функція завантаження — малюємо кнопку */}
      {onLoadMore && hasNextPage && !isHiddenOnMobileButton && (
        <button
          className={css.paginationButton}
          type="button"
          onClick={onLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Завантаження…' : 'Показати ще'}
        </button>
      )}
    </>
  );
};

export default TravellersStories;