'use server'

import { getuserToken } from "@/lib/server-utilits";



export async function getUserCart() {
    try {
        const token = await getuserToken();
        console.log('dasdasda', token)
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: token as string,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            return {
                data: null,
                success: false,
                message: data.message || "Error Fetching Cart Details",
            }
        }
        return {
            data: data,
            success: true,
            message: data.message || "Cart Details Fetched Successfully",
        }
    } catch (error) {
        return {
            data: null,
            success: false,
            message: error as string || "Something Went Wrong",
        }
    }
}





export async function removeUserCart() {
    try {
        const token = await getuserToken();
        console.log('dasdasda', token)
        const response = await fetch(`${process.env.API_BASE_UEL}/api/v1/cart`, {
            method: "DELETE",
            headers: {
                token: token as string,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            return {
                data: null,
                success: false,
                message: data.message || "Error Removing Cart ",
            }
        }
        return {
            data: data,
            success: true,
            message: data.message || "Removed Cart Details Successfully",
        }
    } catch (error) {
        return {
            data: null,
            success: false,
            message: error as string || "Something Went Wrong",
        }
    }
}



export async function addToCart(productId: string) {
    try {
        const token = await getuserToken();
        const response = await fetch(`${process.env.API_BASE_UEL}/api/v1/cart`, {
            method: "POST",
            headers: {
                token: token as string,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            return {
                data: null,
                success: false,
                message: data.message || "Error Adding Product To Cart ",
            }
        }
        return {
            data: data,
            success: true,
            message: data.message || "Product Added To Cart Successfully",
        }
    } catch (error) {
        return {
            data: null,
            success: false,
            message: error as string || "Error Adding Product To Cart ",
        }
    }
}


export async function removeFromCart(productId: string) {
    try {
        const token = await getuserToken();
        const response = await fetch(`${process.env.API_BASE_UEL}/api/v1/cart/${productId}`, {
            method: "DELETE",
            headers: {
                token: token as string,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if (!response.ok) {
            return {
                data: null,
                success: false,
                message: data.message || "Error Removing Product From Cart ",
            }
        }
        return {
            data: data,
            success: true,
            message: data.message || "Product Removed From Cart Successfully",
        }
    } catch (error) {
        return {
            data: null,
            success: false,
            message: error as string || "Error Removing Product From Cart ",
        }
    }
}



export async function updateQuantityCart(productId: string, count: number) {
    try {
        const token = await getuserToken();
        const response = await fetch(`${process.env.API_BASE_UEL}/api/v1/cart/${productId}`, {
            method: "PUT",
            headers: {
                token: token as string,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                count,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            return {
                data: null,
                success: false,
                message: data.message || "Error Updating Quantity of Product in Cart ",
            }
        }
        return {
            data: data,
            success: true,
            message: data.message || "Quantity of Product in Cart Updated Successfully",
        }
    } catch (error) {
        return {
            data: null,
            success: false,
            message: error as string || "Error Updating Quantity of Product in Cart ",
        }
    }
}