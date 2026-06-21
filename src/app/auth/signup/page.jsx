import React, { Suspense } from "react";
import SignUpForm from "./SignUpForm";

// Force Next.js to isolate this page at build runtime to satisfy dynamic queries
export const dynamic = "force-dynamic";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
      <Suspense
        fallback={
          <div className="text-zinc-500 dark:text-zinc-400 text-sm font-medium animate-pulse">
            Loading system authentication framework...
          </div>
        }
      >
        <SignUpForm />
      </Suspense>
    </div>
  );
}
