import { logLatency } from "./logger/latency.ts";
import { connectionMetadata } from "./utils/connection-metadata.ts";
import { getLatency } from "./utils/get-latency.ts";
import { measureDownload } from "./utils/measure-download.ts";
import { serverLocation } from "./utils/server-location.ts";

export const runCLI = async () => {
  const [latency, location, metadata] = await Promise.all([
    getLatency(),
    serverLocation(),
    connectionMetadata(),
  ]);
  console.log(latency);
  const { colo, ip, loc } = metadata;
  const city = location[colo];
  console.log(city);

  const downloadSpeed = await measureDownload(100001000, 1);
  console.log("100MB", downloadSpeed);

  // const [, , cmd, ...args] = argv;
  //
  // if (cmd === "--version" || cmd === "-v") {
  //   console.log(`v${version}`);
  //   return;
  // }
  //
  // if (cmd === "--help" || cmd === "-h") {
  //   printHelp();
  //   return;
  // }
  //
  // if (cmd === "hello") {
  //   await helloCommand(args);
  //   return;
  // }

  // const speedTest = new SpeedTest();
  // speedTest.onFinish = (results) => console.log(results.getSummary());
};
