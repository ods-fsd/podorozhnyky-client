import {
  fetchServerCategories as fetchCategories,
  fetchServerStories as fetchStories,
} from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import StoriesClient from "./Stories.client";
import { ICategory } from "@/types/category";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Історії мандрівників | Подорожники",
  description:
    "Публічна стрічка історій мандрівників з фільтрацією за категоріями та пагінацією.",
};

const StoriesPage = async () => {
  const queryClient = new QueryClient();

  const perPage = 9;
  const page = 1;
  const category: ICategory | null = null;

  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      "stories",
      (category as ICategory | null)?._id ?? "all",
      perPage,
    ],
    queryFn: () => fetchStories(perPage, page, category),
    initialPageParam: 1,
  });

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoriesClient />
    </HydrationBoundary>
  );
};

export default StoriesPage;
