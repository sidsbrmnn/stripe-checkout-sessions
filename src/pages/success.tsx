import { Button } from "@chakra-ui/button";
import { Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { useEffect } from "react";
import { Container } from "../components/Container";
import { stripe } from "../lib/stripe-helpers";

function Success({ status }) {
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (!isClient) return;
    if (status === "succeeded") {
      // This is where you save the booking and payment details to your database.

      // Clear the paymentIntent to avoid future payment errors.
      localStorage.removeItem("paymentIntent");
    }
  }, [status, isClient]);

  return (
    <Container minHeight="100vh" alignItems="center">
      <Stack spacing={8} textAlign="center">
        <Heading>Payment {status}!</Heading>
        {status === "succeeded" && <Text>Your payment was successful!</Text>}
      </Stack>
      <Button href="/" as="a" mt="4" colorScheme="blue">
        Go Home
      </Button>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { status } = await stripe.paymentIntents.retrieve(
    context.query.payment_intent
  );

  console.log(status);

  return {
    props: {
      status,
    },
  };
}

export default Success;
