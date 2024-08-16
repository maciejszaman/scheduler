import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import * as Types from "./DateTimePickerField.types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const DateTimePickerField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  datePickerProps,
  ...rest
}: Types.DateTimePickerFieldsProps<TFieldValues, TName>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <Controller
        {...rest}
        render={({ field, fieldState }) => {
          return (
            <DateTimePicker
              value={field.value}
              {...datePickerProps}
              onChange={(date) => {
                field.onChange(date);
              }}
              slotProps={{
                textField: {
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                },
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};
