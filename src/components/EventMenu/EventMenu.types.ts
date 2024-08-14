import { User } from "firebase/auth";

export interface EventMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userData: User | null;
}
