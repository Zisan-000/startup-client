"use client";

import React, { useEffect } from "react";
import { FiAlertTriangle, FiRefreshCw, FiHome } from "react-icons/fi";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function GlobalError({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error("Next.js Error Boundary caught a crash:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 p-4">
      <div className="max-w-md w-full p-8 border border-zinc-200 bg-white rounded-3xl shadow-sm text-center space-y-6">
        {/* FIXED: Switched from "flex mx-auto" to "inline-flex". 
            This forces it to stay a small box and perfectly centers it using the parent's text-center! */}
        <div className="inline-flex items-center justify-center w-14 h-14 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 shadow-xs">
          <FiAlertTriangle size={26} />
        </div>

        {/* Informative Text Details */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-950">
            Application Pipeline Fault
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Something went wrong while executing components on this page. This
            could be due to a missing session token or a data stream
            synchronization mismatch.
          </p>
        </div>

        {/* Actions Grid */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-zinc-100">
          <Button
            size="md"
            variant="flat"
            className="flex-1 font-semibold rounded-xl"
            startContent={<FiRefreshCw size={14} />}
            onPress={() => reset()}
          >
            Try Again
          </Button>
          <Button
            size="md"
            className="flex-1 bg-zinc-950 text-white font-semibold rounded-xl"
            startContent={<FiHome size={14} />}
            onPress={() => router.push("/")}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
