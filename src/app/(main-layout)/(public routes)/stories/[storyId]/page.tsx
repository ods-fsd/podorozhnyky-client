import StoryDetails from '@/components/StoryDetails/StoryDetails';
import { fetchStoryById } from '@/lib/api/serverApi';
import style from '@/app/Home.module.css';
import css from './StoryPage.module.css';
import { Popular } from '@/components/Popular/Popular';

type StoryPageProps = {
  params: Promise<{
    storyId: string;
  }>;
};

export default async function StoryPage({ params }: StoryPageProps) {
  const { storyId } = await params;

  const story = await fetchStoryById(storyId);

  return (
    <section className={css.page} aria-label="story page">
      <div className={style.container}>
        <h1 className={css.title}>{story.title}</h1>
        <StoryDetails storyId={storyId} />
        <Popular mobile={2} tablet={4} desktop={3} showLoadMore={false} />
      </div>
    </section>
  );
}