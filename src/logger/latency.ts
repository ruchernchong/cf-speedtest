import type { Stats } from "@/types";
import chalk from "chalk";

export const logLatency = ({ average }: Stats.Latency) => {
  console.log(
    chalk.bold.cyan("🏓 Latency:"),
    `${chalk.green(average.toFixed(2))} ${chalk.dim("ms")}`,
  );
};
