/**
 * Dependencies
 */
var app = require('express')(),
	server = require('http').Server(app),
	io = require('socket.io')(server);

var config = require('./config.json');
var db = require('./app/db')(config);
/**
 * Express Routes
 */
app.use(require('express').static(__dirname + '/public'));
app.get('/', function(req, res){
	res.render('index.ejs');
})

/**
 * Socket.Io Setup
 */
io.on('connection', function (socket) {
  console.log(socket.client.conn.remoteAddress + ' has connected!');
  // socket.emit('login', {password: true});
  // socket.on('login', function(data){
  // 	if (password === config.betapassword)
  // 	{
  // 		socket.emit('loginsuccess');
  // 	}
  // 	else
  // 	{
  // 		socket.emit('loginfail');
  // 	}
  // });
});

/**
 * Liftoff!
 */
server.listen(3000);