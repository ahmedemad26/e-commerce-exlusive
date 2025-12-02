import { z } from "zod";
export const LoginFormSchema = z.object({
  email: z.email({ message: "Please Enter A Valid Email" }),
  password: z
    .string()
    .nonempty("Password is Required")
    .min(6, "Min Length Must Be at Least 6 Char"),
});
export type LoginFormPayload = z.infer<typeof LoginFormSchema>;
