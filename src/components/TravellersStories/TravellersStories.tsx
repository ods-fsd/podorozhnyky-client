"use client";

import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";
import css from "./TravellersStories.module.css";
import { IStory } from "@/types/story";

interface TravellersStoriesProps {
  stories: IStory[];
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isOwn?: boolean;
  isHiddenOnMobileButton?: boolean;
}

const TravellersStories = ({
  stories,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  isOwn,
  isHiddenOnMobileButton,
}: TravellersStoriesProps) => {
  return (
    <>
      <ul className={css.storiesList}>
        {stories.map((story, index) => (
          <TravellersStoriesItem
            story={story}
            isOwn={isOwn}
            key={`${story._id}-${index}`}
          />
        ))}
      </ul>
      {onLoadMore && hasNextPage && !isHiddenOnMobileButton && (
        <button
          className={css.paginationButton}
          type="button"
          onClick={onLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Завантаження..." : "Переглянути всі"}
        </button>
      )}
    </>
  );
};

export default TravellersStories;
