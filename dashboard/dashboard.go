package main

import (
	log "github.com/golang/glog"
	"github.com/micro/go-micro/cmd"
	"github.com/micro/go-micro/server"
)

func main() {
	cmd.Init()

	server.Init(
		server.Name("go.micro.web.dashboard"),
	)

	if err := server.Run(); err != nil {
		log.Fatal(err)
	}
}
