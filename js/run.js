'use strict';

var isChannelReady = false;
var isInitiator = false;
var isStarted = false;


var localStream;
var remoteStream;

var pc;
var pcArray = new Array();
var turnReady;

//renegotiation variables
var renegotiate = false;
var send_to_id = -1;
var renegotiateID = 0;
var renegotiateLoop = false;

var pcConfig = {
  'iceServers': [{
    'urls': 'stun:stun.l.google.com:19302'
  },
  {
	  'urls': 'turn:testuser@34.211.62.124:3478',
  	  'credential': 'ireallyhopethatthiscanwork'
	  
  }
  ]
};

////////////////////////////////////////////////////

var audioInputSelect = document.querySelector('audioSource');
var audioOutputSelect = document.querySelector('audioOutput');
var localVideo = document.querySelector('#localVideo');
var remoteVideo = document.querySelector('#remoteVideo');
var remoteVideo2 = document.querySelector('#remoteVideo2');
var remoteVideo3 = document.querySelector('#remoteVideo3');

var streamArray = new Array();
var socketArray = new Array();
//might be able to remove socketArray

var mySockNum = 0;
var streamAray = new Array();
var playerArray = new Array();
var vidArrayIndex = 0;
var numPeople = 0;

var rBtn = document.getElementById('lButton');
var lBtn = document.getElementById('rButton');
var connectBtn = document.getElementById('connectButton');
//rBtn.addEventListener('click', shiftRight);
//lBtn.addEventListener('click', shiftLeft);
connectBtn.addEventListener('click', connectToRoom);

///////////////////////////////////////////////////////

// Set up audio and video regardless of what devices are present.
var sdpConstraints = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
};



//////////////////////////////////////////////////////////
//var room = 'foo';
// Could prompt for room name:
//var room = prompt('Enter room name:');

var room = '';
var socket = io.connect();



//Get User Media Stuff
//////////////////////////////////////////////////////////////
//navigator.mediaDevices.getUserMedia({
//audio: true,
//video: true
//})
//.then(gotStream)
//.catch(function(e) {
//alert('getUserMedia() error: ' + e.name);
//});
//
//function gotStream(stream) {
//
////called on initiation - after camera and mic are obtain
//console.log('Adding local stream.');
////localVideo.src = window.URL.createObjectURL(stream);
////localVideo.srcObject = stream;
//localStream = stream;
//sendMessage('got user media');
//if (isInitiator) {
//maybeStart();
//}
//}


///////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////

function debug(){

//	if(isInitiator){
//		pcArray.forEach(function(indivPC) {
//			var streamArrayCopy = streamArray;
//			if(indivPC){
//
//				streamArrayCopy.forEach(function(streamCopy){
//					var addThisStream = true;
//					indivPC.getRemoteStreams().forEach(function(remoteStream){
//						if(remoteStream.id === streamCopy.id){
//							addThisStream = false;
//						}						
//					});
//					if(addThisStream){
//						console.log('adding stream');
//						indivPC.addStream(streamCopy);
//					}
//				});
//			}
//	      });	
//	}
    if(isInitiator){
    	//socket.emit('update', room, streamArray);
    }
    
	pcArray.forEach(function(indivPC) {
		if(indivPC){
			console.log("-----------------");
			console.log("peer connection");
			console.log(indivPC);
			console.log("remote description");
			console.log(indivPC.remoteDescription);
			console.log("local streams");
			console.log(indivPC.getLocalStreams());
			console.log("remote streams");
			console.log(indivPC.getRemoteStreams());
		}
      });
	setVideoDisplays();
}

function shiftLeft(){
	if (streamArray.length >= 4){
		if(vidArrayIndex > 0){
			vidArrayIndex+=-1;
		}
	}
	setVideoDisplays();
}

function shiftRight(){
	if (streamArray.length >= 4){
		if(vidArrayIndex < streamArray.length-3){
			vidArrayIndex+=1;
		}
	}
	setVideoDisplays();
}

