import chalk from "chalk";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { logServerLocation } from "./server-location";

vi.mock("chalk", () => ({
  default: {
    bold: {
      green: vi.fn((str) => `bold.green(${str})`),
    },
    blue: vi.fn((str) => `blue(${str})`),
    green: vi.fn((str) => `green(${str})`),
  },
}));

describe("logServerLocation", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log server location with city and IP", () => {
    const city = "Tokyo";
    const ip = "192.168.1.1";

    logServerLocation(city, ip);

    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenNthCalledWith(
      1,
      "bold.green(🌐 Server Location:)",
    );
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      "blue(City     :) green(Tokyo)",
    );
    expect(console.log).toHaveBeenNthCalledWith(
      3,
      "blue(Public IP:) green(192.168.1.1)",
    );
  });
});
