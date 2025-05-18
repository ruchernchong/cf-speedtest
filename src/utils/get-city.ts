export interface ServerLocation {
  iata: string;
  lat: number;
  lon: number;
  cca2: string;
  region: string;
  city: string;
}

export const getCity = async (iata: string) => {
  const response = await fetch("https://speed.cloudflare.com/locations");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const serverLocation = (await response.json()) as ServerLocation[];

  const matchedLocation = serverLocation.find(
    (location) => location.iata === iata,
  );

  if (matchedLocation) {
    return matchedLocation.city;
  }

  return "Unknown Location";
};
