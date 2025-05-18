import { convertToMbps } from "@/utils/convert-to-mbps";
import { upload } from "@/utils/upload";

export interface UploadStats {
  min: number;
  max: number;
  average: number;
  measurements: number[];
}

export const measureUpload = async (
  bytes: number,
  iterations: number,
): Promise<UploadStats> => {
  const measurements: number[] = [];

  for (let i = 0; i < iterations; i++) {
    try {
      const start = performance.now();
      const total = await upload(bytes);
      const duration = performance.now() - start;
      const speed = convertToMbps(total, duration);
      measurements.push(speed);
    } catch (error) {
      console.error("Error measuring upload:", error);
    }
  }

  const min = Math.min(...measurements);
  const max = Math.max(...measurements);
  const sum = measurements.reduce((acc, val) => acc + val, 0);
  const average = measurements.length > 0 ? sum / measurements.length : 0;
  return { min, max, average, measurements };
};
