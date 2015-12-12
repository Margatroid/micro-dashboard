var express = require('express');
var app = express();
var router = express.Router();

router.get('/explorer/*', function(req, res) {
  res.sendfile('index.html', { root: './dist' })
});

app.use(express.static('dist'))
app.use(router)

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('micro-dashboard listening at http://%s:%s', host, port);
});
