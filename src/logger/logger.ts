import chalk from "chalk";
import type { Stats } from "@/types";

export const logServerLocation = (city: string, ip: string): void => {
  console.log(chalk.bold.green("🌐 Server Location:"));
  console.log(`${chalk.blue("City     :")} ${chalk.green(city)}`);
  console.log(`${chalk.blue("Public IP:")} ${chalk.green(ip)}`);
};

export const logLatency = (stats: Stats.Latency): void => {
  const { average, packetLoss } = stats;
  console.log(
    chalk.bold.cyan("🏓 Latency:"),
    `${chalk.green(`${average.toFixed(2)}ms`)}`,
  );
  console.log(
    chalk.bold.red("🚫 Packet Loss:"),
    `${chalk.red(`${packetLoss.toFixed(2)}%`)}`,
  );
};

export const logDownload = ({ average }: Stats.Download) => {
  console.log(
    chalk.bold.yellow(
      "⬇️ Download:",
      `${chalk.green(average.toFixed(2), "Mbps")}`,
    ),
  );
};

export const logUpload = ({ average }: Stats.Upload): void => {
  console.log(
    chalk.bold.magenta("⬆️ Upload:"),
    `${chalk.green(average.toFixed(2), "Mbps")}`,
  );
};
