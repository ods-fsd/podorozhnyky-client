'use client';

import {
  addFavorite,
  deleteStory,
  fetchStoryById,
  removeFavorite,
} from '@/lib/api/clientApi';
import { IStory } from '@/types/story';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore';
import Loader from '../Loader/Loader';
import FavoriteActions from './FavoriteActions/FavoriteActions';
import css from './StoryDetails.module.css';

const StoryDetails = ({ storyId }: { storyId: string }) => {
  const [story, setStory] = useState<IStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { user, isAuthenticated, setUser } = useAuthStore();
  const router = useRouter();

  const isFavorite = user?.favorites?.some(fav => fav._id === storyId) ?? false;

  useEffect(() => {
    const loadStory = async () => {
      try {
        const data = await fetchStoryById(storyId);
        setStory(data);
      } catch {
        toast.error('Помилка завантаження історії');
      } finally {
        setLoading(false);
      }
    };
    loadStory();
  }, [storyId]);

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    setSaving(true);

    try {
      let updatedFavorites;

      if (isFavorite) {
        const res = await removeFavorite(storyId);
        updatedFavorites = res.favorites;
        toast.success('Історію видалено із збережених');
      } else {
        const res = await addFavorite(storyId);
        updatedFavorites = res.favorites;
        toast.success('Історію збережено!');
      }

      setUser({
        ...user!,
        favorites: updatedFavorites,
      });
    } catch {
      toast.error('Сталася помилка');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!story) return <p>Історію не знайдено</p>;

  const formattedDate = new Date(story.date).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const deleteHandler = async () => {
    try {
      const res = await deleteStory(storyId);

      if (res?.message || res?.success) {
        toast.success('Історію видалено');
        router.push('/stories');
        router.refresh();
        return;
      }

      toast.error('Не вдалося видалити історію');
    } catch {
      toast.error('Помилка під час видалення');
    }
  };

  return (
    <div className={css.storyDetails}>
      <div className={css.info}>
        <div className={css.infoDetails}>
          <p className={css.value}>
            <strong className={css.label}>Автор статті:</strong>{' '}
            {story.ownerId.name}
          </p>
          <p className={css.value}>
            <strong className={css.label}>Опубліковано:</strong> {formattedDate}
          </p>
        </div>

        <p className={css.infoCategory}>{story.category.name}</p>
      </div>

      <Image
        className={css.image}
        src={story.img || '/placeholder-image.png'}
        alt={story.title}
        width={1312}
        height={874}
      />

      <div className={css.content}>
        <p className={css.article}>{story.article}</p>

        <FavoriteActions
          storyId={storyId}
          isAuthenticated={isAuthenticated}
          isFavorite={isFavorite}
          saving={saving}
          onToggle={toggleFavorite}
          isOwner={user?._id === story.ownerId._id}
          onDelete={deleteHandler}
        />
      </div>
    </div>
  );
};

export default StoryDetails;