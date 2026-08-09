package download

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/ruchernchong/cfspeed/v2/internal/schedule"
)

func TestMeasureOnceBPS(t *testing.T) {
	t.Parallel()

	payload := strings.Repeat("x", 1000)
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(20 * time.Millisecond)
		_, _ = w.Write([]byte(payload))
	}))
	t.Cleanup(srv.Close)

	client := redirectClient(srv)
	sample, err := MeasureOnce(client, 1000)
	if err != nil {
		t.Fatalf("MeasureOnce: %v", err)
	}
	if sample.Bytes != 1000 {
		t.Fatalf("bytes = %d, want 1000", sample.Bytes)
	}
	if sample.DurationMs < 10 {
		t.Fatalf("durationMs = %v, want >= 10", sample.DurationMs)
	}
	wantBPS := float64(1000*8) / (sample.DurationMs / 1000)
	if abs(sample.BPS-wantBPS) > 1e-6 {
		t.Fatalf("bps = %v, want %v", sample.BPS, wantBPS)
	}
}

func TestMeasureFiltersShortSamples(t *testing.T) {
	t.Parallel()

	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("fast"))
	}))
	t.Cleanup(srv.Close)

	client := redirectClient(srv)
	got, err := Measure(client, []schedule.Measurement{
		{Bytes: 4, Count: 2},
	})
	if err != nil {
		t.Fatalf("Measure: %v", err)
	}
	if len(got) != 0 {
		t.Fatalf("kept %d samples, want 0 (duration < 10ms)", len(got))
	}
}

func TestMeasureBypassMinDuration(t *testing.T) {
	t.Parallel()

	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("fast"))
	}))
	t.Cleanup(srv.Close)

	client := redirectClient(srv)
	got, err := Measure(client, []schedule.Measurement{
		{Bytes: 4, Count: 1, BypassMinDuration: true},
	})
	if err != nil {
		t.Fatalf("Measure: %v", err)
	}
	if len(got) != 1 {
		t.Fatalf("kept %d samples, want 1", len(got))
	}
}

func redirectClient(srv *httptest.Server) *http.Client {
	return &http.Client{
		Transport: roundTripFunc(func(req *http.Request) (*http.Response, error) {
			req.URL.Scheme = "http"
			req.URL.Host = srv.Listener.Addr().String()
			req.URL.RawQuery = ""
			req.URL.Path = "/"
			return http.DefaultTransport.RoundTrip(req)
		}),
	}
}

type roundTripFunc func(*http.Request) (*http.Response, error)

func (f roundTripFunc) RoundTrip(r *http.Request) (*http.Response, error) {
	return f(r)
}

func abs(v float64) float64 {
	if v < 0 {
		return -v
	}
	return v
}
