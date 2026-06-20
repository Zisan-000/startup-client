import React from "react";
import Link from "next/link";
import { ShieldExclamation, ArrowLeft, House } from "@gravity-ui/icons";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl shadow-xl p-6 sm:p-10 text-center space-y-6">
        {/* Shield Warning Icon */}
        <div className="relative flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-red-50 text-red-600 border border-red-100">
          <ShieldExclamation size={32} />
        </div>

        {/* Error Messaging */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
            Access Denied
          </h1>
          <p className="text-sm text-zinc-500 font-medium leading-relaxed">
            You do not have the required permissions or the correct account role
            to view this dashboard node.
          </p>
        </div>

        {/* Informational Hint Banner */}
        <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-3.5 text-xs text-zinc-500 text-left">
          <p>
            <strong>Note:</strong> If you recently updated your tier profile or
            swapped account roles, try logging out and logging back in to
            refresh your active session tokens.
          </p>
        </div>

        {/* Action Navigation Routes */}
        <div className="pt-2 flex flex-col gap-2">
          <Link
            href="/"
            className="w-full px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition shadow-sm flex items-center justify-center gap-1.5"
          >
            <House size={14} /> Return Home
          </Link>

          <Link
            href="/auth/login"
            className="w-full px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition flex items-center justify-center gap-1.5"
          >
            <ArrowLeft size={14} /> Switch Accounts
          </Link>
        </div>
      </div>
    </div>
  );
}
