import {
  Appointments,
  DayView,
  MonthView,
  Scheduler,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Box, Paper, Typography } from "@mui/material";
import { ViewState } from "@devexpress/dx-react-scheduler";
import * as Types from "./Calendar.types";
import React, { useContext, useEffect, useState } from "react";
import { ViewModes } from "../../shared/enums/enum";
import dayjs from "dayjs";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { FirebaseContext } from "../../providers/FireBaseProvider";
import * as SharedTypes from "../../shared/types/Shared.types";
import { EventMenu } from "../EventMenu/EventMenu";
import { unsubscribe } from "diagnostics_channel";

export const Calendar = ({
  language,
  viewMode,
  userData,
}: Types.CalendarProps) => {
  const { auth, app, db } = useContext(FirebaseContext);
  const [schedulerData, setSchedulerData] = useState<SharedTypes.Event[]>([]);
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [lastEventId, setLastEventId] = useState<string | undefined>(undefined);

  const openEditEventMenu = (eventId: string | undefined) => {
    console.log(eventId);
    setLastEventId(eventId);
    setEditMenuOpen(true);
  };

  useEffect(() => {
    if (!userData) {
      return;
    }
    const eventsRef = collection(db, "users", userData.uid, "events");
    const handleDataChange = (querySnapshot: any) => {
      const newSchedulerData = querySnapshot.docs.map((doc: any) => ({
        id: doc.data().id,
        title: doc.data().title,
        startDate: new Date(doc.data().startDate),
        endDate: new Date(doc.data().endDate),
      }));
      setSchedulerData(newSchedulerData);
    };

    const unsubscribe = onSnapshot(eventsRef, handleDataChange);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Paper>
        <Scheduler locale={language} data={schedulerData}>
          <ViewState currentDate={dayjs().toDate()} />
          {viewMode === ViewModes.DailyView && (
            <DayView startDayHour={8} endDayHour={16} />
          )}
          {viewMode === ViewModes.WeeklyView && <WeekView />}
          {viewMode === ViewModes.MonthlyView && <MonthView />}
          <Appointments
            appointmentComponent={(props) => (
              <Appointments.Appointment
                {...props}
                onClick={() => {
                  openEditEventMenu(props.data.id?.toString());
                }}
              />
            )}
          />
        </Scheduler>
        <EventMenu
          eventId={lastEventId}
          open={editMenuOpen}
          setOpen={setEditMenuOpen}
          userData={userData}
        />
      </Paper>
    </>
  );
};
