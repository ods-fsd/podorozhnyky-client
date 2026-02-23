"use client";

import Link from "next/link";
import Modal from "@/components/Modal/Modal";
import css from "./AuthNavModal.module.css";

interface AuthNavModalProps {
  onClose: () => void;
}

export default function AuthNavModal({ onClose }: AuthNavModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className={css.content}>
        <button className={css.closeBtn} onClick={onClose} aria-label="Закрити">
          <svg className={css.icon} width="24" height="24">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <div className={css.info}>
          <h2 className={css.title}>Помилка під час збереження</h2>
          <p className={css.text}>
            Щоб зберегти статтю вам треба увійти, якщо ще немає облікового
            запису зареєструйтесь
          </p>
        </div>

        <div className={css.actions}>
          <Link href="/auth/login" className={css.btnLogin} onClick={onClose}>
            Увійти
          </Link>
          <Link
            href="/auth/register"
            className={css.btnRegister}
            onClick={onClose}
          >
            Зареєструватись
          </Link>
        </div>
      </div>
    </Modal>
  );
}
