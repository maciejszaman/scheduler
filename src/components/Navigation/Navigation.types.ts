import { User } from "firebase/auth";
import { ViewModes } from "../../shared/enums/enum";

export interface NavigationProps {
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setViewMode: React.Dispatch<React.SetStateAction<ViewModes>>;
  viewMode: ViewModes;
  userData: User | null;
  darkMode: boolean;
}
