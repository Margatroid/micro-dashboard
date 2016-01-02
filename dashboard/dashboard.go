package main

import (
	"fmt"
	log "github.com/golang/glog"
	"github.com/micro/go-micro/cmd"
	"net"
	"net/http"
)

func main() {
	cmd.Init()

	listener, err := net.Listen("tcp", ":0")
	if err != nil {
		log.Fatal("Failed to create listener %s", err)
	}

	log.Infof("Listening on %s", listener.Addr().String())

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello world!")
	})

	err = http.Serve(listener, nil)
}
