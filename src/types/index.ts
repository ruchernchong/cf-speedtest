export namespace Stats {
  interface Base {
    average: number;
  }

  export interface Upload extends Base {}
  export interface Download extends Base {}

  export interface Latency extends Base {
    min: number;
    max: number;
    jitter: number;
    packetLoss: number;
    measurements: number[];
  }
}

export interface Metadata {
  h: string;
  ip: string;
  ts: number;
  visit_scheme: string;
  uag: string;
  colo: string;
  sliver: string;
  http: string;
  loc: string;
  tls: string;
  sni: string;
  warp: string;
  gateway: string;
  rbi: string;
  kex: string;
}

export interface ServerLocation {
  iata: string;
  lat: number;
  lon: number;
  cca2: string;
  region: string;
  city: string;
}
