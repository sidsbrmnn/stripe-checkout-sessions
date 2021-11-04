import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, Heading, Text, Stack } from "@chakra-ui/layout";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { Button } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { ChangeEvent } from "react";

function CleaningForm({
  dispatch,
  cleaningType,
  bathrooms,
  bedrooms,
  interval,
}: {
  dispatch: React.Dispatch<{
    type: string;
    payload: string | number;
  }>;
  cleaningType: string | number;
  bathrooms: string | number;
  bedrooms: string | number;
  interval: string | number;
}) {
  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target as HTMLSelectElement;

    dispatch({ type: name, payload: value });
  }

  function handleInputChange(type: string, value: number | string) {
    dispatch({ type: type, payload: value });
  }

  return (
    <div>
      <Box mb="8">
        <Stack spacing="4">
          <Heading whiteSpace="nowrap" fontWeight="semibold">
            Welcome to the Cleaning Service
          </Heading>
          <Text>
            Please enter the number of bathrooms, bedrooms, and the type of
            cleaning you would like to have done.
          </Text>
        </Stack>
      </Box>
      <form action="checkout">
        <FormControl defaultValue={bedrooms} id="bedrooms">
          <FormLabel htmlFor="bedrooms">Bedrooms</FormLabel>
          <NumberInput
            onChange={(value) => handleInputChange("bedrooms", value)}
            name="bedrooms"
            min={1}
            max={5}
            defaultValue={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl defaultValue={bathrooms} id="bathrooms" mt="4">
          <FormLabel htmlFor="bathrooms">Bathrooms</FormLabel>
          <NumberInput
            onChange={(value) => handleInputChange("bathrooms", value)}
            name="bathrooms"
            min={1}
            max={5}
            defaultValue={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl defaultValue={cleaningType} id="cleaningType" mt="4">
          <FormLabel htmlFor="cleaningType">Select the cleaning type</FormLabel>
          <Select
            onChange={handleSelectChange}
            name="cleaningType"
            defaultValue="standard"
          >
            <option value="Standard">Standard</option>
            <option value="Special">Special</option>
            <option value="Super Clean">Super Clean</option>
            <option value="Move In / Out">Move In / Out</option>
          </Select>
        </FormControl>
        <FormControl defaultValue={interval} id="interval" mt="4">
          <FormLabel htmlFor="interval">Select the interval</FormLabel>
          <Select
            onChange={handleSelectChange}
            name="interval"
            defaultValue="One Time"
          >
            <option value="One Time">One Time</option>
            <option value="Weekly">Weekly (20% off)</option>
            <option value="Every 2 weeks">Every 2 weeks (15% off)</option>
            <option value="Every 3 weeks">Every 3 weeks (10% off)</option>
          </Select>
        </FormControl>
        <Button type="submit" mt="8" colorScheme="blue">
          Proceed to Pay
        </Button>
      </form>
    </div>
  );
}

export default CleaningForm;
