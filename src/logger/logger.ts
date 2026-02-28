import { styleText } from "node:util";
import type { Results } from "@cloudflare/speedtest";

function toMbps(bps: number) {
  return (bps / 1_000_000).toFixed(2);
}

export function logLatency(ms: number): void {
  console.log(
    styleText(["bold", "cyan"], "🏓 Latency:"),
    styleText("green", `${ms.toFixed(2)}ms`),
  );
}

export function logPacketLoss(ratio: number | undefined): void {
  const display = ratio !== undefined ? `${(ratio * 100).toFixed(2)}%` : "N/A";
  console.log(
    styleText(["bold", "red"], "🚫 Packet Loss:"),
    styleText("red", display),
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

export function logResults(results: Results): void {
  logLatency(results.getUnloadedLatency());
  logPacketLoss(results.getPacketLoss());
  logDownload(results.getDownloadBandwidth());
  logUpload(results.getUploadBandwidth());
}
