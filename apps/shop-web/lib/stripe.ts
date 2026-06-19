import Stripe from "stripe";

let cached: Stripe | null = null;

/** Lazily construct the Stripe server client so the app builds without keys present. */
export function getStripe(): Stripe {
  if (!cached) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set. Add it to .env.local");
    }
    cached = new Stripe(key);
  }
  return cached;
}
