import css from './ConfirmDeleteContent.module.css';

type Props = {
  onConfirm: () => void; // Функція, що видаляє історію
  onCancel: () => void;  // Закриття модалки
};

export default function ConfirmDeleteContent({ onConfirm, onCancel }: Props) {
  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Видалити історію?</h3>

      <p className={css.text}>
        Цю дію неможливо скасувати. Ви впевнені, що хочете видалити історію?
      </p>

      <div className={css.buttonsRow}>
        <button className={css.saveButton} onClick={onCancel}>
          Скасувати
        </button>
        <button className={css.deleteButton} onClick={onConfirm}>
          Видалити
        </button>
      </div>
    </div>
  );
}
