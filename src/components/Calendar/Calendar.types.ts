import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { ViewModes } from "../../shared/enums/enum";
import { User } from "firebase/auth";

export interface CalendarProps {
  language: string;
  viewMode: ViewModes;
  userData: User | null;
}
