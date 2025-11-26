import { api } from "@/lib/axios";
import type { User, UserState } from "@/types/auth.ts";
import { persist, devtools } from "zustand/middleware";
import { isAxiosError } from "axios";
import { create } from "zustand";
import { socket } from "@/services/socket";

export const useUser = create<UserState>()(
  persist(
    devtools((set) => ({
      user: null,
      isLoading: false,
      error: null,
      checkAuth: async (): Promise<void> => {
        set({ isLoading: true });
        try {
          const { data } = await api.get<{ user: User }>("/auth/user/me");
          set({ user: data.user, isLoading: false });
        } catch (error) {
          console.error("Logout failed", error);
          set({ user: null, isLoading: false });
        }
      },

      loginUser: async (formData): Promise<boolean> => {
        set({ isLoading: true, error: null });
        const payload = Object.fromEntries(formData);
        try {
          const { data } = await api.post<{ user: User }>(
            "/auth/user/login",
            payload
          );
          set({ user: data.user, isLoading: false });
          return true;
        } catch (error) {
          let errorMessage = "Login failed";
          if (isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
          }
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },

      loginWithGoogle: async (): Promise<void> => {
        window.location.href =
          import.meta.env.VITE_BACKEND_URL + "/auth/user/google";
      },

      logoutUser: async (): Promise<boolean> => {
        try {
          await api.get("/auth/user/logout");
          set({ user: null });
          await socket.disconnect();
          return true;
        } catch (error) {
          console.error("Logout failed", error);
          return false;
        }
      },
    })),
    {
      name: "userdata",
    }
  )
);
