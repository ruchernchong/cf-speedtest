# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Requirements

- Node.js 18 or higher

## Installation

```bash
# Install globally from npm
npm install -g cf-speedtest

# Or install globally using pnpm
pnpm add -g cf-speedtest

# Or run directly with npx
npx cf-speedtest

# Or run directly with bunx
bunx cf-speedtest

# Or run directly with pnpm dlx
pnpm dlx cf-speedtest

# Or run directly with yarn dlx
yarn dlx cf-speedtest
```

## Building and Running

### Development

```bash
# Build the project
pnpm run build

# Run the speed test CLI locally
node dist/index.js
```

## Testing

```bash
# Run tests once
pnpm run test

# Run tests in watch mode
pnpm run test:watch
```

## Linting and Formatting

The project uses Biome v2 for linting and formatting:

```bash
# Run linting and formatting checks
pnpm run lint

# Format files
pnpm run format
```

## Project Structure

This is a TypeScript CLI tool for running Cloudflare speed tests. The project is structured as follows:

- **src/** - Main source code
  - **cli.ts** - CLI entry point (installed as the `cf-speedtest` executable)
  - **index.ts** - Library entry point that exports the main `runCLI` function
  - **measurements/** - Native HTTP measurement modules
    - **latency.ts** - Measures latency and jitter via HTTP probes
    - **download.ts** - Measures download throughput
    - **upload.ts** - Measures upload throughput
  - **logger/** - Console output formatting
    - **logger.ts** - Formats and logs speed test results using `styleText`
    - **index.ts** - Re-exports logger functions
  - **utils/** - Shared utilities
    - **location.ts** - Fetches Cloudflare server location (colo code)
    - **stats.ts** - Statistical helpers (e.g., percentile)
  - **types/** - TypeScript type definitions
    - **index.ts** - Shared types (e.g., `SpeedTestResults`)

## Architecture

The speed test uses native HTTP requests against Cloudflare's endpoints and follows this flow:

1. **Server Location** - Fetches the Cloudflare colo identifier for the connected edge node
2. **Latency Testing** - Runs HTTP probes to measure round-trip latency and jitter
3. **Download Testing** - Downloads payloads of increasing size to measure throughput
4. **Upload Testing** - Uploads payloads of increasing size to measure throughput
5. **Aggregation** - Reports 90th-percentile download/upload speeds

Results are formatted and displayed to the console using Node.js built-in `styleText`.

## Key Components

- `runCLI()` - Orchestrates the speed test and logs results on completion
- `logServerLocation()`, `logLatency()`, `logJitter()`, `logDownload()`, `logUpload()`, `logResults()` - Display formatted results to the console

## Development Workflows

The project uses:
- TypeScript for type safety
- Biome v2 for linting and formatting
- semantic-release for versioning and release management
- pnpm as the package manager
- tsup for bundling the TypeScript code
- Vitest for testing
- Husky + commitlint + lint-staged for git hooks and commit message enforcement