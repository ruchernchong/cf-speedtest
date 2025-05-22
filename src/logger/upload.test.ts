import { logUpload } from "@/logger/logger";
import type { Stats } from "@/types";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("chalk", () => ({
  default: {
    bold: {
      magenta: vi.fn((str) => `bold.magenta(${str})`),
    },
    green: vi.fn((value, unit) => `green(${value}, ${unit})`),
  },
}));

describe("logUpload", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log upload speed with correct formatting", () => {
    const stats: Stats.Upload = {
      average: 10.456,
    };

    logUpload(stats);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      "bold.magenta(⬆️ Upload:)",
      "green(10.46, Mbps)",
    );
  });

  it("should round upload speed to 2 decimal places", () => {
    const stats: Stats.Upload = {
      average: 5.999,
    };

    logUpload(stats);

    expect(console.log).toHaveBeenCalledWith(
      "bold.magenta(⬆️ Upload:)",
      "green(6.00, Mbps)",
    );
  });

  it("should handle zero upload speed", () => {
    const stats: Stats.Upload = {
      average: 0,
    };

    logUpload(stats);

    expect(console.log).toHaveBeenCalledWith(
      "bold.magenta(⬆️ Upload:)",
      "green(0.00, Mbps)",
    );
  });
});
