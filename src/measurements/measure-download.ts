import https from "node:https";
import { CLOUDFLARE_SPEEDTEST_HOSTNAME } from "@/constants";
import { logDownload } from "@/logger/download";
import { measureTransfer } from "./measure-transfer";

const download = (bytes: number): Promise<number> =>
  new Promise((resolve, reject) => {
    const options = {
      hostname: CLOUDFLARE_SPEEDTEST_HOSTNAME,
      path: `/__down?bytes=${bytes}`,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Download failed with status ${res.statusCode}`));
        return;
      }

      let total = 0;
      res.on("data", (chunk) => {
        total += chunk.length;
      });

      res.on("end", () => {
        resolve(total);
      });
    });

    req.on("error", (error) => reject(new Error(error.message)));
    req.end();
  });

export const measureDownload = (bytes: number) =>
  measureTransfer(download, bytes, logDownload);
