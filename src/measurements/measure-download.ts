import { logDownload } from "@/logger/download.ts";
import { download } from "@/utils/download";
import { measureBandwidth } from "@/utils/measure-bandwidth.ts";

export const measureDownload = async (bytes: number) => {
  const downloadStats = await measureBandwidth(download, bytes);
  logDownload(downloadStats);
};
