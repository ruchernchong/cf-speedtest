export namespace Stats {
  export interface Upload {
    min: number;
    max: number;
    average: number;
    measurements: number[];
  }

  export interface Download {
    min: number;
    max: number;
    average: number;
    measurements: number[];
  }

  export interface Latency {
    min: number;
    max: number;
    average: number;
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
