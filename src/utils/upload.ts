import { Buffer } from "node:buffer";

export const upload = async (bytes: number): Promise<number> => {
  const body = Buffer.alloc(bytes);
  const response = await fetch(
    `https://speed.cloudflare.com/__up?bytes=${bytes}`,
    {
      method: "POST",
      body,
    },
  );

  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`);
  }

  return bytes;
};
