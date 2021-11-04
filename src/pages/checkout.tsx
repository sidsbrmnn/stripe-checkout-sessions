import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CheckoutForm from "../components/CheckoutForm.client";
import { SimpleGrid } from "@chakra-ui/layout";
import CartSummary from "../components/CartSummary";
import { Container } from "../components/Container";

// create stripe promise
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function Checkout() {
  const [paymentIntentId, setPaymentIntent] = useState(
    () =>
      typeof window !== "undefined" &&
      (localStorage.getItem("paymentIntent") || null)
  );
  const router = useRouter().query;

  const { interval, bedrooms, bathrooms, cleaningType } = router;

  const hasWindow = typeof window !== "undefined";

  useEffect(() => {
    if (!hasWindow || !interval || !bedrooms || !bathrooms || !cleaningType) {
      return;
    }

    const paymentIntent =
      paymentIntentId || localStorage.getItem("paymentIntent");

    // avoid generating a new payment intent if one already exists.
    if (!paymentIntent) {
      fetch("/api/bookings/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interval,
          bedrooms,
          bathrooms,
          cleaningType,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(({ data }) => {
          if (
            data.client_secret ||
            data.latest_invoice?.payment_intent?.client_secret
          ) {
            setPaymentIntent(
              data.client_secret ||
                data.latest_invoice?.payment_intent?.client_secret
            );
            // to avoid conflicts with other paymentIntents, we could store it in a map with a hash of the query params.
            localStorage.setItem(
              "paymentIntent",
              data.client_secret ||
                data.latest_invoice?.payment_intent?.client_secret
            );
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [interval, bedrooms, bathrooms, cleaningType, hasWindow]);

  return (
    <Container px={{ base: "8", md: "48" }} py="8" minHeight="100vh">
      {paymentIntentId && (
        <Elements
          stripe={stripePromise}
          options={{
            appearance: { theme: "stripe" },
            clientSecret: paymentIntentId,
            fonts: [
              {
                cssSrc: "https://fonts.googleapis.com/css?family=Inter",
              },
            ],
          }}
        >
          <SimpleGrid columns={[1, 1, 2]} columnGap="8">
            <CheckoutForm paymentIntent={paymentIntentId} />
            <CartSummary
              interval={interval}
              bathrooms={bathrooms}
              bedrooms={bedrooms}
              cleaningType={cleaningType}
            />
          </SimpleGrid>
        </Elements>
      )}
    </Container>
  );
}

export default Checkout;
