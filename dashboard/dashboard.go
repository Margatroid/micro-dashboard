package main

import (
	"fmt"
	"net"
	"net/http"
	"strconv"
	"strings"

	extractor "github.com/Margatroid/micro-dashboard/dashboard/extractor"
	log "github.com/golang/glog"
	"github.com/micro/go-micro/cmd"
	registry "github.com/micro/go-micro/registry"
	"github.com/pborman/uuid"
)

func main() {
	cmd.Init()

	// Find available port to listen on.
	listener, err := net.Listen("tcp", ":0")
	if err != nil {
		log.Fatal("Failed to create listener %s", err)
	}

	advertise := listener.Addr().String()
	log.Infof("Listening on %s", advertise)

	var host string
	var port int

	parts := strings.Split(advertise, ":")
	if len(parts) > 1 {
		host = strings.Join(parts[:len(parts)-1], ":")
		port, _ = strconv.Atoi(parts[len(parts)-1])
	} else {
		host = parts[0]
	}

	addr, err := extractor.ExtractAddress(host)
	if err != nil {
		log.Fatalf("Cannot extract address: %s", err)
	}

	// Register service
	name := "go.micro.web.dashboard"
	node := &registry.Node{
		Id:      name + "-" + uuid.NewUUID().String(),
		Address: addr,
		Port:    port,
	}

	service := &registry.Service{
		Name:    name,
		Version: "1.0.0",
		Nodes:   []*registry.Node{node},
	}

	log.Infof("Registering node: %s", node.Id)
	if err := registry.Register(service); err != nil {
		log.Fatalf("Failed to register node: %s", err)
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello world!")
	})

	err = http.Serve(listener, nil)
}
