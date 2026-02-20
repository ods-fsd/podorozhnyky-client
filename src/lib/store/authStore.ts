import { create } from 'zustand';

// Тимчасові типи для заглушки
interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  updateFavorites: (favorites: any) => void;
}

// Створюємо фейковий стор авторизації
export const useAuthStore = create<AuthState>((set) => ({
  user: null, // Поки вважаємо, що користувач не залогінений (гість)
  isAuthenticated: false,
  updateFavorites: (favorites) => set((state) => ({ 
      user: state.user ? { ...state.user, favorites } : null 
  })),
}));