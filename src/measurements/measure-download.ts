import { convertToMbps } from "@/utils/convert-to-mbps";
import { download } from "@/utils/download";

export interface DownloadStats {
  min: number;
  max: number;
  average: number;
  measurements: number[];
}

export const measureDownload = async (
  bytes: number,
  iterations: number,
): Promise<DownloadStats> => {
  const measurements: number[] = [];

  for (let i = 0; i < iterations; i++) {
    try {
      const start = performance.now();
      const total = await download(bytes);
      const duration = performance.now() - start;
      const speed = convertToMbps(total, duration);
      measurements.push(speed);
    } catch (error) {
      console.error("Error measuring download:", error);
    }
  }

  const min = Math.min(...measurements);
  const max = Math.max(...measurements);
  const sum = measurements.reduce((acc, val) => acc + val, 0);
  const average = measurements.length > 0 ? sum / measurements.length : 0;
  return { min, max, average, measurements };
};
