'use server'

import { formStateType, registerFormSchema } from "@/schema/register.schema";

export async function handleRegister(
    formState: formStateType,
    formData: FormData
): Promise<formStateType> {  // Add explicit return type
    const formValues = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        rePassword: formData.get("rePassword"),
        phone: formData.get("phone"),
    }

    const parsedData = registerFormSchema.safeParse(formValues);

    if (!parsedData.success) {
        return {
            success: false,
            errors: parsedData.error.flatten().fieldErrors as formStateType['errors'],
            message: null
        };
    }

    try {
        const res = await fetch(`${process.env.API_BASE_UEL}/api/v1/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
        });
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                errors: {},
                message: data.message,
            }
        }
        return {
            success: true,
            errors: {},
            message: data.message,
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            errors: {},
            message: error instanceof Error ? error.message : "An unexpected error occurred"
        };
    }
}