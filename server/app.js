var fs = require('fs'),
    http = require('http'),
    socketio = require('socket.io');

var server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-type': 'text/html'});
  res.end(fs.readFileSync(__dirname + '/../public/index.html'));
}).listen(8080, function() {
  console.log('Listening at: http://localhost:8080');
});

socketio.listen(server).on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  console.log('Message sent');
  socket.on('from_browser', function (data) {
    console.log(data);
  });
});
