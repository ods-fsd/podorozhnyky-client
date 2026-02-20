// types/pagination.ts
// Базовий інтерфейс для пагінації (використовується всюди, де є розбиття на сторінки)
export interface IPagination {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}