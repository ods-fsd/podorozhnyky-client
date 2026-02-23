import StoryDetails from '@/components/StoryDetails/StoryDetails';
import { fetchStoryById } from '@/lib/api/serverApi';
import style from '@/app/Home.module.css';
import css from './StoryPage.module.css';
import { Popular } from '@/components/Popular/Popular';
import { notFound } from 'next/navigation';

type StoryPageProps = {
  params: {
    storyId: string;
  };
};

export default async function StoryPage({ params }: StoryPageProps) {
  const { storyId } = params;

  const story = await fetchStoryById(storyId);

  if (!story) {
    notFound();
  }

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