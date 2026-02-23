import { IPagination } from "./pagination";
import { IStory } from "./story";
export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  description: string;
  favorites: IStory[];
  articlesAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IUserWithOwnFavorites extends IUser {
  favorites: IStory[];
}

export interface IUserWithOwnStories extends IUser {
  stories: IStory[];
}

export interface IOwnStoriesResponse {
  status: number;
  message: string;
  data: {
    user: IUserWithOwnStories;
    pagination: IPagination;
  };
}

export interface IOwnFavoritesResponse {
  status: number;
  message: string;
  data: {
    user: IUserWithOwnFavorites;
    pagination: IPagination;
  };
}

export interface IFavoritesResponse {
  favorites: IStory[];
}

export interface IApiResponse {
  data: { user: IUser };
}

export type PaginatedUsersResponse = {
  status: number;
  message: string;
  data: {
    data: IUser[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export interface UpdateUser {
  description?: string;
  userPhoto?: string;
}

export type GetUserByIdResponse = {
  status: number;
  message: string;
  data: {
    user: IUser | null;
    articles: IStory[];
  };
} & IPagination;
