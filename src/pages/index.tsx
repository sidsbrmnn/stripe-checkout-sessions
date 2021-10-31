import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Grid, GridItem } from "@chakra-ui/layout";
import { useReducer } from "react";
import CartSummary from "../components/CartSummary";
import CleaningForm from "../components/CleaningForm";

import { Container } from "../components/Container";

const initialValues = {
  bathrooms: 1,
  bedrooms: 1,
  cleaningType: "Standard",
};

// reducer function to update number of bathrooms, bedrooms, and cleaning type
function cartReducer(
  state = initialValues,
  action: { type: string; payload: string | number }
) {
  switch (action.type) {
    case "bathrooms":
      return {
        ...state,
        bathrooms: action.payload,
      };
    case "bedrooms":
      return {
        ...state,
        bedrooms: action.payload,
      };
    case "cleaningType":
      return {
        ...state,
        cleaningType: action.payload,
      };
    default:
      return state;
  }
}

const Index = () => {
  const [state, dispatch] = useReducer(cartReducer, initialValues);

  return (
    <div>
      <Container minHeight="100vh" px="24">
        {/* Form to collect number of bathrooms, bedrooms, and cleaning type */}
        <Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }} gap="16">
          <GridItem span={8}>
            <CleaningForm {...state} dispatch={dispatch} />
          </GridItem>
          <GridItem span={4}>
            <CartSummary {...state} />
          </GridItem>
        </Grid>
      </Container>
    </div>
  );
};

export default Index;
