"use client"; // Додаємо, якщо будемо використовувати hooks (наприклад, useSelector з Redux)

import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";

export default function SavedStoriesPage() {
  const hasSavedStories = false;

  return (
    <div className="saved-stories-container">
      {!hasSavedStories ? (
        <MessageNoStories
          text="У вас ще немає збережених історій"
          buttonText="Переглянути історії"
          targetRoute="/"
        />
      ) : (
        <p>Тут буде список ваших збережених історій (StoryList)</p>
      )}
    </div>
  );
}
