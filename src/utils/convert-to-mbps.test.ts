import { expect, it } from "vitest";
import { convertToMbps } from "./convert-to-mbps";

it("should return 0 Mbps when 0 bytes transferred", () => {
  expect(convertToMbps(0, 1000)).toBe(0);
});

it("should calculate the correct Mbps for standard transfers", () => {
  expect(convertToMbps(125_000, 1000)).toBe(1);
  expect(convertToMbps(1_000_000, 1000)).toBe(8);
  expect(convertToMbps(500_000, 2000)).toBe(2);
});

it("should handle sub-second durations correctly", () => {
  expect(convertToMbps(1_000_000, 500)).toBe(16);
});
