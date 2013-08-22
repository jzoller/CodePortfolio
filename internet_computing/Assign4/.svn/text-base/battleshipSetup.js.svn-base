var battleShip = require('./BattleShip.js');
clientStates = {};
clientSockets = {};
games = [];

var getStringListOfAvailableClients = function(){
	var avalableClients = 'Please Wait Or Pick A Player From Below (Type / To Refresh Available Players):\n';
    for(client in clientStates){
    	if(clientStates[client].available){
        	avalableClients += clientStates[client].username + '\n';
    	}
    }
    return avalableClients + ': ';
}

var findUserByUsername = function(username){
	for(user in clientStates){
		if(username === clientStates[user].username){
			return user;
		}
	}
	return -1;
}

var writeToClientError = function(client){
	if(client.opponent !== undefined){
		var opponent = findUserByUsername(client.opponent);
		clientStates.stateNumber = 5;
		clientStates[opponent].responseQuery = 'We cannont communicate with your opponent, try again later. Ctrl+C to exit';
		clientSockets[opponent].socket.write(JSON.stringify(clientStates[opponent]));
		removeClientInfoFromServer(opponent);
		removeClientInfoFromServer(findUserByUsername(client.username));
	}
}

var writeToClient = function(socket, client){
	try{
		socket.write(JSON.stringify(client));
	}catch(ex){
		writeToClientError(client);
	}
}

var setUpClientData = function(socket, id, data){
	var drawMapForClient = function(){
		var map = '  1 2 3 4 5 6 7 8\n';
		for(var i = 1; i <= 8; i++){
			map += i;
			for(var j = 1; j <=8; j++){
				map += ' -';
			}
			map += '\n';
		}
		return map;
	}
    clientStates[id] = {
    	'username':data.toString(), 
    	'responseQuery':getStringListOfAvailableClients(), 
    	'stateNumber':1, 
    	'available':true, 
    	'map':drawMapForClient()
    };
    clientSockets[id] = {'socket':socket}
}

exports.addClientToSystem = function(socket, id, data){
	if(findUserByUsername(data.toString()) === -1){
	    console.log('Username Received From: ' + socket.remotePort + ' As: ' + data);
	    setUpClientData(socket, id, data);
	    writeToClient(socket, clientStates[id]);
	}
	else{
		writeToClient(socket, {'stateNumber':0});
	}
}

exports.connectPlayers = function(socket, id, data){
    var opponent = findUserByUsername(data.toString());
	if(findUserByUsername(data.toString()) !== -1 && clientStates[opponent].available){
		if(clientStates[id].username !== data.toString()){
			var initiateConnectionBetweenPlayers = function(client, messageToClient){
				clientStates[client].available = false;
				clientStates[client].responseQuery = messageToClient;
				clientStates[client].stateNumber = 2;
				writeToClient(clientSockets[client].socket, clientStates[client]);
			}
		    clientStates[opponent].opponent = clientStates[id].username;
		    clientStates[id].opponent = clientStates[opponent].username;
		    var newGameIndex = (games.push([id.toString(), opponent.toString(), battleShip.setupGame(clientStates[id].username, clientStates[opponent].username)])) - 1;
		    initiateConnectionBetweenPlayers(opponent, 'You have been chosen to play ' + clientStates[id].username + '\nPlease place your ships in the 8x8 grid\nThe input form is [x,y][x,y][x,y][x,y][x,y]: ');
		    initiateConnectionBetweenPlayers(id, 'Please place your ships in the 8x8 grid\nThe input form is [x,y][x,y][x,y][x,y][x,y]: ');
		}
		else{
			clientStates[id].responseQuery = 'Sorry! You Can\'t Play With Yourself...\n' + getStringListOfAvailableClients();
			writeToClient(socket, clientStates[id]);
		}
	}
	else{
		if(data.toString() === '/')
			clientStates[id].responseQuery = getStringListOfAvailableClients();
		else
			clientStates[id].responseQuery = 'Sorry! That Player Was Not Found!\n' + getStringListOfAvailableClients();
		writeToClient(socket, clientStates[id]);
	}
}

