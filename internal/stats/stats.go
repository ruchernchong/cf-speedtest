package stats

import "sort"

// Percentile returns the p-th percentile of values (0-100) using sorted interpolation.
func Percentile(values []float64, p float64) float64 {
	if p < 0 {
		p = 0
	} else if p > 100 {
		p = 100
	}
	n := len(values)
	if n == 0 {
		return 0
	}
	if n == 1 {
		return values[0]
	}

	sorted := make([]float64, n)
	copy(sorted, values)
	sort.Float64s(sorted)

	index := (p / 100) * float64(n-1)
	lower := int(index)
	upper := lower + 1
	if upper >= n {
		return sorted[lower]
	}
	if float64(lower) == index {
		return sorted[lower]
	}

	weight := index - float64(lower)
	return sorted[lower] + (sorted[upper]-sorted[lower])*weight
}

// Jitter returns the average absolute delta between consecutive samples.
func Jitter(samples []float64) float64 {
	if len(samples) <= 1 {
		return 0
	}

	var sum float64
	for i := 1; i < len(samples); i++ {
		delta := samples[i] - samples[i-1]
		if delta < 0 {
			delta = -delta
		}
		sum += delta
	}
	return sum / float64(len(samples)-1)
}
