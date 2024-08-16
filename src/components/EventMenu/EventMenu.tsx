import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import * as Types from "./EventMenu.types";
import { useEventMenuHook } from "./EventMenu.hooks";
import { DateTimePickerField } from "../../shared/fields/DateTimePickerField";

export const EventMenu = (props: Types.EventMenuProps) => {
  const {
    open,
    handleClose,
    eventId,
    handleDelete,
    onSubmit,
    register,
    errors,
    control,
  } = useEventMenuHook(props);

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle>Wydarzenie</DialogTitle>
        <Divider />
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} maxWidth={300}>
            <TextField
              label="Tytuł"
              variant="outlined"
              autoFocus
              type="text"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <Box display="flex" gap={1}>
              <DateTimePickerField
                datePickerProps={{ label: "Data rozpoczęcia", ampm: false }}
                name="startDate"
                control={control}
              />
            </Box>
            <Box display="flex" gap={1}>
              <DateTimePickerField
                datePickerProps={{ label: "Data zakończenia", ampm: false }}
                name="endDate"
                control={control}
              />
            </Box>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Anuluj
          </Button>

          {eventId ? (
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Usuń
            </Button>
          ) : null}
          <Button type="submit" variant="contained">
            {eventId ? "Edytuj" : "Dodaj"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
