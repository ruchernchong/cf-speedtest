import { afterEach, expect, it, vi } from "vitest";
import { connectionMetadata } from "./connection-metadata";

it("parses key=value lines into an object", async () => {
  const text = "a=1\nb=two\nc=3\n";
  global.fetch = vi.fn().mockResolvedValue({
    text: () => Promise.resolve(text),
  });

  const metadata = await connectionMetadata();
  expect(metadata).toEqual({ a: "1", b: "two", c: "3" });
});
