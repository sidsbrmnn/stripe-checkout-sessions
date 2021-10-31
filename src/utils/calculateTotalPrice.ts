const cleaningTypes = {
  Standard: 88,
  Special: 138,
  "Super Clean": 228,
  "Move In / Out": 208,
};

export function calculateTotalPrice(
  bedrooms: string,
  bathrooms: string,
  cleaningType: keyof typeof cleaningTypes
) {
  return (
    parseInt(bedrooms, 10) * 20 +
    parseInt(bathrooms, 10) * 20 +
    cleaningTypes[cleaningType]
  );
}
