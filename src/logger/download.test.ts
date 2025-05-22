import { logDownload } from "@/logger/logger";
import type { Stats } from "@/types";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("chalk", () => ({
  default: {
    bold: {
      yellow: vi.fn((str, speed) => `bold.yellow(${str} ${speed})`),
    },
    green: vi.fn((value, unit) => `green(${value}, ${unit})`),
  },
}));

describe("logDownload", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log download speed with correct formatting", () => {
    const stats: Stats.Download = {
      average: 25.123,
    };

    logDownload(stats);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      "bold.yellow(⬇️ Download: green(25.12, Mbps))",
    );
  });

  it("should round download speed to 2 decimal places", () => {
    const stats: Stats.Download = {
      average: 100.999,
    };

    logDownload(stats);

    expect(console.log).toHaveBeenCalledWith(
      "bold.yellow(⬇️ Download: green(101.00, Mbps))",
    );
  });

  it("should handle zero download speed", () => {
    const stats: Stats.Download = {
      average: 0,
    };

    logDownload(stats);

    expect(console.log).toHaveBeenCalledWith(
      "bold.yellow(⬇️ Download: green(0.00, Mbps))",
    );
  });
});
