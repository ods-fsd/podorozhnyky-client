"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IUser } from "@/types/user";
import css from "./TravellersList.module.css";

interface TravellersListProps {
  users: IUser[];
}

const TravellersList: React.FC<TravellersListProps> = ({ users }) => {
  if (!users || users.length === 0) {
    return null;
  }

  return (
    <div className={css.section}>
      <ul className={css.list} aria-label="Список мандрівників">
        {users.map((user) => (
          <li key={user._id} className={css.card}>
            <Image
              src={user.avatarUrl || "/images/user/5907.jpg"}
              alt={`Аватар ${user.name}`}
              className={css.image}
              width={112}
              height={112}
            />
            <div className={css.container}>
              <h3 className={css.name}>{user.name}</h3>
              <p className={css.text}>
                {user.description ||
                  "Мандрівник ще не додав інформацію про себе."}
              </p>
              <Link href={`/travellers/${user._id}`} className={css.button}>
                Переглянути профіль
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravellersList;
