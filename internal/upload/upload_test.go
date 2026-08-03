package upload

import (
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/ruchernchong/cf-speedtest/internal/schedule"
)

func TestMeasureOnceBPS(t *testing.T) {
	t.Parallel()

	var received int64
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			t.Errorf("method = %s, want POST", r.Method)
		}
		if ct := r.Header.Get("Content-Type"); ct != "application/octet-stream" {
			t.Errorf("Content-Type = %q", ct)
		}
		n, _ := io.Copy(io.Discard, r.Body)
		received = n
		time.Sleep(20 * time.Millisecond)
		w.WriteHeader(http.StatusOK)
	}))
	t.Cleanup(srv.Close)

	client := redirectClient(srv)
	sample, err := MeasureOnce(client, 2000)
	if err != nil {
		t.Fatalf("MeasureOnce: %v", err)
	}
	if received != 2000 {
		t.Fatalf("server received %d bytes, want 2000", received)
	}
	if sample.Bytes != 2000 {
		t.Fatalf("bytes = %d, want 2000", sample.Bytes)
	}
	wantBPS := float64(2000*8) / (sample.DurationMs / 1000)
	if abs(sample.BPS-wantBPS) > 1e-6 {
		t.Fatalf("bps = %v, want %v", sample.BPS, wantBPS)
	}
}

func TestMeasureFiltersShortSamples(t *testing.T) {
	t.Parallel()

	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = io.Copy(io.Discard, r.Body)
		w.WriteHeader(http.StatusOK)
	}))
	t.Cleanup(srv.Close)

	client := redirectClient(srv)
	got, err := Measure(client, []schedule.Measurement{
		{Bytes: 100, Count: 2},
	})
	if err != nil {
		t.Fatalf("Measure: %v", err)
	}
	if len(got) != 0 {
		t.Fatalf("kept %d samples, want 0 (duration < 10ms)", len(got))
	}
}

func TestZeroReader(t *testing.T) {
	t.Parallel()

	z := &zeroReader{remaining: 5}
	buf := make([]byte, 3)
	n, err := z.Read(buf)
	if err != nil || n != 3 {
		t.Fatalf("first read: n=%d err=%v", n, err)
	}
	n, err = z.Read(buf)
	if err != nil || n != 2 {
		t.Fatalf("second read: n=%d err=%v", n, err)
	}
	n, err = z.Read(buf)
	if err != io.EOF || n != 0 {
		t.Fatalf("third read: n=%d err=%v", n, err)
	}
}

func redirectClient(srv *httptest.Server) *http.Client {
	return &http.Client{
		Transport: roundTripFunc(func(req *http.Request) (*http.Response, error) {
			req.URL.Scheme = "http"
			req.URL.Host = srv.Listener.Addr().String()
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
