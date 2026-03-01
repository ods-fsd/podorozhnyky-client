import AddStoryForm from "@/components/AddStoryForm/AddStoryForm";
import css from "@/app/(main-layout)/(private routes)/stories/create/AddStoryPage.module.css";
import { fetchStoryById } from "@/lib/api/serverApi";

export const metadata = {
  title: "Редагування історії | Подорожники",
};

export default async function EditStoryPage({
  params,
}: {
  params: Promise<{ storyId: string }>;
}) {
  const { storyId } = await params;
  const story = await fetchStoryById(storyId);

  return (
    <section className={css.page}>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <h1 className={css.title}>Редагувати історію</h1>
        <AddStoryForm storyId={storyId} story={story || undefined} />
      </div>
    </section>
  );
}
