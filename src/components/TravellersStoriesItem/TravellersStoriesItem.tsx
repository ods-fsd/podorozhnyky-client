'use client'; // Вказуємо, що це клієнтський компонент (бо є useState, onClick тощо)

import { addFavorite, deleteStory, removeFavorite } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { IStory } from '../../types/story';
import { IFavoritesResponse } from '@/types/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast'; // Бібліотека для красивих спливаючих сповіщень
import css from './TravellersStoriesItem.module.css';

import ConfirmDeleteContent from '@/components/ConfirmDeleteContent/ConfirmDeleteContent';
import Modal from '@/components/Modal/Modal';
import { useQueryClient } from '@tanstack/react-query';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

// Типізація пропсів (даних), які приймає ця картка
interface TravellersStoriesItemProps {
  story: IStory | undefined; // Сама історія
  isOwn?: boolean; // Чи є поточний користувач автором цієї історії
  storyId?: string;
}

export const TravellersStoriesItem = ({
  story,
  isOwn,
}: TravellersStoriesItemProps) => {
  const router = useRouter();
  
  // --- ЛОКАЛЬНІ СТАНИ (STATE) ---
  const [isLoading, setIsLoading] = useState(false); // Стан завантаження для кнопки лайку
  const [bookmarkCounter, setBookmarkCounter] = useState(story?.favoriteCount); // Лічильник лайків
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Чи показувати модалку видалення
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Чи показувати модалку "Увійдіть, щоб лайкнути"

  // --- ГЛОБАЛЬНИЙ СТАН (ZUSTAND/REDUX) ---
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const updateFavorites = useAuthStore(state => state.updateFavorites);

  // Функція для перетворення технічної дати (ISO) у читабельний формат (ДД.ММ.РРРР)
  const ISODateToDate = (isoDate: string) => {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  // Перехід на сторінку повної історії при кліку "Переглянути статтю"
  const handleClick = (storyId: string) => {
    router.push(`/stories/${storyId}`);
  };

  // Перехід на сторінку редагування (якщо це власна історія)
  const handlePencilClick = (storyId: string) => {
    if (!isAuthenticated) {
      setShowConfirmModal(true);
      return;
    }
    router.push(`/stories/${storyId}/edit`);
  };

  // Перевіряємо, чи ця історія вже є у збережених (лайкнутих) у поточного користувача
  const isFavorite = user?.favorites?.some(fav => fav._id === story?._id);

  // --- ОБРОБНИК ЛАЙКІВ (ЗБЕРЕЖЕННЯ) ---
  const handleBookmarkClick = async (storyId: string) => {
    // Якщо не авторизований - просимо увійти
    if (!isAuthenticated) {
      setShowConfirmModal(true);
      return;
    }

    // Забороняємо лайкати власні історії
    if (story?.ownerId._id === user?._id) {
      toast.error('Ви не можете додати у вибране власну історію');
      return;
    }

    try {
      let updated: IFavoritesResponse;
      setIsLoading(true);

      // Якщо вже лайкнуто - видаляємо з улюблених і зменшуємо лічильник
      if (isFavorite) {
        updated = await removeFavorite(storyId);
        if (bookmarkCounter) {
          setBookmarkCounter(bookmarkCounter - 1);
        }
      } else {
        // Якщо не лайкнуто - додаємо в улюблені і збільшуємо лічильник
        updated = await addFavorite(storyId);
        if (bookmarkCounter !== undefined) {
          setBookmarkCounter(bookmarkCounter + 1);
        }
      }

      // Оновлюємо глобальний стейт користувача
      updateFavorites(updated.favorites);
    } catch {
      // Тут можна додати обробку помилки запиту
    } finally {
      setIsLoading(false);
    }
  };

  // --- ОБРОБНИК ВИДАЛЕННЯ ІСТОРІЇ ---
  const queryClient = useQueryClient();
  const handleDeleteStory = async () => {
    if (!story) return;

    try {
      const res = await deleteStory(story._id);

      if (res?.message || res?.success) {
        toast.success('Історію видалено');
        // Оновлюємо дані на сторінці профілю після видалення
        await queryClient.invalidateQueries({ queryKey: ['profile'] });
        return;
      }

      toast.error('Не вдалося видалити історію');
    } catch {
      toast.error('Помилка при видаленні');
    } finally {
      setShowDeleteModal(false); // Ховаємо модалку у будь-якому випадку
    }
  };

  return (
    <>
      {/* МОДАЛКА ПІДТВЕРДЖЕННЯ ВИДАЛЕННЯ */}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <ConfirmDeleteContent
            onConfirm={handleDeleteStory}
            onCancel={() => setShowDeleteModal(false)}
          />
        </Modal>
      )}

      {/* САМА КАРТКА ІСТОРІЇ */}
      <li className={css.storyCard}>
        {/* БЛОК З КАРТИНКОЮ (якщо є своя - показуємо, інакше заглушку) */}
        {story?.img ? (
          <Image
            className={css.mainImage}
            src={story.img}
            alt={story.title ?? 'Story Image'}
            width={335}
            height={223}
            priority={true}
          />
        ) : (
          <Image
            className={css.mainImage}
            src="/placeholder-image.png"
            alt={story?.title ?? 'Placeholder Image'}
            width={335}
            height={223}
            priority={true}
          />
        )}

        <div className={css.contentWrapper}>
          {story && (
            <div>
              {/* КАТЕГОРІЯ, ЗАГОЛОВОК, ТА ТЕКСТ */}
              <p className={css.category}>
                {story?.category?.name ?? 'Немає категорії'}
              </p>
              <h2 className={css.title}>{story?.title}</h2>
              <p className={css.description}>{story?.article}</p>
            </div>
          )}

          {story && (
            <div>
              {/* БЛОК З ІНФОРМАЦІЄЮ ПРО АВТОРА */}
              <div className={css.userWrapper}>
                <Image
                  className={css.avatarImage}
                  src={story.ownerId.avatarUrl || '/placeholder-image.png'}
                  alt={story.ownerId.name}
                  width={48}
                  height={48}
                />
                <div className={css.userInfoWrapper}>
                  <p className={css.userName}>{story.ownerId.name}</p>
                  <div className={css.infoWrapper}>
                    <p className={css.date}>{ISODateToDate(story.date)}</p>
                    <span>•</span>
                    <div className={css.favoriteWrapper}>
                      <p className={css.favoriteCount}>{bookmarkCounter}</p>
                      <svg className={css.favoriteIcon} width="16" height="16">
                        <use href="/sprite.svg#icon-bookmark"></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* БЛОК З КНОПКАМИ ДІЙ */}
              <div className={css.buttonsWrapper}>
                <button
                  className={css.showStory}
                  onClick={() => handleClick(story._id)}
                >
                  Переглянути статтю
                </button>

                {/* Якщо історія ВЛАСНА - показуємо кнопки "Редагувати" та "Видалити" */}
                {isOwn ? (
                  <>
                    <button
                      className={css.bookmarkStory}
                      onClick={() => handlePencilClick(story._id)}
                      aria-label="Edit story"
                    >
                      <svg className={css.bookmarkIcon} width="24" height="24">
                        <use href="/sprite.svg#icon-edit"></use>
                      </svg>
                    </button>

                    <button
                      className={css.bookmarkStory}
                      onClick={() => setShowDeleteModal(true)}
                      aria-label="Delete story"
                    >
                      <svg className={css.bookmarkIcon} width="24" height="24">
                        <use href="/sprite.svg#icon-delete"></use>
                      </svg>
                    </button>
                  </>
                ) : (
                  // Якщо історія ЧУЖА - показуємо кнопку "Додати в збережені (Лайк)"
                  <button
                    className={`${css.bookmarkStory} ${
                      isFavorite ? css.bookmarkStoryActive : ''
                    }`}
                    onClick={() => handleBookmarkClick(story._id)}
                    aria-label={
                      isFavorite ? 'Remove from favorites' : 'Add to favorites'
                    }
                  >
                    {isLoading ? (
                      <span className={css.loader}></span>
                    ) : (
                      <svg className={css.bookmarkIcon} width="24" height="24">
                        <use href="/sprite.svg#icon-bookmark"></use>
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </li>

      {/* МОДАЛКА "НЕ АВТОРИЗОВАНИЙ" (спливає, якщо гість хоче лайкнути) */}
      {showConfirmModal && (
        <ConfirmModal
          onConfirm={() => {
            router.push('/auth/login');
          }}
          onCancel={() => setShowConfirmModal(false)}
          title="Помилка під час збереження"
          text="Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису зареєструйтесь"
          confirmButtonText="Увійти"
          cancelButtonText="Скасувати"
        />
      )}
    </>
  );
};

export default TravellersStoriesItem;