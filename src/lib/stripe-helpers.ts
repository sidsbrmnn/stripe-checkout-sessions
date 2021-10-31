import Stripe from "stripe";

// Create type CleaningIntercval for weekly, biweekly, monthly
export type CleaningInterval = "weekly" | "biweekly" | "monthly";

// Get recurring price data from cleaningInterval
export const getRecurringPrice = (
  cleaningInterval: CleaningInterval
): Stripe.Checkout.SessionCreateParams.LineItem.PriceData.Recurring => {
  switch (cleaningInterval) {
    case "weekly":
      return { interval: "week", interval_count: 1 };
    case "biweekly":
      return { interval: "week", interval_count: 2 };
    case "monthly":
      return { interval: "week", interval_count: 4 };
    default:
      return undefined;
  }
};

// Export Stripe object
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2020-08-27",
});
