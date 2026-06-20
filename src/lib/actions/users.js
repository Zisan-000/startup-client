"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const toggleUserBlockStatus = async (id, currentBlockStatus) => {
  // Toggle the true/false value to its inverse
  const newStatus = !currentBlockStatus;

  const result = await serverMutation(
    `/api/users/${id}/block`,
    { isBlocked: newStatus },
    "PATCH",
  );

  revalidatePath("/dashboard/admin/users");
  return result;
};
