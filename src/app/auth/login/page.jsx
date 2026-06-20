import React, { Suspense } from "react";
import LoginForm from "./LoginForm";

// This forces Next.js to render this page dynamically at runtime, stopping Vercel build crashes
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
      <Suspense
        fallback={
          <div className="text-zinc-500 text-sm font-medium animate-pulse">
            Loading session identity credentials...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
