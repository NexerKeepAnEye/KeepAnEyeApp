export const formatValue = (value: number) => {
  if (isNaN(value)) {
    return null;
  }
  if (value === null) {
    return null;
  }
  const decimalPart = value % 1;
  if (decimalPart === 0) {
    return value.toFixed(0);
  }
  return value.toFixed(2);
};
