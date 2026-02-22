'use client';

import TravellersStories from '@/components/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import SelectInput from '@/components/SelectInput/SelectInput';
import { fetchCategories, fetchStories } from '@/lib/api/clientApi';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import css from './Stories.module.css';

interface OptionType {
  value: string | null;
  label: string;
  _id: string | null;
}

const StoriesClient = () => {
  const { data: optionsRaw } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const options: OptionType[] = [
    { value: null, label: 'Всі історії', _id: null },
    ...(optionsRaw?.map(option => ({
      value: option.name,
      label: option.name,
      _id: option._id,
      name: option.name,
    })) ?? []),
  ];

  const [category, setCategory] = useState<OptionType | null>(options[0]);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = width !== null && width >= 768 && width < 1440;
  const isMobile = width !== null && width < 768;

  const perPage = isTablet ? 8 : 9;

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
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const stories = data?.pages.flatMap(page => page.data) ?? [];

  const handleClick = (option: OptionType | null) => {
    setCategory(option);
  };

  return (
    <section className={css.container}>
      <h1 className={css.title}>Історії Мандрівників</h1>
      
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

      {isLoading && <p>Завантаження...</p>}
      {error && <p>Щось пішло не так</p>}

      {!isLoading && !error && stories.length > 0 && (
        <TravellersStories
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          stories={stories}
          onLoadMore={fetchNextPage}
        />
      )}

      {!isLoading && !error && stories.length === 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <MessageNoStories 
            text="За обраною категорією історій поки не знайдено" 
            buttonText="Скинути фільтр"
            onClick={() => setCategory(options[0])}
          />
        </div>
      )}
    </section>
  );
};

export default StoriesClient;