function setVideoDisplays(){
	console.log(">>>>>")
	console.log("Is initiator" + isInitiator);
	console.log("My socket id " + mySockNum);
	
	console.log("in set video displays");
	var numVids = streamArray.length;

	streamArray.forEach(function(stream){
		console.log("*****************")
		console.log(stream);
	});
	
	if(numVids){
		if(numVids === 1){
			//remoteVideo.srcObject = streamArray[0];
			remoteVideo.src = window.URL.createObjectURL(streamArray[0]);
			console.log("numVids is 1 trying to set remotevideo 1")
		}
		else if(numVids ===2){
			//remoteVideo.srcObject = streamArray[0];
			//remoteVideo2.srcObject = streamArray[1];
			remoteVideo.src = window.URL.createObjectURL(streamArray[0]);
			remoteVideo2.src = window.URL.createObjectURL(streamArray[1]);
			
		}else if(numVids >=3){
			//remoteVideo.srcObject = streamArray[vidArrayIndex+0];
			//remoteVideo2.srcObject = streamArray[vidArrayIndex+1];
			//remoteVideo3.srcObject = streamArray[vidArrayIndex+2];
			remoteVideo.src = window.URL.createObjectURL(streamArray[vidArrayIndex+0]);
			remoteVideo2.src = window.URL.createObjectURL(streamArray[vidArrayIndex+1]);
			remoteVideo3.src = window.URL.createObjectURL(streamArray[vidArrayIndex+2]);
			
		}
			
	}
	console.log("number of videos = "+ numVids);
	  
	     
}
///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
function connectToRoom(){

	console.log('testing');
	room = document.getElementById('roomTextBox').value;
	console.log(document.getElementById('roomTextBox'))
	
	if (room !== '') {
		socket.emit('create or join', room);
		console.log('Attempted to create or  join room', room);
	}
	navigator.mediaDevices.getUserMedia({
	audio: true,
	video: true
	})
	.then(gotStream)
	.catch(function(e) {
	alert('getUserMedia() error: ' + e.name);
	});
	
	function gotStream(stream) {
	
	//called on initiation - after camera and mic are obtain
	console.log('Adding local stream.');
	//localVideo.src = window.URL.createObjectURL(stream);
	//localVideo.srcObject = stream;
	localStream = stream;
	sendMessage('got user media');
	if (isInitiator) {
	maybeStart();
	}
	}
}
////////////////////////////////////////////////////////////////
socket.on('created', function(room, client) {
  console.log('Created room ' + room);
  mySockNum = 1;
  socketArray.push(client);
  isInitiator = true;
  
});

socket.on('full', function(room) {
  console.log('Room ' + room + ' is full');
});

socket.on('join', function (inRoom, clientNo){
	if(room ===inRoom){
		if(isInitiator){
			console.log('Another peer made a request to join room ' + room);
			renegotiateID = 0;
			renegotiateLoop = false;
		}else{
			if(mySockNum ===0){
				mySockNum = clientNo;
			}
		}	
	}
	
	console.log('Called join');
  isChannelReady = true;

});




socket.on('joined', function(room, id) {
  console.log('joined: ' + room);
  isChannelReady = true;
});

socket.on('test', function(myName){
	console.log("Im testing" + myName);
});

socket.on('log', function(array) {
  console.log.apply(console, array);
});

socket.on('catch_up', function(inStreamArray, inPlayerArray){
	if(!isInitiator){
		var streamArrayCopy = streamArray;
		var addedStream = 0;
		inStreamArray.forEach(function(inStream){
			if(inStream){
					
				var addThisStream = true;
				streamArrayCopy.forEach(function(streamCopy){
					if(!inStream.id){
						addThisStream = false;
					}
					if(inStream.id === streamCopy.id){
						addThisStream = false;
					}
				});
				if(addThisStream){
					console.log("pushing stream");
					console.log(inStream);
					streamArray.push(inStream);
					addedStream = addedStream+1;
				}
			}
		});
		console.log("added " + addedStream + " streams");
	}

	setVideoDisplays();
});

////////////////////////////////////////////////

function sendMessage(message, from_id, to_id) {
  console.log('Client sending message: ', message);
  socket.emit('message', message, room, from_id, to_id);
  //might want to emit only to room
}



if (location.hostname !== 'localhost') {
  requestTurn(
    'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
  );
}

