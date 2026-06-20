"use client";

import React from "react";
import {
  FiMail,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { Chip } from "@heroui/react";

export default function ManageTransactionsTable({ initialTransactions }) {
  const statusStyles = {
    paid: "bg-green-50 text-green-700 border-green-200",
    completed: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    failed: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className="w-full overflow-x-auto border border-zinc-200 rounded-2xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse min-w-180">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50/50">
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              User Account
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Tier ID
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Amount
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Transaction Ref
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Settlement Date
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-center">
              Payment Status
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-100">
          {initialTransactions.map((tx) => {
            const rowId = tx._id?.toString() || tx.id;

            return (
              <tr key={rowId} className="hover:bg-zinc-50/50 transition-colors">
                {/* User Identity Info */}
                <td className="p-4">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                    <FiMail className="text-zinc-400 shrink-0" size={14} />
                    {tx.user_email}
                  </span>
                </td>

                {/* Plan Tier ID */}
                <td className="p-4">
                  <Chip
                    size="sm"
                    variant="flat"
                    color="secondary"
                    className="uppercase font-bold text-[10px] tracking-wider"
                  >
                    {tx.planId || "Premium"}
                  </Chip>
                </td>

                {/* Amount Currency block */}
                <td className="p-4">
                  <span className="inline-flex items-center text-sm font-bold text-zinc-900">
                    <FiDollarSign size={13} className="text-zinc-400" />
                    {tx.amount?.toFixed(2)}
                  </span>
                </td>

                {/* Transaction Reference String */}
                <td className="p-4">
                  <span
                    className="text-xs font-mono text-zinc-500 block truncate max-w-44"
                    title={tx.transaction_id}
                  >
                    {tx.transaction_id || "N/A"}
                  </span>
                </td>

                {/* Settlement Date with Hydration Guard */}
                <td className="p-4">
                  <span
                    className="text-sm text-zinc-600 flex items-center gap-1.5"
                    suppressHydrationWarning
                  >
                    <FiClock className="text-zinc-400" size={13} />
                    {tx.paid_at
                      ? new Date(tx.paid_at).toLocaleDateString()
                      : "N/A"}
                  </span>
                </td>

                {/* Payment Status Badges */}
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase border tracking-wide ${statusStyles[tx.payment_status?.toLowerCase()] || "bg-zinc-50 text-zinc-600 border-zinc-200"}`}
                    >
                      {tx.payment_status?.toLowerCase() === "paid" ||
                      tx.payment_status?.toLowerCase() === "completed" ? (
                        <FiCheckCircle size={12} className="shrink-0" />
                      ) : (
                        <FiAlertCircle size={12} className="shrink-0" />
                      )}
                      {tx.payment_status || "Pending"}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
