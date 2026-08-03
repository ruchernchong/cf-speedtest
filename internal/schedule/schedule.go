package schedule

// Measurement describes a batch of same-size transfer samples.
type Measurement struct {
	Bytes             int64
	Count             int
	BypassMinDuration bool
}

// DownloadMeasurements mirrors the TypeScript DOWNLOAD_MEASUREMENTS schedule.
var DownloadMeasurements = []Measurement{
	{Bytes: 1e5, Count: 1, BypassMinDuration: true}, // warmup
	{Bytes: 1e5, Count: 9},
	{Bytes: 1e6, Count: 8},
	{Bytes: 1e7, Count: 6},
	{Bytes: 2.5e7, Count: 4},
	{Bytes: 1e8, Count: 3},
	{Bytes: 2.5e8, Count: 2},
}

// UploadMeasurements mirrors the TypeScript UPLOAD_MEASUREMENTS schedule.
var UploadMeasurements = []Measurement{
	{Bytes: 1e5, Count: 8},
	{Bytes: 1e6, Count: 6},
	{Bytes: 1e7, Count: 4},
	{Bytes: 2.5e7, Count: 4},
	{Bytes: 5e7, Count: 3},
}

// MinDurationMs is the minimum sample duration kept unless BypassMinDuration is set.
const MinDurationMs = 10
