import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUser } from "@/types/user";

// Тимчасові типи для заглушки
interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  updateFavorites: (favorites: IUser["favorites"]) => void;
  setUser: (user: IUser, token?: string) => void;
  clearIsAuthenticated: () => void;
}

// Створюємо стор авторизації з persist
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      updateFavorites: (favorites) =>
        set((state) => ({
          user: state.user ? { ...state.user, favorites } : null,
        })),
      setUser: (user, token) => {
        if (token) {
          localStorage.setItem("auth-token", token);
        }
        set({ user, isAuthenticated: true });
      },
      clearIsAuthenticated: () => {
        localStorage.removeItem("auth-token");
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
