"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createStartup = async (newStartupData) => {
  return serverMutation("/api/startups", newStartupData);
};

export const updateStartup = async (id, data) => {
  const result = await serverMutation(`/api/startups/${id}`, data, "PATCH");
  return result;
};
export const updateStartupInfo = async (id, data) => {
  const result = await serverMutation(`/api/startupsinfo/${id}`, data, "PATCH");
  return result;
};

export const deleteStartupInfo = async (id) => {
  const result = await serverMutation(`/api/startupsinfo/${id}`, {}, "DELETE");
  return result;
};
