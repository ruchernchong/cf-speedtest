import type { LatencyStats } from "@/measurements/measure-latency";
import chalk from "chalk";

export const logLatency = ({ average }: LatencyStats) => {
  console.log(
    chalk.bold.cyan("🏓 Latency:"),
    `${chalk.green(average.toFixed(2))} ${chalk.dim("ms")}`,
  );
};
