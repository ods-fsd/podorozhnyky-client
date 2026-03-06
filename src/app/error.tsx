"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import mainCss from "@/app/Home.module.css";
import css from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className={css.section}>
      <div className={mainCss.container}>
        <div className={css.content}>
          <h1 className={css.title}>Помилка</h1>
          <h2 className={css.subtitle}>Щось пішло не так!</h2>
          <p className={css.description}>
            Виникла непередбачена помилка. Ми вже знаємо про неї і працюємо над
            вирішенням.
          </p>
          <div className={css.buttons}>
            <button
              className={css.button}
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >
              Спробувати ще раз
            </button>
            <Link href="/" className={`${css.button} ${css.buttonSecondary}`}>
              Повернутися на головну
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
