export const printHelp = () => {
  console.log(`
Usage:
  cf-speedtest [command] [options]

Commands:
  (default)           Run a Cloudflare speed test
  hello [name]        Greet someone (default: "World")
  --help, -h          Show help
  --version, -v       Show version

Examples:
  cf-speedtest
  cf-speedtest hello
  cf-speedtest hello Alice
`);
};
