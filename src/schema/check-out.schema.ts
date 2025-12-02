import { z } from "zod";

export const addressFormSchema = z.object({
    cartId: z.string().nonempty("Cart ID is Required"),
    details: z.string().nonempty("Address is Required").min(3, "Min Length Must Be at Least 3 Char"),
    city: z.string().nonempty("City is Required").min(3, "Min Length Must Be at Least 3 Char"),
    phone: z.string()
        .nonempty("Phone is Required")
        .regex(/^(?:\+?20)?1[0125]\d{8}$/, "Please Enter A Valid Egyptian Phone Number"),
    paymentMethod: z.enum(["cash", "card"], { message: "Payment Method is Required" }),
});
export type AddressFormPayload = z.infer<typeof addressFormSchema>;

export type addressFormStateType = {
    success: boolean;
    errors: {
        cartId?: string[];
        details?: string[];
        city?: string[];
        phone?: string[];
        paymentMethod?: string[];
    };
    message: string | null;
    callbackUrl: string;
    paymentMethod?: "cash" | "card";
};

// initial state that matches `addressFormStateType`
export const initialAddressFormState: addressFormStateType = {
    success: false, // required
    errors: {
        cartId: [],
        details: [],
        city: [],
        phone: [],
        paymentMethod: [],
    },
    message: null,
    callbackUrl: "",
    // paymentMethod: undefined, // optional — you can omit or set "cash" | "card" if you want a default
};
