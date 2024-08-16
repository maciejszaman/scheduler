import { useContext } from "react";
import * as Types from "./EventMenu.types";
import toast from "react-hot-toast";
import { FirebaseContext } from "../../providers/FireBaseProvider";
import dayjs from "dayjs";
import {
  deleteDoc,
  doc,
  getDocFromServer,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { eventMenuSchema } from "./EventMenu.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultValues = {
  title: "Wydarzenie",
  startDate: dayjs().add(1, "day"),
  endDate: dayjs().add(1, "day").add(1, "hour"),
};

export const useEventMenuHook = ({
  open,
  setOpen,
  userData,
  eventId,
}: Types.EventMenuProps) => {
  const { db } = useContext(FirebaseContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof eventMenuSchema>>({
    resolver: zodResolver(eventMenuSchema),
    defaultValues: async () => {
      const getOldEventData = async (eventId: string) => {
        if (!userData) {
          return defaultValues;
        }

        const eventRef = doc(db, "users", userData.uid, "events", eventId);
        const oldEventDoc = await getDocFromServer(eventRef);
        if (!oldEventDoc.exists()) {
          return defaultValues;
        }
        const eventData = oldEventDoc.data();

        return {
          title: eventData.title,
          startDate: dayjs(eventData.startDate),
          endDate: dayjs(eventData.endDate),
        };
      };
      if (eventId) {
        return getOldEventData(eventId);
      }
      return defaultValues;
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const uploadEvent = async (values: z.infer<typeof eventMenuSchema>) => {
    if (userData) {
      const uniqueId = uuidv4();

      const eventDocRef = doc(
        doc(db, "users", userData.uid),
        "events",
        uniqueId
      );

      const eventData = {
        id: uniqueId,
        title: values.title,
        startDate: values.startDate.format("YYYY-MM-DDTHH:mm"),
        endDate: values.endDate.format("YYYY-MM-DDTHH:mm"),
      };
      try {
        await setDoc(eventDocRef, eventData);
        toast.success("Dodano wydarzenie.");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateEvent = async (values: z.infer<typeof eventMenuSchema>) => {
    if (userData && eventId) {
      try {
        await updateDoc(doc(db, "users", userData.uid, "events", eventId), {
          title: values.title,
          startDate: values.startDate.format("YYYY-MM-DDTHH:mm"),
          endDate: values.endDate.format("YYYY-MM-DDTHH:mm"),
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async () => {
    if (userData && eventId) {
      try {
        await deleteDoc(doc(db, "users", userData.uid, "events", eventId));
        toast.success("Usunięto wydarzenie.");
        setOpen(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    if (eventId) {
      updateEvent(values);
      setOpen(false);
    } else {
      uploadEvent(values);
      setOpen(false);
    }
  });

  return {
    handleSubmit,
    handleDelete,
    updateEvent,
    uploadEvent,
    handleClose,
    open,
    eventId,

    onSubmit,
    register,
    control,
    errors,
  };
};
