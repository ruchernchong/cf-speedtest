import { expect, it, vi } from "vitest";
import { measureBandwidth } from "./measure-bandwidth";

it("should calculate the bandwidth correctly", async () => {
  const bytes = 125_000;
  const fakeTransfer = vi.fn(() => Promise.resolve(bytes));
  const nowSpy = vi
    .spyOn(performance, "now")
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(1000);

  const stats = await measureBandwidth(fakeTransfer, bytes);

  expect(fakeTransfer).toHaveBeenCalledWith(bytes);
  expect(nowSpy).toHaveBeenCalledTimes(2);
  expect(stats.average).toBe(1);

  nowSpy.mockRestore();
});
