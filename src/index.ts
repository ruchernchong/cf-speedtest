import { logDownload } from "./logger/download";
import { logLatency } from "./logger/latency";
import { logPacketLoss } from "./logger/packet-loss";
import { logServerLocation } from "./logger/server-location";
import { logUpload } from "./logger/upload";
import { measureDownload } from "./measurements/measure-download";
import { measureLatency } from "./measurements/measure-latency";
import { measureUpload } from "./measurements/measure-upload";
import { connectionMetadata } from "./utils/connection-metadata";
import { getCity } from "./utils/get-city";

export const runCLI = async () => {
  const [latencyStats, metadata] = await Promise.all([
    measureLatency(),
    connectionMetadata(),
  ]);

  const { colo, ip } = metadata;
  const city = await getCity(colo);
  logServerLocation(city, ip);
  logLatency(latencyStats);
  logPacketLoss(latencyStats.packetLoss);

  const downloadStats = await measureDownload(100001000, 1);
  logDownload(downloadStats);

  const uploadStats = await measureUpload(100001000, 1);
  logUpload(uploadStats);
};
