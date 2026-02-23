import {
  AuthResetPwdCredentials,
  AuthResponseLogin,
  AuthResponseLogout,
  AuthResponseRegister,
  LoginCredentials,
  RegisterCredentials,
  SendResetEmailCredentials,
} from '@/types/auth';
import { ICategory } from '@/types/category';
import {
  CreateStoryResponse,
  IStory,
  PaginatedStoriesResponse,
  UpdateStoryResponse,
} from '@/types/story';
import {
  IApiResponse,
  IFavoritesResponse,
  IOwnFavoritesResponse,
  IOwnStoriesResponse,
  IUser,
  PaginatedUsersResponse,
} from '@/types/user';
import { nextServer } from './api';

export const login = async (credentials: LoginCredentials) => {
  const { data } = await nextServer.post<AuthResponseLogin>(
    '/auth/login',
    credentials
  );
  return data;
};

export const register = async (credentials: RegisterCredentials) => {
  const { data } = await nextServer.post<AuthResponseRegister>(
    '/auth/register',
    credentials
  );
  return data;
};

export const sendResetEmail = async (
  credentials: SendResetEmailCredentials
): Promise<void> => {
  await nextServer.post('/auth/send-reset-email', credentials);
};

export const resetPwd = async (
  credentials: AuthResetPwdCredentials
): Promise<void> => {
  await nextServer.post('/auth/reset-pwd', credentials);
};

export const logout = async (): Promise<AuthResponseLogout> => {
  const { data } = await nextServer.post<AuthResponseLogout>('/auth/logout');
  return data;
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const { status } = await nextServer.get('/auth/current');
    return status === 200;
  } catch {
    return false;
  }
};

export const getGoogleAuthUrl = async () => {
  const res = await nextServer.get('/auth/google-url');
  return res.data?.data ?? { url: '' };
};

export const loginWithGoogle = (body: { code: string }) =>
  nextServer.post('/auth/login/google', body);

export async function updateEmail(newEmail: string) {
  const res = await nextServer.post('/auth/send-change-email', { newEmail });
  return res.data;
}

export async function confirmEmail(token: string, newEmail: string) {
  const { data } = await nextServer.post('/auth/confirm-email', {
    token,
    newEmail,
  });
  return data.data;
}

export const fetchCurrentUser = async (): Promise<IApiResponse> => {
  const { data } = await nextServer.get<IApiResponse>('/users/current');
  return data;
};

export const fetchStories = async (
  perPage: number,
  page: number,
  category: string | null | undefined
): Promise<PaginatedStoriesResponse> => {
  const { data } = await nextServer.get('/stories', {
    params: {
      perPage,
      page,
      category,
    },
  });
  return data.data;
};

export const fetchStoryById = async (storyId: string): Promise<IStory> => {
  const { data } = await nextServer.get(`/stories/${storyId}`);
  return data.data;
};

export const createStory = async (
  storyData: FormData
): Promise<CreateStoryResponse> => {
  const { data } = await nextServer.post<CreateStoryResponse>(
    '/stories',
    storyData
  );
  return data;
};

export const updateStory = async (
  storyId: string,
  storyData: FormData
): Promise<UpdateStoryResponse> => {
  const { data } = await nextServer.patch<UpdateStoryResponse>(
    `/stories/${storyId}`,
    storyData
  );
  return data;
};

export const deleteStory = async (storyId: string) => {
  const res = await nextServer.delete(`/stories/${storyId}`);
  return res.data;
};

export const fetchAuthors = async (
  page = 1,
  perPage = 12
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

export const fetchAuthorById = async (
  userId: string
): Promise<IApiResponse> => {
  const { data } = await nextServer.get(`/users/${userId}`);
  return data;
};

export const updateProfile = async (formData: FormData): Promise<IUser> => {
  const { data } = await nextServer.patch('/users/current', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data.data;
};

export const addFavorite = async (
  storyId: string
): Promise<IFavoritesResponse> => {
  const { data } = await nextServer.post<IFavoritesResponse>(
    `/users/current/favorites`,
    { storyId }
  );
  return data;
};

export const removeFavorite = async (
  storyId: string
): Promise<IFavoritesResponse> => {
  const { data } = await nextServer.delete<IFavoritesResponse>(
    `/users/current/favorites/${storyId}`
  );
  return data;
};

export const fetchCategories = async (): Promise<ICategory[]> => {
  const { data } = await nextServer.get('/categories');
  return data.data;
};

export const fetchUserWithOwnFavorites = async (
  perPage: string,
  page: string
): Promise<IOwnFavoritesResponse> => {
  const { data } = await nextServer.get('/users/current', {
    params: { perPage, page },
  });

  return data;
};

export const fetchUserWithOwnStories = async (
  perPage: string,
  page: string
): Promise<IOwnStoriesResponse> => {
  const { data } = await nextServer.get('/users/current/stories', {
    params: { perPage, page },
  });

  return data;
};