export type User = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  loginUser: (formData: FormData) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
