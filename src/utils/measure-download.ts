import { download } from "./download.ts";
import { measureSpeed } from "./measure-speed.ts";

export const measureDownload = async (bytes: number, iterations: number) => {
  const measurements: number[] = [];

  for (let i = 0; i < iterations; i += 1) {
    await download(bytes).then(
      (response) => {
        console.log(response);
        const transferTime = response[5] - response[4];
        measurements.push(measureSpeed(bytes, transferTime));
      },
      (error) => {
        console.log(`Error: ${error}`);
      },
    );
  }

  return measurements;
};
