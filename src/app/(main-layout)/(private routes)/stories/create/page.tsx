import AddStoryForm from "@/components/AddStoryForm/AddStoryForm";
import css from "./AddStoryPage.module.css";

export const metadata = {
  title: "Створення історії | Подорожники",
};

export default function AddStoryPage() {
  return (
    <section className={css.page}>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <h1 className={css.title}>Створити нову історію</h1>
        <AddStoryForm />
      </div>
    </section>
  );
}
