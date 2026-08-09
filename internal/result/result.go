package result

// SpeedTestResults holds aggregated speed test metrics.
type SpeedTestResults struct {
	Latency        float64
	Jitter         float64
	Download       float64
	Upload         float64
	ServerLocation string
}
