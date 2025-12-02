"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { formState, RegisterFormPayload, registerFormSchema } from "@/schema/register.schema";
import { handleRegister } from "@/services/register.services";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";




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

export default function RegisterPage() {
  const [actionState, formAction] = useActionState(handleRegister, formState);
  const router = useRouter();
  const form = useForm<RegisterFormPayload>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
  });


  useEffect(() => {
    if (actionState) {
      if (!actionState.success && actionState.message) {
        toast.error(actionState.message, {
          position: "top-center",
        });
      }




      if (actionState.success && actionState.message) {
        toast.success(actionState.message, {
          position: "top-center",
        });
        router.push("/login");
      }

    }
  }, [actionState, router]);

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Register</h1>
        <Form {...form}>
          <form action={formAction} className="space-y-8">


            {/* *******************   Name     ************************ */}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Name" {...field} />
                  </FormControl>
                  <FormMessage>
                    <FormMessage>
                      <FormMessage>{actionState?.errors?.name?.[0]}</FormMessage>
                    </FormMessage>
                  </FormMessage>
                </FormItem>
              )}
            />


            {/* *******************   Email     ************************ */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="username@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage>{actionState?.errors?.email?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            {/* ************************  Password                 **************************** */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********************"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage>{actionState?.errors.password?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* *******************   RePassword     ************************ */}

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RePassword</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********************"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage>{actionState?.errors.rePassword?.[0]}</FormMessage>
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

            <Button type="submit">Sign Up</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
