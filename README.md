# cf-speedtest

A simple CLI tool to measure your Cloudflare network performance, including latency, download, and upload speeds.

## Requirements

- Go 1.24 or higher (to build from source)

## Installation

### Prebuilt binaries

Download the latest release for your platform from [GitHub Releases](https://github.com/ruchernchong/cf-speedtest/releases).

### Go install

```bash
go install github.com/ruchernchong/cf-speedtest/cmd/cf-speedtest@latest
```

> **Note:** The npm package `cf-speedtest` is deprecated. Use GitHub Releases or `go install` instead.

## Usage

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
go build -o cf-speedtest ./cmd/cf-speedtest
./cf-speedtest
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
