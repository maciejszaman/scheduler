import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import * as Types from "./EventMenu.types";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FirebaseContext } from "../../providers/FireBaseProvider";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export const EventMenu = ({
  open,
  setOpen,
  userData,
}: Types.EventMenuProps) => {
  const { auth, app, db } = useContext(FirebaseContext);

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs);
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs);
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs);
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs);

  const handleClose = () => {
    setOpen(false);
  };

  const combineDateAndTimeToString = (
    date: Dayjs | null,
    time: Dayjs | null
  ): string => {
    if (date && time) {
      // Combine the date and time into a single string
      return `${date.format("YYYY-MM-DD")}T${time.format("HH:mm")}`;
    }
    return "";
  };

  const uploadEvent = async () => {
    if (userData) {
      const eventDocRef = doc(
        doc(db, "users", userData.uid),
        "events",
        uuidv4()
      );

      const eventData = {
        title: title,
        startDate: combineDateAndTimeToString(startDate, startTime),
        endDate: combineDateAndTimeToString(endDate, endTime),
      };
      try {
        await setDoc(eventDocRef, eventData);
        toast.success("Event added successfully.");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = () => {
    uploadEvent();
  };

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
              <DatePicker
                label="start date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                sx={{ width: 150 }}
              />
              <TimePicker
                onChange={(newValue) => setStartTime(newValue)}
                value={startTime}
                label="start hour"
                sx={{ width: 150 }}
              />
            </Box>
            <Box display="flex" gap={1}>
              <DatePicker
                label="End date"
                value={endDate}
                onChange={(newValue) => setStartDate(newValue)}
                sx={{ width: 150 }}
              />
              <TimePicker
                onChange={(newValue) => setEndTime(newValue)}
                value={endTime}
                label="End hour"
                sx={{ width: 150 }}
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
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
