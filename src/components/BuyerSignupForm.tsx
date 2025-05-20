
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/i;
const PHONE_REGEX = /^[6-9]\d{9}$/;

const buyerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  businessName: z.string().min(1, "Business name is required"),
  gstin: z.string().regex(GSTIN_REGEX, "Enter a valid GSTIN"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(PHONE_REGEX, "Enter a valid 10-digit phone number"),
});

type BuyerFormFields = z.infer<typeof buyerSchema>;

export function BuyerSignupForm() {
  const form = useForm<BuyerFormFields>({
    resolver: zodResolver(buyerSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: BuyerFormFields) => {
    toast({ title: "Buyer Signup Successful!", description: "Your details have been submitted." });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-xl font-semibold mb-3">Buyer Signup</h2>

        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="businessName" render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input placeholder="Your business name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="gstin" render={({ field }) => (
          <FormItem>
            <FormLabel>GSTIN</FormLabel>
            <FormControl>
              <Input placeholder="GSTIN (e.g., 22AAAAA0000A1Z5)" autoCapitalize="characters" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Email address" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="10 digit phone" maxLength={10} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
          Submit
        </Button>
      </form>
    </Form>
  );
}
