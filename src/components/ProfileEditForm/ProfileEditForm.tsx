"use client";

import { useFormik } from "formik";
import { profileEditSchema } from "@/schemas/profileSchemas";
import { useAuthStore } from "@/lib/store/authStore";
import { updateProfile, updateEmail } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import css from "./ProfileEditForm.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const ProfileEditForm = () => {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      description: user?.description || "",
      avatar: null as File | null,
    },
    validationSchema: profileEditSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // 1. Перевірка, чи взагалі щось змінилося
      const isNameChanged = values.name !== user?.name;
      const isEmailChanged = values.email !== user?.email;
      const isDescriptionChanged = values.description !== user?.description;
      const isAvatarChanged = !!values.avatar;

      if (
        !isNameChanged &&
        !isEmailChanged &&
        !isDescriptionChanged &&
        !isAvatarChanged
      ) {
        toast("Немає змін для збереження");
        return;
      }

      setLoading(true);
      try {
        // 2. Логіка зміни Email (згідно з ТЗ рядок 86: запит на верифікацію)
        if (isEmailChanged) {
          await updateEmail(values.email);
          toast.success(
            "Запит на зміну пошти надіслано! Перевірте нову скриньку.",
          );
        }

        // 3. Логіка оновлення профілю (Name, Description, Avatar)
        if (isNameChanged || isDescriptionChanged || isAvatarChanged) {
          const formData = new FormData();
          if (isNameChanged) formData.append("name", values.name);
          if (isDescriptionChanged)
            formData.append("description", values.description);
          if (isAvatarChanged && values.avatar)
            formData.append("avatar", values.avatar);

          const updatedUser = await updateProfile(formData);
          setUser(updatedUser);
          toast.success("Дані профілю оновлено!");
        }

        router.push("/profile");
      } catch {
        toast.error("Помилка при оновленні. Спробуйте пізніше.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("avatar", file);
    }
  };

  const previewAvatar = formik.values.avatar
    ? URL.createObjectURL(formik.values.avatar)
    : user?.avatarUrl || "";

  return (
    <div className={css.container}>
      <h1 className={css.title}>Редагувати профіль</h1>

      <form onSubmit={formik.handleSubmit} className={css.form}>
        {/* Аватар */}
        <div className={css.field}>
          <p className={css.label}>Фото профілю</p>
          <div className={css.avatarSection}>
            {previewAvatar ? (
              <Image
                src={previewAvatar}
                alt="Avatar"
                className={css.avatarPreview}
                width={64}
                height={64}
              />
            ) : (
              <div className={css.avatarPlaceholder}>
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
            )}

            <label htmlFor="avatar" className={css.uploadButtonLabel}>
              Завантажити нове фото
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className={css.fileInput}
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          {formik.errors.avatar && (
            <span className={css.errorText}>
              {formik.errors.avatar as string}
            </span>
          )}
        </div>

        {/* Повне ім'я */}
        <div className={css.field}>
          <label htmlFor="name" className={css.label}>
            Повне ім&apos;я
          </label>
          <input
            id="name"
            name="name"
            type="text"
            maxLength={32} // Жорсткий ліміт з ТЗ
            className={`${css.input} ${formik.touched.name && formik.errors.name ? css.input_error : ""}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <span className={css.errorText}>{formik.errors.name}</span>
          )}
        </div>

        {/* Електронна пошта */}
        <div className={css.field}>
          <label htmlFor="email" className={css.label}>
            Електронна пошта
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={64} // Ліміт з ТЗ
            className={`${css.input} ${formik.touched.email && formik.errors.email ? css.input_error : ""}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <span className={css.errorText}>{formik.errors.email}</span>
          )}
        </div>

        {/* Про себе */}
        <div className={css.field}>
          <label htmlFor="description" className={css.label}>
            Про себе
          </label>
          <textarea
            id="description"
            name="description"
            maxLength={150} // Ліміт з ТЗ
            className={`${css.textarea} ${formik.touched.description && formik.errors.description ? css.input_error : ""}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <span className={css.errorText}>{formik.errors.description}</span>
          )}
        </div>

        <button type="submit" disabled={loading} className={css.submitBtn}>
          {loading ? "Збереження..." : "Зберегти зміни"}
        </button>
      </form>
    </div>
  );
};

export default ProfileEditForm;
