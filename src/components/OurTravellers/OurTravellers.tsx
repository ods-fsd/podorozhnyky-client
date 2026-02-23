"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";

import TravellersList from "@/components/TravellersList/TravellersList";
import { fetchAuthors } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

import mainCss from "@/app/Home.module.css";
import css from "./OurTravellers.module.css";

type OurTravellersProps = {
  showLoadMore?: boolean;
};

const OurTravellers: React.FC<OurTravellersProps> = ({
  showLoadMore = false,
}) => {
  const perPage = 4;
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(rafId);
  }, []);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["authors", "list", perPage],
    queryFn: ({ pageParam = 1 }) => fetchAuthors(pageParam, perPage),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.data.pageInfo.hasNextPage
        ? lastPage.data.pageInfo.page + 1
        : undefined,
    enabled: isMounted,
  });

  const allAuthors = data?.pages.flatMap((page) => page.data.users) ?? [];

  return (
    <section
      className={css.ourTravellersSection}
      aria-labelledby="our-travellers"
    >
      <div className={mainCss.container}>
        <h2 className={css.title} id="our-travellers">
          Наші Мандрівники
        </h2>

        {allAuthors.length > 0 && isMounted && (
          <>
            <TravellersList users={allAuthors} />

            {showLoadMore ? (
              hasNextPage && (
                <button
                  className={css.paginateButton}
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  aria-busy={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Завантаження..." : "Показати ще"}
                </button>
              )
            ) : (
              <Link href="/travellers" className={css.paginateButton}>
                Переглянути всіх
              </Link>
            )}
          </>
        )}

        {error && <ErrorMessage message="Щось пішло не так при завантаженні" />}

        {(!isMounted || isLoading) && allAuthors.length === 0 && !error && (
          <Loader isFullScreen={false} />
        )}
      </div>
    </section>
  );
};

export default OurTravellers;
