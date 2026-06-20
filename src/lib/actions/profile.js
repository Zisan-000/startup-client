"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const updateUserProfile = async (formData) => {
  const email = formData.get("email");

  const payload = {
    name: formData.get("name"),
    image: formData.get("image"),
    bio: formData.get("bio") || "",
    skills: formData.get("skills")
      ? formData
          .get("skills")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
  };

  const result = await serverMutation(
    `/api/users/profile/update?email=${email}`,
    payload,
    "PATCH",
  );

  if (result) {
    revalidatePath("/dashboard/collaborator/profile");
  }
  return result;
};
