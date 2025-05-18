export const measureSpeed = (bytes: number, duration: number) =>
  (bytes * 8) / (duration / 1000) / 1e6;
