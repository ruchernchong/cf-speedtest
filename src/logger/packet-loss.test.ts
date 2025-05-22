import chalk from "chalk";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { logPacketLoss } from "./packet-loss";

vi.mock("chalk", () => ({
  default: {
    bold: {
      red: vi.fn((str, percentage) => `bold.red(${str} ${percentage})`),
    },
    red: vi.fn((str) => `red(${str})`),
  },
}));

describe("logPacketLoss", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log packet loss with correct formatting", () => {
    const packetLoss = 5.123;

    logPacketLoss(packetLoss);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      "bold.red(🚫 Packet Loss: red(5.12)%)",
    );
  });

  it("should round packet loss to 2 decimal places", () => {
    const packetLoss = 3.9999;

    logPacketLoss(packetLoss);

    expect(console.log).toHaveBeenCalledWith(
      "bold.red(🚫 Packet Loss: red(4.00)%)",
    );
  });

  it("should handle zero packet loss", () => {
    const packetLoss = 0;

    logPacketLoss(packetLoss);

    expect(console.log).toHaveBeenCalledWith(
      "bold.red(🚫 Packet Loss: red(0.00)%)",
    );
  });
});
