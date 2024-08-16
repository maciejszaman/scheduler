import { User } from "firebase/auth";
import { ViewModes } from "../../shared/enums/enum";

export interface NavigationProps {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setViewMode: React.Dispatch<React.SetStateAction<ViewModes>>;
  viewMode: ViewModes;
  userData: User | null;
  darkMode: boolean;
}
