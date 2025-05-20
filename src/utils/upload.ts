import { Buffer } from "node:buffer";
import { CLOUDFLARE_SPEEDTEST_HOSTNAME } from "@/constants";

export const upload = async (bytes: number): Promise<number> => {
  const body = Buffer.alloc(bytes);
  const res = await fetch(
    `https://${CLOUDFLARE_SPEEDTEST_HOSTNAME}/__up?bytes=${bytes}`,
    {
      method: "POST",
      body,
    },
  );

  if (!res.ok) {
    throw new Error(`Upload failed with status ${res.status}`);
  }

  return bytes;
};
