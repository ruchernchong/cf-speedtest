export const convertToMbps = (bytes: number, duration: number) =>
  (bytes * 8) / (duration / 1000) / 1_000_000;
