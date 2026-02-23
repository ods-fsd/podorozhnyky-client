"use client";
import css from "./ConfirmModal.module.css";
import Modal from "../Modal/Modal";

interface ConfirmModalProps {
  title: string;
  text: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  title,
  text,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <Modal onClose={onCancel}>
      <div className={css.content}>
        <button className={css.btnButton} onClick={onCancel} aria-label="Close">
          <svg className={css.icon} width="24" height="24">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>
        <div className={css.info}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.text}>{text}</p>
        </div>

        <div className={css.twoBtn}>
          <button className={css.btnCancel} onClick={onCancel}>
            {cancelButtonText}
          </button>
          <button className={css.btnConfirm} onClick={onConfirm}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
