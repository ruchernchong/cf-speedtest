package upload

import (
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/ruchernchong/cfspeed/v2/internal/schedule"
)

const uploadURL = "https://speed.cloudflare.com/__up"

// Sample is a single upload measurement.
type Sample struct {
	Bytes      int64
	DurationMs float64
	BPS        float64
}

// zeroReader yields zeros without allocating a full buffer.
type zeroReader struct {
	remaining int64
}

func (z *zeroReader) Read(p []byte) (int, error) {
	if z.remaining <= 0 {
		return 0, io.EOF
	}
	n := int64(len(p))
	if n > z.remaining {
		n = z.remaining
	}
	for i := int64(0); i < n; i++ {
		p[i] = 0
	}
	z.remaining -= n
	return int(n), nil
}

// MeasureOnce uploads bytes of zeros with Content-Length set (streaming).
func MeasureOnce(client *http.Client, bytes int64) (Sample, error) {
	if client == nil {
		client = http.DefaultClient
	}

	body := &zeroReader{remaining: bytes}
	req, err := http.NewRequest(http.MethodPost, uploadURL, body)
	if err != nil {
		return Sample{}, fmt.Errorf("upload request: %w", err)
	}
	req.ContentLength = bytes
	req.Header.Set("Content-Type", "application/octet-stream")

	start := time.Now()
	resp, err := client.Do(req)
	if err != nil {
		return Sample{}, fmt.Errorf("upload: %w", err)
	}
	defer resp.Body.Close()
	_, _ = io.Copy(io.Discard, resp.Body)

	durationMs := float64(time.Since(start).Nanoseconds()) / 1e6
	bps := float64(bytes*8) / (durationMs / 1000)
	return Sample{Bytes: bytes, DurationMs: durationMs, BPS: bps}, nil
}

// Measure runs the upload schedule and returns kept bps samples.
func Measure(client *http.Client, measurements []schedule.Measurement) ([]float64, error) {
	results := make([]float64, 0)
	for _, m := range measurements {
		for i := 0; i < m.Count; i++ {
			sample, err := MeasureOnce(client, m.Bytes)
			if err != nil {
				return nil, err
			}
			if sample.DurationMs >= schedule.MinDurationMs {
				results = append(results, sample.BPS)
			}
		}
	}
	return results, nil
}
