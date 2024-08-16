import { DateTimePickerProps, PickerValidDate } from "@mui/x-date-pickers";
import {
  Control,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

export interface DateTimePickerFieldsProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TName> {
  datePickerProps?: DateTimePickerProps<PickerValidDate>;
}
