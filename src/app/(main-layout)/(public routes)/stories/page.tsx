import {
  fetchServerCategories as fetchCategories,
  fetchServerStories as fetchStories,
} from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import StoriesClient from './Stories.client';
import { ICategory } from '@/types/category';

const StoriesPage = async () => {
  const queryClient = new QueryClient();

  // Налаштування для початкового завантаження: 9 карток на першій сторінці, без категорії
  const perPage = 9;
  const page = 1;
  const category: ICategory | null = null;

  // Серверно "прогріваємо" (prefetch) запит історій, щоб вони одразу були в HTML
  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      'stories',
      (category as ICategory | null)?._id ?? 'all',
      perPage,
    ],
    queryFn: () => fetchStories(perPage, page, category),
    initialPageParam: 1,
  });

  // Також серверно завантажуємо список категорій для фільтра
  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  });

  // HydrationBoundary "передає" ці завантажені дані з сервера на клієнтський компонент
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoriesClient />
    </HydrationBoundary>
  );
};

export default StoriesPage;