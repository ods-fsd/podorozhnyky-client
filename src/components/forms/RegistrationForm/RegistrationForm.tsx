'use client';

import { useFormik } from 'formik';
import { registerSchema } from '@/schemas/authSchemas';
import { useRouter } from 'next/navigation';
import styles from '../LoginForm/LoginForm.module.css';
import { api } from '@/lib/api/api';
import toast from 'react-hot-toast';

export const RegistrationForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await api.post('/auth/register', values);
        toast.success('Успішна реєстрація!');
        router.push('/auth/login');
      } catch (error) {
        toast.error('Помилка реєстрації. Перевірте дані.');
        console.error('Помилка реєстрації', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Реєстрація</h2>
      
      {/* Поле Ім'я */}
      <div className={styles.inputGroup}>
        <label htmlFor="name">Ім&apos;я</label>
        <input
          id="name" name="name" type="text"
          placeholder='Ваше імʼя та прізвище'
          autoComplete="name"
          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}
          className={`${styles.input} ${formik.touched.name && formik.errors.name ? styles.inputError : ''}`}
        />
        {formik.touched.name && formik.errors.name && <div className={styles.errorText}>{formik.errors.name}</div>}
      </div>

      {/* Поле Email */}
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email" name="email" type="email"
          placeholder='hello@podorozhnyky.ua'
          autoComplete="email"
          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
          className={`${styles.input} ${formik.touched.email && formik.errors.email ? styles.inputError : ''}`}
        />
        {formik.touched.email && formik.errors.email && <div className={styles.errorText}>{formik.errors.email}</div>}
      </div>

      {/* Поле Пароль */}
      <div className={styles.inputGroup}>
        <label htmlFor="password">Пароль</label>
        <input
          id="password" name="password" type="password"
          placeholder='********'
          autoComplete="new-password"
          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
          className={`${styles.input} ${formik.touched.password && formik.errors.password ? styles.inputError : ''}`}
        />
        {formik.touched.password && formik.errors.password && <div className={styles.errorText}>{formik.errors.password}</div>}
      </div>
      <button type="submit" className={styles.submitBtn} disabled={!formik.isValid || !formik.dirty}>
        Зареєструватись
      </button>
    </form>
  );
};