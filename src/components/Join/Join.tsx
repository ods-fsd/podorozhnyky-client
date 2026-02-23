"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

import mainCss from "@/app/Home.module.css";
import css from "./Join.module.css";

const Join: React.FC = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleClick = () => {
    const route = isAuthenticated ? "/profile" : "/auth/register";
    router.push(route);
  };

  return (
    <section
      id="join"
      aria-labelledby="join-title"
      className={css.join_section}
    >
      <div className={mainCss.container}>
        <div className={css.texts}>
          <h2 id="join-title" className={css.join_to}>
            Приєднуйтесь до нашої <br className={css.tab} />
            спільноти
          </h2>
          <p className={css.description}>
            Долучайтеся до мандрівників, які діляться своїми історіями та
            надихають на нові пригоди.
          </p>
          <button type="button" className={css.button} onClick={handleClick}>
            {isAuthenticated ? "Збережені" : "Зареєструватися"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Join;
