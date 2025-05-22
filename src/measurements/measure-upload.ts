import { Buffer } from "node:buffer";
import { CLOUDFLARE_SPEEDTEST_HOSTNAME } from "@/constants";
import { logUpload } from "@/logger/logger";
import { measureTransfer } from "./measure-transfer";

export const measureUpload = (bytes: number) =>
  measureTransfer(
    async (bytes: number) => {
      const body = Buffer.allocUnsafe(bytes);
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
    },
    bytes,
    logUpload,
  );