exports.setUpBattleshipGame = function(socket, id, data){
	var gameIndexInArray = exports.getPlayerAndGameIndex(id);
	var stringOfEnteredShips = data.toString();
	
	var checkNoDuplicateShips = function(){
		var countString = function (string, search){
		    var count = 0;
		    var index = string.indexOf(search);
		    while(index != -1){
		        count++;
		        index = string.indexOf(search, index + 1);
		    }
		    return count;
		}

		var result = true;
		for(var i = 1; i < stringOfEnteredShips.length; i += 5){
			if(countString(stringOfEnteredShips, stringOfEnteredShips.substr(i - 1, i + 3)) > 1)
				result = false;
		}
		return result;
	}

	if(checkNoDuplicateShips()){
		var opponent = findUserByUsername(clientStates[id].opponent);
		if(clientStates[opponent].playerNumber === undefined){
			console.log(clientStates[id].username + ' has been added to a game as P1');
			clientStates[id].playerNumber = 0;
			clientStates[id].isTurn = true;
		}
		else{
			console.log(clientStates[id].username + ' has been added to a game as P2');
			clientStates[id].playerNumber = 1;
		}
		var waitForPlayer2ToSetBoard = function(){
			if(clientStates[opponent].playerNumber === 1){
				var setPlayersToGamePlayState = function(client, messageToClient){
					clientStates[client].responseQuery = messageToClient;
					clientStates[client].stateNumber = 3;
					writeToClient(clientSockets[client].socket, clientStates[client]);
				}
				setPlayersToGamePlayState(id, 'Please make a shot in the 8x8 grid\nThe input form is [x,y]: ');
				setPlayersToGamePlayState(opponent, 'It is not your turn please wait for your turn :)');
			}
			else{
				setTimeout(waitForPlayer2ToSetBoard, 500);
			}
		}
		var gameIndexInArray = exports.getPlayerAndGameIndex(id);
		battleShip.placeShipsFromString(stringOfEnteredShips, clientStates[id].playerNumber, games[gameIndexInArray[0]][2]);
		waitForPlayer2ToSetBoard();
	}
	else{
		clientStates[id].responseQuery = 'Sorry! That Wasn\'t A Valid Placement\nPlease place your pieces in the 8x8 grid\nThe input form is [x,y][x,y][x,y][x,y][x,y]: ';
		writeToClient(socket, clientStates[id]);
	}
}

exports.getPlayerAndGameIndex = function(id){
    var playerIndex = -1;
    var gameIndex = -1;
    for(var index in games){
        if(games[index][0].toString() === id.toString()){
            playerIndex = 0;
            gameIndex = index;
        }
        else if(games[index][1].toString() === id.toString()){
            playerIndex = 1;
            gameIndex = index;
        }
    }
    return [gameIndex, playerIndex];
}

exports.swapTurns = function(socket, id, data){
    var gameIndexInArray = exports.getPlayerAndGameIndex(id);
	var stringOfData = data.toString();
	var shotXCoords = stringOfData[1];
	var shotYCoords = stringOfData[3];
	if(!battleShip.checkIfLocationHasBeenShot(shotXCoords, shotYCoords, clientStates[id].playerNumber, games[gameIndexInArray[0]][2])){
		clientStates[id].isTurn = false;
		var opponent = findUserByUsername(clientStates[id].opponent);
		clientStates[opponent].isTurn = true;

		var updateMap = function(xCoord, yCoord, indicator){
			var setCharAt = function(string, index, character){
			    if(index > string.length-1)
			    	return string;
			    return string.substr(0, index) + character + string.substr(index + 1);
			}
			var map = clientStates[id].map.toString();
			map = setCharAt(map, (20 + 2 * (xCoord - 1) + (yCoord - 1 ) * 18), indicator);
			clientStates[id].map = map;
		}

		if(battleShip.attemptShot(shotXCoords, shotYCoords, clientStates[id].playerNumber, games[gameIndexInArray[0]][2])){
			clientStates[id].responseQuery = "You hit!";
			updateMap(shotXCoords, shotYCoords, 'X');
		}
		else{
			clientStates[id].responseQuery = "You missed!";
			updateMap(shotXCoords, shotYCoords, '0');
		}
		if(battleShip.checkVictory(games[gameIndexInArray[0]][2]) === clientStates[id].playerNumber){
			var endBattleShipForPlayers = function(client){
				writeToClient(clientSockets[client].socket, clientStates[client]);
				clientSockets[client].socket.end();
				removeClientInfoFromServer(client);
			}

			var gameWon = function(){
				clientStates[id].responseQuery += '\nAnd You Won The Game! Congrats!!';
				clientStates[opponent].responseQuery = '\nYou lost! :(';
				endBattleShipForPlayers(id);
				endBattleShipForPlayers(opponent);
			}
			gameWon();
		}
		else{
			var continueGameOnNotWon = function(){
				writeToClient(socket, clientStates[id]);
				clientStates[opponent].responseQuery = "Your remaining ship positions:  " + JSON.stringify(
	                games[gameIndexInArray[0]][2][clientStates[opponent].playerNumber].battleShipPositions)+
					"\nPlease make a shot in the 8x8 grid\nThe input form is [x,y]: ";
				writeToClient(clientSockets[opponent].socket, clientStates[opponent]);
			}
			continueGameOnNotWon();
		}
	}
	else{
		var invalidShot = function(){
			clientStates[id].responseQuery = "You already shot there! Please make a shot in the 8x8 grid\nThe input form is [x,y]: ";
			writeToClient(socket, clientStates[id]);
		}
		invalidShot();
	}
}

var removeClientInfoFromServer = function(clientId){
	delete clientSockets[clientId];
	delete clientStates[clientId].username;
}