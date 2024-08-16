import { Dayjs } from "dayjs";
import { z } from "zod";

export const eventMenuSchema = z
  .object({
    title: z.string().min(1, "To pole jest wymagane."),
    startDate: z
      .custom<Dayjs>()
      .refine((value) => !!value, "To pole jest wymagane"),
    endDate: z
      .custom<Dayjs>()
      .refine((value) => !!value, "To pole jest wymagane"),
  })
  .superRefine((values, ctx) => {
    if (values.startDate.isAfter(values.endDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startDate"],
        message: "Daty są nieprawidłowe.",
      });
    }
  });
