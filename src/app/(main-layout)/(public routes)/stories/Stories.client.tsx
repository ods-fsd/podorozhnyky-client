'use client';

import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { fetchCategories, fetchStories } from '@/lib/api/clientApi';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import css from './Stories.module.css';
import SelectInput from '@/components/SelectInput/SelectInput';

interface OptionType {
  value: string | null;
  label: string;
  _id: string | null;
}

const StoriesClient = () => {
  // 1. Отримуємо категорії для фільтра
  const { data: optionsRaw } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  // 2. Формуємо масив опцій для селекта (додаємо "Всі історії" на початок)
  const options: OptionType[] = [
    { value: null, label: 'Всі історії', _id: null },
    ...(optionsRaw?.map(option => ({
      value: option.name,
      label: option.name,
      _id: option._id,
      name: option.name,
    })) ?? []),
  ];

  // Стейт для обраної категорії
  const [category, setCategory] = useState<OptionType | null>(options[0]);

  // 3. Логіка адаптиву: визначаємо ширину екрана, щоб знати, скільки карток вантажити
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = width !== null && width >= 768 && width < 1440;
  const isMobile = width !== null && width < 768;

  // На планшеті вантажимо по 8 карток, на інших екранах - по 9
  const perPage = isTablet ? 8 : 9;

  // 4. Запит самих історій (з використанням "нескінченного" завантаження для кнопки "Показати ще")
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['stories', category?._id ?? 'all', perPage],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchStories(perPage, pageParam, category?.value);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData, // Залишає старі дані на екрані, поки вантажаться нові
    refetchOnMount: false,
  });

  // Зливаємо масиви історій з усіх завантажених сторінок в один великий масив
  const stories = data?.pages.flatMap(page => page.data) ?? [];

  const handleClick = (option: OptionType | null) => {
    setCategory(option);
  };

  return (
    <section className={css.container}>
      <h1 className={css.title}>Історії Мандрівників</h1>
      
      {/* 5. Відображення фільтра (Select для мобілок, кнопки для десктопу) */}
      {isMobile ? (
        <div className={css.mobileCategories}>
          <p className={css.categoryTitle}>Категорії</p>
          <SelectInput
            options={options}
            onChange={setCategory}
            value={category ?? options[0]}
          />
        </div>
      ) : (
        <div className={css.categories}>
          <ul className={css.categoriesList}>
            {options.map(option => (
              <li key={option._id} className={css.categoriesItem}>
                <button
                  className={`${css.categoriesButton} ${
                    category?._id === option._id ? css.categoriesSelected : ''
                  }`}
                  onClick={() => handleClick(option)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 6. Відображення компонента з сіткою карток */}
      {stories && (
        <TravellersStories
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          stories={stories}
          onLoadMore={fetchNextPage} // Передаємо функцію для завантаження наступної сторінки
        />
      )}
      {error && <p>Щось пішло не так</p>}
      {isLoading && <p>Завантаження</p>}
    </section>
  );
};

export default StoriesClient;