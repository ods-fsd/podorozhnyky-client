import * as Yup from "yup";

const MAX_AVATAR_SIZE = 500 * 1024; 

export const profileEditSchema = Yup.object({
  name: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(32, "Максимум 32 символи")
    .required("Ім'я обов'язкове"),

  email: Yup.string()
    .email("Невірний формат email")
    .max(64, "Максимум 64 символи")
    .required("Email обов'язковий"),

  description: Yup.string()
    .max(150, "Максимум 150 символів"),
    

  avatar: Yup.mixed()
    .nullable()
    .test("fileSize", "Розмір файлу не має перевищувати 500kB", (value) => {
      if (!value || !(value instanceof File)) return true;
      return value.size <= MAX_AVATAR_SIZE;
    })
    .test("fileType", "Дозволені формати: JPG, PNG, WEBP", (value) => {
      if (!value || !(value instanceof File)) return true;
      return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
    }),
});
