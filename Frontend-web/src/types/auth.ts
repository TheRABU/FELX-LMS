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
  loginUser: (formData: FormData) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
}
