import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { IUser } from "@/types/user";
import css from "./MobileMenu.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isHomePage: boolean;
  isAuthenticated: boolean;
  user: Partial<IUser> | null;
  handleLogout: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  isHomePage,
  isAuthenticated,
  user,
  handleLogout,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const finalStoryButtonEl = isHomePage
    ? `${css.storyButtonElMob} ${css.storyButtonElTransparentMob}`
    : css.storyButtonElMob;

  return (
    <div
      className={css.menuOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Мобільне меню"
    >
      <div className={css.menuContent} onClick={(e) => e.stopPropagation()}>
        <div className={css.menuInnerWrapper}>
          <div className={css.menuHeader}>
            <Link className={css.headerLinkLogo} href="/" onClick={onClose}>
              <div className={css.logo_icon}>
                <svg
                  className={css.logo_iconSvg}
                  width="23"
                  height="23"
                  aria-hidden="true"
                >
                  <use href="/sprite.svg#icon-plant_logo" />
                </svg>
              </div>
              <span className={css.logoName}>Подорожники</span>
            </Link>

            <button
              className={css.closeButton}
              onClick={onClose}
              aria-label="Закрити меню"
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href="/sprite.svg#icon-close" />
              </svg>
            </button>
          </div>

          <nav className={css.menuNav}>
            <Link href="/" onClick={onClose} className={css.menuLink}>
              Головна
            </Link>
            <Link href="/stories" onClick={onClose} className={css.menuLink}>
              Історії
            </Link>
            <Link href="/travellers" onClick={onClose} className={css.menuLink}>
              Мандрівники
            </Link>

            {isAuthenticated && (
              <Link
                href="/profile"
                className={`${css.menuLink} ${css.menuLinkAuth}`}
                onClick={onClose}
              >
                Мій Профіль
              </Link>
            )}
          </nav>

          <div className={css.authButtonsWrapper}>
            <div className={css.authContent}>
              <div className={finalStoryButtonEl}>
                <Link
                  href={isAuthenticated ? "/stories/create/" : "/auth/login"}
                  className={css.storyLinkElMob}
                  onClick={onClose}
                >
                  Опублікувати Історію
                </Link>
              </div>

              {isAuthenticated ? (
                <div className={css.navUserWrapper}>
                  <Link
                    href="/user-edit"
                    className={css.profileLinkMobile}
                    onClick={onClose}
                  >
                    {user?.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt={`Фото ${user.name}`}
                        width={32}
                        height={32}
                        className={css.userPhoto}
                      />
                    ) : (
                      <div
                        className={css.userDefaultPhoto}
                        aria-hidden="true"
                      ></div>
                    )}
                    <span className={css.mobUserName}>
                      {user?.name || "Ім'я"}
                    </span>
                  </Link>

                  <span className={css.line} aria-hidden="true"></span>

                  <button
                    className={css.logoutButtonSvg}
                    onClick={handleLogout}
                    aria-label="Вийти з акаунта"
                  >
                    <svg width="24" height="24" aria-hidden="true">
                      <use href="/sprite.svg#icon-logout" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className={css.authButtons}>
                  <Link
                    href="/auth/login"
                    onClick={onClose}
                    className={`${css.menuButton} ${css.menuButtonLogin}`}
                  >
                    Вхід
                  </Link>

                  <Link
                    href="/auth/register"
                    onClick={onClose}
                    className={`${css.menuButton} ${css.menuButtonRegister}`}
                  >
                    Реєстрація
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
