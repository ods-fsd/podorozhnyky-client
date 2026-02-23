import Link from "next/link";
import type { Metadata } from "next";

import mainCss from "@/app/Home.module.css";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 - Сторінку не знайдено | Подорожники",
  description:
    "На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.",
  openGraph: {
    title: "404 - Сторінку не знайдено | Подорожники",
    description:
      "На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.",
  },
};

export default function NotFound() {
  return (
    <section className={css.section}>
      <div className={mainCss.container}>
        <div className={css.content}>
          <h1 className={css.title}>404</h1>
          <h2 className={css.subtitle}>Ой! Сторінку не знайдено</h2>
          <p className={css.description}>
            Можливо, вона була видалена, перейменована, або ви ввели неправильну
            адресу.
          </p>
          <Link href="/" className={css.button}>
            Повернутися на головну
          </Link>
        </div>
      </div>
    </section>
  );
}
