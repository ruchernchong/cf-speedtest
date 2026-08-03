package logger

import (
	"bytes"
	"io"
	"os"
	"strings"
	"testing"

	"github.com/ruchernchong/cf-speedtest/internal/result"
)

func captureStdout(t *testing.T, fn func()) string {
	t.Helper()
	r, w, err := os.Pipe()
	if err != nil {
		t.Fatal(err)
	}
	old := os.Stdout
	os.Stdout = w
	defer func() { os.Stdout = old }()

	fn()
	_ = w.Close()

	var buf bytes.Buffer
	_, _ = io.Copy(&buf, r)
	return buf.String()
}

func TestLogResults(t *testing.T) {
	out := captureStdout(t, func() {
		LogResults(result.SpeedTestResults{
			Latency:        25.5,
			Jitter:         2.3,
			Download:       50_000_000,
			Upload:         20_000_000,
			ServerLocation: "SIN",
		})
	})

	lines := strings.Split(strings.TrimSpace(out), "\n")
	if len(lines) != 5 {
		t.Fatalf("got %d lines, want 5:\n%s", len(lines), out)
	}
	if !strings.Contains(out, "SIN") {
		t.Fatalf("missing colo: %s", out)
	}
	if !strings.Contains(out, "25.50ms") {
		t.Fatalf("missing latency: %s", out)
	}
	if !strings.Contains(out, "50.00 Mbps") {
		t.Fatalf("missing download: %s", out)
	}
	if !strings.Contains(out, "20.00 Mbps") {
		t.Fatalf("missing upload: %s", out)
	}
}

func TestToMbpsFormatting(t *testing.T) {
	out := captureStdout(t, func() {
		LogDownload(25_000_000)
	})
	if !strings.Contains(out, "25.00 Mbps") {
		t.Fatalf("got %q", out)
	}
}
