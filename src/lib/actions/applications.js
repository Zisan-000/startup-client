"use server";

import { serverMutation } from "../core/server";

export const createApplication = async (applicationData) => {
  return serverMutation("/api/applications", applicationData);
};

export const updateApplicationStatus = async (id, data) => {
  const result = await serverMutation(`/api/applications/${id}`, data, "PATCH");
  return result;
};
