
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SellerSignupForm } from "./SellerSignupForm";
import { BuyerSignupForm } from "./BuyerSignupForm";

export default function TabbedSignup() {
  return (
    <div className="max-w-xl w-full mx-auto bg-white shadow-lg rounded-xl px-4 py-8 my-8">
      <Tabs defaultValue="seller" className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-8 bg-violet-50 rounded-md">
          <TabsTrigger
            value="seller"
            className="data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-l-md"
          >
            Seller Signup
          </TabsTrigger>
          <TabsTrigger
            value="buyer"
            className="data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-r-md"
          >
            Buyer Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="seller">
          <SellerSignupForm />
        </TabsContent>
        <TabsContent value="buyer">
          <BuyerSignupForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
