"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { nextServer } from "@/lib/api/api";
import TravellersStories from "@/components/TravellersStories/TravellersStories";

const fetchOwnStories = async ({ pageParam = 1 }) => {
  const { data } = await nextServer.get(
    `/users/current/stories?page=${pageParam}&perPage=6`,
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
        lastPage.pagination?.hasNextPage
          ? lastPage.pagination.currentPage + 1
          : undefined,
    });

  if (isLoading) return <p>Завантаження ваших історій...</p>;
  if (isError) return <p>Помилка завантаження.</p>;

  const stories = data?.pages.flatMap((page) => page.data) || [];

  if (stories.length === 0) {
    return (
      <div /* Тут твої стилі для порожнього стану */>
        <h3>Ви ще нічого не публікували...</h3>
        <button>Опублікувати історію</button>
      </div>
    );
  }

  return (
    <TravellersStories
      stories={stories}
      onLoadMore={() => fetchNextPage()}
      hasNextPage={!!hasNextPage}
      isOwn={true} // ВАЖЛИВО! Передаємо true, щоб показати кнопку редагування
    />
  );
};

export default OwnStories;
