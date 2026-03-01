import * as Yup from "yup";

const MAX_AVATAR_SIZE = 500 * 1024; 

export const profileEditSchema = Yup.object({
  name: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(32, "Максимум 32 символи"),
  email: Yup.string()
    .email("Невірний формат email")
    .max(64, "Максимум 64 символи"),
  description: Yup.string().max(150, "Максимум 150 символів"),
  avatar: Yup.mixed().test(
    "fileSize",
    "Розмір файлу не має перевищувати 500kB",
    (value) => {
      if (!value) return true; 
      return (value as File).size <= MAX_AVATAR_SIZE;
    },
  ),
});
