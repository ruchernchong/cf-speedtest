import type { Stats } from "@/types";

export const measureLatency = async (runs = 20): Promise<Stats.Latency> => {
  const url = "https://speed.cloudflare.com/cdn-cgi/trace";
  const measurements: number[] = [];

  for (let i = 0; i < runs; i++) {
    try {
      const start = performance.now();
      await fetch(url, { method: "HEAD" });
      const duration = performance.now() - start;
      measurements.push(duration);
    } catch (error) {
      console.error("Error measuring latency:", error);
    }
  }

  const latencies = measurements;
  const sum = latencies.reduce((acc, latency) => acc + latency, 0);
  const average = sum / latencies.length;
  const diffs = latencies
    .slice(1)
    .map((v, i) => Math.abs(v - (latencies[i] ?? 0)));
  const jitter = diffs.length
    ? diffs.reduce((acc, diff) => acc + diff, 0) / diffs.length
    : 0;

  const lost = runs - measurements.length;
  const packetLoss = (lost / runs) * 100;

  return { average, jitter, packetLoss, measurements: latencies };
};
