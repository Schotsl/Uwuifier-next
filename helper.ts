export function formatNumber(number: number) {
  const numberString = number.toString();
  const numberFormatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numberFormatted;
}

export function getValue(
  params: URLSearchParams,
  key: string,
  initial: number,
) {
  const value = params.get(key);
  return value ? parseFloat(value) : initial;
}
