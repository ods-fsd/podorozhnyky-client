import React from "react";
import css from "./Loader.module.css";

interface LoaderProps {
  isFullScreen?: boolean;
}

export default function Loader({ isFullScreen = true }: LoaderProps) {
  const containerClass = isFullScreen ? css.overlay : css.localContainer;

  return (
    <div className={containerClass} role="status" aria-live="polite">
      <div className={css.loaderBox}>
        <svg className={css.spinner} viewBox="0 0 50 50" aria-hidden="true">
          <circle
            className={css.path}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
          />
        </svg>
        <p className={css.text}>Завантаження...</p>
      </div>
    </div>
  );
}
