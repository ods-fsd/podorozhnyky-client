"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { nextServer } from "@/lib/api/api";
import TravellersStories from "@/components/TravellersStories/TravellersStories";

const fetchSavedStories = async ({ pageParam = 1 }) => {
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
        lastPage?.pagination?.hasNextPage
          ? lastPage.pagination.currentPage + 1
          : undefined,
    });

  if (isLoading) return <p>Завантаження збережених історій...</p>;
  if (isError) return <p>Помилка завантаження.</p>;

  // РОЗУМНИЙ ПОШУК: Шукаємо саме масив (Array), щоб не пропустити об'єкти без історій
  const stories =
    data?.pages.flatMap((page) => {
      if (Array.isArray(page?.data)) return page.data;
      if (Array.isArray(page?.data?.favorites)) return page.data.favorites; // Іноді бекенд кладе це у favorites
      if (Array.isArray(page?.favorites)) return page.favorites;
      return []; // Якщо нічого не підійшло, повертаємо порожній масив, щоб показати заглушку
    }) || [];

  if (stories.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <h3 style={{ marginBottom: "16px" }}>
          У вас ще немає збережених історій...
        </h3>
        <button style={{ padding: "10px 20px", cursor: "pointer" }}>
          До історій
        </button>
      </div>
    );
  }

  return (
    <TravellersStories
      stories={stories}
      onLoadMore={() => fetchNextPage()}
      hasNextPage={!!hasNextPage}
      isOwn={false} // isOwn={false} гарантує, що замість олівця буде іконка збереження
    />
  );
};

export default SavedStories;
