import { expect, it, vi } from "vitest";
import { getCity } from "./get-city";

it("returns the city when matching iata code exists", async () => {
  const data = [
    { iata: "AAA", city: "CityA" },
    { iata: "BBB", city: "CityB" },
  ];
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  });

  const city = await getCity("BBB");
  expect(city).toBe("CityB");
});

it('returns "Unknown Location" when no matching iata code', async () => {
  const data = [{ iata: "AAA", city: "CityA" }];
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  });

  const city = await getCity("BBB");
  expect(city).toBe("Unknown Location");
});

it("throws an error when response is not ok", async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: false,
    statusText: "Error occurred",
  });

  await expect(getCity("AAA")).rejects.toThrow("Error occurred");
});
