"use client";

import React from "react";
import { useAuthStore } from "@/lib/store/authStore";
import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import PageToggle from "@/components/PageToggle/PageToggle";
import mainCss from "@/app/Home.module.css";
import styles from "./Profile.module.css";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Берем данные текущего авторизованного пользователя из твоего стора
  const user = useAuthStore((state) => state.user);

  return (
    <div className={mainCss.container}>
      <div className={styles.profilePage} aria-label="profile page">
        {user && (
          <TravellerInfo
            name={user.name}
            description={user.description}
            avatarUrl={user.avatarUrl}
          />
        )}

        <PageToggle />

        {/* Сюда Next.js будет автоматически подставлять содержимое папок /saved или /own */}
        <div>{children}</div>
      </div>
    </div>
  );
}
