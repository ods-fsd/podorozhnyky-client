import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";

export default function MyStoriesPage() {
  const hasStories = false;

  if (!hasStories) {
    return (
      <MessageNoStories
        text="У вас ще немає створених історій"
        buttonText="Створити історію"
        route="/create-story"
      />
    );
  }

  return <div>{/* Список карток історій */}</div>;
}
