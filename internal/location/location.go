package location

import (
	"fmt"
	"io"
	"net/http"
	"strings"
)

const TraceURL = "https://speed.cloudflare.com/cdn-cgi/trace"

// ServerLocation holds Cloudflare edge location fields from cdn-cgi/trace.
type ServerLocation struct {
	IP      string
	Colo    string
	Country string
}

// ParseTrace parses a Cloudflare cdn-cgi/trace key=value body.
func ParseTrace(text string) ServerLocation {
	pairs := make(map[string]string)
	for _, line := range strings.Split(text, "\n") {
		idx := strings.IndexByte(line, '=')
		if idx == -1 {
			continue
		}
		pairs[line[:idx]] = line[idx+1:]
	}

	get := func(key string) string {
		if v, ok := pairs[key]; ok && v != "" {
			return v
		}
		return "Unknown"
	}

	return ServerLocation{
		IP:      get("ip"),
		Colo:    get("colo"),
		Country: get("loc"),
	}
}

// GetServerLocation fetches Cloudflare's trace endpoint and parses location fields.
func GetServerLocation(client *http.Client) (ServerLocation, error) {
	if client == nil {
		client = http.DefaultClient
	}

	resp, err := client.Get(TraceURL)
	if err != nil {
		return ServerLocation{}, fmt.Errorf("fetch trace: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return ServerLocation{}, fmt.Errorf("fetch trace: unexpected status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return ServerLocation{}, fmt.Errorf("read trace: %w", err)
	}

	return ParseTrace(string(body)), nil
}
