"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { nextServer } from "@/lib/api/api"; // Твій налаштований axios
import TravellersStories from "@/components/TravellersStories/TravellersStories";
// Якщо у тебе є компонент лоадера або заглушки, імпортуй їх сюди

// Функція для запиту (можеш винести її в clientApi.ts)
const fetchSavedStories = async ({ pageParam = 1 }) => {
  // Звертаємось на твій Express бекенд (5000 порт)
  const { data } = await nextServer.get(
    `/users/current/favorites?page=${pageParam}&perPage=6`,
  );
  return data;
};

const SavedStories = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["savedStories"],
      queryFn: fetchSavedStories,
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.pagination?.hasNextPage
          ? lastPage.pagination.currentPage + 1
          : undefined,
    });

  if (isLoading) return <p>Завантаження збережених історій...</p>;
  if (isError) return <p>Помилка завантаження.</p>;

  // Дістаємо всі історії з усіх завантажених сторінок
  const stories = data?.pages.flatMap((page) => page.data) || [];

  if (stories.length === 0) {
    return (
      <div /* Тут твої стилі для порожнього стану */>
        <h3>У вас ще немає збережених історій...</h3>
        <button>До історій</button>
      </div>
    );
  }

  return (
    <TravellersStories
      stories={stories}
      onLoadMore={() => fetchNextPage()}
      hasNextPage={!!hasNextPage}
      isOwn={false} // Це збережені, тому кнопка редагування не потрібна
    />
  );
};

export default SavedStories;
