"use client";

import React, { useState } from "react";
import {
  FiShield,
  FiUserCheck,
  FiUserX,
  FiMail,
  FiClock,
} from "react-icons/fi";
import { Button, Avatar, Chip } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { toggleUserBlockStatus } from "@/lib/actions/users";

export default function ManageUsersTable({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);
  const [processingId, setProcessingId] = useState(null);
  const router = useRouter();

  const handleToggleBlock = async (id, currentStatus, name) => {
    setProcessingId(id);
    const actionLabel = currentStatus ? "unblock" : "block";

    try {
      const result = await toggleUserBlockStatus(id, currentStatus);

      if (result) {
        toast.success(`Successfully ${actionLabel}ed ${name || "user"}.`);

        // Optimistically update the client UI row state
        setUsers((prev) =>
          prev.map((user) =>
            (user._id?.toString() || user.id) === id
              ? { ...user, isBlocked: !currentStatus }
              : user,
          ),
        );
        router.refresh();
      }
    } catch (err) {
      toast.error(`Failed to modify access status for ${name}.`);
    } finally {
      setProcessingId(null);
    }
  };

  const roleColors = {
    admin: "danger",
    founder: "primary",
    collaborator: "success",
  };

  return (
    <div className="w-full overflow-x-auto border border-zinc-200 rounded-2xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse min-w-200">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50/50">
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Identity
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              System Role
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Workspace Plan
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Access Status
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-100">
          {users.map((user) => {
            const rowId = user._id?.toString() || user.id;
            const isProcessing = processingId === rowId;

            return (
              <tr
                key={rowId}
                className={`transition-colors ${user.isBlocked ? "bg-red-50/20 hover:bg-red-50/30" : "hover:bg-zinc-50/50"}`}
              >
                {/* User Info & Avatar */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={user.image}
                      name={user.name}
                      radius="xl"
                      size="sm"
                      fallback={<FiShield size={16} />}
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-zinc-900 capitalize">
                        {user.name || "User Node"}
                      </span>
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <FiMail size={12} /> {user.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* System Access Role Badge */}
                <td className="p-4">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={roleColors[user.role?.toLowerCase()] || "default"}
                    className="capitalize font-bold text-[10px] tracking-wider"
                  >
                    {user.role || "Collaborator"}
                  </Chip>
                </td>

                {/* Workspace Subscription Tier */}
                <td className="p-4">
                  <span className="text-sm font-medium text-zinc-700 capitalize">
                    {user.plan || "Free"}
                  </span>
                </td>

                {/* System Status Display Label */}
                <td className="p-4">
                  {user.isBlocked ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                      Blocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                      Active
                    </span>
                  )}
                </td>

                {/* Master Action Toggle Control */}
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    {user.isBlocked ? (
                      <Button
                        size="sm"
                        variant="flat"
                        color="success"
                        className="font-semibold rounded-xl min-w-24"
                        isLoading={isProcessing}
                        onPress={() =>
                          handleToggleBlock(rowId, user.isBlocked, user.name)
                        }
                        startContent={
                          !isProcessing && <FiUserCheck size={14} />
                        }
                      >
                        Unblock
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="flat"
                        color="danger"
                        className="font-semibold rounded-xl min-w-24"
                        isLoading={isProcessing}
                        onPress={() =>
                          handleToggleBlock(rowId, user.isBlocked, user.name)
                        }
                        startContent={!isProcessing && <FiUserX size={14} />}
                      >
                        Block
                      </Button>
                    )}
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
