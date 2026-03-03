"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { nextServer } from "@/lib/api/api";
import TravellersStories from "@/components/TravellersStories/TravellersStories";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";


const fetchSavedStories = async ({ pageParam = 1 }) => {
  const { data } = await nextServer.get(
    `/stories/saved?page=${pageParam}&perPage=6`,
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
        lastPage?.data?.hasNextPage
          ? lastPage.data.page + 1
          : undefined,
    });

  if (isLoading) return <p>Завантаження збережених історій...</p>;
  if (isError) return <p>Помилка завантаження.</p>;

  // РОЗУМНИЙ ПОШУК: Шукаємо саме масив (Array), щоб не пропустити об'єкти без історій
  const stories =
    data?.pages.flatMap((page) => {
      if (Array.isArray(page?.data?.data)) return page.data.data;
      if (Array.isArray(page?.data)) return page.data;
      if (Array.isArray(page?.data?.favorites)) return page.data.favorites; 
      if (Array.isArray(page?.favorites)) return page.favorites;
      return []; 
    }) || [];

  return (
    <div style={{ paddingBottom: "80px" }}>
      {stories.length === 0 ? (
        <MessageNoStories 
          text="У вас ще немає збережених історій..." 
          buttonText="До історій"
          route="/stories"
        />
      ) : (
        <TravellersStories
          stories={stories}
          onLoadMore={() => fetchNextPage()}
          hasNextPage={!!hasNextPage}
          isOwn={false} 
        />
      )}
    </div>
  );
};

export default SavedStories;
