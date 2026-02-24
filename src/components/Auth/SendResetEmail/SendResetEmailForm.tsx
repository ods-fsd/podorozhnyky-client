'use client';

import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { sendResetEmail } from '@/lib/api/clientApi';
import { openMailClient } from '@/utils/openMailClient';
import css from './SendResetEmailForm.module.css';

const SendResetEmailSchema = Yup.object({
  email: Yup.string()
    .email('Невірний email')
    .max(64, 'Максимум 64 символи')
    .required("Обов'язкове поле"),
});

export default function SendResetEmailForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (values: { email: string }) => {
    try {
      setMessage(null);
      await sendResetEmail(values);
      setEmail(values.email);
      setMessage('Лист надіслано');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 400) {
          toast.error('Некоректна пошта.');
          setMessage('Некоректна пошта.');
          return;
        }
        if (status === 404) {
          toast.error('Користувача з даною поштою не існує.');
          setMessage('Користувача з даною поштою не існує.');
          return;
        }
        if (status === 500) {
          toast.error('Помилка сервера. Спробуйте пізніше.');
          setMessage('Помилка сервера. Спробуйте пізніше.');
          return;
        }
      }
      toast.error('Невідома помилка. Спробуйте ще раз.');
      setMessage('Невідома помилка. Спробуйте ще раз.');
    }
  };

  useEffect(() => {
    if (message === 'Лист надіслано') {
      const timer = setTimeout(() => {
        router.push('/auth/login');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [message, router]);

  if (message === 'Лист надіслано') {
    return (
      <div className={css.authForm}>
        <h1 className={css.title}>Лист надіслано</h1>
        <p className={css.text}>Перенаправлення на вхід через 10 секунд.</p>
        {email && (
          <button
            type="button"
            onClick={() => openMailClient(email!)}
            className={css.submitBtn}
          >
            Відкрити пошту {email.split('@')[1]}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={css.authForm}>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={SendResetEmailSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={css.form}>
            <h1 className={css.title}>Скидання паролю</h1>
            <p className={css.text}>
              Введіть вашу пошту, щоб отримати посилання для зміни паролю.
            </p>

            <div className={css.field}>
              <label htmlFor="email" className={css.label}>
                Пошта*
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="hello@podorozhnyky.ua"
                className={css.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={css.submitBtn}
            >
              {isSubmitting ? 'Надсилаємо...' : 'Надіслати'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}