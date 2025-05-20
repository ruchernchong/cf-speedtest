import type { Stats } from "@/types";
import chalk from "chalk";

export const logUpload = ({ average }: Stats.Upload): void => {
  console.log(
    chalk.bold.magenta("⬆️ Upload:"),
    `${chalk.green(average.toFixed(2), "Mbps")}`,
  );
};
