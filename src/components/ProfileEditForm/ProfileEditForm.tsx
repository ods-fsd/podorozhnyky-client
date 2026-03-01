"use client";

import { useFormik } from "formik";
import { profileEditSchema } from "@/schemas/profileSchemas";
import { useAuthStore } from "@/lib/store/authStore";
import { updateProfile } from "@/lib/api/clientApi";
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
      description: user?.description || "",
      avatar: null as File | null,
    },
    validationSchema: profileEditSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        
        if (values.name !== user?.name) {
          formData.append("name", values.name);
        }
        if (values.description !== user?.description) {
          formData.append("description", values.description);
        }
        if (values.avatar) {
          formData.append("avatar", values.avatar);
        }

        const formDataAny = formData as unknown as Iterable<[string, FormDataEntryValue]>;
        const dataToSend = Array.from(formDataAny).length;
        if (dataToSend === 0) {
          toast("Немає змін для збереження");
          setLoading(false);
          return;
        }

        const updatedUser = await updateProfile(formData);
        
        setUser(updatedUser);
        toast.success("Профіль успішно оновлено!");
        router.push("/profile");
      } catch {
        toast.error("Не вдалося оновити профіль. Спробуйте пізніше.");
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
        <div className={css.field}>
          <p className={css.label}>Фото профілю</p>
          <div className={css.avatarSection}>
            {previewAvatar ? (
              <Image 
                src={previewAvatar} 
                alt="Profile Avatar" 
                className={css.avatarPreview} 
                width={64} 
                height={64} 
              />
            ) : (
              <div className={css.avatarPlaceholder}>{user?.name?.charAt(0)?.toUpperCase()}</div>
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
            {formik.touched.avatar && formik.errors.avatar && (
              <span className={css.errorText}>{formik.errors.avatar as string}</span>
            )}
          </div>
        </div>

        <div className={css.field}>
          <label htmlFor="name" className={css.label}>Повне ім&apos;я</label>
          <input
            id="name"
            name="name"
            type="text"
            className={`${css.input} ${formik.touched.name && formik.errors.name ? css.input_error : ""}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Введіть ваше ім'я"
          />
          {formik.touched.name && formik.errors.name && (
            <span className={css.errorText}>{formik.errors.name as string}</span>
          )}
        </div>

        <div className={css.field}>
          <label htmlFor="description" className={css.label}>Про себе</label>
          <textarea
            id="description"
            name="description"
            className={`${css.textarea} ${formik.touched.description && formik.errors.description ? css.input_error : ""}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            placeholder="Розкажіть трохи про себе..."
          />
          {formik.touched.description && formik.errors.description && (
            <span className={css.errorText}>{formik.errors.description as string}</span>
          )}
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className={css.submitBtn}
        >
          {loading ? "Збереження..." : "Зберегти зміни"}
        </button>
      </form>
    </div>
  );
};

export default ProfileEditForm;
