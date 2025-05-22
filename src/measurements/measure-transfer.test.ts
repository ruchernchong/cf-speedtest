import { expect, it, vi } from "vitest";
import * as measureBandwidthModule from "../utils/measure-bandwidth";
import { measureTransfer } from "./measure-transfer";

it("calls measureBandwidth and logger, returns stats", async () => {
  const handler = vi.fn().mockResolvedValue(1024);
  const logger = vi.fn();
  const mockStats = { average: 4 };
  const spy = vi
    .spyOn(measureBandwidthModule, "measureBandwidth")
    .mockResolvedValue(mockStats);

  const stats = await measureTransfer(handler, 2048, logger);

  expect(spy).toHaveBeenCalledWith(handler, 2048);
  expect(logger).toHaveBeenCalledWith(mockStats);
  expect(stats).toBe(mockStats);

  spy.mockRestore();
});
