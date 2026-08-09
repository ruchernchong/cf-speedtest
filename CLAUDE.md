# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Requirements

- Go 1.24 or higher

## Installation

```bash
# Install from source
go install github.com/ruchernchong/cf-speedtest/cmd/cf-speedtest@latest

# Or download a release binary from GitHub Releases
```

## Building and Running

### Development

```bash
# Run tests
go test ./...

# Vet
go vet ./...

# Build the CLI
go build -o cf-speedtest ./cmd/cf-speedtest

# Run locally
go run ./cmd/cf-speedtest
```

## Testing

```bash
go test ./...
go test ./... -count=1
```

## Project Structure

This is a Go CLI tool for running Cloudflare speed tests. The project is structured as follows:

- **cmd/cf-speedtest/** - CLI entry point
- **internal/** - Private application packages
  - **speedtest/** - Orchestrator (`Run`) matching former `runCLI()` order
  - **location/** - Fetches Cloudflare server location (colo code) via `cdn-cgi/trace`
  - **latency/** - Measures latency and jitter via HTTP HEAD probes
  - **download/** - Measures download throughput (streaming discard)
  - **upload/** - Measures upload throughput (zero-reader + Content-Length)
  - **schedule/** - Download/upload measurement schedules (parity with former TS)
  - **stats/** - Percentile and jitter helpers
  - **logger/** - Console output formatting (emoji + ANSI colors)
  - **color/** - Minimal ANSI helpers
  - **result/** - Aggregated result struct

## Architecture

The speed test uses native HTTP requests against Cloudflare's endpoints and follows this flow:

1. **Server Location** - Fetches the Cloudflare colo identifier for the connected edge node
2. **Latency Testing** - Runs HTTP probes to measure round-trip latency and jitter
3. **Download Testing** - Downloads payloads of increasing size to measure throughput
4. **Upload Testing** - Uploads payloads of increasing size to measure throughput
5. **Aggregation** - Reports 90th-percentile download/upload speeds

Results are formatted and displayed to the console at the end only.

## Key Components

- `speedtest.Run()` - Orchestrates the speed test and logs results on completion
- `logger.LogResults()` - Displays formatted results to the console

## Development Workflows

The project uses:

- Go modules
- GoReleaser for multi-OS/arch GitHub Release binaries (tag `v*` pushes)
- GitHub Actions for CI (`go test`, `go vet`, `go build`)
