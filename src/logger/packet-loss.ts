import chalk from "chalk";

export const logPacketLoss = (packetLoss: number) => {
  console.log(
    chalk.bold.red("🚫 Packet Loss:", `${chalk.red(packetLoss.toFixed(2))}%`),
  );
};
