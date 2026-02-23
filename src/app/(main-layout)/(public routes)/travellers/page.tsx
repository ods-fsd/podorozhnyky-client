import { fetchAuthors } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import css from "@/components/TravellersList/TravellersList.module.css";
import TravellersClient from "./travellers.client";

export default async function TravellersPage() {
  const queryClient = new QueryClient();

  const perPage = 4;
  const page = 1;

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["authors", "list", perPage],
    queryFn: () => fetchAuthors(page, perPage),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1 className={css.title}>Мандрівники</h1>
      <TravellersClient />
    </HydrationBoundary>
  );
}
