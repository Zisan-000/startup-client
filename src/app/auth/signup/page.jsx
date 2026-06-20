"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Radio,
  RadioGroup,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const [role, setRole] = useState("collaborator");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const plan = role === "founder" ? "free" : "free";

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.photoUrl,
      role: role,
      plan: plan,
      isBlocked: false,
    });

    if (data) {
      router.push(redirectUrl);
    }
    if (error) {
      toast.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
      <Card className="w-full max-w-md p-8 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 shadow-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Create an Account
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter your details below to get started
          </p>
        </div>

        <Form onSubmit={handleSignup} className="flex flex-col gap-4">
          {/* 2. NAME FIELD */}
          <TextField
            isRequired
            name="name"
            type="text"
            validate={(value) => {
              if (value.trim().length < 2) {
                return "Name must be at least 2 characters long";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Full Name
            </Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>

          {/* 3. EMAIL FIELD */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* 1. PHOTO URL FIELD */}
          <TextField
            isRequired
            name="photoUrl"
            type="url"
            validate={(value) => {
              if (!/^https?:\/\/.+/i.test(value)) {
                return "Please enter a valid image URL (starting with http:// or https://)";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Photo URL
            </Label>
            <Input placeholder="https://example.com/profile.jpg" />
            <FieldError />
          </TextField>

          {/* 4. PASSWORD FIELD */}
          <TextField
            isRequired
            minLength={6}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters"; // Fixed message from 6 to match check
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </Label>
            <Input placeholder="Enter your password" />
            <FieldError />
          </TextField>

          <RadioGroup
            defaultValue="collaborator"
            name="role"
            isRequired
            onChange={(value) => setRole(value)}
          >
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Choose your role
            </Label>
            <Description className="text-xs text-zinc-400">
              Select how you want to contribute to the platform
            </Description>

            <Radio value="collaborator">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                Collaborator
              </Radio.Content>
              <Description className="text-xs text-zinc-400">
                Join existing startups and contribute skills
              </Description>
            </Radio>

            <Radio value="founder" className="mt-2">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                Founder
              </Radio.Content>
              <Description className="text-xs text-zinc-400">
                Create new startup and build a team
              </Description>
            </Radio>
          </RadioGroup>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 font-medium bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:opacity-90"
            >
              <Check className="w-4 h-4" />
              Submit
            </Button>
            <Button type="reset" variant="flat" className="flex-1 font-medium">
              Reset
            </Button>
          </div>
        </Form>

        <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-700/50">
          Already have an account?{" "}
          <Link
            href={`/auth/login?redirect=${redirectUrl}`}
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
