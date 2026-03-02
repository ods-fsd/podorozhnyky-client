"use client";

import AddStoryForm from "@/components/AddStoryForm/AddStoryForm";
import homeCss from "./AddStoryPage.module.css";
import css from "./AddStoryPage.module.css";

const CreateStoryPage = () => {
  return (
    <div className={`${homeCss.containerOne} ${css.historyWrapper}`}>
      <h1 className={css.pageTitle}>Створити нову історію</h1>
      <AddStoryForm />
    </div>
  );
};

export default CreateStoryPage;
