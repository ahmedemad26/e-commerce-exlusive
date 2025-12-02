import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(1, "Name is Required").min(3, "Min Length Must Be at Least 3 Char"),
  email: z.string().email({ message: "Please Enter A Valid Email" }),
  password: z
    .string()
    .min(1, "Password is Required")
    .min(6, "Min Length Must Be at Least 6 Char"),
  rePassword: z.string().min(1, "Confirm Password is Required").min(6, "Min Length Must Be at Least 6 Char"),
  phone: z.string().min(1, "Phone is Required").regex(/^(?:\+?20|0)1[0125][0-9]{8}$/, "Please Enter A Valid Egyptian Phone Number"),
}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  message: "Passwords do not match",
});

export type RegisterFormPayload = z.infer<typeof registerFormSchema>;

export const formState: formStateType = {
  success: false,
  errors: {},
  message: null,
}

export type formStateType = {
  success: boolean;
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    rePassword?: string[];
    phone?: string[];
  };
  message: string | null;
}