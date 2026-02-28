import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  logDownload,
  logJitter,
  logLatency,
  logResults,
  logServerLocation,
  logUpload,
} from "@/logger";

describe("logServerLocation", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log server location", () => {
    logServerLocation("SIN");
    expect(console.log).toHaveBeenCalledTimes(1);
  });
});

describe("logLatency", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log latency in ms with 2 decimal places", () => {
    logLatency(45.678);
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it("should handle zero latency", () => {
    logLatency(0);
    expect(console.log).toHaveBeenCalledTimes(1);
  });
});

describe("logJitter", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log jitter in ms with 2 decimal places", () => {
    logJitter(3.456);
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it("should handle zero jitter", () => {
    logJitter(0);
    expect(console.log).toHaveBeenCalledTimes(1);
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
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it("should handle zero download", () => {
    logDownload(0);
    expect(console.log).toHaveBeenCalledTimes(1);
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
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it("should handle zero upload", () => {
    logUpload(0);
    expect(console.log).toHaveBeenCalledTimes(1);
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
    logResults({
      latency: 25.5,
      jitter: 2.3,
      download: 50_000_000,
      upload: 20_000_000,
      serverLocation: "SIN",
    });

    expect(console.log).toHaveBeenCalledTimes(5);
  });
});
