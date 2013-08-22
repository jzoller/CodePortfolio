var net = require('net');
var events = require('events');
var battleshipSetup = require('./battleshipSetup.js');

var HOST = 'localhost';
var PORT = 8080;

var requestAndResponseHandler = function(socket){
    console.log('User Connected: ' + socket.remoteAddress +':'+ socket.remotePort);
    
    var clientRequestHandler = function(data){
        var id = socket.remotePort;
        if(clientStates[id] === undefined){
            battleshipSetup.addClientToSystem(socket, id, data);
        }
        else if(clientStates[id].opponent === undefined){
            battleshipSetup.connectPlayers(socket, id, data);
        }
        else if(clientStates[id].playerNumber === undefined){
            battleshipSetup.setUpBattleshipGame(socket, id, data);
        }
        else if(clientStates[id].isTurn === true){
            battleshipSetup.swapTurns(socket, id, data);
        }
    }
    socket.on('data', clientRequestHandler);
    
    var closeConnectionHandler = function(data){
        console.log('User Disconnected');
    }
    socket.on('close', closeConnectionHandler);
    
}
var server = net.createServer(requestAndResponseHandler).listen(PORT, HOST);

var errorHandler = function(error){
    console.log('There was a problem starting the server.\n' + error);
}

server.on('error', errorHandler);

console.log('Server starting on ' + HOST +':'+ PORT);