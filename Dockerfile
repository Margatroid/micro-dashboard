FROM golang:1.5.2

# Copy files to workspace
ADD . /go/src/github.com/Margatroid/micro-dashboard
WORKDIR /go/src/github.com/Margatroid/micro-dashboard/dashboard

RUN go get
RUN go install github.com/Margatroid/micro-dashboard/dashboard

ENTRYPOINT /go/bin/dashboard
