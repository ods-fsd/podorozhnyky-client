"use client";

import { useEffect } from "react";
import { checkSession, fetchCurrentUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();

        if (isAuthenticated) {
          const { data } = await fetchCurrentUser();
          if (data) setUser(data.user);
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        console.error("Помилка синхронізації сесії:", error);

        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
}
