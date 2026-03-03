"use client";

import React from "react";
import { useCallback } from "react";
import styles from "./MessageNoStories.module.css";

import { useRouter } from "next/navigation";

export type MessageNoStoriesProps = {
 
  text?: string;
  
  buttonText?: string;
  
  route?: "/stories" | "/stories-create/create" | string;
  
  onClick?: () => void;
 
  className?: string;
};

const MessageNoStories = ({
  text = "Цей користувач ще не публікував історій",
  buttonText = "До історій",
  route = "/stories",
  onClick,
  className,
}: MessageNoStoriesProps) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
      return;
    }

    router.push(route);
  }, [onClick, route, router]);

  const wrapperClassName = [styles.container, className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={wrapperClassName} role="alert">
      <p className={styles.text}>{text}</p>
      <button type="button" className={styles.button} onClick={handleClick}>
        {buttonText}
      </button>
    </section>
  );
};

export default MessageNoStories;
