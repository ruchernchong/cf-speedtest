package location

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestParseTrace(t *testing.T) {
	t.Parallel()

	text := "fl=123\nip=1.2.3.4\ncolo=SIN\nloc=SG\n"
	got := ParseTrace(text)
	if got.IP != "1.2.3.4" || got.Colo != "SIN" || got.Country != "SG" {
		t.Fatalf("ParseTrace() = %+v, want IP=1.2.3.4 Colo=SIN Country=SG", got)
	}
}

func TestParseTraceMissingFields(t *testing.T) {
	t.Parallel()

	got := ParseTrace("foo=bar\n")
	if got.IP != "Unknown" || got.Colo != "Unknown" || got.Country != "Unknown" {
		t.Fatalf("ParseTrace() = %+v, want Unknown fields", got)
	}
}

func TestGetServerLocation(t *testing.T) {
	t.Parallel()

	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("ip=8.8.8.8\ncolo=NRT\nloc=JP\n"))
	}))
	t.Cleanup(srv.Close)

	client := &http.Client{
		Transport: roundTripFunc(func(req *http.Request) (*http.Response, error) {
			req.URL.Scheme = "http"
			req.URL.Host = srv.Listener.Addr().String()
			req.URL.Path = "/cdn-cgi/trace"
			return http.DefaultTransport.RoundTrip(req)
		}),
	}

	got, err := GetServerLocation(client)
	if err != nil {
		t.Fatalf("GetServerLocation: %v", err)
	}
	if got.IP != "8.8.8.8" || got.Colo != "NRT" || got.Country != "JP" {
		t.Fatalf("GetServerLocation() = %+v", got)
	}
}

type roundTripFunc func(*http.Request) (*http.Response, error)

func (f roundTripFunc) RoundTrip(r *http.Request) (*http.Response, error) {
	return f(r)
}
