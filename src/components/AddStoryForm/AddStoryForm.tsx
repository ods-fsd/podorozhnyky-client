"use client";

import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { createStory, updateStory, fetchCategories } from "@/lib/api/clientApi";
import { ICategory } from "@/types/category";
import { IStory } from "@/types/story";
import css from "./AddStoryForm.module.css";

interface AddStoryFormProps {
  initialData?: IStory;
}

const validationSchema = Yup.object({
  title: Yup.string().max(80, "Максимум 80 символів").required("Обов'язкове поле"),
  category: Yup.string().required("Обов'язкове поле"),
  article: Yup.string()
    .max(2500, "Максимум 2500 символів")
    .required("Обов'язкове поле"),
});

export default function AddStoryForm({ initialData }: AddStoryFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.img || null
  );

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch(() => toast.error("Не вдалося завантажити категорії"));
  }, []);

  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      category: initialData?.category?._id || "",
      article: initialData?.article || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("category", values.category);
        formData.append("article", values.article);

        if (selectedImage) {
          formData.append("storyImage", selectedImage);
        }

        let result;
        if (initialData?._id) {
          result = await updateStory(initialData._id, formData);
          toast.success("Історію змінено!");
        } else {
          result = await createStory(formData);
          toast.success("Історію створено!");
        }

        const newStoryId = result?.data?._id || initialData?._id;
        if (newStoryId) {
          router.push(`/stories/${newStoryId}`);
        } else {
          router.push("/profile/own");
        }
      } catch (error) {
        console.error("Story save error", error);
        toast.error("Помилка збереження. Спробуйте ще раз.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={css.form} noValidate>
      <div className={css.coverContainer}>
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Story cover preview"
            width={600}
            height={300}
            className={css.coverImage}
          />
        ) : (
          <div className={css.coverImage}>Плейсхолдер</div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={css.btnCancel}
        >
          {previewUrl ? "Змінити фото" : "Підвантажити обкладинку"}
        </button>
      </div>

      <div className={css.field}>
        <label className={css.label} htmlFor="title">Заголовок</label>
        <input
          id="title"
          type="text"
          className={css.input}
          placeholder="Назва історії"
          {...formik.getFieldProps("title")}
        />
        {formik.touched.title && formik.errors.title && (
          <span className={css.error}>{formik.errors.title}</span>
        )}
      </div>

      <div className={css.field}>
        <label className={css.label} htmlFor="category">Категорія</label>
        <select
          id="category"
          className={css.select}
          {...formik.getFieldProps("category")}
        >
          <option value="" disabled>Оберіть категорію</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category && (
          <span className={css.error}>{formik.errors.category}</span>
        )}
      </div>

      <div className={css.field}>
        <label className={css.label} htmlFor="article">Текст історії</label>
        <textarea
          id="article"
          className={css.textarea}
          placeholder="Опис мандрівки..."
          {...formik.getFieldProps("article")}
        />
        {formik.touched.article && formik.errors.article && (
          <span className={css.error}>{formik.errors.article}</span>
        )}
      </div>

      <div className={css.buttons}>
        <button
          type="button"
          className={css.btnCancel}
          onClick={() => router.back()}
        >
          Відмінити
        </button>
        <button
          type="submit"
          className={css.btnSave}
          disabled={!formik.isValid || (!selectedImage && !previewUrl) || formik.isSubmitting}
        >
          {formik.isSubmitting ? "Збереження..." : "Зберегти"}
        </button>
      </div>
    </form>
  );
}
