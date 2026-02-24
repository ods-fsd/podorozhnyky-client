'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import * as Yup from 'yup';
import { resetPwd } from '@/lib/api/clientApi';
import css from './ResetPasswordForm.module.css';

const resetSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required("Обов'язкове поле"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Паролі не співпадають')
    .required("Обов'язкове поле"),
});

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setStatus(null);
      await resetPwd({
        token: token || '',
        password: values.password,
      });
      setStatus('Пароль успішно змінено.');
    } catch {
      toast.error('Помилка під час зміни пароля. Спробуйте пізніше.');
      setStatus('Помилка під час зміни пароля. Спробуйте пізніше.');
    }
  };

  useEffect(() => {
    if (status === 'Пароль успішно змінено.') {
      const timer = setTimeout(() => router.push('/auth/login'), 2000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  if (status === 'Пароль успішно змінено.') {
    return (
      <div className={css.authForm}>
        <h1 className={css.title}>Готово!</h1>
        <p className={css.text}>
          Ваш пароль успішно змінено. Зараз ви будете перенаправлені на сторінку
          входу.
        </p>
      </div>
    );
  }

  return (
    <div className={css.authForm}>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={resetSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={css.form}>
            <h1 className={css.title}>Новий пароль</h1>
            <p className={css.text}>
              Введіть новий пароль та підтвердіть його.
            </p>

            <div className={css.field}>
              <label htmlFor="password" className={css.label}>
                Новий пароль*
              </label>
              <Field
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                className={css.input}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.field}>
              <label htmlFor="confirmPassword" className={css.label}>
                Підтвердіть пароль*
              </label>
              <div className={css.passwordWrapper}>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  className={css.input}
                />
                <button
                  type="button"
                  className={css.togglePassword}
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  onMouseLeave={() => setShowPassword(false)}
                >
                  <FaEye />
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={css.error}
              />
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={css.submitBtn}
            >
              {isSubmitting ? 'Оновлюємо...' : 'Змінити пароль'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}