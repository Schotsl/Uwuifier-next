import { ReadonlyURLSearchParams } from "next/navigation";

export function formatNumber(number: number) {
  const numberString = number.toString();
  const numberFormatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numberFormatted;
}

export function getValue<T extends string | number | boolean>(
  params: URLSearchParams,
  key: string,
  initial: T
): T {
  const value = params.get(key);

  if (value === null) {
    return initial;
  }

  if (typeof initial === "boolean") {
    const valueParsed = value === "true";
    return valueParsed as T;
  }

  if (typeof initial === "number") {
    const valueParsed = parseFloat(value);
    const valueSafe = isNaN(valueParsed) ? initial : valueParsed;
    return valueSafe as T;
  }

  return value as T;
}

export function setValue(
  params: ReadonlyURLSearchParams,
  key: string,
  value?: string | number | boolean
) {
  const searchParams = new URLSearchParams(params.toString());

  if (value === undefined) {
    searchParams.delete(key);
  } else {
    searchParams.set(key, value.toString());
  }

  return searchParams;
}
