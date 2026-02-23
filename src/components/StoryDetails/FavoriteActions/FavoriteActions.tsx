"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmDeleteContent from "@/components/ConfirmDeleteContent/ConfirmDeleteContent";
import Modal from "@/components/Modal/Modal";
import css from "./FavoriteActions.module.css";

type Props = {
  storyId: string;
  isAuthenticated: boolean;
  isFavorite: boolean;
  saving: boolean;
  isOwner: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

export default function FavoriteActions({
  storyId,
  isAuthenticated,
  isFavorite,
  saving,
  isOwner,
  onToggle,
  onDelete,
}: Props) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  if (isOwner) {
    return (
      <>
        {showConfirm && (
          <Modal onClose={() => setShowConfirm(false)}>
            <ConfirmDeleteContent
              onConfirm={() => {
                setShowConfirm(false);
                onDelete();
              }}
              onCancel={() => setShowConfirm(false)}
            />
          </Modal>
        )}

        <div className={css.saveSection}>
          <h3 className={css.saveTitle}>Це ваша історія</h3>
          <p className={css.saveText}>
            Ви можете відредагувати або видалити її.
          </p>

          <div className={css.buttonsRow}>
            <button
              className={css.saveButton}
              onClick={() => router.push(`/stories/${storyId}/edit`)}
            >
              Редагувати
            </button>

            <button
              className={css.deleteButton}
              onClick={() => setShowConfirm(true)}
            >
              Видалити
            </button>
          </div>
        </div>
      </>
    );
  }

  // ---- 2) НЕ АВТОРИЗОВАНИЙ -------------------------------------
  if (!isAuthenticated) {
    return (
      <div className={css.saveSection}>
        <h3 className={css.saveTitle}>Увійдіть, щоб зберегти історію</h3>
        <p className={css.saveText}>
          Ця функція доступна лише авторизованим користувачам.
        </p>

        <button
          className={css.saveButton}
          onClick={() => router.push("/auth/login")}
        >
          Увійти
        </button>
      </div>
    );
  }

  // ---- 3) АВТОРИЗОВАНИЙ — НЕ в обраних --------------------------
  if (!isFavorite) {
    return (
      <div className={css.saveSection}>
        <h3 className={css.saveTitle}>Збережіть собі історію</h3>
        <p className={css.saveText}>
          Вона буде доступна у вашому профілі у розділі збережене.
        </p>

        <button className={css.saveButton} onClick={onToggle} disabled={saving}>
          {saving ? "Збереження..." : "Зберегти"}
        </button>
      </div>
    );
  }

  // ---- 4) АВТОРИЗОВАНИЙ — В ОБРАНИХ ------------------------------
  return (
    <div className={css.saveSection}>
      <h3 className={css.saveTitle}>Історія у ваших збережених</h3>
      <p className={css.saveText}>
        Ви можете видалити її із розділу збережених.
      </p>

      <button className={css.saveButton} onClick={onToggle} disabled={saving}>
        {saving ? "Видалення..." : "Видалити"}
      </button>
    </div>
  );
}
