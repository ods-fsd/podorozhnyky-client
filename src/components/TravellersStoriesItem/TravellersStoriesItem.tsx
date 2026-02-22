'use client';

import { addFavorite, deleteStory, removeFavorite } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { IStory } from '@/types/story';
import { IFavoritesResponse } from '@/types/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import css from './TravellersStoriesItem.module.css';

import ConfirmDeleteContent from '@/components/ConfirmDeleteContent/ConfirmDeleteContent';
import Modal from '@/components/Modal/Modal';
// ЗМІНЕНО: Використовуємо відносний шлях замість @/
import AuthNavModal from '../AuthNavModal/AuthNavModal';
import { useQueryClient } from '@tanstack/react-query';

interface TravellersStoriesItemProps {
  story: IStory | undefined;
  isOwn?: boolean;
  storyId?: string;
}

export const TravellersStoriesItem = ({
  story,
  isOwn,
}: TravellersStoriesItemProps) => {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkCounter, setBookmarkCounter] = useState(story?.favoriteCount);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const updateFavorites = useAuthStore(state => state.updateFavorites);

  const ISODateToDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const handleClick = (storyId: string) => {
    router.push(`/stories/${storyId}`);
  };

  const handlePencilClick = (storyId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    router.push(`/stories/${storyId}/edit`);
  };

  const isFavorite = user?.favorites?.some(fav => fav._id === story?._id);

  const handleBookmarkClick = async (storyId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (story?.ownerId._id === user?._id) {
      toast.error('Ви не можете додати у вибране власну історію');
      return;
    }

    try {
      let updated: IFavoritesResponse;
      setIsLoading(true);

      if (isFavorite) {
        updated = await removeFavorite(storyId);
        if (bookmarkCounter !== undefined) {
          setBookmarkCounter(bookmarkCounter - 1);
        }
      } else {
        updated = await addFavorite(storyId);
        if (bookmarkCounter !== undefined) {
          setBookmarkCounter(bookmarkCounter + 1);
        }
      }

      updateFavorites(updated.favorites);
    } catch {
      toast.error('Сталася помилка під час збереження');
    } finally {
      setIsLoading(false);
    }
  };

  const queryClient = useQueryClient();
  const handleDeleteStory = async () => {
    if (!story) return;

    try {
      const res = await deleteStory(story._id);

      if (res?.message || res?.success) {
        toast.success('Історію видалено');
        await queryClient.invalidateQueries({ queryKey: ['profile'] });
        return;
      }

      toast.error('Не вдалося видалити історію');
    } catch {
      toast.error('Помилка при видаленні');
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <ConfirmDeleteContent
            onConfirm={handleDeleteStory}
            onCancel={() => setShowDeleteModal(false)}
          />
        </Modal>
      )}

      {showAuthModal && (
        <AuthNavModal onClose={() => setShowAuthModal(false)} />
      )}

      <li className={css.storyCard}>
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
              <p className={css.category}>
                {story?.category?.name ?? 'Немає категорії'}
              </p>
              <h2 className={css.title}>{story?.title}</h2>
              <p className={css.description}>{story?.article}</p>
            </div>
          )}

          {story && (
            <div>
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

              <div className={css.buttonsWrapper}>
                <button
                  className={css.showStory}
                  onClick={() => handleClick(story._id)}
                >
                  Переглянути статтю
                </button>

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
    </>
  );
};

export default TravellersStoriesItem;