"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const finalStoryButtonEl = isHomePage
    ? `${css.storyButtonElAuth} ${css.storyButtonElTransparentAuth}`
    : css.storyButtonElAuth;

  return (
    <>
      <li>
        <Link href="/profile" className={css.headerLinkNav}>
          Мій Профіль
        </Link>
      </li>

      <li className={finalStoryButtonEl}>
        <Link href="/stories/create/" className={css.storyLinkElAuth}>
          Опублікувати Історію
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link
          href="/profile"
          className={css.navigationLink}
          aria-label="Перейти до профілю"
        >
          {user?.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={`Аватар ${user.name || "користувача"}`}
              width={32}
              height={32}
              className={css.userPhoto}
            />
          ) : (
            <div className={css.userDefaultPhoto} aria-hidden="true" />
          )}
        </Link>
        <Link href="/user-edit" className={css.headerLinkNav}>
          {user?.name || "Ім'я"}
        </Link>
        <span className={css.line} aria-hidden="true"></span>
      </li>
    </>
  );
}
