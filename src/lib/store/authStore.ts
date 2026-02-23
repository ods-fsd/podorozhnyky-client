import { create } from "zustand";
import { IUser } from "@/types/user";

// Тимчасові типи для заглушки
interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  updateFavorites: (favorites: IUser["favorites"]) => void;
  setUser: (user: IUser) => void;
  clearIsAuthenticated: () => void;
}

// Створюємо фейковий стор авторизації
export const useAuthStore = create<AuthState>((set) => ({
  user: null, // Поки вважаємо, що користувач не залогінений (гість)
  isAuthenticated: false,
  updateFavorites: (favorites) =>
    set((state) => ({
      user: state.user ? { ...state.user, favorites } : null,
    })),
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
}));
