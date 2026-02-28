import type { Results } from "@cloudflare/speedtest";
import chalk from "chalk";

const toMbps = (bps: number) => (bps / 1_000_000).toFixed(2);

export const logLatency = (ms: number): void => {
  console.log(
    chalk.bold.cyan("🏓 Latency:"),
    chalk.green(`${ms.toFixed(2)}ms`),
  );
};

export const logPacketLoss = (ratio: number | undefined): void => {
  const display = ratio !== undefined ? `${(ratio * 100).toFixed(2)}%` : "N/A";
  console.log(chalk.bold.red("🚫 Packet Loss:"), chalk.red(display));
};

export const logDownload = (bps: number): void => {
  console.log(
    chalk.bold.yellow(`⬇️ Download: ${chalk.green(`${toMbps(bps)} Mbps`)}`),
  );
};

export const logUpload = (bps: number): void => {
  console.log(
    chalk.bold.magenta("⬆️ Upload:"),
    chalk.green(`${toMbps(bps)} Mbps`),
  );
};

export const logResults = (results: Results): void => {
  logLatency(results.getUnloadedLatency());
  logPacketLoss(results.getPacketLoss());
  logDownload(results.getDownloadBandwidth());
  logUpload(results.getUploadBandwidth());
};
