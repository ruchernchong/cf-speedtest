import type { DownloadStats } from "@/measurements/measure-download.ts";
import chalk from "chalk";

export const logDownload = ({ average }: DownloadStats): void => {
  console.log(
    chalk.bold.yellow(
      "⬇️ Download:",
      `${chalk.green(average.toFixed(2), "Mbps")}`,
    ),
  );
};
