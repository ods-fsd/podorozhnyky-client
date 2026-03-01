"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { nextServer } from "@/lib/api/api";
import TravellersStories from "@/components/TravellersStories/TravellersStories";

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
        lastPage?.data?.hasNextPage
          ? lastPage.data.page + 1
          : undefined,
    });

  if (isLoading) return <p>Завантаження ваших історій...</p>;
  if (isError) return <p>Помилка завантаження.</p>;

  // РОЗУМНИЙ ПОШУК ІСТОРІЙ:
  const stories =
    data?.pages.flatMap((page) => {
      if (Array.isArray(page?.data?.data)) return page.data.data;
      if (Array.isArray(page?.data)) return page.data;
      if (Array.isArray(page?.data?.stories)) return page.data.stories;
      if (Array.isArray(page?.stories)) return page.stories;
      return []; // Якщо нічого з цього не є масивом, значить історій нуль
    }) || [];

  if (stories.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <h3 style={{ marginBottom: "16px" }}>Ви ще нічого не публікували...</h3>
        <button style={{ padding: "10px 20px", cursor: "pointer" }}>
          Опублікувати історію
        </button>
      </div>
    );
  }

  return (
    <TravellersStories
      stories={stories}
      onLoadMore={() => fetchNextPage()}
      hasNextPage={!!hasNextPage}
      isOwn={true} 
    />
  );
};

export default OwnStories;
