
import React from "react";
import TabbedSignup from "@/components/TabbedSignup";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-white to-purple-50 flex items-center justify-center py-6">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-violet-700 mb-2">Sign Up to BharatB2B</h1>
        <p className="text-md text-gray-600 mb-4 text-center max-w-lg">
          Grow your business with a seamless B2B marketplace experience.<br />
          Choose your role to get started.
        </p>
        <TabbedSignup />
      </div>
    </div>
  );
};

export default Index;
