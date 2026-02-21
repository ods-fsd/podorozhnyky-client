import * as Yup from 'yup';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const storySchema = Yup.object({
  title: Yup.string()
    .max(80, 'Максимум 80 символів')
    .required("Обов'язкове поле"),
  description: Yup.string()
    .max(2500, 'Максимум 2500 символів')
    .required("Обов'язкове поле"),
  category: Yup.string().required("Оберіть категорію"),
  storyImage: Yup.mixed()
    .required("Зображення обов'язкове")
    .test('fileSize', 'Розмір файлу не має перевищувати 2MB', (value) => {
      if (!value) return true;
      return (value as File).size <= MAX_FILE_SIZE;
    }),
});