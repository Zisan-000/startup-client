"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (error) {
      return toast.error(error.message || "Invalid credentials");
    }

    if (data?.user) {
      if (data.user.isBlocked === true) {
        toast.error(
          "Your account has been suspended. Please contact administration.",
        );
        await authClient.signOut();
        return;
      }
      toast.success("Logged In successfully");
      router.push(redirectUrl);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Welcome Back
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Please enter your details to sign in
        </p>
      </div>

      <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <TextField isRequired name="email" type="email">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField isRequired name="password" type="password">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Password
          </Label>
          <Input placeholder="Enter your password" />
          <Description className="text-xs text-zinc-400 mt-1">
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="flex-1 font-medium bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:opacity-90"
          >
            <Check className="w-4 h-4" /> Submit
          </Button>
          <Button type="reset" variant="flat" className="flex-1 font-medium">
            Reset
          </Button>
        </div>
      </Form>

      <div className="relative flex py-2 items-center">
        <div className="grow border-t border-zinc-200 dark:border-zinc-700"></div>
        <span className="shrink mx-4 text-xs uppercase tracking-wider text-zinc-400">
          Or continue with
        </span>
        <div className="grow border-t border-zinc-200 dark:border-zinc-700"></div>
      </div>

      <Button
        type="button"
        onClick={handleGoogleLogin}
        variant="bordered"
        className="w-full font-medium border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 bg-white dark:bg-zinc-800 flex items-center justify-center gap-2"
      >
        <FaGoogle size={16} /> Sign in with Google
      </Button>

      <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 pt-2">
        Do not have an account?{" "}
        <Link
          href={`/auth/signup?redirect=${redirectUrl}`}
          className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
