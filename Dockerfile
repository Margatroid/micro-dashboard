FROM golang:1.5.2

# Copy files to workspace
ADD . /go/src/github.com/Margatroid/micro-dashboard
WORKDIR /go/src/github.com/Margatroid/micro-dashboard

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install -y nodejs
RUN npm install history@1.17.0
RUN npm install
RUN npm run build

WORKDIR /go/src/github.com/Margatroid/micro-dashboard/dashboard
RUN go get
RUN go install github.com/Margatroid/micro-dashboard/dashboard

ENTRYPOINT /go/bin/dashboard
