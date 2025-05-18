import https from "node:https";

export const download = (bytes: number): Promise<number> =>
  new Promise((resolve, reject) => {
    const options = {
      hostname: "speed.cloudflare.com",
      path: `/__down?bytes=${bytes}`,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Download failed with status ${res.statusCode}`));
        return;
      }

      let total = 0;
      res.on("data", (chunk) => {
        total += chunk.length;
      });

      res.on("end", () => {
        resolve(total);
      });
    });

    req.on("error", (error) => reject(error));
    req.end();
  });
