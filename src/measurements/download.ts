const DOWNLOAD_URL = "https://speed.cloudflare.com/api/raw";

async function measureDownloadOnce(
  bytes: number,
): Promise<{ bytes: number; durationMs: number; bps: number }> {
  const url = `${DOWNLOAD_URL}?bytes=${bytes}&iterations=1&flushIter=true`;

  const start = performance.now();
  const response = await fetch(url);
  await response.arrayBuffer();
  const end = performance.now();

  const durationMs = end - start;
  const bps = (bytes * 8) / (durationMs / 1000);

  return { bytes, durationMs, bps };
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
