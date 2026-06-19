import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Check, Envelope, ShieldCheck, ArrowRight } from "@gravity-ui/icons";
import { createPayments } from "@/lib/actions/payment";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const {
    status,
    customer_details: { email: customerEmail },
    amount_total,
    payment_status,
    id,
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const totalAmount = amount_total / 100;

    // Safely grab the transaction id from the expanded payment intent

    const info = {
      user_email: customerEmail,
      amount: totalAmount,
      planId: metadata.planId,
      transaction_id: id,
      payment_status: payment_status,
      paid_at: new Date().toISOString(),
    };

    const result = await createPayments(info);

    console.log("Constructed Payment Info Payload:", info);

    return (
      <div className="min-h-screen w-full bg-zinc-50 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-white border border-zinc-200 rounded-3xl shadow-xl p-6 sm:p-10 text-center space-y-8 animate-fade-in">
          {/* Success Check Circle Icon */}
          <div className="relative flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Check size={28} className="stroke-3" />
          </div>

          {/* Heading Messages */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
              Payment Successful!
            </h1>
            <p className="text-sm text-zinc-500 font-medium">
              Thank you for upgrading. Your account is now fully verified.
            </p>
          </div>

          {/* Meta Information Container Card */}
          <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-4 text-left space-y-3.5">
            <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-600">
              <span className="mt-0.5 text-zinc-400">
                <Envelope size={16} />
              </span>
              <p>
                A confirmation invoice and account receipt are being dispatched
                to{" "}
                <strong className="text-zinc-900 font-semibold break-all">
                  {customerEmail}
                </strong>
                .
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-200 flex items-start gap-3 text-xs text-zinc-400">
              <span className="mt-0.5 text-zinc-400/80">
                <ShieldCheck size={14} />
              </span>
              <p>
                Have payment questions? Connect directly with our support team
                at{" "}
                <a
                  href="mailto:orders@example.com"
                  className="text-zinc-600 underline font-medium hover:text-zinc-900 transition"
                >
                  orders@example.com
                </a>
                .
              </p>
            </div>
          </div>

          {/* Context Navigation Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard/founder/opportunities"
              className="flex-1 px-5 py-3 text-xs sm:text-sm font-semibold rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition shadow-sm active:scale-[0.99] flex items-center justify-center gap-1.5"
            >
              Start Posting Roles <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
