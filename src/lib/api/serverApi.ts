import { AuthResponseLogout } from '@/types/auth';
import { ICategory } from '@/types/category';
import {
  CreateStory,
  CreateStoryResponse,
  IStory,
  IStoryByIdResponse,
  PaginatedStoriesResponse,
  UpdateStory,
  UpdateStoryResponse,
} from '@/types/story';
import {
  IApiResponse,
  IUser,
  PaginatedUsersResponse,
  UpdateUser,
} from '@/types/user';
import { cookies } from 'next/headers'; // Next.js утиліта для доступу до cookies на сервері
import { nextServer } from './api';

// === AUTH ===
export const logout = async (): Promise<AuthResponseLogout> => {
  const { data } = await nextServer.post<AuthResponseLogout>('/auth/logout');
  return data;
};

// Перевірка сесії (чи залогінений користувач), передаючи cookies
export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.post(
    '/auth/session',
    {},
    {
      headers: {
        Cookie: cookieStore.toString(), // Прикріплюємо куки для авторизації
      },
      validateStatus: () => true, // Не "кидати" помилку, якщо статус не 2xx
    }
  );

  return res;
};

// /me
export const fetchCurrentUser = async (): Promise<IApiResponse> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<IApiResponse>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

// ==========================================
// === STORIES (Твоя зона) ===
// ==========================================

// Отримання всіх історій для серверного рендерингу (в page.tsx)
export const fetchServerStories = async (
  perPage: number,
  page: number,
  category: ICategory | null
): Promise<PaginatedStoriesResponse> => {
  const { data } = await nextServer.get('/stories', {
    params: {
      perPage,
      page,
      // Якщо категорія обрана - передаємо її назву, інакше undefined
      category: category?.name, 
    },
  });

  return data.data;
};

export const fetchStoryById = async (storyId: string): Promise<IStory> => {
  const { data } = await nextServer.get<IStoryByIdResponse>(
    `/stories/${storyId}`
  );
  return data.data;
};

export const createStory = async (
  storyData: CreateStory
): Promise<CreateStoryResponse> => {
  const { data } = await nextServer.post<CreateStoryResponse>(
    '/stories',
    storyData
  );
  return data;
};

export const updateStory = async (
  storyId: string,
  storyData: UpdateStory
): Promise<UpdateStoryResponse> => {
  const { data } = await nextServer.put<UpdateStoryResponse>(
    `/stories/${storyId}`,
    storyData
  );
  return data;
};

// === USERS (AUTHORS) ===
export const fetchAuthors = async (
  page: number,
  perPage: number
): Promise<PaginatedUsersResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });
  const { data } = await nextServer.get<PaginatedUsersResponse>('/users', {
    params,
  });
  return data;
};

export const fetchAuthorById = async (userId: string): Promise<IUser> => {
  const { data } = await nextServer.get<IUser>(`/users/${userId}`);
  return data;
};

export const updateProfile = async (
  profileData: UpdateUser
): Promise<IUser> => {
  const { data } = await nextServer.put<IUser>('/users/me', profileData);
  return data;
};

export const addFavorite = async (storyId: string): Promise<IUser> => {
  const { data } = await nextServer.post<IUser>(`/me/favorites/${storyId}`);
  return data;
};

export const removeFavorite = async (storyId: string): Promise<IUser> => {
  const { data } = await nextServer.delete<IUser>(`/me/favorites/${storyId}`);
  return data;
};

// === CATEGORIES ===
export const fetchServerCategories = async (): Promise<ICategory[]> => {
  const { data } = await nextServer.get('/categories');
  return data.data;
};