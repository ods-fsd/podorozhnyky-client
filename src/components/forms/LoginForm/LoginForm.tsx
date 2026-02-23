'use client';

import { useFormik } from 'formik';
import { loginSchema } from '@/schemas/authSchemas';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import styles from './LoginForm.module.css';
import { api } from '@/lib/api/api';

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
        await api.post('/auth/login', values);     
        toast.success('Успішний вхід!');
        router.push('/');
      } catch {
        toast.error('Помилка входу. Перевірте дані.');
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
          placeholder='hello@podorozhnyky.ua'
          autoComplete="email"
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
          placeholder='********'
          autoComplete="current-password"
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