import { User } from "@firebase/auth";
export interface AuthContextProps {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}