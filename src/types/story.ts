// types/story.ts
// Головний інтерфейс історії: описує, які поля прийдуть з нашого бекенду
export interface IStory {
  _id: string; // Унікальний ідентифікатор з MongoDB
  img: string; // URL картинки (з Cloudinary)
  title: string; // Заголовок
  article: string; // Основний текст історії
  category: {
    _id: string;
    name: string;
  };
  shortDescription: string; // Короткий опис для карток
  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  date: string; // Дата подорожі
  favoriteCount: number; // Кількість збережень (лайків)
  createdAt: string; // Технічні дати створення
  updatedAt: string;
}

// Тип для відповіді, коли запитуємо лише одну історію за ID
export interface IStoryByIdResponse {
  status: number;
  message: string;
  data: IStory;
}

// Тип для відповіді з пагінацією (твій GET /stories)
export type PaginatedStoriesResponse = {
  page: number; // Поточна сторінка
  perPage: number; // Кількість на сторінці
  totalPages: number; // Всього сторінок
  totalItems: number; // Всього історій в базі
  hasNextPage: boolean; // Чи є наступна сторінка
  hasPreviousPage: boolean; // Чи є попередня
  data: IStory[]; // Масив самих історій
};

// ... інші інтерфейси (CreateStory, UpdateStory)
export interface CreateStoryResponse {
  status: number;
  message: string;
  data: IStory;
}

export interface UpdateStoryResponse {
  status: number;
  message: string;
  data: IStory;
}

export interface CreateStory {
  storyImage: File | null;
  title: string;
  article: string;
  category: string;
  shortDescription: string;
}

export interface UpdateStory {
  storyImage?: File | null;
  title?: string;
  article?: string;
  category?: string;
  shortDescription: string;
}