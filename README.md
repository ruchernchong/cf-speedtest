# cf-speedtest

A simple CLI tool to measure your Cloudflare network performance, including latency, packet loss, download, and upload
speeds.

## Requirements

- Node.js 18 or higher

## Installation

Install globally:

```bash
# npm
npm install -g cf-speedtest

# pnpm
pnpm add -g cf-speedtest
```

Or run without installation:

```bash
# npx
npx cf-speedtest

# pnpm dlx
pnpm dlx cf-speedtest

# bunx
bunx cf-speedtest

# yarn dlx
yarn dlx cf-speedtest
```

## Usage

After installation, run:

```bash
cf-speedtest
```

### Example Output

```
📍 Server Location: SIN
🏓 Latency: 2.34ms
📊 Jitter: 0.45ms
⬇️ Download: 3200.45 Mbps
⬆️ Upload: 2800.67 Mbps
```

## Building from Source

```bash
git clone https://github.com/ruchernchong/cf-speedtest.git
cd cf-speedtest
pnpm install
pnpm run build
node dist/index.js
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.