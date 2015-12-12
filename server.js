var express = require('express');
var app = express();
var router = express.Router();

var sendIndex = function(req, res) {
  res.sendFile('index.html', { root: './dist' })
};

router.get('/explorer/*', sendIndex)
router.get('/query', sendIndex)

app.use(express.static('dist'))
app.use(router)

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Open http://%s:%s in your browser to use micro-dashboard', host, port);
});
