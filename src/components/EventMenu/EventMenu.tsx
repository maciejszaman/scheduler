import {
  Box,
  Button,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import * as Types from "./EventMenu.types";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FirebaseContext } from "../../providers/FireBaseProvider";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export const EventMenu = ({
  open,
  setOpen,
  userData,
  eventId,
}: Types.EventMenuProps) => {
  const { auth, app, db } = useContext(FirebaseContext);

  const [title, setTitle] = useState("An event");
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs);
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(1, "day"));

  const handleClose = () => {
    setOpen(false);
  };

  const uploadEvent = async () => {
    if (userData) {
      const uniqueId = uuidv4();

      const eventDocRef = doc(
        doc(db, "users", userData.uid),
        "events",
        uniqueId
      );

      const eventData = {
        id: uniqueId,
        title: title,
        startDate: startDate?.format("YYYY-MM-DDTHH:mm"),
        endDate: endDate?.format("YYYY-MM-DDTHH:mm"),
      };
      try {
        await setDoc(eventDocRef, eventData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getOldEventData = async (eventId: string) => {
    if (userData) {
      const eventRef = doc(db, "users", userData.uid, "events", eventId);
      const oldEventDoc = await getDocFromServer(eventRef);
      if (oldEventDoc.exists()) {
        const eventData = oldEventDoc.data();
        setTitle(eventData.title);
        setStartDate(dayjs(eventData.startDate));
        setEndDate(dayjs(eventData.endDate));
      }
    }
  };

  const updateEvent = async () => {
    if (userData && eventId) {
      try {
        await updateDoc(doc(db, "users", userData.uid, "events", eventId), {
          title: title,
          startDate: startDate?.format("YYYY-MM-DDTHH:mm"),
          endDate: endDate?.format("YYYY-MM-DDTHH:mm"),
        });
        toast.success("Event updated.");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async () => {
    if (userData && eventId) {
      try {
        await deleteDoc(doc(db, "users", userData.uid, "events", eventId));
        toast.success("Event removed.");
        setOpen(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = () => {
    if (eventId) {
      if (endDate?.isBefore(startDate)) {
        toast.error("The dates are wrong!");
      } else if (!title) {
        toast.error("The title cannot be empty!");
      } else {
        updateEvent();
        setOpen(false);
        toast.success("Edited the event.");
      }
    } else {
      if (endDate?.isBefore(startDate)) {
        toast.error("The dates are wrong!");
      } else if (!title) {
        toast.error("The title cannot be empty!");
      } else {
        uploadEvent();
        setOpen(false);
        toast.success("Added the event.");
      }
    }
  };

  useEffect(() => {
    if (eventId) {
      getOldEventData(eventId);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Event configuration</DialogTitle>
      <Divider />
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} maxWidth={300}>
          <TextField
            label="title"
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" gap={1}>
              <DateTimePicker
                label="start date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
            </Box>
            <Box display="flex" gap={1}>
              <DateTimePicker
                label="End date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
              />
            </Box>
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>

        {eventId ? (
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        ) : null}
        <Button variant="contained" onClick={handleSubmit}>
          {eventId ? "Edit" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
