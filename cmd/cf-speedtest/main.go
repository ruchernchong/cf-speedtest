package main

import (
	"fmt"
	"os"

	"github.com/ruchernchong/cf-speedtest/internal/speedtest"
)

func main() {
	if err := speedtest.Run(nil); err != nil {
		fmt.Fprintf(os.Stderr, "cf-speedtest: %v\n", err)
		os.Exit(1)
	}
}
