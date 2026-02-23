import React from "react";
import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={css.wrapper} role="alert" aria-live="assertive">
      <p className={css.text}>
        {message || "Сталася помилка. Будь ласка, спробуйте ще раз..."}
      </p>
    </div>
  );
}
