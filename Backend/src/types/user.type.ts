export interface Iuser {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: "user" | "admin";
}
