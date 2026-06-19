"use server";

import { serverMutation } from "../core/server";

export const createPayments = async (newPaymentData) => {
  return serverMutation("/api/payments", newPaymentData);
};
