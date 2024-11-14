"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signupUser } from "@/lib/auth"; 

interface FormData {
  email: string;
  password: string;
  confirmPassword: string; 
}

export default function AdminSignupForm() {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setServerError("");

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      setServerError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await signupUser(data);

      if (response.token && response.userType === "ADMIN") {
        router.push("/login");
      } else {
        setServerError("Signup failed. Please try again.");
      }
    } catch (error) {
      setServerError("Signup failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 font-sans p-4 md:p-6 rounded-2xl">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-4/5 lg:w-3/5 max-h-screen md:gap-5">
        <div className="hidden sm:hidden md:flex w-full md:w-1/3 bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 rounded-l-lg items-center justify-center p-4"></div>
        <Card className="w-full md:w-2/3 lg:w-[400px] p-3 md:p-8 rounded-none border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl mb-1 md:mb-4">
              Admin Signup
            </CardTitle>
            <p className="text-gray-500 text-sm md:text-base">
              Create your account below.
            </p>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CardContent>
              {serverError && (
                <div className="text-red-500 bg-red-100 p-2 rounded">
                  {serverError}
                </div>
              )}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email" className="text-gray-600">
                  Email
                </Label>
                <Input
                  id="email"
                  className="border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400"
                  placeholder="Your email"
                  {...register("email", { required: "Email is required." })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-2 mt-3">
                <Label htmlFor="password" className="text-gray-600">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  className="border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400"
                  placeholder="Your password"
                  {...register("password", {
                    required: "Password is required.",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-2 mt-3">
                <Label htmlFor="confirmPassword" className="text-gray-600">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  className="border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400"
                  placeholder="Confirm your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password.",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center mt-4">
              <div className="flex flex-row gap-4 w-full justify-center">
                <Button type="submit" className="w-20 md:w-24 lg:w-32 h-12">
                  {loading ? "Signing up..." : "Sign Up"}
                  {loading && <span className="animate-pulse">...</span>}
                </Button>
                <Link href="/login">
                  <Button
                    variant="outline"
                    type="reset"
                    className="w-20 md:w-24 lg:w-32 h-12"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
