export function formatNumber(number: number) {
  const numberString = number.toString();
  const numberFormatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numberFormatted;
}