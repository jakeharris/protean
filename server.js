'using strict';

var express = require('express'),
    sass = require('node-sass')

// compile sass to css
sass.render({
  file: 'assets/styles/sass/app.scss',
  includePaths: ['assets/styles/sass/partials'],
  outFile: 'assets/styles/sass/app.css',
  sourceMap: 'true',
  outputStyle: 'compressed'
});

app = express()

app.use(express.static(__dirname))
app.use(express.static(__dirname + '/assets/styles'))

app.get('/', function (req, res) {
  'use strict';
  res.sendFile(__dirname + '/index.html')
})

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