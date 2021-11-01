import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { stripe } from "../../../lib/stripe-helpers";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const interval = req.body.interval;
  if (interval === "One Time") {
    // Get paymentIntent from req.body
    const paymentId = req.body.paymentId;
    // Verify paymentIntent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    // Verify paymentIntent.status === succeeded
    if (paymentIntent.status === "succeeded") {
      // Create booking in database
      // Send email to user
      res.json({
        success: true,
        message: "Payment successful",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment failed",
      });
    }
  } else {
    // Get subscription from req.body
    const subscriptionId = req.body.subscriptionId;
    // Verify subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    // Verify subscription.status === active
    if (subscription.status === "active") {
      // Create booking in database
      // Send email to user
      res.json({
        success: true,
        message: "Payment successful",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment failed",
      });
    }
  }
});

export default handler;
