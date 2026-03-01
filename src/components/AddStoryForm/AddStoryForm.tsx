'use client';

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useId, useRef, useState } from 'react';
import * as Yup from 'yup';
import {
  createStory,
  fetchCategories,
  updateStory,
} from '../../lib/api/clientApi';
import { ICategory } from '../../types/category';
import type { CreateStory, IStory } from '../../types/story';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Loader from '../Loader/Loader';
import css from './AddStoryForm.module.css';

const formValues: CreateStory = {
  storyImage: null,
  title: '',
  category: '',
  shortDescription: '',
  article: '',
};

const AddStoryForm = ({
  storyId,
  story,
}: {
  storyId?: string;
  story?: IStory;
}) => {
  const fieldId = useId();

  // Create validation schema based on whether we're editing or creating
  const validationSchema = Yup.object<CreateStory>({
    storyImage: storyId
      ? Yup.mixed<File>()
          .nullable()
          .test(
            'fileSize',
            'Розмір файлу не повинен перевищувати 2 МБ.',
            value => {
              return value ? value.size <= 2 * 1024 * 1024 : true;
            }
          )
          .test(
            'fileType',
            'Невірний формат файлу',
            value =>
              !value ||
              ['image/webp', 'image/jpeg', 'image/png', 'image/gif'].includes(
                value.type
              )
          )
      : Yup.mixed<File>()
          .nullable()
          .required("Зображення є обов'язковим")
          .test(
            'fileSize',
            'Розмір файлу не повинен перевищувати 2 МБ.',
            value => {
              return value ? value.size <= 2 * 1024 * 1024 : true;
            }
          )
          .test(
            'fileType',
            'Невірний формат файлу',
            value =>
              !value ||
              ['image/webp', 'image/jpeg', 'image/png', 'image/gif'].includes(
                value.type
              )
          ),
    title: Yup.string()
      .required("Заголовок є обов'язковим")
      .max(80, 'Максимальна довжина заголовка - 80 символів'),
    category: Yup.string().required("Категорія є обов'язковою"),
    shortDescription: Yup.string().max(
      150,
      'Максимальна довжина опису - 150 символ'
    ),
    article: Yup.string()
      .required("Текст історії є обов'язковим")
      .max(2500, 'Текст повинен бути не більше 2500 символів'),
  });

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [preview, setPreview] = useState<string>(story?.img ? story.img : '');
  const [placeholderImage, setPlaceholderImage] = useState<string>(
    '/images/createStory/placeholder-image-mb.png'
  );
  const previewUrlRef = useRef<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues] = useState<CreateStory>(
    story
      ? {
          storyImage: null,
          title: story.title,
          category:
            typeof story.category === 'string'
              ? story.category
              : story.category._id,
          shortDescription: story.shortDescription,
          article: story.article,
        }
      : formValues
  );

  useEffect(() => {
    if (story?.img) {
      setPreview(story.img);
    }
  }, [story?.img]);

  const selectRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updatePlaceholder = () => {
      const width = window.innerWidth;
      if (width >= 1440) {
        setPlaceholderImage('/images/createStory/placeholder-image-dt.png');
      } else if (width >= 768) {
        setPlaceholderImage('/images/createStory/placeholder-image-tb.png');
      } else {
        setPlaceholderImage('/images/createStory/placeholder-image-mb.png');
      }
    };

    updatePlaceholder();
    window.addEventListener('resize', updatePlaceholder);

    return () => {
      window.removeEventListener('resize', updatePlaceholder);
    };
  }, []);

  const handleSelectToggle = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleSelectClose = () => {
    setIsSelectOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };

    if (isSelectOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSelectOpen]);

  const handleSubmit = async (
    values: CreateStory,
    { resetForm }: FormikHelpers<CreateStory>
  ) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      if (values.storyImage) {
        formData.append('storyImage', values.storyImage as File);
      }
      formData.append('title', values.title);
      formData.append('category', values.category);
      if (values.shortDescription)
        formData.append('shortDescription', values.shortDescription ?? '');
      formData.append('article', values.article);

      const response = storyId
        ? await updateStory(storyId, formData)
        : await createStory(formData);

      if (response.status === 200 || response.status === 201) {
        const responseStoryId = response.data?._id;

        if (responseStoryId) {
          router.push(`/stories/${responseStoryId}`);
        }
        resetForm();

        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
          previewUrlRef.current = null;
        }
        setPreview(placeholderImage);
      }
    } catch (error) {
      console.error('Помилка при збереженні історії:', error);
      setIsOpenConfirmModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response);
      } catch (error) {
        console.error('Помилка при завантаженні категорій:', error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (!story?.img) {
      setPreview(placeholderImage);
    }
  }, [story?.img, placeholderImage]);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {isOpenConfirmModal && (
        <ConfirmModal
          onConfirm={() => {
            setIsOpenConfirmModal(false);
            router.push('/auth/register');
          }}
          onCancel={() => {
            setIsOpenConfirmModal(false);
            router.push('/auth/login');
          }}
          title="Помилка під час збереження"
          text="Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису — зареєструйтесь"
          confirmButtonText="Зареєструватись"
          cancelButtonText="Увійти"
        />
      )}

      {isLoading && <Loader />}

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={validationSchema}
        validateOnMount={true}
      >
        {({ isValid, setFieldValue, isSubmitting, dirty }) => (
          <Form noValidate className={css.form}>
            <div className={css.leftColumn}>
              <div className={css.imageSection}>
                <label className={css.label}>Oбкладинка статті</label>
                <div
                  className={css.imageWrapper}
                  onClick={() => fileInputRef.current?.click()}
                  style={{ cursor: 'pointer' }}
                >
                  <Image
                    src={preview || story?.img || placeholderImage}
                    alt="Прев'ю"
                    className={css.coverPreview}
                    width={865}
                    height={635}
                    unoptimized
                    sizes="(max-width: 767px) 335px, (min-width: 768px) and (max-width: 1439px) 704px, (min-width: 1440px) 865px"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>

                <button
                  type="button"
                  className={css.uploadBtn}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Завантажити фото
                </button>

                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={e => {
                    const fileList = e.currentTarget.files?.[0] ?? null;
                    if (fileList) {
                      setFieldValue('storyImage', fileList, true);
                      if (previewUrlRef.current) {
                        URL.revokeObjectURL(previewUrlRef.current);
                      }
                      const objectUrl = URL.createObjectURL(fileList);
                      previewUrlRef.current = objectUrl;
                      setPreview(objectUrl);
                    }
                  }}
                />
              </div>

              <div className={css.fieldGroup}>
                <label htmlFor={`${fieldId}-title`} className={css.label}>
                  Заголовок
                </label>
                <Field
                  type="text"
                  name="title"
                  id={`${fieldId}-title`}
                  className={css.title}
                  placeholder="Введіть заголовок історії"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.fieldGroup}>
                <label htmlFor={`${fieldId}-category`} className={css.label}>
                  Категорія
                </label>
                <div
                  className={`${css.customSelectWrapper} ${isSelectOpen ? css.open : ''}`}
                  ref={selectRef}
                >
                  <div
                    className={css.customSelectTrigger}
                    onClick={handleSelectToggle}
                  >
                    <Field id={`${fieldId}-category`} name="category">
                      {({ field }: { field: { value: string } }) => {
                        const selectedCategory = categories.find(
                          cat => cat._id === field.value
                        );
                        return (
                          <span className={css.selectedValue}>
                            {selectedCategory?.name || 'Категорія'}
                          </span>
                        );
                      }}
                    </Field>
                    <svg className={css.selectArrow} width="24" height="24">
                      <use
                        href={`/sprite.svg#icon-keyboard_arrow_${isSelectOpen ? 'up' : 'down'}`}
                      />
                    </svg>
                  </div>

                  {isSelectOpen && (
                    <div className={css.customSelectDropdown}>
                      <Field name="category">
                        {({
                          field,
                          form,
                        }: {
                          field: { value: string };
                          form: {
                            setFieldValue: (
                              field: string,
                              value: string
                            ) => void;
                          };
                        }) => (
                          <>
                            <div
                              className={`${css.selectOption} ${
                                field.value === '' ? css.selected : ''
                              }`}
                              onClick={() => {
                                form.setFieldValue('category', '');
                                handleSelectClose();
                              }}
                            >
                              Категорія
                            </div>
                            {categories.length > 0 ? (
                              categories.map(category => (
                                <div
                                  key={category._id}
                                  className={`${css.selectOption} ${
                                    field.value === category._id
                                      ? css.selected
                                      : ''
                                  }`}
                                  onClick={() => {
                                    form.setFieldValue(
                                      'category',
                                      category._id
                                    );
                                    handleSelectClose();
                                  }}
                                >
                                  {category.name}
                                </div>
                              ))
                            ) : (
                              <div
                                className={css.selectOption}
                                style={{ cursor: 'not-allowed' }}
                              >
                                Завантаження категорій...
                              </div>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                  )}
                </div>
                <ErrorMessage
                  name="category"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.fieldGroup}>
                <label htmlFor={`${fieldId}-description`} className={css.label}>
                  Текст історії
                </label>
                <Field
                  as="textarea"
                  name="article"
                  id={`${fieldId}-article`}
                  className={css.description}
                  placeholder="Ваша історія тут"
                />
                <ErrorMessage
                  name="article"
                  component="div"
                  className={css.error}
                />
              </div>
            </div>

            <div className={css.rightColumn}>
              <button
                type="submit"
                className={css.submitBtn}
                disabled={
                  !isValid || isSubmitting || (storyId ? !dirty : false)
                }
              >
                {isSubmitting ? 'Зберігається...' : 'Зберегти'}
              </button>
              <button
                onClick={() => router.back()}
                type="button"
                className={css.cancelBtn}
              >
                Відмінити
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddStoryForm;
