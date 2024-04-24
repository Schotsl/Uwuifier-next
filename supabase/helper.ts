// Bit of a hacky way to fetch Plausible but I couldn't get it too work in my Plausible package
export async function fetchPlausible(metric: string) {
  const plausibleKey = Deno.env.get("PLAUSIBLE_KEY");
  const plausibleHost = Deno.env.get("PLAUSIBLE_HOST");
  const plausibleDomain = Deno.env.get("PLAUSIBLE_DOMAIN");

  if (!plausibleKey || !plausibleHost || !plausibleDomain) {
    throw new Error("Missing required environment variables");
  }

  const encodedMetric = encodeURIComponent(metric);

  const plausibleUrl =
    `${plausibleHost}/api/v1/stats/breakdown?site_id=${plausibleDomain}&period=30d&property=event:props:method&filters=event:name%3D%3D${encodedMetric}&metrics=events`;

  const plausibleResponse = await fetch(plausibleUrl, {
    headers: {
      Authorization: `Bearer ${plausibleKey}`,
    },
  });

  if (!plausibleResponse.ok) {
    throw new Error(`API responded with status: ${plausibleResponse.status}`);
  }

  const plausibleParsed = await plausibleResponse.json();
  const plausibleValue = plausibleParsed.results.length > 0
    ? plausibleParsed.results[0].events
    : 0;

  return plausibleValue;
}
