import React from "react";
import { getPayments } from "@/lib/api/payments";
import ManageTransactionsTable from "@/components/ManageTransactionsTable";

export const dynamic = "force-dynamic";

const AllTransactions = async () => {
  const transactions = (await getPayments()) || [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 min-h-screen bg-zinc-50/40">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Financial Ledger
        </h1>
        <p className="text-sm text-zinc-500">
          Total Revenue Operations Logged:{" "}
          <span className="font-semibold text-zinc-800">
            {transactions.length}
          </span>
        </p>
      </div>

      {transactions.length === 0 ? (
        <div className="border border-dashed border-zinc-200 bg-white rounded-2xl p-12 text-center text-zinc-500 shadow-sm">
          No system monetization records processed yet.
        </div>
      ) : (
        <ManageTransactionsTable initialTransactions={transactions} />
      )}
    </div>
  );
};

export default AllTransactions;
