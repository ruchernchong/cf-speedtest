package speedtest

import (
	"fmt"
	"net/http"
	"time"

	"github.com/ruchernchong/cfspeed/v2/internal/download"
	"github.com/ruchernchong/cfspeed/v2/internal/latency"
	"github.com/ruchernchong/cfspeed/v2/internal/location"
	"github.com/ruchernchong/cfspeed/v2/internal/logger"
	"github.com/ruchernchong/cfspeed/v2/internal/result"
	"github.com/ruchernchong/cfspeed/v2/internal/schedule"
	"github.com/ruchernchong/cfspeed/v2/internal/stats"
	"github.com/ruchernchong/cfspeed/v2/internal/upload"
)

// DefaultClient is the HTTP client used for measurements (timeouts vs TS).
func DefaultClient() *http.Client {
	return &http.Client{Timeout: 120 * time.Second}
}

// Run executes the full speed test and logs results at the end.
func Run(client *http.Client) error {
	if client == nil {
		client = DefaultClient()
	}

	loc, err := location.GetServerLocation(client)
	if err != nil {
		return fmt.Errorf("server location: %w", err)
	}

	if _, err := latency.Measure(client, 1); err != nil {
		return fmt.Errorf("latency probe: %w", err)
	}

	lat, err := latency.Measure(client, 20)
	if err != nil {
		return fmt.Errorf("latency: %w", err)
	}

	downloadSamples, err := download.Measure(client, schedule.DownloadMeasurements)
	if err != nil {
		return fmt.Errorf("download: %w", err)
	}

	uploadSamples, err := upload.Measure(client, schedule.UploadMeasurements)
	if err != nil {
		return fmt.Errorf("upload: %w", err)
	}

	logger.LogResults(result.SpeedTestResults{
		Latency:        lat.Latency,
		Jitter:         lat.Jitter,
		Download:       stats.Percentile(downloadSamples, 90),
		Upload:         stats.Percentile(uploadSamples, 90),
		ServerLocation: loc.Colo,
	})
	return nil
}
