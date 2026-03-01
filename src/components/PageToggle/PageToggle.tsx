"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./PageToggle.module.css";

export const PageToggle = () => {
  const pathname = usePathname();

  const isSavedActive = pathname === "/profile/saved";
  const isOwnActive = pathname === "/profile/own";

  return (
    <div className={css.toggleWrapper}>
      {/* ПЕРША ВКЛАДКА - Збережені історії */}
      <Link
        href="/profile/saved"
        className={`${css.tab} ${isSavedActive ? css.active : ""}`}
      >
        Збережені історії
      </Link>

      {/* ДРУГА ВКЛАДКА - Мої історії */}
      <Link
        href="/profile/own"
        className={`${css.tab} ${isOwnActive ? css.active : ""}`}
      >
        Мої історії
      </Link>
    </div>
  );
};

export default PageToggle;
