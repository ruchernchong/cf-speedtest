import { styleText } from "node:util";
import type { SpeedTestResults } from "@/types";

function toMbps(bps: number) {
  return (bps / 1_000_000).toFixed(2);
}

export function logServerLocation(colo: string): void {
  console.log(
    styleText(["bold", "blue"], "📍 Server Location:"),
    styleText("green", colo),
  );
}

export function logLatency(ms: number): void {
  console.log(
    styleText(["bold", "cyan"], "🏓 Latency:"),
    styleText("green", `${ms.toFixed(2)}ms`),
  );
}

export function logJitter(ms: number): void {
  console.log(
    styleText(["bold", "cyan"], "📊 Jitter:"),
    styleText("green", `${ms.toFixed(2)}ms`),
  );
}

export function logDownload(bps: number): void {
  console.log(
    styleText(["bold", "yellow"], "⬇️ Download:"),
    styleText("green", `${toMbps(bps)} Mbps`),
  );
}

export function logUpload(bps: number): void {
  console.log(
    styleText(["bold", "magenta"], "⬆️ Upload:"),
    styleText("green", `${toMbps(bps)} Mbps`),
  );
}

export function logResults(results: SpeedTestResults): void {
  logServerLocation(results.serverLocation);
  logLatency(results.latency);
  logJitter(results.jitter);
  logDownload(results.download);
  logUpload(results.upload);
}
