# Micro dashboard

![Demo GIF of micro dashboard](http://i.imgur.com/kxqdzNe.gif)

Micro dashboard is a frontend for the microservices toolchain [micro](https://micro.github.io/micro/). In its current form, it consumes the API provided by micro's own [web UI](https://github.com/micro/micro/tree/master/web). This was mainly an excuse for me to play with redux and webpack.

# Features

* Registry explorer.
* Query tool that automatically builds a body based on the endpoint information.

# Setup

Rather crude setup for now.

1. Clone this repo.
2. Install the history package as it is a peer dependency `npm install history@1.13.1`.
3. Install the other deps `npm install`.
4. The dashboard will assume micro/web is running on the same host and on port 8082. If this is not the case, edit the [config](https://github.com/Margatroid/micro-dashboard/blob/master/app/config.js).
5. Build the project to the `dist` directory with `npm run build`.
6. There's an Express server included to serve the `dist` assets for web browser. Run it with `node server.js`.

# License

MIT
