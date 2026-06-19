import React from "react";
import { Check, Flame, Star } from "@gravity-ui/icons";

export default function PlansPage() {
  const plans = [
    {
      name: "Free Tier",
      id: "free",
      price: "0",
      description:
        "Perfect for early-stage founders validating their initial project ideas.",
      features: [
        "Post up to 3 opportunities",
        "Basic application management",
        "Public directory listing",
        "Standard support channels",
      ],
      cta: "Current Plan",
      popular: false,
      buttonStyles:
        "bg-zinc-100 text-zinc-400 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-500",
    },
    {
      name: "Premium Founder",
      id: "premium",
      price: "29.99",
      description:
        "Built for scaling teams looking for unrestricted talent pipelines.",
      features: [
        "Unlimited opportunities postings",
        "Priority positioning in browse grid",
        "Advanced application filtering nodes",
        "Dedicated account assistance",
        "Early access to platform beta tools",
      ],
      cta: "Upgrade Now",
      popular: true,
      buttonStyles:
        "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 active:scale-[0.98] shadow-sm",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Block Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Star size={12} /> Pricing Strategy
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Choose Your Growth Velocity
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
            Keep listing basic roles on us, or unlock fully premium integration
            layers to accelerate your building lifecycle.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-zinc-900 border rounded-3xl shadow-sm transition-all duration-300 ${
                plan.popular
                  ? "border-zinc-900 dark:border-zinc-100 ring-1 ring-zinc-900 dark:ring-zinc-100 scale-105 shadow-cyan-500/5"
                  : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              {/* Popularity Visual Anchor Accent */}
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-orange-500 text-white dark:bg-zinc-50 dark:text-zinc-900 shadow-sm border border-zinc-800 dark:border-zinc-200">
                  <Flame color="red" size={12} /> Recommended
                </span>
              )}

              {/* Top Plan Features & Pricing Information Section */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {plan.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 min-h-10">
                    {plan.description}
                  </p>
                </div>

                {/* Quantitative Value Layout */}
                <div className="flex items-baseline text-zinc-900 dark:text-zinc-50">
                  <span className="text-4xl font-extrabold tracking-tight">
                    $
                  </span>
                  <span className="text-5xl font-black tracking-tight mx-0.5">
                    {plan.price}
                  </span>
                  <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
                    {plan.price === "0" ? "" : "/ month"}
                  </span>
                </div>

                {/* Target Checked Items Matrix Display Loop */}
                <ul className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300"
                    >
                      <span className="shrink-0 w-5 h-5 rounded-full bg-zinc-50 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-50 mt-0.5">
                        <Check size={12} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Interactive Selection Action Box Wrapper */}
              <div className="pt-8">
                <form action="/api/checkout_sessions" method="POST">
                  <input type="hidden" name="plan_id" value={plan.id} />
                  <section>
                    <button
                      disabled={!plan.popular}
                      type="submit"
                      role="link"
                      className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition text-center ${plan.buttonStyles}`}
                    >
                      {plan.cta}
                    </button>
                  </section>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
