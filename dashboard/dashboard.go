package main

import (
	"net/http"

	log "github.com/golang/glog"
	"github.com/micro/go-web"
)

func main() {
	service := web.NewService(
		web.Name("go.micro.web.dashboard"),
		web.Version("latest"),
	)

	service.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Infof("%s '%s' for %s", r.Method, r.URL, r.RemoteAddr)
		http.ServeFile(w, r, "../dist/index.html")
	})

	service.HandleFunc("/app.js", func(w http.ResponseWriter, r *http.Request) {
		log.Infof("%s '%s' for %s", r.Method, r.URL, r.RemoteAddr)
		http.ServeFile(w, r, "../dist/app.js")
	})

	if err := service.Init(); err != nil {
		log.Fatal(err)
	}

	if err := service.Run(); err != nil {
		log.Fatal(err)
	}

}
