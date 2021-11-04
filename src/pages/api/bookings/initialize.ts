import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import {
  formatAmountForStripe,
  getRecurringPrice,
  stripe,
} from "../../../lib/stripe-helpers";
import { calculateTotalPrice } from "../../../utils/calculateTotalPrice";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const products = {
  "One Time": {
    id: "prod_KW57Inz6jFrvLH",
  },
  Weekly: {
    id: "prod_KW57JHQ8Myrt4O",
  },
  "Every 2 weeks": {
    id: "prod_KW57Eu2S80taBA",
  },
  "Every 3 weeks": {
    id: "prod_KW5738PSYF0ICZ",
  },
};

handler.post(async (req, res) => {
  const { total } = calculateTotalPrice(
    req.body.bedrooms,
    req.body.bathrooms,
    req.body.cleaningType,
    req.body.interval
  );

  const amount = formatAmountForStripe(total);

  try {
    if (req.body.interval === "One Time") {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "inr",
        payment_method_types: ["card"],
        customer: "cus_KVfi2rxCMiKJ4v",
      });

      res.send({ data: paymentIntent });
    } else {
      const subscription = await stripe.subscriptions.create({
        customer: "cus_KXCC3Ra2AvZQ4S",
        items: [
          {
            price_data: {
              currency: "inr",
              product: products[req.body.interval].id,
              unit_amount: amount,
              recurring: getRecurringPrice(req.body.interval),
              tax_behavior: "inclusive",
            },
            quantity: 1,
          },
        ],
        // Create a payment method for the customer.
        // Ideally, we would attach a payment method to the customer before creating a subscription.
        // But for this instance, we can create it here.
        payment_settings: {
          payment_method_types: ["card"],
        },
        // set the default subscription status to incomplete. It transitions to active once the payment is completed.
        payment_behavior: "default_incomplete",
        // Return the client_secret from the subscription's first payment intent to the frontend to complete payment.
        expand: ["latest_invoice.payment_intent"],
      });

      res.send({ data: subscription });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

export default handler;
