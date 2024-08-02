const PLAUSIBLE_KEY = process.env.PLAUSIBLE_KEY!;
const PLAUSIBLE_HOST = process.env.PLAUSIBLE_HOST!;
const PLAUSIBLE_DOMAIN = process.env.PLAUSIBLE_DOMAIN!;

if (!PLAUSIBLE_KEY) {
  throw new Error("PLAUSIBLE_KEY is missing from the environment variables");
}

if (!PLAUSIBLE_HOST) {
  throw new Error("PLAUSIBLE_HOST is missing from the environment variables");
}

if (!PLAUSIBLE_DOMAIN) {
  throw new Error("PLAUSIBLE_DOMAIN is missing from the environment variables");
}

// Bit of a hacky way to fetch Plausible but I couldn't get it too work in my Plausible package
export async function fetchPlausible(metric: string) {
  const encodedMetric = encodeURIComponent(metric);

  const plausibleUrl = `${PLAUSIBLE_HOST}/api/v1/stats/breakdown?site_id=${PLAUSIBLE_DOMAIN}&period=30d&property=event:props:method&filters=event:name%3D%3D${encodedMetric}&metrics=events`;
  const plausibleResponse = await fetch(plausibleUrl, {
    headers: {
      Authorization: `Bearer ${PLAUSIBLE_KEY}`,
    },
  });

  if (!plausibleResponse.ok) {
    throw new Error(`API responded with status: ${plausibleResponse.status}`);
  }

  const plausibleParsed = await plausibleResponse.json();
  const plausibleValue =
    plausibleParsed.results.length > 0 ? plausibleParsed.results[0].events : 0;

  return plausibleValue;
}
