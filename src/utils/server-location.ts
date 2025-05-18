export interface ServerLocationResponse {
  iata: string;
  lat: number;
  lon: number;
  cca2: string;
  region: string;
  city: string;
}

export type ServerLocation = {
  [key: ServerLocationResponse["iata"]]: ServerLocationResponse["city"];
};

export const serverLocation = async () => {
  const res = (await fetch("https://speed.cloudflare.com/locations").then(
    (res) => res.json(),
  )) as ServerLocationResponse[];

  return res.reduce<ServerLocation>((acc, { iata, city }) => {
    const data: ServerLocation = acc;

    data[iata] = city;
    return data;
  }, {});
};
