'use client';

import { useFormik } from 'formik';
import { loginSchema } from '@/schemas/authSchemas';
import { useRouter } from 'next/navigation';
// Тут підключи свій toast з бібліотеки (напр., react-hot-toast)
// import toast from 'react-hot-toast';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        // Тут буде твій POST запит до /app/api/auth/login через проксі
        console.log('Дані на відправку:', values);
        
        // Симуляція успішного запиту
        // toast.success('Успішний вхід!');
        router.push('/');
      } catch (error) {
        // toast.error('Помилка входу. Перевірте дані.');
        console.error('Помилка логінізації', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Вхід</h2>
      
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={`${styles.input} ${formik.touched.email && formik.errors.email ? styles.inputError : ''}`}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.errorText}>{formik.errors.email}</div>
        ) : null}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={`${styles.input} ${formik.touched.password && formik.errors.password ? styles.inputError : ''}`}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.errorText}>{formik.errors.password}</div>
        ) : null}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={!formik.isValid || !formik.dirty}>
        Увійти
      </button>
    </form>
  );
};