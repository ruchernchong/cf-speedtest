package color

import (
	"fmt"
	"os"
)

const (
	reset   = "\033[0m"
	bold    = "\033[1m"
	blue    = "\033[34m"
	cyan    = "\033[36m"
	green   = "\033[32m"
	yellow  = "\033[33m"
	magenta = "\033[35m"
)

var colorEnabled = sync.OnceValue(func() bool {
	fi, err := os.Stdout.Stat()
	if err != nil {
		return false
	}
	return (fi.Mode() & os.ModeCharDevice) != 0
})

func enabled() bool { return colorEnabled() }

func wrap(codes, s string) string {
	if !enabled() {
		return s
	}
	return codes + s + reset
}

func BoldBlue(s string) string    { return wrap(bold+blue, s) }
func BoldCyan(s string) string    { return wrap(bold+cyan, s) }
func BoldYellow(s string) string  { return wrap(bold+yellow, s) }
func BoldMagenta(s string) string { return wrap(bold+magenta, s) }
func Green(s string) string       { return wrap(green, s) }

func Greenf(format string, args ...any) string {
	return Green(fmt.Sprintf(format, args...))
}
