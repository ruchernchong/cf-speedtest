import type { Stats } from "@/types";
import { convertToMbps } from "./convert-to-mbps";

/**
 * Measures bandwidth (download or upload) by invoking the provided function
 * once and computing throughput in Mbps.
 *
 * @param fn - Function that performs transfer and resolves with bytes transferred
 * @param bytes - Number of bytes to transfer
 * @returns Promise resolving to Stats.Download or Stats.Upload
 */
export const measureBandwidth = async <
  Stat extends Stats.Download | Stats.Upload,
>(
  fn: (bytes: number) => Promise<number>,
  bytes: number,
): Promise<Stat> => {
  const start = performance.now();
  const transferred = await fn(bytes);
  const duration = performance.now() - start;
  const average = convertToMbps(transferred, duration);
  return { average } as Stat;
};
