'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

import { logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import AuthNavigation from '../AuthNavigation/AuthNavigation';
import MobileMenu from '../MobileMenu/MobileMenu';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

import mainCss from '@/app/Home.module.css';
import css from './Header.module.css';

export default function Header() {
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const isHomePage = pathname === '/';
 
  const isAuthPage = pathname?.startsWith('/auth') ?? false;

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      toast.success('Ви успішно вийшли з системи');
      setIsOpenConfirmModal(false);
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Сталася помилка при виході');
    }
  };

  const finalHeaderClass = isHomePage
    ? `${css.header} ${css.headerTransparent}`
    : css.header;
  const finalNavigationReg = isHomePage
    ? `${css.navigationReg} ${css.navTransparentReg}`
    : css.navigationReg;
  const finalNavigationLog = isHomePage
    ? `${css.navigationLog} ${css.navTransparentLog}`
    : css.navigationLog;
  const finalMenuButton = isHomePage
    ? `${css.mobileMenuButtonNoTransparent} ${css.mobileMenuButtonTransparent}`
    : css.mobileMenuButtonNoTransparent;

  return (
    <>
      <header className={finalHeaderClass}>
        <div className={mainCss.container}>
          <div className={css.headerContainer}>
            <Link className={css.headerLinkLogo} href="/">
              <div className={css.logo_icon}>
                <svg className={css.logo_iconSvg} width="23" height="23" aria-hidden="true">
                  <use href="/sprite.svg#icon-plant_logo" />
                </svg>
              </div>
              <span className={css.logoName}>Подорожники</span>
            </Link>

            <div className={css.navAndMenuControls}>
              {!isAuthPage && (
                <nav aria-label="Main Navigation" className={css.navigation}>
                  <ul className={css.navList}>
                    <li className={css.navigationItem}>
                      <Link className={css.headerLinkNav} href="/">
                        Головна
                      </Link>
                    </li>
                    <li className={css.navigationItem}>
                      <Link className={css.headerLinkNav} href="/stories">
                        Історії
                      </Link>
                    </li>
                    <li className={css.navigationItem}>
                      <Link className={css.headerLinkNav} href="/travellers">
                        Мандрівники
                      </Link>
                    </li>
                  </ul>

                  <ul className={css.navigationItemProfile}>
                    {mounted && (
                      isAuthenticated ? (
                        <>
                          <AuthNavigation />
                          <li className={css.LogoutListSvg}>
                            <button
                              className={css.logoutButtonSvg}
                              onClick={() => setIsOpenConfirmModal(true)}
                              aria-label="Вийти з акаунта"
                            >
                              <svg width="24" height="24" aria-hidden="true">
                                <use href="/sprite.svg#icon-logout" />
                              </svg>
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className={`${css.navigationAuth} ${finalNavigationLog}`}>
                            <Link
                              href="/auth/login"
                              prefetch={false}
                              className={css.linkAuth}
                            >
                              Вхід
                            </Link>
                          </li>
                          <li className={`${css.navigationAuth} ${finalNavigationReg}`}>
                            <Link
                              href="/auth/register"
                              prefetch={false}
                              className={css.linkAuth}
                            >
                              Реєстрація
                            </Link>
                          </li>
                        </>
                      )
                    )}
                  </ul>
                </nav>
              )}

              {!isAuthPage && (
                <button
                  className={`${css.mobileMenuButtonBase} ${finalMenuButton}`}
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Відкрити мобільне меню"
                >
                  <svg width="24" height="24" aria-hidden="true">
                    <use href="/sprite.svg#icon-menu" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      
      {!isAuthPage && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          isHomePage={isHomePage}
          isAuthenticated={isAuthenticated}
          user={user}
          handleLogout={() => setIsOpenConfirmModal(true)}
        />
      )}

      {isOpenConfirmModal && (
        <ConfirmModal
          onConfirm={handleLogout}
          onCancel={() => setIsOpenConfirmModal(false)}
          title="Ви точно хочете вийти?"
          text="Ми будемо сумувати за вами!"
          confirmButtonText="Вийти"
          cancelButtonText="Відмінити"
        />
      )}
    </>
  );
}
