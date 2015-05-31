/**
 * Dependencies
 */
var app = require('express')(),
	server = require('http').Server(app),
	io = require('socket.io')(server);

var config = require('./config.json');

/**
 * Express Routes
 */
app.get('/', function(req, res){
	res.render('index.ejs');
})

/**
 * Socket.Io Setup
 */
io.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });
  //socket.on('my other event', function (data) {
  //  console.log(data);
  //});
  socket.emit('login', {password: true});
  socket.on('login', function(data){
  	if (password === config.betapassword)
  	{
  		socket.emit('loginsuccess');
  	}
  	else
  	{
  		socket.emit('loginfail');
  	}
  });
});

/**
 * Liftoff!
 */
server.listen(3000);