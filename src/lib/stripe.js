import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  premium: "price_1TjkPNC7PvrFzyl1xRW1lEYa",
};
