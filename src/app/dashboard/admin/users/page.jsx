import React from "react";
import { getUsers } from "@/lib/api/users";
import ManageUsersTable from "@/components/ManageUsersTable";

export const dynamic = "force-dynamic";

const ManageUsers = async () => {
  const users = (await getUsers()) || [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 min-h-screen bg-zinc-50/40">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Account Governance
        </h1>
        <p className="text-sm text-zinc-500">
          Total Users Monitored:{" "}
          <span className="font-semibold text-zinc-800">{users.length}</span>
        </p>
      </div>

      {users.length === 0 ? (
        <div className="border border-dashed border-zinc-200 bg-white rounded-2xl p-12 text-center text-zinc-500">
          No registered user data pipelines discovered.
        </div>
      ) : (
        <ManageUsersTable initialUsers={users} />
      )}
    </div>
  );
};

export default ManageUsers;
