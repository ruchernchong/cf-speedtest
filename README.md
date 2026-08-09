# cfspeed

A simple CLI tool to measure your Cloudflare network performance, including latency, download, and upload speeds.

## Requirements

- Go 1.24 or higher (to build from source)

## Installation

### Prebuilt binaries

Download the latest release for your platform from [GitHub Releases](https://github.com/ruchernchong/cfspeed/releases).

### Go install

```bash
go install github.com/ruchernchong/cfspeed/v2/cmd/cfspeed@latest
```

> **Note:** Major version 2+ requires the `/v2` import path (Go modules). The npm package `cf-speedtest` (old name) is deprecated — use GitHub Releases or `go install` instead.

## Usage

```bash
cfspeed
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
git clone https://github.com/ruchernchong/cfspeed.git
cd cfspeed
go build -o cfspeed ./cmd/cfspeed
./cfspeed
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
