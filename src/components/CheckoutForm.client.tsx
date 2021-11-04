import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import {
  Heading,
  Alert,
  AlertDescription,
  AlertTitle,
  CloseButton,
  AlertIcon,
} from "@chakra-ui/react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

function CheckoutForm({ paymentIntent }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function onSubmit(event) {
    event.preventDefault();

    if (stripe && elements) {
      setLoading(true);
      setError(null);
      const { error } = await stripe.confirmPayment({
        elements: elements,
        // stripe redirects users to this URL once the payment is complete.
        // It also attaches the payment intent id to this URL.
        // You can use it retrieve payment status and show the appropriate UI.
        confirmParams: {
          return_url: "http://localhost:3000/success",
        },
      });

      setLoading(false);

      if (error) {
        console.error(error);
        setError(error.message);
      }
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Heading size="lg" mb="4">
        Payment
      </Heading>
      <Text mb="8">Provide your payment details below</Text>
      <PaymentElement />

      <Button
        disabled={loading || !paymentIntent}
        isFullWidth
        size="md"
        mt="4"
        colorScheme="blue"
        type="submit"
      >
        Pay Now
      </Button>
      {error && (
        <Alert status="error" borderRadius="md" mt="8" flexWrap="wrap" gap="4">
          <AlertIcon />
          <AlertTitle mr={2}>Payment Failed!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}
    </form>
  );
}

export default CheckoutForm;
