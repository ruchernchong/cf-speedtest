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
  - **logger.ts** - Displays speed test results to the console

## Architecture

The speed test uses `@cloudflare/speedtest` and follows this flow:

1. **Latency Testing** - Measures unloaded latency and packet loss
2. **Download Testing** - Downloads files of increasing size to measure throughput
3. **Upload Testing** - Uploads buffers of increasing size to measure throughput

Results are formatted and displayed to the console using Node.js built-in `styleText`.

## Key Components

- `runCLI()` - Orchestrates the speed test and logs results on completion
- `logLatency()`, `logPacketLoss()`, `logDownload()`, `logUpload()`, `logResults()` - Display formatted results to the console

## Development Workflows

The project uses:
- TypeScript for type safety
- Biome v2 for linting and formatting
- semantic-release for versioning and release management
- pnpm as the package manager
- tsup for bundling the TypeScript code
- Vitest for testing
- Husky + commitlint + lint-staged for git hooks and commit message enforcement