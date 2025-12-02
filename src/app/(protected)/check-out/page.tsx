"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AddressFormPayload, addressFormSchema, initialAddressFormState } from "@/schema/check-out.schema";
import { useActionState, useEffect } from "react";
import { handleCheckout } from "@/services/checkout.services";
import { useCart } from "@/context/CartContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";



export default function CheckoutPage() {
    const { cartDetails, setCartDetails } = useCart();
    const [actionState, formAction] = useActionState(handleCheckout, initialAddressFormState);
    const router = useRouter();
    const form = useForm<AddressFormPayload>({
        resolver: zodResolver(addressFormSchema),
        defaultValues: {
            cartId: "",
            details: "",
            city: "",
            phone: "",
            paymentMethod: "cash", // important: ensure not undefined
        },
    });

    console.log(actionState)
    useEffect(() => {
        if (cartDetails) {
            form.setValue("cartId", cartDetails.cartId);
        }
    }, [cartDetails, form]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (actionState) {
            if (actionState.success && actionState.message) {

                if (form.getValues("paymentMethod") === "cash") {
                    toast.success(actionState.message, {
                        position: "top-center",
                    });
                    setCartDetails(null);
                    timeout = setTimeout(() => {
                        router.push(actionState.callbackUrl || "/allorders");
                    }, 3000);
                } else {
                    window.location.href = actionState.callbackUrl as string;
                }
            } else if (!actionState.success && actionState.message) {
                toast.error(actionState.message, {
                    position: "top-center",
                });
            }
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, [actionState, form, setCartDetails, router]);
    return (
        <section className="py-20">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Checkout </h1>
                <Form {...form}>
                    <form action={formAction} className="space-y-8">

                        <FormField
                            control={form.control}
                            name="cartId"
                            render={({ field }) => (
                                <FormItem className="hidden">
                                    <FormControl>
                                        <Input hidden {...field} value={cartDetails?.cartId || ""} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/* *******************   Name     ************************ */}

                        <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Details</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Details" {...field} />
                                    </FormControl>
                                    <FormMessage>{actionState?.errors.details?.[0]}</FormMessage>
                                </FormItem>
                            )}
                        />


                        {/* *******************   Email     ************************ */}
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter City" {...field} />
                                    </FormControl>
                                    <FormMessage>{actionState?.errors.city?.[0]}</FormMessage>
                                </FormItem>
                            )}
                        />


                        {/* *******************   Phone     ************************ */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="01234567890"
                                            {...field}
                                            type="tel"
                                        />
                                    </FormControl>
                                    <FormMessage>{actionState?.errors.phone?.[0]}</FormMessage>
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Payment Method</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            className="flex flex-col space-y-1"
                                            defaultValue={field.value}
                                            name={field.name}
                                            onValueChange={field.onChange}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem id="cash" value="cash" />
                                                <Label htmlFor="cash">Cash</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem id="card" value="card" />
                                                <Label htmlFor="card">
                                                    Card
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormDescription>
                                        Choose your payment method.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Checkout</Button>
                    </form>
                </Form>
            </div>
        </section>
    );
}
