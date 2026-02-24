'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import mainCss from "@/app/Home.module.css";
import css from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth') ?? false;

  if (isAuthPage) {
    return (
      <div style={{ position: 'absolute', bottom: '24px', left: '0', width: '100%', textAlign: 'center' }}>
        <p className={css.text} style={{ color: '#8c8c8c', fontSize: '14px' }}>
          © {currentYear} Подорожники. Усі права захищені.
        </p>
      </div>
    );
  }

  return (
    <footer className={css.footer}>
      <div className={mainCss.container}>
        <div className={css.wrap}>
          <div className={css.content}>
            <div className={css.logo}>
              <Link className={css.logo_link} href="/">
                <svg
                  className={css.logo_icon}
                  width="23"
                  height="23"
                  aria-hidden="true"
                >
                  <use href="/sprite.svg#icon-plant_logo" />
                </svg>
                <p className={css.logo_text}>Подорожники</p>
              </Link>
            </div>

            <div className={css.links}>
              <ul className={css.links_list}>
                <li className={css.links_item}>
                  <a
                    className={css.links_icon}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/"
                    aria-label="Перейти на Facebook"
                  >
                    <svg
                      className={css.footer_icon}
                      width="32"
                      height="32"
                      aria-hidden="true"
                    >
                      <use href="/sprite.svg#icon-Facebook" />
                    </svg>
                  </a>
                </li>
                <li className={css.links_item}>
                  <a
                    className={css.links_icon}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/"
                    aria-label="Перейти на Instagram"
                  >
                    <svg
                      className={css.footer_icon}
                      width="32"
                      height="32"
                      aria-hidden="true"
                    >
                      <use href="/sprite.svg#icon-Instagram" />
                    </svg>
                  </a>
                </li>
                <li className={css.links_item}>
                  <a
                    className={css.links_icon}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://x.com/"
                    aria-label="Перейти на X (Twitter)"
                  >
                    <svg
                      className={css.footer_icon}
                      width="32"
                      height="32"
                      aria-hidden="true"
                    >
                      <use href="/sprite.svg#icon-X" />
                    </svg>
                  </a>
                </li>
                <li className={css.links_item}>
                  <a
                    className={css.links_icon}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.youtube.com/"
                    aria-label="Перейти на YouTube"
                  >
                    <svg
                      className={css.footer_icon}
                      width="32"
                      height="32"
                      aria-hidden="true"
                    >
                      <use href="/sprite.svg#icon-Youtube" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <nav className={css.nav} aria-label="Навігація у підвалі">
            <ul className={css.nav_list}>
              <li className={css.nav_item}>
                <Link className={css.nav_link} href="/">
                  Головна
                </Link>
              </li>
              <li className={css.nav_item}>
                <Link className={css.nav_link} href="/stories">
                  Історії
                </Link>
              </li>
              <li className={css.nav_item}>
                <Link className={css.nav_link} href="/travellers">
                  Мандрівники
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={css.inscription}>
          <p className={css.text}>
            © {currentYear} Подорожники. Усі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
