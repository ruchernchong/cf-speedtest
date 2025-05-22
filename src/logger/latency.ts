import type { Stats } from "@/types";
import chalk from "chalk";

export const logLatency = (stats: Stats.Latency): void => {
  const { average, packetLoss } = stats;
  console.log(
    chalk.bold.cyan("🏓 Latency:"),
    `${chalk.green(average.toFixed(2))} ${chalk.dim("ms")}`,
  );
  console.log(
    chalk.bold.red("🚫 Packet Loss:"),
    `${chalk.red(packetLoss.toFixed(2))}%`,
  );
};
