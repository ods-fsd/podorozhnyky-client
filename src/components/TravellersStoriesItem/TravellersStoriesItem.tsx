"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addFavorite, removeFavorite } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { IStory } from "@/types/story";
import { IFavoritesResponse } from "@/types/user";

import AuthNavModal from "../AuthNavModal/AuthNavModal";
import css from "./TravellersStoriesItem.module.css";

interface TravellersStoriesItemProps {
  story: IStory;
  isOwn?: boolean;
}

export const TravellersStoriesItem = ({
  story,
  isOwn = false,
}: TravellersStoriesItemProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkCounter, setBookmarkCounter] = useState(
    story?.favoriteCount || 0,
  );
  const [showAuthModal, setShowAuthModal] = useState(false);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const updateFavorites = useAuthStore((state) => state.updateFavorites);

  if (!story) return null;

  // Форматування дати
  const ISODateToDate = (isoDate?: string) => {
    if (!isoDate) return "Немає дати";

    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "Невідома дата";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const handleClick = () => {
    router.push(`/stories/${story._id}`);
  };

  const isFavorite = user?.favorites?.some((fav) => fav._id === story._id);

  const handleBookmarkClick = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (story.ownerId?._id === user?._id) {
      toast.error("Ви не можете додати у вибране власну історію");
      return;
    }

    try {
      setIsLoading(true);
      let updated: IFavoritesResponse;

      if (isFavorite) {
        updated = await removeFavorite(story._id);
        setBookmarkCounter((prev) => Math.max(0, prev - 1));
      } else {
        updated = await addFavorite(story._id);
        setBookmarkCounter((prev) => prev + 1);
      }

      updateFavorites(updated.favorites);
      await queryClient.invalidateQueries({ queryKey: ["savedStories"] });
    } catch {
      toast.error("Сталася помилка під час збереження");
    } finally {
      setIsLoading(false);
    }
  };

  // Отримуємо дату для відображення без помилки 'any'
  const rawDate =
    story.date || (story as unknown as { createdAt?: string }).createdAt;

  return (
    <>
      {showAuthModal && (
        <AuthNavModal onClose={() => setShowAuthModal(false)} />
      )}

      <li className={css.storyCard}>
        <div className={css.imageWrapper}>
          <Image
            className={css.mainImage}
            src={story.img || "/placeholder-image.png"}
            alt={story.title ?? "Story Image"}
            width={420}
            height={240}
            priority={true}
          />
        </div>

        <div className={css.contentWrapper}>
          <div className={css.textBlock}>
            <p className={css.category}>
              {story.category?.name ?? "Немає категорії"}
            </p>
            <h2 className={css.title}>{story.title}</h2>
            <p className={css.description}>
              {story.article || "Опис відсутній"}
            </p>
          </div>

          <div className={css.userWrapper}>
            <div className={css.avatarWrapper}>
              <Image
                className={css.avatarImage}
                src={story.ownerId?.avatarUrl || "/placeholder-image.png"}
                alt={story.ownerId?.name || "User"}
                width={48}
                height={48}
              />
            </div>
            <div className={css.userInfoWrapper}>
              <p className={css.userName}>{story.ownerId?.name}</p>
              <div className={css.infoWrapper}>
                <p className={css.date}>{ISODateToDate(rawDate)}</p>
                <span className={css.separator}>•</span>
                <div className={css.favoriteWrapper}>
                  <p className={css.favoriteCount}>{bookmarkCounter}</p>
                  <svg className={css.favoriteIcon} width="16" height="16">
                    <use href="/sprite.svg?v=2#icon-bookmarkIcon"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className={css.buttonsWrapper}>
            <button className={css.showStory} onClick={handleClick}>
              Переглянути статтю
            </button>

            {/* ЛОГІКА ЗГІДНО З ТУ */}
            {isOwn ? (
              // Кнопка редагування (олівець) для власних історій
              <button
                className={css.actionButton}
                onClick={() => router.push(`/edit-story/${story._id}`)}
                title="Редагувати статтю"
              >
                <svg className={css.actionIcon} width="24" height="24">
                  <use href="/sprite.svg#icon-edit"></use>
                </svg>
              </button>
            ) : (
              // Кнопка збереження (закладка) для чужих історій
              <button
                className={css.bookmarkButton}
                onClick={handleBookmarkClick}
                title="Зберегти статтю"
              >
                {isLoading ? (
                  <span className={css.loader}></span>
                ) : (
                  <svg className={css.bookmarkIcon} width="24" height="24">
                    <use href="/sprite.svg?v=2#icon-travel"></use>
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default TravellersStoriesItem;
