# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Installation

```bash
# Install globally from npm
npm install -g cf-speedtest-cli

# Or install globally using pnpm
pnpm add -g cf-speedtest-cli

# Or run directly with npx
npx cf-speedtest-cli
```

## Building and Running

### Development

```bash
# Build the project
pnpm run build

# Run the speed test CLI locally
node dist/index.js
```

## Linting and Formatting

The project uses Biome for linting and formatting:

### Using pnpm

```bash
# Run linting
pnpm exec @biomejs/biome lint ./src

# Run formatting
pnpm exec @biomejs/biome format ./src --write
```

## Project Structure

This is a TypeScript CLI tool for running Cloudflare speed tests. The project is structured as follows:

- **src/** - Main source code 
  - **index.ts** - Entry point that exports the main `runCLI` function
  - **constants/** - Shared constants like hostnames and file sizes
  - **logger/** - Modules that handle displaying results to the console
  - **measurements/** - Core modules for measuring latency, download, and upload speeds
  - **types/** - TypeScript type definitions for the project
  - **utils/** - Helper functions for making HTTP requests, calculations, etc.
- **bin/** - CLI script that gets installed as the executable

## Architecture

The speed test follows this flow:

1. **Latency Testing** - Sends multiple HEAD requests to measure ping times and packet loss
2. **Server Location** - Determines the Cloudflare edge server location being used
3. **Download Testing** - Downloads a file of specific size and measures the throughput
4. **Upload Testing** - Uploads a buffer of specific size and measures the throughput

All test results are formatted and displayed to the console with colored output (using chalk).

## Key Components

- `measureLatency()` - Performs latency tests against Cloudflare's trace endpoint
- `measureDownload()` - Tests download speed using Cloudflare's down endpoint
- `measureUpload()` - Tests upload speed using Cloudflare's up endpoint
- `measureBandwidth()` - Generic function used by both download and upload tests
- `logXXX()` functions - Display formatted results to the console

## Development Workflows

The project uses:
- TypeScript for type safety
- Biome for linting and formatting
- Changesets for versioning and release management
- pnpm as the package manager
- tsup for bundling the TypeScript code