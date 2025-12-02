'use server'

import { getuserToken } from "@/lib/server-utilits";
import { addressFormSchema, addressFormStateType } from "@/schema/check-out.schema";



export async function handleCheckout(formState: addressFormStateType, formData: FormData): Promise<addressFormStateType> {

    const shippingAddress = {
        details: formData.get("details"),
        city: formData.get("city"),
        phone: formData.get("phone"),
    }
    const cartId = formData.get("cartId");
    const paymentMethod = formData.get("paymentMethod");
    console.log(cartId, 'cartasddddddddddddddddddddddddId', shippingAddress, paymentMethod)
    const parsedData = addressFormSchema.safeParse({ ...shippingAddress, cartId, paymentMethod });
    if (!parsedData.success) {
        return { success: false, errors: parsedData.error.flatten().fieldErrors, message: null, callbackUrl: "/cart" };
    }

    try {
        const token = await getuserToken();
        const endpoint =
            paymentMethod === "cash"
                ? `api/v1/orders/${cartId}`
                : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;

        const res = await fetch(`${process.env.API_BASE_UEL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token as string,
            },
            body: JSON.stringify(shippingAddress),
        });

        const data = await res.json();
        if (!res.ok) {
            return { success: false, errors: {}, message: data.message || "Error Placing Order", callbackUrl: "/cart" };
        }
        return {
            success: true,
            errors: {},
            message: data.message || "Order Placed Successfully",
            callbackUrl: paymentMethod === "cash" ? "/allorders" : data.session.url,
        }
    } catch (error) {
        console.log(error);
        return { success: false, errors: {}, message: error as string || "Error Placing Order", callbackUrl: "/cart" };
    }
}