'use client';

import { useAuthStore } from '@/lib/store/authStore';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as Yup from 'yup';
import { login } from '../../../lib/api/clientApi';
import LoginWithGoogle from '@/components/LoginWithGoogle/LoginWithGoogle';
import AuthTabs from '../AuthTabs/AuthTabs';
import css from './LoginForm.module.css';

interface LoginValues {
  email: string;
  password: string;
}

const loginSchema = Yup.object({
  email: Yup.string()
    .email('Невірний email')
    .max(64, 'Максимум 64 символів')
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required("Обов'язкове поле"),
});

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    values: LoginValues,
    {
      setSubmitting,
      setFieldError,
    }: {
      setSubmitting: (s: boolean) => void;
      setFieldError: (field: string, message: string) => void;
    }
  ) => {
    try {
      const { data } = await login(values);
      setUser(data.user);

      toast.success('Вхід виконано успішно!');
      router.push('/');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;

        if (message === 'User not found') {
          toast.error('Користувача з такою поштою не існує.');
          setFieldError('email', 'Перевірте пошту');
          return;
        }

        if (message === 'Unauthorized') {
          toast.error('Невірний пароль. спробуйте ще раз');
          setFieldError('password', 'Перевірте пароль.');
          return;
        }
        toast.error('Вхід не виконано. Спробуйте ще раз.');
        return;
      }

      toast.error('Сталася невідома помилка.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.authForm}>
      <Formik<LoginValues>
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isSubmitting, isValid, handleChange, errors, touched }) => (
          <Form noValidate className={css.form}>
            <AuthTabs />
            <h1 className={css.title}>Вхід</h1>
            <p className={css.text}>Вітаємо знову у спільноту мандрівників!</p>

            {/* EMAIL FIELD */}
            <div className={css.field}>
              <label htmlFor="email" className={css.label}>
                Пошта*
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="hello@podorozhnyky.ua"
                className={`${css.input} ${
                  errors.email && touched.email ? css.input_error : ''
                }`}
                onChange={handleChange}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>

            {/* PASSWORD FIELD */}
            <div className={`${css.field} ${css.passwordField}`}>
              <label htmlFor="password" className={css.label}>
                Пароль*
              </label>

              <div className={css.passwordWrapper}>
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="********"
                  className={`${css.input} ${
                    errors.password && touched.password ? css.input_error : ''
                  }`}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className={`${css.togglePassword} ${
                    errors.password && touched.password ? css.icon_error : ''
                  }`}
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

                <Link href="/auth/send-reset-email" className={css.forgotLink}>
                  Забули пароль?
                </Link>
              </div>

              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={css.submitBtn}
            >
              {isSubmitting ? 'Вхід...' : 'Увійти'}
            </button>

            <LoginWithGoogle />
          </Form>
        )}
      </Formik>
    </div>
  );
}