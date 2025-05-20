import { logDownload } from "@/logger/download";
import { download } from "@/utils/download";
import { measureBandwidth } from "@/utils/measure-bandwidth";

export const measureDownload = async (bytes: number) => {
  const downloadStats = await measureBandwidth(download, bytes);
  logDownload(downloadStats);
};
