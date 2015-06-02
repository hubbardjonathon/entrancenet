/**
 * Dependencies
 */
var app = require('express')(),
	server = require('http').Server(app),
	io = require('socket.io')(server);

var config = require('./config.json');
var db = require('./app/db');

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
  socket.on('fingerprint', function(data){
    isFingerprintBanned(socket.client.conn.remoteAddress, data.fingerprint, function(result){
      if(result) {
        socket.emit('banned');
        socket.close();
      }
    });
  });
});

/**
 * Liftoff!
 */
server.listen(3000);


/**
 * Logical Functions
 * TODO: Move to utilities file.
 */
function isFingerprintBanned(ip, fingerprint, callback){
  var bans = db.bans.findAll({
       where: {
         $or: [
          {ip: ip},
          {fingerprint: fingerprint}
        ]
      }
    }).then(function(bans){
      if (bans.length > 0){
        callback(true);
      }
      callback(false);
    })
};