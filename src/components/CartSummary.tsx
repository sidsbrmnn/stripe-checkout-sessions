import { Box, Divider, Heading, Stack, Text } from "@chakra-ui/layout";
import { calculateTotalPrice } from "../utils/calculateTotalPrice";

function CartSummary({ bedrooms, bathrooms, cleaningType, interval }) {
  const { discount, subTotal, total } = calculateTotalPrice(
    bedrooms,
    bathrooms,
    cleaningType,
    interval
  );

  return (
    <div>
      <Stack spacing={4}>
        <Heading size="lg">Cart Summary</Heading>
        <Text>Here's a breakdown of charges for this cleaning service.</Text>
      </Stack>
      <Stack
        spacing="4"
        mt="12"
        bgColor="gray.100"
        px={4}
        py={8}
        borderRadius="xl"
      >
        <Box display="flex" justifyContent="space-between">
          <Text>Bedrooms</Text>
          <Text fontWeight="medium">{bedrooms}</Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text>Bathrooms</Text>
          <Text fontWeight="medium">{bathrooms}</Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text>Cleaning Type</Text>
          <Text fontWeight="medium">{cleaningType}</Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text>Interval</Text>
          <Text fontWeight="medium">{interval}</Text>
        </Box>
        <Divider borderColor="gray.400" />
        <Box display="flex" justifyContent="space-between">
          <Text>Sub-Total</Text>
          <Text fontWeight="medium">${subTotal}</Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Text>Discount</Text>
          <Text fontWeight="medium">-${discount}</Text>
        </Box>
        <Divider borderColor="gray.400" />
        <Box display="flex" justifyContent="space-between">
          <Text>Total</Text>
          <Text fontWeight="medium">${total}</Text>
        </Box>
      </Stack>
    </div>
  );
}

export default CartSummary;
