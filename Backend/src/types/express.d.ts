import type { Iuser } from "./user.type";

declare global {
  namespace Express {
    interface User extends Iuser {
      id: string;
    }
  }
}
