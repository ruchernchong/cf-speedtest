import { logUpload } from "@/logger/logger";
import { afterEach, expect, it, vi } from "vitest";
import * as measureTransferModule from "./measure-transfer";
import { measureUpload } from "./measure-upload";

afterEach(() => {
  vi.restoreAllMocks();
});

it("calls measureTransfer with handler, bytes, and logUpload", async () => {
  const bytes = 2048;
  const mockStats = { average: 5 };
  const spy = vi
    .spyOn(measureTransferModule, "measureTransfer")
    .mockResolvedValue(mockStats);

  const result = await measureUpload(bytes);

  expect(spy).toHaveBeenCalledWith(expect.any(Function), bytes, logUpload);
  expect(result).toBe(mockStats);

  spy.mockRestore();
});
