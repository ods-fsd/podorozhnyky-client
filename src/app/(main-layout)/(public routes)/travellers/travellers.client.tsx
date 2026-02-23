"use client";

import { fetchAuthors } from "@/lib/api/clientApi";
import TravellersList from "@/components/TravellersList/TravellersList";
import css from "./Travellers.module.css";
import mainCss from "@/app/Home.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { useStoriesPerPage } from "@/hooks/useStoriesPerPage";
import { IUser } from "@/types/user";

const TravellersClient = () => {
  const perPage = useStoriesPerPage({ desktop: 12, tablet: 8, mobile: 8 });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["users", perPage],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchAuthors(pageParam, perPage);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPageParam) =>
      lastPageParam.data.hasNextPage ? lastPageParam.data.page + 1 : undefined,
    refetchOnMount: false,
  });
  const allUsers = useMemo<IUser[]>(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.data.data);
  }, [data]);

  const [visibleCount, setVisibleCount] = useState(perPage);

  useEffect(() => {
    setVisibleCount(perPage);
  }, [perPage]);

  const visibleUsers = useMemo(() => {
    return allUsers.slice(0, visibleCount);
  }, [allUsers, visibleCount]);

  const handleLoadMore = () => {
    const newVisibleCount = Math.min(visibleCount + 4, allUsers.length);

    if (newVisibleCount > visibleCount && newVisibleCount <= allUsers.length) {
      setVisibleCount(newVisibleCount);
      return;
    }

    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage().then(() => {
        setVisibleCount((prev) => prev + 4);
      });
    }
  };

  if (isLoading) return <Loader />;
  if (error || !data) return <ErrorMessage />;

  return (
    <div className={mainCss.container}>
      <TravellersList users={visibleUsers} />
      {(hasNextPage || visibleCount < allUsers.length) && (
        <button
          className={css.paginateButton}
          onClick={handleLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Завантаження…" : "Показати ще"}
        </button>
      )}
    </div>
  );
};
export default TravellersClient;
