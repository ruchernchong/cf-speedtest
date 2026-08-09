package latency

import (
	"fmt"
	"net/http"
	"time"

	"github.com/ruchernchong/cfspeed/v2/internal/location"
	"github.com/ruchernchong/cfspeed/v2/internal/stats"
)

// Result holds median latency and jitter in milliseconds.
type Result struct {
	Latency float64
	Jitter  float64
}

// Measure runs numPackets sequential HEAD probes against the Cloudflare trace URL.
func Measure(client *http.Client, numPackets int) (Result, error) {
	if client == nil {
		client = http.DefaultClient
	}

	pings := make([]float64, 0, numPackets)
	for i := 0; i < numPackets; i++ {
		ms, err := measurePing(client)
		if err != nil {
			return Result{}, err
		}
		pings = append(pings, ms)
	}

	return Result{
		Latency: stats.Percentile(pings, 50),
		Jitter:  stats.Jitter(pings),
	}, nil
}

func measurePing(client *http.Client) (float64, error) {
	req, err := http.NewRequest(http.MethodHead, location.TraceURL, nil)
	if err != nil {
		return 0, fmt.Errorf("latency request: %w", err)
	}

	start := time.Now()
	resp, err := client.Do(req)
	if err != nil {
		return 0, fmt.Errorf("latency probe: %w", err)
	}
	defer resp.Body.Close()

	return float64(time.Since(start).Nanoseconds()) / 1e6, nil
}