function maybeStart() {
  console.log('>>>>>>> maybeStart() ', isStarted, localStream, isChannelReady);
  //if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
  if ( (!isStarted || isInitiator) &&typeof localStream !== 'undefined' && isChannelReady) {
	console.log('>>>>>> creating peer connection');
    //RTCPeer start
	createPeerConnection();
    pc.addStream(localStream);
    isStarted = true;
    console.log('isInitiator', isInitiator);
    if (isInitiator) {
      doCall();
    }
  }

}

//This client receives a message
socket.on('message', function(message, to_id) {
  console.log('Client received message:', message);
  if (message === 'got user media') {
    maybeStart();
  } else if (message.type === 'offer') {
	 console.log("offer made");
    if (!isInitiator && !isStarted) {
      maybeStart();
      pc.setRemoteDescription(new RTCSessionDescription(message));
      doAnswer();
    }
    if(isStarted){
    	if(to_id === mySockNum){
    		console.log('offer to reinitiate made to me');
    		pc.setRemoteDescription(new RTCSessionDescription(message)).then(doAnswer);
    		console.log('should have answered request to reinitiate');
    	}
    }
//	 if( !isInitiator && (to_id == mySockNum) ){
//		console.log("in here - should be?");
//        pc.setRemoteDescription(new RTCSessionDescription(message));
//        doAnswer();
//	 }
//    if(isInitiator){
//    	console.log("in here - should be?");
//    	pc.setRemoteDescription(new RTCSessionDescription(message));
//    	doAnswer();
//    }
//    pc.setRemoteDescription(new RTCSessionDescription(message));
 //   doAnswer();

  } else if (message.type === 'answer' && isStarted) {
	  if(isInitiator){
		  //initiator sends offer and receives answer
		pc.setRemoteDescription(new RTCSessionDescription(message));
		console.log("handled answer");
		
		if(renegotiateLoop){
	    	var count = streamArray.length;
	    	console.log('The stream array is ' + count + ' long');
	    	//for 2 streams, we go to ids 2 & 3
	    	if( count > 1){
	    		if(renegotiateID === 0){
	    			renegotiateID = 2;
	    		}
	    		
	    		if(renegotiateID <= count+1){
	    			renegotiateID = renegotiateID + 1;
	    	  		console.log('renegotiating ' + renegotiateID-1);
	    			renegotiatePeerConnection(renegotiateID-1);
	    		}else{
	    			renegotiateID = 0;
	    			console.log('done renegotiating');
	    			renegotiateLoop = false;
	    		}
	    		
	    	}
			
		}
		//add to connection array
		
		//on an answer reconnect all sessions if required
	  }
  } else if (message.type === 'candidate' && isStarted) {
	  console.log('Received candidate');
	  var candidate = new RTCIceCandidate({
      sdpMLineIndex: message.label,
      candidate: message.candidate
    });
    pc.addIceCandidate(candidate);
  } 
  
  
  //  else if (message === 'renegotiate' && isStarted && to_id === mySockNum){
//	  //if a message to renegotiate is sent, I am started, and I am specified by id
//	  
//	  
//	  pc.setRemoteDescription(new RTCSessionDescription(message));
//	  doAnswer();
//	  if ( (!isStarted || isInitiator) &&typeof localStream !== 'undefined' && isChannelReady) {
//		console.log('>>>>>> renegotiating peer connection');
//	    //RTCPeer start
//		renegotiatePeerConnection(to_id);
//		console.log('isInitiator', isInitiator);
//	    if (isInitiator) {
//	    	  console.log('Sending offer to peer');
//	    	  pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
//	    }
//	  }
//}  
   else if (message === 'bye' && isStarted) {
    handleRemoteHangup();
  }
});


/////////////////////////////////////////////////////////

function createPeerConnection() {
  try {
	console.log('<<<<<< in createPeerConnection')
    pc = new RTCPeerConnection(null);
    
    pc.onicecandidate = handleIceCandidate;
    pc.onaddstream = handleRemoteStreamAdded;
    pc.onremovestream = handleRemoteStreamRemoved;
    //pc.onnegotiationneeded = handleRenegotiation;
    console.log('Created RTCPeerConnnection');
  } catch (e) {
    console.log('Failed to create PeerConnection, exception: ' + e.message);
    alert('Cannot create RTCPeerConnection object.');
    return;
  }
}

