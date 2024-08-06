export function formatNumber(number: number) {
  const numberString = number.toString();
  const numberFormatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numberFormatted;
}

export function roundNumber(number: number, precision = 0) {
  const factor = Math.pow(10, precision);
  const rounded = Math.round(number * factor) / factor;

  return rounded;
}

export function getValue<T extends string | number | boolean>(
  params: URLSearchParams,
  key: string,
  initial: T,
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
  params: URLSearchParams,
  name: string,
  value?: string | number | boolean,
) {
  const searchParams = new URLSearchParams(params.toString());

  if (value === undefined) {
    searchParams.delete(name);
  } else {
    searchParams.set(name, value.toString());
  }

  return searchParams;
}

export function setValues(
  params: URLSearchParams,
  values: { name: string; value: string | number | boolean | undefined }[],
) {
  let updated = params;

  for (const { name, value } of values) {
    updated = setValue(updated, name, value);
  }

  return updated;
}
