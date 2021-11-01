const cleaningTypes = {
  Standard: 88,
  Special: 138,
  "Super Clean": 228,
  "Move In / Out": 208,
};

const discountTypes = {
  "One Time": 0,
  Weekly: 20,
  "Every 2 weeks": 15,
  "Every 3 weeks": 10,
};

export function calculateTotalPrice(
  bedrooms: string,
  bathrooms: string,
  cleaningType: keyof typeof cleaningTypes,
  interval: "One Time" | "Weekly" | "Every 2 weeks" | "Every 3 weeks"
) {
  const subTotal =
    parseInt(bedrooms, 10) * 20 +
    parseInt(bathrooms, 10) * 20 +
    cleaningTypes[cleaningType];
  const discount = Math.round((subTotal * discountTypes[interval]) / 100);
  const total = subTotal - discount;
  return {
    subTotal,
    discount,
    total,
  };
}
