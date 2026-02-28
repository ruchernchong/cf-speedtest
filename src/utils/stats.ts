/**
 * Returns the p-th percentile of values (0-100) using sorted interpolation.
 */
export function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  if (values.length === 1) return values[0];

  const sorted = [...values].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);

  if (lower === upper) return sorted[lower];

  const weight = index - lower;
  return sorted[lower] + (sorted[upper] - sorted[lower]) * weight;
}

/**
 * Returns the average absolute delta between consecutive samples.
 */
export function jitter(samples: number[]): number {
  if (samples.length <= 1) return 0;

  let sum = 0;
  for (let i = 1; i < samples.length; i++) {
    sum += Math.abs(samples[i] - samples[i - 1]);
  }
  return sum / (samples.length - 1);
}
