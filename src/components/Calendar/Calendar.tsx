import {
  Appointments,
  DayView,
  MonthView,
  Scheduler,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Paper } from "@mui/material";
import { ViewState } from "@devexpress/dx-react-scheduler";
import * as Types from "./Calendar.types";
import React, { useContext, useEffect, useState } from "react";
import { ViewModes } from "../../shared/enums/enum";
import dayjs from "dayjs";
import { collection, doc, getDocs } from "firebase/firestore";
import { FirebaseContext } from "../../providers/FireBaseProvider";
import * as SharedTypes from "../../shared/types/Shared.types";

export const Calendar = ({
  language,
  viewMode,
  userData,
}: Types.CalendarProps) => {
  const { auth, app, db } = useContext(FirebaseContext);
  const [schedulerData, setSchedulerData] = useState<SharedTypes.Event[]>([]);

  const getEvents = async () => {
    if (userData) {
      try {
        const userEventsRef = collection(db, "users", userData.uid, "events");
        const data = await getDocs(userEventsRef);
        const refinedData = data.docs.map((doc) => {
          const eventData = doc.data();
          return {
            id: doc.id,
            title: eventData.title,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
          };
        });
        setSchedulerData(refinedData);
        return refinedData;
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (userData) {
      getEvents();
    }
  }, []);

  return (
    <Paper>
      <Scheduler locale={language} data={schedulerData}>
        <ViewState currentDate={dayjs().toDate()} />
        {viewMode === ViewModes.DailyView && (
          <DayView startDayHour={8} endDayHour={16} />
        )}
        {viewMode === ViewModes.WeeklyView && <WeekView />}
        {viewMode === ViewModes.MonthlyView && <MonthView />}
        <Appointments />
      </Scheduler>
    </Paper>
  );
};
