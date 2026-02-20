"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./PageToggle.module.css";

const PageToggle = () => {
  const pathname = usePathname();

  const isOwnActive = pathname === "/profile/own";
  const isSavedActive = pathname === "/profile/saved";

  return (
    <div className={styles.toggleWrapper}>
      <Link
        href="/profile/own"
        className={`${styles.tab} ${isOwnActive ? styles.active : ""}`}
      >
        Мої історії
      </Link>
      <Link
        href="/profile/saved"
        className={`${styles.tab} ${isSavedActive ? styles.active : ""}`}
      >
        Збережені
      </Link>
    </div>
  );
};

export default PageToggle;
