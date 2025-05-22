# cf-speedtest

A simple CLI tool to measure your Cloudflare network performance, including latency, packet loss, download, and upload
speeds.

## Installation

Install globally via npm:

```bash
npm install -g cf-speedtest
```

Or run without installation using npx:

```bash
npx cf-speedtest
```

## Usage

After installation, run:

```bash
cf-speedtest
```

### Example Output

```
🌐 Server Location:
City     : Singapore
Public IP: 139.59.132.30

🏓 Latency: 2.34 ms
🚫 Packet Loss: 0.00%

📥 Download: 3200.45 Mbps
📤 Upload: 2800.67 Mbps
```

## Building from Source

```bash
git clone https://github.com/ruchernchong/cloudflare-speedtest.git
cd cloudflare-speedtest
pnpm install
pnpm run build
node dist/index.js
```

## Why am I using TS to write this CLI instead of other language?

Because I am intending to use [cloudflare/speedtest](https://github.com/cloudflare/speedtest) in the future
once [issue #17](https://github.com/cloudflare/speedtest/issues/17) is resolved.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.