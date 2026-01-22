"use client";

import React, { useState } from "react";
import { z } from "zod";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const returnUrl = params.get("returnUrl") || "/dashboard";

  const handleSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);

      const loginData = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (loginData?.error) {
        setLoading(false);
        toast.error("Invalid email or password. Please try again.");
        return;
      }

      if (loginData?.ok) {
        setLoading(false);
        toast.success("Login Successful");
        router.push(returnUrl);
      } else {
        setLoading(false);
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <Image
            src="/sanveex-logo.png"
            alt="Logo"
            width={160}
            height={40}
            className="mx-auto mb-4"
          />
          <CardTitle className="text-3xl font-bold text-center">
            ADMIN LOGIN
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form<LoginFormValues>
            onSubmit={handleSubmit}
            schema={loginSchema}
            submitButtonText="Sign In"
            submitButtonProps={{ className: "w-full" }}
            defaultValues={{
              email: "",
              password: "",
            }}
            isSubmitting={loading}
          >
            <FormInput
              name="email"
              label="Email"
              placeholder="name@example.com"
              type="email"
            />
            <FormInput
              name="password"
              label="Password"
              placeholder="••••••••"
              type="password"
            />
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginPage;
