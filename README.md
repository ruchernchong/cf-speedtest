# cf-speedtest-cli

A simple CLI tool to measure your Cloudflare network performance, including latency, packet loss, download, and upload
speeds.

## Installation

Install globally via npm:

```bash
npm install -g cf-speedtest-cli
```

Or run without installation using npx:

```bash
npx cf-speedtest-cli
```

## Usage

After installation, run:

```bash
cf-speedtest-cli
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
git clone https://github.com/ruchernchong/cloudflare-speedtest-cli.git
cd cloudflare-speedtest-cli
npm install
npm run build
node dist/bin.js
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.