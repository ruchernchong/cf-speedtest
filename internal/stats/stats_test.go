package stats

import (
	"math"
	"testing"
)

func almostEqual(a, b, eps float64) bool {
	return math.Abs(a-b) < eps
}

func TestPercentile(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name   string
		values []float64
		p      float64
		want   float64
	}{
		{name: "empty", values: nil, p: 50, want: 0},
		{name: "single", values: []float64{42}, p: 90, want: 42},
		{name: "p50 even", values: []float64{10, 20, 30, 40}, p: 50, want: 25},
		{name: "p90", values: []float64{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, p: 90, want: 9.1},
		{name: "p0", values: []float64{5, 1, 3}, p: 0, want: 1},
		{name: "p100", values: []float64{5, 1, 3}, p: 100, want: 5},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			got := Percentile(tt.values, tt.p)
			if !almostEqual(got, tt.want, 1e-9) {
				t.Fatalf("Percentile(%v, %v) = %v, want %v", tt.values, tt.p, got, tt.want)
			}
		})
	}
}

func TestJitter(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name    string
		samples []float64
		want    float64
	}{
		{name: "empty", samples: nil, want: 0},
		{name: "single", samples: []float64{10}, want: 0},
		{name: "two", samples: []float64{10, 14}, want: 4},
		{name: "three", samples: []float64{10, 14, 11}, want: 3.5},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			got := Jitter(tt.samples)
			if !almostEqual(got, tt.want, 1e-9) {
				t.Fatalf("Jitter(%v) = %v, want %v", tt.samples, got, tt.want)
			}
		})
	}
}
