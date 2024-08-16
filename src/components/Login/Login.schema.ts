import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "E-mail jest wymagany" }),
  password: z.string().min(6, "Hasło musi zawierać minimalnie 6 znaków."),
});
