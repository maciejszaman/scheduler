import { User } from "firebase/auth";

export interface LoginProps {
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
}