function renegotiatePeerConnection(to_id){
	try{
		console.log('****** in adjustPeerConnection');
		var backupPC = pc;
		pc = pcArray[to_id-2];
		console.log("peer connection being changed");
		console.log(pcArray);
		console.log(to_id-2);
		console.log(pc);
		
		send_to_id = to_id;
		
	    var streamArrayCopy = streamArray;
		streamArrayCopy.forEach(function(streamCopy){
		var addThisStream = true;
		
			pc.getLocalStreams().forEach(function(localStream){
	//		indivPC.getRemoteStreams().forEach(function(remoteStream){
				var remStream = pc.getRemoteStreams()[0];
				console.log(remStream);
				if(localStream.id === streamCopy.id || streamCopy.id === remStream.id){
					addThisStream = false;
				}						
			});
			if(addThisStream){
				console.log('adding stream');
				pc.addStream(streamCopy);
			}
			//later update to remove if strream is gones
		});

		
		
	      renegotiate = true;
	      console.log('normal PC ---')
	      console.log('creating offer');
	      console.log(pc.id);
	      console.log(pc.getRemoteStreams());
	      console.log(pc.getLocalStreams());
	      pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
	      console.log('about to reset pc');
	      //pc = backupPC;
	      
	}  catch (e) {
	    console.log('Failed to renegotiate PeerConnection, exception: ' + e.message);
	    return;
	  }
	
	//loop to add everyone's stream
}

function handleIceCandidate(event) {
  console.log('icecandidate event: ', event);
  if (event.candidate) {
    sendMessage({
      type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate
    }, 
    mySockNum
    );
  } else {
    console.log('End of candidates.');
//    var pcPush = pc;
//    pcArray.push(pcPush);
    
    
 
    }

}

function handleRenegotiation(event){
	console.log("++++ renegotiating");
	console.log(event);
	//pc.createOffer(setLocalAndSendMessage, null);
}

function handleRemoteStreamAdded(event) {
  console.log('Remote stream added.');
  console.log(event);
  

  console.log('streamArrayLength before push' + streamArray.length);
  streamArray.push(event.stream);
  console.log('streamArrayLength after push' + streamArray.length);

  setVideoDisplays();
  remoteStream = event.stream;
  console.log('Remote video source is: ' + remoteVideo.src);
  console.log("I am initiator " + isInitiator);    
  if(isInitiator){

	var pcPush = pc;
	pcArray.push(pcPush);
  	//update clients 2 & 3 if we have 3 streams
  	//later make sure we have the right streams
  	//make sure most recent pc is correct
  	
  	var count = streamArray.length;
  	console.log('The stream array is ' + count + ' long');
  	
//    for 2 streams, we go to ids 2 & 3
  	if( count > 1){
  		renegotiateLoop = true;
  		if(renegotiateID === 0){
  			renegotiateID = 2;
  		}
  		
  		if(renegotiateID <= count+1){
  			renegotiateID = renegotiateID + 1;
  	  		console.log('renegotiating ' + renegotiateID-1);
  			renegotiatePeerConnection(renegotiateID-1);
  		}else{
  			console.log('done renegotiating');
  			renegotiateID = 0;
  		}
  		
  	}
  }
    
}

function handleCreateOfferError(event) {
  console.log('createOffer() error: ', event);
}

function doCall() {
  console.log('Sending offer to peer');
  pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
}


function doAnswer() {
  console.log('Sending answer to peer.');
  pc.createAnswer().then(
    setLocalAndSendMessage,
    onCreateSessionDescriptionError
  );
}

function setLocalAndSendMessage(sessionDescription) {
  // Set Opus as the preferred codec in SDP if Opus is present.
  
  console.log('printing session Description');
  console.log(sessionDescription);
  sessionDescription.sdp = preferOpus(sessionDescription.sdp);
  console.log('about to set local description');
  pc.setLocalDescription(sessionDescription);
  console.log('setLocalAndSendMessage sending message', sessionDescription);
  if(renegotiate && send_to_id > -1){
	  console.log('in renegotiate');
	  sendMessage(sessionDescription, -1, send_to_id);
	  renegotiate = false;
	  send_to_id = -1;
  }else{
	  sendMessage(sessionDescription);  
  }
}

