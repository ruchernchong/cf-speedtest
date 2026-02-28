const UPLOAD_URL = "https://speed.cloudflare.com/__up";

async function measureUploadOnce(
  bytes: number,
): Promise<{ bytes: number; durationMs: number; bps: number }> {
  const body = new Uint8Array(bytes);

  const start = performance.now();
  await fetch(UPLOAD_URL, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
  const end = performance.now();

  const durationMs = end - start;
  const bps = (bytes * 8) / (durationMs / 1000);

  return { bytes, durationMs, bps };
}

export async function measureUpload(
  measurements: Array<{ bytes: number; count: number }>,
): Promise<number[]> {
  const results: number[] = [];

  for (const { bytes, count } of measurements) {
    for (let i = 0; i < count; i++) {
      const result = await measureUploadOnce(bytes);

      if (result.durationMs >= 10) {
        results.push(result.bps);
      }
    }
  }

  return results;
}
