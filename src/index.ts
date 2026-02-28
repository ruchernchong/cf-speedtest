import SpeedTest from "@cloudflare/speedtest";
import { logResults } from "@/logger/logger";

export const runCLI = (): Promise<void> =>
  new Promise((resolve) => {
    let settled = false;

    const speedTest = new SpeedTest({
      measurements: [
        { type: "latency", numPackets: 1 },
        { type: "download", bytes: 1e5, count: 1, bypassMinDuration: true },
        { type: "latency", numPackets: 20 },
        { type: "download", bytes: 1e5, count: 9 },
        { type: "download", bytes: 1e6, count: 8 },
        { type: "upload", bytes: 1e5, count: 8 },
        { type: "upload", bytes: 1e6, count: 6 },
        { type: "download", bytes: 1e7, count: 6 },
        { type: "upload", bytes: 1e7, count: 4 },
        { type: "download", bytes: 2.5e7, count: 4 },
        { type: "upload", bytes: 2.5e7, count: 4 },
        { type: "download", bytes: 1e8, count: 3 },
        { type: "upload", bytes: 5e7, count: 3 },
        { type: "download", bytes: 2.5e8, count: 2 },
      ],
    });

    const finish = (results: import("@cloudflare/speedtest").Results) => {
      if (settled) return;
      settled = true;
      logResults(results);
      resolve();
    };

    speedTest.onFinish = (results) => finish(results);
    speedTest.onError = () => finish(speedTest.results);
  });
