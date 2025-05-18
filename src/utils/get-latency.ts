import { download } from "./download.ts";

export const getLatency = async () => {
  const measurements: number[] = [];

  for (let i = 0; i < 20; i += 1) {
    await download(1000).then(
      (response) => {
        measurements.push(response[4] - response[0] - response[6]);
      },
      (error) => {
        console.log(`Error: ${error}`);
      },
    );
  }

  return [Math.min(...measurements), Math.max(...measurements)];
};
