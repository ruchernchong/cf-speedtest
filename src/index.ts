import { logResults } from "@/logger";
import { measureDownload } from "@/measurements/download";
import { measureLatency } from "@/measurements/latency";
import { measureUpload } from "@/measurements/upload";
import { getServerLocation } from "@/utils/location";
import { percentile } from "@/utils/stats";

const DOWNLOAD_MEASUREMENTS = [
  { bytes: 1e5, count: 1, bypassMinDuration: true }, // warmup
  { bytes: 1e5, count: 9 },
  { bytes: 1e6, count: 8 },
  { bytes: 1e7, count: 6 },
  { bytes: 2.5e7, count: 4 },
  { bytes: 1e8, count: 3 },
  { bytes: 2.5e8, count: 2 },
];

const UPLOAD_MEASUREMENTS = [
  { bytes: 1e5, count: 8 },
  { bytes: 1e6, count: 6 },
  { bytes: 1e7, count: 4 },
  { bytes: 2.5e7, count: 4 },
  { bytes: 5e7, count: 3 },
];

export async function runCLI(): Promise<void> {
  const location = await getServerLocation();
  await measureLatency(1); // probe
  const { latency, jitter } = await measureLatency(20);
  const downloadSamples = await measureDownload(DOWNLOAD_MEASUREMENTS);
  const uploadSamples = await measureUpload(UPLOAD_MEASUREMENTS);

  logResults({
    latency,
    jitter,
    download: percentile(downloadSamples, 90),
    upload: percentile(uploadSamples, 90),
    serverLocation: location.colo,
  });
}
