import { CLOUDFLARE_SPEEDTEST_HOSTNAME } from "@/constants";
import type { Metadata } from "@/types";

const parseToJson = <T = Record<string, string>>(text: string): T => {
  const lines = text.split("\n");

  const result: Record<string, string> = {};
  for (const line of lines) {
    const [key, value] = line.split("=");
    if (key && value) {
      result[key] = value;
    }
  }

  return result as T;
};

export const connectionMetadata = async (): Promise<Metadata> => {
  const res = await fetch(
    `https://${CLOUDFLARE_SPEEDTEST_HOSTNAME}/cdn-cgi/trace`,
  ).then((res) => res.text());

  return parseToJson<Metadata>(res);
};
