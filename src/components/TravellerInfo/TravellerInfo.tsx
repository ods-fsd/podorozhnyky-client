"use client";

import Image from "next/image";
import styles from "./TravellerInfo.module.css";

interface TravellerInfoProps {
  name: string;
  description?: string;
  avatarUrl?: string | null;
}

const TravellerInfo = ({
  name,
  description = "",
  avatarUrl,
}: TravellerInfoProps) => {
  const MAX_CHAR_LIMIT = 150;
  const safeDescription =
    description.length > MAX_CHAR_LIMIT
      ? description.substring(0, MAX_CHAR_LIMIT) + "..."
      : description;

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <Image
          src={avatarUrl || "/placeholder-image.png"}
          alt={`Аватар мандрівника ${name}`}
          className={styles.avatar}
          width={150}
          height={150}
          priority
        />
      </div>

      <div className={styles.details}>
        <h1 className={styles.name}>{name}</h1>
        {safeDescription ? (
          <p className={styles.description}>{safeDescription}</p>
        ) : (
          <p className={styles.noDescription}>Опис відсутній</p>
        )}
      </div>
    </div>
  );
};

export default TravellerInfo;
