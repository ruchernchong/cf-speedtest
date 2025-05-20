import type { Stats } from "@/types";
import chalk from "chalk";

export const logDownload = ({ average }: Stats.Download) => {
  console.log(
    chalk.bold.yellow(
      "⬇️ Download:",
      `${chalk.green(average.toFixed(2), "Mbps")}`,
    ),
  );
};
