package download

import (
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/ruchernchong/cf-speedtest/internal/schedule"
)

const downloadURL = "https://speed.cloudflare.com/__down"

// Sample is a single download measurement.
type Sample struct {
	Bytes      int64
	DurationMs float64
	BPS        float64
}

// MeasureOnce downloads bytes from Cloudflare and streams/discards the body.
func MeasureOnce(client *http.Client, bytes int64) (Sample, error) {
	if client == nil {
		client = http.DefaultClient
	}

	url := fmt.Sprintf("%s?bytes=%d", downloadURL, bytes)
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return Sample{}, fmt.Errorf("download request: %w", err)
	}

	start := time.Now()
	resp, err := client.Do(req)
	if err != nil {
		return Sample{}, fmt.Errorf("download: %w", err)
	}
	defer resp.Body.Close()

	received, err := io.Copy(io.Discard, resp.Body)
	if err != nil {
		return Sample{}, fmt.Errorf("download read: %w", err)
	}

	durationMs := float64(time.Since(start).Nanoseconds()) / 1e6
	bps := float64(received*8) / (durationMs / 1000)
	return Sample{Bytes: received, DurationMs: durationMs, BPS: bps}, nil
}

// Measure runs the download schedule and returns kept bps samples.
func Measure(client *http.Client, measurements []schedule.Measurement) ([]float64, error) {
	results := make([]float64, 0)
	for _, m := range measurements {
		for i := 0; i < m.Count; i++ {
			sample, err := MeasureOnce(client, m.Bytes)
			if err != nil {
				return nil, err
			}
			if m.BypassMinDuration || sample.DurationMs >= schedule.MinDurationMs {
				results = append(results, sample.BPS)
			}
		}
	}
	return results, nil
}
