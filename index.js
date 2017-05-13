// 'use strict';


var os = require('os');
var nodeStatic = require('node-static');
var http = require('http');
var socketIO = require('socket.io');

var fileServer = new(nodeStatic.Server)();
var port = (process.env.PORT || 5000);
var maxClients = 8;

var app = http.createServer(function(req, res) {
  fileServer.serve(req, res);
}).listen(port);




var io = socketIO.listen(app);
io.sockets.on('connection', function(socket) {

  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('message', function(message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

    var clients = io.sockets.adapter.rooms[room];
    
    var numClients = 1;
    if(clients){
    	for (var socketId in clients){
        	//console.log(socketId);
        	numClients = numClients + 1;
        }
        	
    }
    
    
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    
    if (numClients === 1) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, numClients);

    } else if (numClients <= maxClients ) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room, numClients);
      //replace with either database knowing which client is which number
      //or on client close, reshuffle everybody's data - preferably 1st option
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
    } else { // max three clients
      socket.emit('full', room);
    }
    
    
  });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });
  
  
  socket.on('bye', function(){
    console.log('received bye');
  });

});
