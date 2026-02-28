import { jitter, percentile } from "@/utils/stats";

const TRACE_URL = "https://speed.cloudflare.com/api/v1/trace";

async function measurePing(): Promise<number> {
  const start = performance.now();
  await fetch(TRACE_URL, { method: "HEAD" });
  const end = performance.now();

  return end - start;
}

export async function measureLatency(
  numPackets: number,
): Promise<{ latency: number; jitter: number }> {
  const pings: number[] = [];

  for (let i = 0; i < numPackets; i++) {
    const ping = await measurePing();
    pings.push(ping);
  }

  return {
    latency: percentile(pings, 50),
    jitter: jitter(pings),
  };
}
