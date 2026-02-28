"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { nextServer } from "@/lib/api/api";
import TravellersStories from "@/components/TravellersStories/TravellersStories";
// Переконайся, що імпортуєш свій CSS для порожнього стану, якщо він є
// import css from "./OwnStories.module.css";

const fetchOwnStories = async ({ pageParam = 1 }) => {
  const { data } = await nextServer.get(
    `/stories/own?page=${pageParam}&perPage=6`,
  );
  return data;
};

const OwnStories = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["ownStories"],
      queryFn: fetchOwnStories,
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage?.pagination?.hasNextPage
          ? lastPage.pagination.currentPage + 1
          : undefined,
    });

  if (isLoading) return <p>Завантаження ваших історій...</p>;
  if (isError) return <p>Помилка завантаження.</p>;

  // РОЗУМНИЙ ПОШУК ІСТОРІЙ:
  // Перевіряємо, чи є взагалі масив історій у відповіді. Якщо його немає — повертаємо порожній масив [].
  const stories =
    data?.pages.flatMap((page) => {
      if (Array.isArray(page?.data)) return page.data;
      if (Array.isArray(page?.data?.stories)) return page.data.stories;
      if (Array.isArray(page?.stories)) return page.stories;
      return []; // Якщо нічого з цього не є масивом, значить історій нуль
    }) || [];

  // Якщо історій дійсно немає (масив порожній), показуємо відповідний блок
  if (stories.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <h3 style={{ marginBottom: "16px" }}>Ви ще нічого не публікували...</h3>
        <button
          // Тут можна додати onClick={() => router.push('/create-story')}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Опублікувати історію
        </button>
      </div>
    );
  }

  // Якщо історії є, рендеримо список
  return (
    <TravellersStories
      stories={stories}
      onLoadMore={() => fetchNextPage()}
      hasNextPage={!!hasNextPage}
      isOwn={true} // Передаємо true, щоб з'явився олівець для редагування згідно з ТУ
    />
  );
};

export default OwnStories;
