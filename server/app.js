var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

var SERVER_PORT = 8080;

server.listen(SERVER_PORT, function(){
  console.log('Server started at %s', (new Date()).toUTCString());
});

app.configure(function(){
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/../public'));
});

io.on('connection', function (client) {
  client.emit('news', { hello: 'world' });
  console.log('Message sent from Server to client');
  client.on('from_browser', function (data) {
    console.log('From Client: ', data);
  });
});
