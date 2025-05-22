import { afterEach, expect, it, vi } from "vitest";
import { measureLatency } from "./measure-latency";

afterEach(() => {
  vi.restoreAllMocks();
});

it("returns correct latency stats for specified runs", async () => {
  global.fetch = vi.fn().mockResolvedValue({});
  const nowSpy = vi
    .spyOn(performance, "now")
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(10)
    .mockReturnValueOnce(20)
    .mockReturnValueOnce(30);

  const stats = await measureLatency(2);

  expect(stats).toEqual({
    average: 10,
    jitter: 0,
    packetLoss: 0,
    measurements: [10, 10],
  });

  nowSpy.mockRestore();
});
