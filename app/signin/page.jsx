"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "../../components/client/loginForm";
import SignupForm from "../../components/client/signupForm";

export default function TabsDemo() {

  const [activeTab, setActiveTab] = useState("signup");

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-[400px] h-[500px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="signin">Log In</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <SignupForm onSignupSuccess={() => handleTabChange("signin")} />

        </TabsContent>
        <TabsContent value="signin">
          <LoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}