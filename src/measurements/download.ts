import { get } from "node:https";

const DOWNLOAD_URL = "https://speed.cloudflare.com/__down";

function measureDownloadOnce(
  bytes: number,
): Promise<{ bytes: number; durationMs: number; bps: number }> {
  const url = `${DOWNLOAD_URL}?bytes=${bytes}`;

  return new Promise((resolve, reject) => {
    const start = performance.now();

    get(url, (res) => {
      let received = 0;
      res.on("data", (chunk: Buffer) => {
        received += chunk.length;
      });
      res.on("end", () => {
        const durationMs = performance.now() - start;
        const bps = (received * 8) / (durationMs / 1000);
        resolve({ bytes: received, durationMs, bps });
      });
      res.on("error", reject);
    }).on("error", reject);
  });
}

export async function measureDownload(
  measurements: Array<{
    bytes: number;
    count: number;
    bypassMinDuration?: boolean;
  }>,
): Promise<number[]> {
  const results: number[] = [];

  for (const { bytes, count, bypassMinDuration } of measurements) {
    for (let i = 0; i < count; i++) {
      const result = await measureDownloadOnce(bytes);

      if (bypassMinDuration || result.durationMs >= 10) {
        results.push(result.bps);
      }
    }
  }

  return results;
}
