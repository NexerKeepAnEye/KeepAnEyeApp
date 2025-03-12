export const formatValue = (value: number) => {
  const decimalPart = value % 1;
  if (decimalPart === 0) {
    return value.toFixed(0);
  }
  return value.toFixed(2);
};
