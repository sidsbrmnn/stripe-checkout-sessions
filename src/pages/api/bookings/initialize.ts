import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import {
  formatAmountForStripe,
  getRecurringPrice,
  stripe,
} from "../../../lib/stripe-helpers";
import { calculateTotalPrice } from "../../../utils/calculateTotalPrice";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const products = [
  {
    id: "prod_KW57Inz6jFrvLH",
    name: "One Time",
  },
  {
    id: "prod_KW57JHQ8Myrt4O",
    name: "Weekly",
  },
  {
    id: "prod_KW57Eu2S80taBA",
    name: "Every 2 weeks",
  },
  {
    id: "prod_KW5738PSYF0ICZ",
    name: "Every 3 weeks",
  },
];

handler.post(async (req, res) => {
  const { total } = calculateTotalPrice(
    req.body.bedrooms,
    req.body.bathrooms,
    req.body.cleaningType,
    req.body.interval
  );
  const amount = formatAmountForStripe(total);

  if (req.body.cleaningInterval === "One Time") {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      customer: "cus_KVfi2rxCMiKJ4v",
    });

    res.send({ data: paymentIntent });
  } else {
    const subscription = await stripe.subscriptions.create({
      customer: "cus_KVfi2rxCMiKJ4v",
      items: [
        {
          price_data: {
            currency: "usd",
            product: products[req.body.interval].id,
            unit_amount: amount,
            recurring: getRecurringPrice(req.body.interval),
            tax_behavior: "inclusive",
          },
          quantity: 1,
        },
      ],
    });

    res.send({ data: subscription });
  }
});

export default handler;
