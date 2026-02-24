import StoryDetails from "@/components/StoryDetails/StoryDetails";
import { fetchStoryById } from "@/lib/api/serverApi";
import style from "@/app/Home.module.css";
import css from "./StoryPage.module.css";
import { Popular } from "@/components/Popular/Popular";
import { notFound } from "next/navigation";

type StoryPageProps = {
  params: Promise<{
    storyId: string;
  }>;
};

export default async function StoryPage({ params }: StoryPageProps) {
  const { storyId } = await params;

  const story = await fetchStoryById(storyId);

  if (!story) {
    notFound();
  }

  return (
    <section className={css.page} aria-label="story page">
      <div className={style.container}>
        <h1 className={css.title}>{story.title}</h1>
        <StoryDetails storyId={storyId} />
        <Popular showLoadMore={false} />
      </div>
    </section>
  );
}
