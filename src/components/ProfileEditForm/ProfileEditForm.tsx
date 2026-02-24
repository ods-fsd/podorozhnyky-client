"use client";

import { useFormik } from "formik";
import { profileEditSchema } from "@/schemas/profileSchemas";

export const ProfileEditForm = ({ initialEmail = "" }) => {
  const formik = useFormik({
    initialValues: { email: initialEmail, description: "", avatar: null },
    validationSchema: profileEditSchema,
    onSubmit: async (values) => {
      console.log("Оновлення профілю...", values);

      // Логіка згідно Frontend.html:
      if (values.email !== initialEmail) {
        console.log(
          "Email змінено! Відправляємо додатковий запит на верифікацію...",
        );
        // await fetch('/app/api/auth/verify-email-change', ...)
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Інпути для email, description... */}

      <div>
        <label htmlFor="avatar">Аватар (max 500kB)</label>
        <input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={(e) =>
            formik.setFieldValue("avatar", e.currentTarget.files?.[0] || null)
          }
        />
        {formik.touched.avatar && formik.errors.avatar && (
          <div style={{ color: "red" }}>{formik.errors.avatar as string}</div>
        )}
      </div>

      <button type="submit" disabled={!formik.isValid}>
        Зберегти зміни
      </button>
    </form>
  );
};
