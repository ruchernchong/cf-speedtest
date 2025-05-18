import type { UploadStats } from "@/measurements/measure-upload.ts";
import chalk from "chalk";

export const logUpload = ({ average }: UploadStats): void => {
  console.log(
    chalk.bold.magenta("⬆️ Upload:"),
    `${chalk.green(average.toFixed(2), "Mbps")}`,
  );
};
