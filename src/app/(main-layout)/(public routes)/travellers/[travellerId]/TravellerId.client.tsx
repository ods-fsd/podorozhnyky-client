'use client';

import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import type { PaginatedStoriesResponse, IStory } from '@/types/story';
import type { IUser } from '@/types/user';
import { useStoriesPerPage } from '@/hooks/useStoriesPerPage';

type Props = {
  travellerId: string;
  initialStories: PaginatedStoriesResponse;
  traveller?: IUser | null;
};

async function fetchStoriesPage(
  travellerId: string,
  page: number,
  perPage: number
): Promise<PaginatedStoriesResponse> {
  const res = await fetch(
    `/api/users/${encodeURIComponent(travellerId)}?page=${page}&perPage=${perPage}`,
    { credentials: 'same-origin' }
  );

  if (!res.ok) throw new Error(`Failed to load stories page=${page}`);
  const json = await res.json();

  return {
    page: json.page,
    perPage: json.perPage,
    totalPages: json.totalPages,
    totalItems: json.totalItems,
    hasNextPage: json.hasNextPage,
    hasPreviousPage: json.hasPreviousPage,
    data: json.data.articles as IStory[],
  };
}

export default function TravellerStoriesWrapper({
  travellerId,
  initialStories,
}: Props) {
  const apiPerPage = initialStories.perPage;

  const uiPerPage = useStoriesPerPage();

  const query = useInfiniteQuery<PaginatedStoriesResponse>({
    queryKey: ['traveller-stories', travellerId, apiPerPage],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchStoriesPage(travellerId, Number(pageParam ?? 1), apiPerPage),
    getNextPageParam: lastPage =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
  });

  const allStories: IStory[] = useMemo(
    () => (query.data?.pages ?? [initialStories]).flatMap(page => page.data),
    [query.data?.pages, initialStories]
  );

  const loadedPagesCount = query.data?.pages?.length ?? 1;

  const visibleStories: IStory[] = useMemo(() => {
    const maxVisible = uiPerPage * loadedPagesCount;
    return allStories.slice(0, maxVisible);
  }, [allStories, uiPerPage, loadedPagesCount]);

  const hasNextPage = query.hasNextPage ?? initialStories.hasNextPage;

  const handleClick = async () => {
    if (!hasNextPage || query.isFetchingNextPage) return;
    await query.fetchNextPage();
  };

  return (
    <TravellersStories
      stories={visibleStories}
      hasNextPage={hasNextPage}
      isFetchingNextPage={query.isFetchingNextPage}
      onLoadMore={handleClick}
    />
  );
}