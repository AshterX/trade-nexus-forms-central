
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DocumentUpload } from "./DocumentUpload";
import { Select } from "@/components/ui/select";

const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/i;
const PHONE_REGEX = /^[6-9]\d{9}$/;

const productOptions = [
  "Textiles", "Electronics", "Automotive", "Machinery", "Chemicals", "Food & Beverages", "Metals", "Pharmaceuticals", "Plastics", "Furniture"
];

const sellerSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  ownerName: z.string().min(1, "Owner name is required"),
  gstin: z.string().regex(GSTIN_REGEX, "Enter a valid GSTIN"),
  turnover: z
    .number({ invalid_type_error: "Enter a valid turnover amount (₹2-50 Cr)" })
    .refine((val) => val >= 2 && val <= 50, "Turnover must be between ₹2 and ₹50 Cr"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(5, "Account number is required"),
  ifsc: z.string().min(5, "IFSC code is required"),
  productCategories: z.array(z.string()).min(1, "Select at least one category"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(PHONE_REGEX, "Enter a valid 10-digit phone number"),
  document: z
    .custom<File>()
    .refine((file) => file instanceof File, { message: "Document is required" })
    .refine((file) => ["application/pdf", "image/jpeg", "image/png"].includes(file?.type), { message: "Must be a PDF, JPG, or PNG" }),
});

type SellerFormFields = z.infer<typeof sellerSchema>;

export function SellerSignupForm() {
  const [docFile, setDocFile] = useState<File | null>(null);

  const form = useForm<SellerFormFields>({
    resolver: zodResolver(sellerSchema),
    mode: "onTouched",
    defaultValues: {
      productCategories: [],
    }
  });

  const onSubmit = (data: SellerFormFields) => {
    toast({ title: "Seller Signup Successful!", description: "Your details have been submitted." });
    form.reset();
    setDocFile(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-xl font-semibold mb-3">Seller Signup</h2>
        {/* Business Name */}
        <FormField control={form.control} name="businessName" render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input placeholder="Business legal entity" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {/* Owner Name */}
        <FormField control={form.control} name="ownerName" render={({ field }) => (
          <FormItem>
            <FormLabel>Owner Name</FormLabel>
            <FormControl>
              <Input placeholder="Owner full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {/* GSTIN */}
        <FormField control={form.control} name="gstin" render={({ field }) => (
          <FormItem>
            <FormLabel>GSTIN</FormLabel>
            <FormControl>
              <Input placeholder="GSTIN (e.g., 22AAAAA0000A1Z5)" autoCapitalize="characters" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {/* Turnover */}
        <FormField control={form.control} name="turnover" render={({ field }) => (
          <FormItem>
            <FormLabel>Annual Turnover (in ₹ Crore)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.1"
                min={2}
                max={50}
                placeholder="e.g., 12"
                {...field}
                onChange={e => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Bank Name */}
          <FormField control={form.control} name="bankName" render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="Bank name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          {/* Account Number */}
          <FormField control={form.control} name="accountNumber" render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input placeholder="Account number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          {/* IFSC */}
          <FormField control={form.control} name="ifsc" render={({ field }) => (
            <FormItem>
              <FormLabel>IFSC Code</FormLabel>
              <FormControl>
                <Input placeholder="IFSC code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        {/* Product Categories (multi-select as checkboxes) */}
        <FormField control={form.control} name="productCategories" render={({ field }) => (
          <FormItem>
            <FormLabel>Product Categories</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {productOptions.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm font-normal border rounded px-2 py-1 hover:bg-violet-50">
                  <input
                    type="checkbox"
                    checked={field.value?.includes(cat)}
                    onChange={() => {
                      const arr = [...field.value];
                      if (arr.includes(cat)) {
                        field.onChange(arr.filter(v => v !== cat));
                      } else {
                        field.onChange([...arr, cat]);
                      }
                    }}
                  />
                  {cat}
                </label>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />
        {/* Email */}
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Contact email address" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {/* Phone */}
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="10 digit phone" maxLength={10} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {/* Document Upload */}
        <FormField control={form.control} name="document" render={({ field }) => (
          <FormItem>
            <FormLabel>Upload PAN/Document</FormLabel>
            <FormControl>
              <DocumentUpload
                label="Click or drag to upload PAN, PDF/JPG/PNG"
                accept=".pdf,.jpg,.jpeg,.png"
                value={docFile}
                onFileChange={f => {
                  field.onChange(f);
                  setDocFile(f);
                }}
                error={form.formState.errors.document?.message as string}
              />
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
