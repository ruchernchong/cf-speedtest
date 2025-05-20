import { logUpload } from "@/logger/upload.ts";
import { measureBandwidth } from "@/utils/measure-bandwidth.ts";
import { upload } from "@/utils/upload";

export const measureUpload = async (bytes: number) => {
  const uploadStats = await measureBandwidth(upload, bytes);
  logUpload(uploadStats);
};
