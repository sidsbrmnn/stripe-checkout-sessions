import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, SimpleGrid, Heading, Text, Stack } from "@chakra-ui/layout";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { Select } from "@chakra-ui/select";
import { ChangeEvent } from "react";

function CleaningForm({ dispatch, cleaningType, bathrooms, bedrooms }) {
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
        <SimpleGrid columns={[1, 1, 2]} spacing={8}>
          <Stack spacing="4">
            <Heading whiteSpace="nowrap" fontWeight="semibold">
              Welcome to the Cleaning Service
            </Heading>
            <Text>
              Please enter the number of bathrooms, bedrooms, and the type of
              cleaning you would like to have done.
            </Text>
          </Stack>
        </SimpleGrid>
      </Box>
      <form method="post">
        <FormControl id="bedrooms">
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
        <FormControl id="cleaningType" mt="4">
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
      </form>
    </div>
  );
}

export default CleaningForm;
