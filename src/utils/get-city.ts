import { CLOUDFLARE_SPEEDTEST_HOSTNAME } from "@/constants";
import type { ServerLocation } from "@/types";

export const getCity = async (iata: ServerLocation["iata"]) => {
  const res = await fetch(`https://${CLOUDFLARE_SPEEDTEST_HOSTNAME}/locations`);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const serverLocation = (await res.json()) as ServerLocation[];

  const matchedLocation = serverLocation.find(
    (location) => location.iata === iata,
  );

  if (matchedLocation) {
    return matchedLocation.city;
  }

  return "Unknown Location";
};
