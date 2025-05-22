#!/usr/bin/env node
import { FILE_SIZE } from "@/constants";
import { logLatency } from "./logger/latency";
import { logPacketLoss } from "./logger/packet-loss";
import { logServerLocation } from "./logger/server-location";
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

  await Promise.all([measureDownload(FILE_SIZE), measureUpload(FILE_SIZE)]);
};

runCLI();
