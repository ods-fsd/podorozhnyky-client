import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import style from '@/app/(auth-layout)/Auth.module.css';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={style.pageWrapper}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
