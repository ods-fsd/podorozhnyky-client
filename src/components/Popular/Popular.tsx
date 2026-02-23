"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import TravellersStories from "@/components/TravellersStories/TravellersStories";
import { fetchStories } from "@/lib/api/clientApi";
import { useStoriesPerPageMain } from "@/hooks/useStoriesPerPageMain";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";

import css from "./Popular.module.css";

type PopularProps = {
  tablet?: number;
  mobile?: number;
  desktop?: number;
  showLoadMore?: boolean;
};

export const Popular = ({
  tablet = 4,
  mobile = 3,
  desktop = 3,

  showLoadMore = false,
}: PopularProps) => {
  const urlPath = usePathname();
  const isHomePage = urlPath === "/";

  const { perPage, isMobile, isMounted } = useStoriesPerPageMain({
    tablet,
    mobile,
    desktop,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["stories", "all", perPage],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchStories(perPage, pageParam, null);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    enabled: isMounted,
  });

  const stories = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <section
      className={isHomePage ? css.container : css.popularSection}
      aria-label="popular"
    >
      <h2 className={css.title}>Популярні історії</h2>

      {stories.length > 0 && isMounted && (
        <>
          <TravellersStories
            hasNextPage={showLoadMore && hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={() => fetchNextPage()}
            stories={stories}
            isHiddenOnMobileButton={isMobile}
          />
          <Link href="/stories" className={css.button}>
            Переглянути всі
          </Link>
        </>
      )}

      {error && <ErrorMessage message="Щось пішло не так при завантаженні" />}

      {(!isMounted || isLoading) && stories.length === 0 && !error && (
        <Loader isFullScreen={false} />
      )}
    </section>
  );
};

export default Popular;
