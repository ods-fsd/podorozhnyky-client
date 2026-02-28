import StoryDetails from "@/components/StoryDetails/StoryDetails";
import { fetchStoryById } from "@/lib/api/serverApi";
import style from "@/app/Home.module.css";
import css from "./StoryPage.module.css";
import { Popular } from "@/components/Popular/Popular";
import { notFound } from "next/navigation";

// 1. Оновлюємо типізацію: params тепер є Promise
type StoryPageProps = {
  params: Promise<{
    storyId: string;
  }>;
};

export default async function StoryPage({ params }: StoryPageProps) {
  // 2. Додаємо await перед розпакуванням params!
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
