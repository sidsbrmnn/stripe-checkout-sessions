import Stripe from "stripe";

// Create type Interval for weekly, biweekly, monthly
export type Interval = "Weekly" | "Every 2 weeks" | "Every 3 weeks";

// Get recurring price data from interval
export const getRecurringPrice = (
  interval: Interval
): Stripe.SubscriptionCreateParams.Item.PriceData.Recurring => {
  switch (interval) {
    case "Weekly":
      return { interval: "week", interval_count: 1 };
    case "Every 2 weeks":
      return { interval: "week", interval_count: 2 };
    case "Every 3 weeks":
      return { interval: "week", interval_count: 3 };
    default:
      throw new Error("Invalid cleaning interval");
  }
};

export function formatAmountForDisplay(amount: number): string {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
  });
  return numberFormat.format(amount);
}

export function formatAmountForStripe(amount: number): number {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

// Export Stripe object
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2020-08-27",
});
