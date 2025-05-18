export const upload = (bytes: number) =>
  fetch(`https://speed.cloudflare.com/__up?bytes=${bytes}`, {
    method: "POST",
  });
