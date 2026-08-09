package main

import (
	"fmt"
	"os"

	"github.com/ruchernchong/cfspeed/v2/internal/speedtest"
)

func main() {
	if err := speedtest.Run(nil); err != nil {
		fmt.Fprintf(os.Stderr, "cfspeed: %v\n", err)
		os.Exit(1)
	}
}
