'using strict';
var express = require('express'),
    sassMiddleware = require('node-sass-middleware')

app = express()
app.get('/', function (req, res) {
  'use strict';
  res.sendFile(__dirname + '/index.html')
})
app.use(sassMiddleware({
  src: __dirname + '/assets/styles/sass',
  dest: __dirname + '/assets/styles'
}))
app.use(express.static(__dirname))
app.use(express.static(__dirname + '/assets/styles'))

var http = require('http').Server(app),
    port = normalizePort(process.env.PORT || '1107')

http.listen(port, function () {
  'use strict';
  console.log('listening on *:' + port)
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  'use strict';

  var port = parseInt(val, 10)

  if (isNaN(port))
    // named pipe
    return val

  if (port >= 0)
    // port number
    return port

  return false
}