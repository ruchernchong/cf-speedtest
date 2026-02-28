import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  logDownload,
  logLatency,
  logPacketLoss,
  logResults,
  logUpload,
} from "@/logger/logger";

vi.mock("chalk", () => ({
  default: {
    bold: {
      cyan: vi.fn((str) => `bold.cyan(${str})`),
      red: vi.fn((str) => `bold.red(${str})`),
      yellow: vi.fn((str) => `bold.yellow(${str})`),
      magenta: vi.fn((str) => `bold.magenta(${str})`),
    },
    green: vi.fn((str) => `green(${str})`),
    red: vi.fn((str) => `red(${str})`),
  },
}));

describe("logLatency", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log latency in ms with 2 decimal places", () => {
    logLatency(45.678);
    expect(console.log).toHaveBeenCalledWith(
      "bold.cyan(🏓 Latency:)",
      "green(45.68ms)",
    );
  });

  it("should handle zero latency", () => {
    logLatency(0);
    expect(console.log).toHaveBeenCalledWith(
      "bold.cyan(🏓 Latency:)",
      "green(0.00ms)",
    );
  });
});

describe("logPacketLoss", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log packet loss as percentage", () => {
    logPacketLoss(0.05);
    expect(console.log).toHaveBeenCalledWith(
      "bold.red(🚫 Packet Loss:)",
      "red(5.00%)",
    );
  });

  it("should log N/A when packet loss is undefined", () => {
    logPacketLoss(undefined);
    expect(console.log).toHaveBeenCalledWith(
      "bold.red(🚫 Packet Loss:)",
      "red(N/A)",
    );
  });

  it("should handle zero packet loss", () => {
    logPacketLoss(0);
    expect(console.log).toHaveBeenCalledWith(
      "bold.red(🚫 Packet Loss:)",
      "red(0.00%)",
    );
  });
});

describe("logDownload", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should convert bps to Mbps and log", () => {
    logDownload(25_000_000);
    expect(console.log).toHaveBeenCalledWith(
      "bold.yellow(⬇️ Download: green(25.00 Mbps))",
    );
  });

  it("should handle zero download", () => {
    logDownload(0);
    expect(console.log).toHaveBeenCalledWith(
      "bold.yellow(⬇️ Download: green(0.00 Mbps))",
    );
  });
});

describe("logUpload", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should convert bps to Mbps and log", () => {
    logUpload(10_000_000);
    expect(console.log).toHaveBeenCalledWith(
      "bold.magenta(⬆️ Upload:)",
      "green(10.00 Mbps)",
    );
  });

  it("should handle zero upload", () => {
    logUpload(0);
    expect(console.log).toHaveBeenCalledWith(
      "bold.magenta(⬆️ Upload:)",
      "green(0.00 Mbps)",
    );
  });
});

describe("logResults", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log all results", () => {
    const mockResults = {
      getUnloadedLatency: () => 25.5,
      getPacketLoss: () => 0.01,
      getDownloadBandwidth: () => 50_000_000,
      getUploadBandwidth: () => 20_000_000,
    };

    logResults(mockResults as never);

    expect(console.log).toHaveBeenCalledTimes(4);
  });
});
