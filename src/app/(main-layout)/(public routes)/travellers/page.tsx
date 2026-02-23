import { fetchAuthors } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import OurTravellers from '@/components/OurTravellers/OurTravellers';

export default async function TravellersPage() {
  const queryClient = new QueryClient();

  const perPage = 4;
  const page = 1;

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['authors', 'list', perPage],
    queryFn: () => fetchAuthors(page, perPage),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div style={{ paddingTop: '80px', paddingBottom: '80px' }}>
         <OurTravellers showLoadMore={true} />
      </div>
    </HydrationBoundary>
  );
}
