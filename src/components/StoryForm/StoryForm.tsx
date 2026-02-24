"use client";

import { useFormik } from "formik";
import { storySchema } from "@/schemas/storySchemas";

export const StoryForm = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      storyImage: null,
    },
    validationSchema: storySchema,
    onSubmit: async (values) => {
      // Для відправки файлів потрібно використовувати FormData!
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category", values.category);
      if (values.storyImage) formData.append("storyImage", values.storyImage);

      console.log("Дані історії (FormData готові до відправки)");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Інпути для title, description, category... */}

      <div>
        <label htmlFor="storyImage">Зображення історії (max 2MB)</label>
        <input
          id="storyImage"
          name="storyImage"
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0] || null;
            formik.setFieldValue("storyImage", file);
          }}
        />
        {formik.touched.storyImage && formik.errors.storyImage && (
          <div style={{ color: "red" }}>
            {formik.errors.storyImage as string}
          </div>
        )}
      </div>

      <button type="submit" disabled={!formik.isValid}>
        Зберегти історію
      </button>
    </form>
  );
};
