import { fetchAuthorById } from '@/lib/api/serverApi';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function TravellerProfilePage({ params }: Props) {
  const { userId } = await params;
  
  let res;
  try {
    res = await fetchAuthorById(userId);
  } catch {
    return notFound();
  }

  if (!res || !res.data) return notFound();

  const data = res.data as Record<string, unknown>;
  if (!data.user && !data.name) return notFound();

  // Handle potential nested data structure differences
  const user = (data.user ? data.user : data) as Record<string, unknown>;
  const stories = res.data.articles || [];

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '80px 24px', minHeight: '80vh' }}>
      <TravellerInfo 
        name={user.name as string} 
        description={user.description as string} 
        avatarUrl={user.avatarUrl as string} 
      />
      <div style={{ marginTop: '80px' }}>
         <h2 style={{ fontSize: '32px', marginBottom: '40px', fontWeight: 600 }}>Історії мандрівника</h2>
         {stories.length > 0 ? (
           <TravellersStories
             hasNextPage={false}
             isFetchingNextPage={false}
             onLoadMore={() => {}}
             stories={stories}
             isHiddenOnMobileButton={true}
           />
         ) : (
           <p style={{ fontSize: '18px', color: '#666' }}>У мандрівника ще немає історій.</p>
         )}
      </div>
    </div>
  );
}
