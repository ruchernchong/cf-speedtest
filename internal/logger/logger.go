package logger

import (
	"fmt"

	"github.com/ruchernchong/cfspeed/v2/internal/color"
	"github.com/ruchernchong/cfspeed/v2/internal/result"
)

func toMbps(bps float64) string {
	return fmt.Sprintf("%.2f", bps/1_000_000)
}

// LogServerLocation prints the Cloudflare colo.
func LogServerLocation(colo string) {
	fmt.Println(color.BoldBlue("📍 Server Location:"), color.Green(colo))
}

// LogLatency prints latency in ms.
func LogLatency(ms float64) {
	fmt.Println(color.BoldCyan("🏓 Latency:"), color.Greenf("%.2fms", ms))
}

// LogJitter prints jitter in ms.
func LogJitter(ms float64) {
	fmt.Println(color.BoldCyan("📊 Jitter:"), color.Greenf("%.2fms", ms))
}

// LogDownload prints download throughput in Mbps.
func LogDownload(bps float64) {
	fmt.Println(color.BoldYellow("⬇️ Download:"), color.Green(toMbps(bps)+" Mbps"))
}

// LogUpload prints upload throughput in Mbps.
func LogUpload(bps float64) {
	fmt.Println(color.BoldMagenta("⬆️ Upload:"), color.Green(toMbps(bps)+" Mbps"))
}

// LogResults prints all results at once (parity with TS logResults).
func LogResults(results result.SpeedTestResults) {
	LogServerLocation(results.ServerLocation)
	LogLatency(results.Latency)
	LogJitter(results.Jitter)
	LogDownload(results.Download)
	LogUpload(results.Upload)
}
