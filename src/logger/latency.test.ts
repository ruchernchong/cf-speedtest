import type { Stats } from "@/types";
import chalk from "chalk";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { logLatency } from "./latency";

vi.mock("chalk", () => ({
  default: {
    bold: {
      cyan: vi.fn((str) => `bold.cyan(${str})`),
      red: vi.fn((str) => `bold.red(${str})`),
    },
    green: vi.fn((value) => `green(${value})`),
    dim: vi.fn((unit) => `dim(${unit})`),
    red: vi.fn((value) => `red(${value})`),
  },
}));

describe("logLatency", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log latency and packet loss with correct formatting", () => {
    const stats: Stats.Latency = {
      average: 45.678,
      min: 40,
      max: 50,
      jitter: 10,
      packetLoss: 1.234,
      measurements: [],
    };

    logLatency(stats);

    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenNthCalledWith(
      1,
      "bold.cyan(🏓 Latency:)",
      "green(45.68) dim(ms)",
    );
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      "bold.red(🚫 Packet Loss:)",
      "red(1.23)%",
    );
  });

  it("should round values to 2 decimal places", () => {
    const stats: Stats.Latency = {
      average: 10.999,
      min: 9,
      max: 12,
      jitter: 3,
      packetLoss: 0.005,
      measurements: [],
    };

    logLatency(stats);

    expect(console.log).toHaveBeenNthCalledWith(
      1,
      "bold.cyan(🏓 Latency:)",
      "green(11.00) dim(ms)",
    );
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      "bold.red(🚫 Packet Loss:)",
      "red(0.01)%",
    );
  });

  it("should handle zero values", () => {
    const stats: Stats.Latency = {
      average: 0,
      min: 0,
      max: 0,
      jitter: 0,
      packetLoss: 0,
      measurements: [],
    };

    logLatency(stats);

    expect(console.log).toHaveBeenNthCalledWith(
      1,
      "bold.cyan(🏓 Latency:)",
      "green(0.00) dim(ms)",
    );
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      "bold.red(🚫 Packet Loss:)",
      "red(0.00)%",
    );
  });
});
