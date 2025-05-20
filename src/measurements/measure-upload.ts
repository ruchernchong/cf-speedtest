import { logUpload } from "@/logger/upload";
import { measureBandwidth } from "@/utils/measure-bandwidth";
import { upload } from "@/utils/upload";

export const measureUpload = async (bytes: number) => {
  const uploadStats = await measureBandwidth(upload, bytes);
  logUpload(uploadStats);
};
