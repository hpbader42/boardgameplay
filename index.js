// 'use strict';


var os = require('os');
var nodeStatic = require('node-static');
var http = require('http');
var socketIO = require('socket.io');

var fileServer = new(nodeStatic.Server)();
var port = (process.env.PORT || 5000);
var maxClients = 8;
var roomArray = new Array();

var app = http.createServer(function(req, res) {
  fileServer.serve(req, res);
}).listen(port);

function aRoom(name, clients){
    this.name = name; 
    this.clients  = new Array(clients);
 }


var io = socketIO.listen(app);
io.sockets.on('connection', function(socket) {

  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    //get rid of server messages
    //socket.emit('log', array);
  }

  socket.on('message', function(message, room, from_id, to_id) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.to(room).emit('message', message, to_id);
   
  });

  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

    var clients = io.sockets.adapter.rooms[room];
    
    var numClients = 1;
    var roomNames = new Array();
    roomArray.forEach(function(entry){
  	  roomNames.push(entry.name);
    });
    if(roomNames.indexOf(room) >= 0){ 	
    	roomArray[roomNames.indexOf(room)].clients.forEach(function(aClient){
    	  	 numClients = numClients + 1;
    	});	
    }
    
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    
    if (numClients === 1) {
      socket.join(room);
      var myRoom = new aRoom(room, socket);
      roomArray.push(myRoom);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, numClients);

    } else if (numClients <= maxClients ) {
      log('Client ID ' + socket.id + ' joined room ' + room);
//      var roomNames = new Array();
//      roomArray.forEach(function(entry){
//    	  roomNames.push(entry.name);
//      });
      roomArray[roomNames.indexOf(room)].clients.push(socket);
      socketCount = 0;
      roomArray[roomNames.indexOf(room)].clients.forEach(function(aClient){
    	 //console.log(aClient); 
    	 //doStuff
    	 aClient.emit('test', aClient.id);
    	 socketCount = socketCount + 1;
      });
      console.log("socket count is: "+ socketCount);
      io.sockets.emit('join', room, numClients);
      //replace with either database knowing which client is which number
      //or on client close, reshuffle everybody's data - preferably 1st option
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
    } else { // max clients
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
  
  socket.on('update', function(room, streamArray, thisSocket, socketIdArray){
	  console.log("logging stream array");
		streamArray.forEach(function(stream){
			console.log("*****************")
			console.log(stream);
		});
	  console.log(streamArray);
	  io.sockets.in(room).emit('catch_up', streamArray);
  });
  
  socket.on('bye', function(){
    console.log('received bye');
  });

});
