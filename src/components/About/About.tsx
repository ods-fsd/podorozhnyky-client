import React from "react";
import globalCss from "@/app/Home.module.css";
import css from "./About.module.css";

const ABOUT_FEATURES = [
  {
    id: "mission",
    icon: "icon-wand_stars",
    title: "Наша місія",
    description:
      "Об'єднувати людей через любов до пригод та надихати на нові відкриття.",
  },
  {
    id: "authentic",
    icon: "icon-travel_luggage_and_bags",
    title: "Автентичні історії",
    description:
      "Ми цінуємо справжні, нередаговані враження від мандрівників з усього світу.",
  },
  {
    id: "community",
    icon: "icon-communication",
    title: "Ваша спільнота",
    description:
      "Станьте частиною спільноти, де кожен може бути і автором, і читачем.",
  },
];

const About: React.FC = () => {
  return (
    <section className={css.section} aria-labelledby="about-title">
      <div className={globalCss.container}>
        <div className={css.aboutContent}>
          <h2 id="about-title" className={css.title}>
            Проєкт, створений для тих, хто живе подорожами
          </h2>
          <p className={css.description}>
            Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб
            нею поділилися. Наша платформа створена, щоб об&apos;єднати людей,
            закоханих у відкриття нового. Тут ви можете ділитися власним
            досвідом, знаходити друзів та надихатися на наступні пригоди разом з
            нами.
          </p>
        </div>

        <ul className={css.featuresList}>
          {ABOUT_FEATURES.map((feature) => (
            <li key={feature.id} className={css.feature}>
              <svg
                className={css.icon}
                width="48"
                height="48"
                aria-hidden="true"
                focusable="false"
              >
                <use href={`/sprite.svg#${feature.icon}`} />
              </svg>
              <h3 className={css.featureTitle}>{feature.title}</h3>
              <p className={css.featureDescription}>{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
