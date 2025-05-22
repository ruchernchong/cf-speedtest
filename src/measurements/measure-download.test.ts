import { logDownload } from "@/logger/download";
import { afterEach, expect, it, vi } from "vitest";
import { measureDownload } from "./measure-download";
import * as measureTransferModule from "./measure-transfer";

afterEach(() => {
  vi.restoreAllMocks();
});

it("calls measureTransfer with handler, bytes, and logDownload", async () => {
  const bytes = 1024;
  const mockStats = { average: 9 };
  const spy = vi
    .spyOn(measureTransferModule, "measureTransfer")
    .mockResolvedValue(mockStats);

  const result = await measureDownload(bytes);

  expect(spy).toHaveBeenCalledWith(expect.any(Function), bytes, logDownload);
  expect(result).toBe(mockStats);

  spy.mockRestore();
});
