import chalk from "chalk";

/**
 * Logs the server location for the speed test.
 *
 * @param city - The city name of the server location.
 * @param ip - The IP address of the server location.
 */
export const logServerLocation = (city: string, ip: string): void => {
  console.log(chalk.bold.green("🌐 Server Location:"));
  console.log(`${chalk.blue("City     :")} ${chalk.green(city)}`);
  console.log(`${chalk.blue("Public IP:")} ${chalk.green(ip)}`);
};