function onCreateSessionDescriptionError(error) {
  console.log('Failed to create session description: ' + error.toString());
  console.log('On create sessionDescription error');
}

function requestTurn(turnURL) {
  var turnExists = false;
  for (var i in pcConfig.iceServers) {
    if (pcConfig.iceServers[i].urls.substr(0, 5) === 'turn:') {
      turnExists = true;
      turnReady = true;
      break;
    }
  }
  if (!turnExists) {
    console.log('Getting TURN server from ', turnURL);
    // No TURN server. Get one from computeengineondemand.appspot.com:
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var turnServer = JSON.parse(xhr.responseText);
        console.log('Got TURN server: ', turnServer);
        pcConfig.iceServers.push({
          'url': 'turn:' + turnServer.username + '@' + turnServer.turn,
          'credential': turnServer.password
        });
        turnReady = true;
      }
    };
    xhr.open('GET', turnURL, true);
    xhr.send();
  }
}


function handleRemoteStreamRemoved(event) {
  console.log('Remote stream removed. Event: ', event);
  delete streamArray[streamArray.indexOf(event.stream)];
  console.log('removed from array');
  setVideoDisplays();
  
}

function hangup() {
  console.log('Hanging up.');
  stop();
  sendMessage('bye by ' + mySockNum);
}

function handleRemoteHangup() {
  console.log('Session terminated.');
  stop();
  isInitiator = false;
}

function stop() {
  isStarted = false;
  // isAudioMuted = false;
  // isVideoMuted = false;
  pc.close();
  pc = null;
}

///////////////////////////////////////////

// Set Opus as the default audio codec if it's present.
function preferOpus(sdp) {
  var sdpLines = sdp.split('\r\n');
  var mLineIndex;
  // Search for m line.
  for (var i = 0; i < sdpLines.length; i++) {
    if (sdpLines[i].search('m=audio') !== -1) {
      mLineIndex = i;
      break;
    }
  }
  if (mLineIndex === null) {
    return sdp;
  }

  // If Opus is available, set it as the default in m line.
  for (i = 0; i < sdpLines.length; i++) {
    if (sdpLines[i].search('opus/48000') !== -1) {
      var opusPayload = extractSdp(sdpLines[i], /:(\d+) opus\/48000/i);
      if (opusPayload) {
        sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex],
          opusPayload);
      }
      break;
    }
  }

  // Remove CN in m line and sdp.
  sdpLines = removeCN(sdpLines, mLineIndex);

  sdp = sdpLines.join('\r\n');
  return sdp;
}

function extractSdp(sdpLine, pattern) {
  var result = sdpLine.match(pattern);
  return result && result.length === 2 ? result[1] : null;
}

// Set the selected codec to the first in m line.
function setDefaultCodec(mLine, payload) {
  var elements = mLine.split(' ');
  var newLine = [];
  var index = 0;
  for (var i = 0; i < elements.length; i++) {
    if (index === 3) { // Format of media starts from the fourth.
      newLine[index++] = payload; // Put target payload to the first.
    }
    if (elements[i] !== payload) {
      newLine[index++] = elements[i];
    }
  }
  return newLine.join(' ');
}

// Strip CN from sdp before CN constraints is ready.
function removeCN(sdpLines, mLineIndex) {
  var mLineElements = sdpLines[mLineIndex].split(' ');
  // Scan from end for the convenience of removing an item.
  for (var i = sdpLines.length - 1; i >= 0; i--) {
    var payload = extractSdp(sdpLines[i], /a=rtpmap:(\d+) CN\/\d+/i);
    if (payload) {
      var cnPos = mLineElements.indexOf(payload);
      if (cnPos !== -1) {
        // Remove CN payload from m line.
        mLineElements.splice(cnPos, 1);
      }
      // Remove CN line in sdp
      sdpLines.splice(i, 1);
    }
  }

  sdpLines[mLineIndex] = mLineElements.join(' ');
  return sdpLines;
}


window.onbeforeunload = function() {
	  //sendMessage('bye', room);
	  	socket.emit('bye', room);
		socket.close();
	};