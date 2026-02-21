import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Невірний формат email')
    .max(64, 'Максимум 64 символи')
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required("Обов'язкове поле"),
});

export const registerSchema = loginSchema.shape({
  name: Yup.string()
    .max(32, 'Максимум 32 символи')
    .required("Обов'язкове поле"),
});