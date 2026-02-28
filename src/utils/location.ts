export interface ServerLocation {
  ip: string;
  colo: string;
  country: string;
}

/**
 * Fetches Cloudflare's trace endpoint and parses the key=value response
 * to extract server location information.
 */
export async function getServerLocation(): Promise<ServerLocation> {
  const response = await fetch("https://speed.cloudflare.com/api/v1/trace");
  const text = await response.text();

  const pairs = new Map<string, string>();
  for (const line of text.split("\n")) {
    const idx = line.indexOf("=");
    if (idx !== -1) {
      pairs.set(line.slice(0, idx), line.slice(idx + 1));
    }
  }

  return {
    ip: pairs.get("ip") ?? "Unknown",
    colo: pairs.get("colo") ?? "Unknown",
    country: pairs.get("loc") ?? "Unknown",
  };
}
