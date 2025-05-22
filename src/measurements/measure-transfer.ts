import type { Stats } from "@/types";
import { measureBandwidth } from "@/utils/measure-bandwidth";

/**
 * Generic helper to measure transfer performance and log results.
 *
 * @param handler - Function performing bytes transfer, resolves with bytes transferred
 * @param bytes - Number of bytes to transfer
 * @param logger - Function to log the resulting stats
 * @returns The measured stats (average throughput, in Mbps)
 */
export const measureTransfer = async <T extends Stats.Download | Stats.Upload>(
  handler: (bytes: number) => Promise<number>,
  bytes: number,
  logger: (stats: T) => void,
): Promise<T> => {
  const stats = (await measureBandwidth(handler, bytes)) as T;
  logger(stats);
  return stats;
};
