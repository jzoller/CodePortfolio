exports.placeShip = function(xCoord, yCoord, playerIndex, gameState){
	gameState[playerIndex].battleShipPositions.push([xCoord, yCoord]);
}

var countString = function (str, search){
    var count=0;
    var index=str.indexOf(search);
    while(index!=-1){
        count++;
        index=str.indexOf(search,index+1);
    }
    return count;
}

exports.placeShipsFromString = function(stringOfShips, playerIndex, gameState){
	var result = true;
	if(stringOfShips.length>25)
		result = false;
	for(var i = 1; i < stringOfShips.length; i += 5){
		result = (result && exports.testPlacement(stringOfShips[i], stringOfShips[i+2], playerIndex, gameState));
		if(countString(stringOfShips, stringOfShips.substr(i-1, i+3)) > 1)
			result = false;
	}
	if(result){
		for(var i = 1; i < stringOfShips.length; i += 5){
			exports.placeShip(stringOfShips[i], stringOfShips[i+2], playerIndex, gameState);
		}
	}
	return result;
}

exports.testPlacement = function(xCoord, yCoord, playerIndex, gameState){
	return (xCoord >= 1 && xCoord <= 8 && yCoord >= 1 && yCoord <= 8 
		&& exports.indexOfBattleShipPosition(xCoord, yCoord, playerIndex, gameState) === -1
		&& gameState[playerIndex].battleShipPositions.length < 5);	

}

exports.indexOfBattleShipPosition = function(xCoord, yCoord, playerIndex, gameState){
	var result = -1;
	var coordinates = [xCoord, yCoord];
	for(var index in gameState[playerIndex].battleShipPositions)
		if(gameState[playerIndex].battleShipPositions[index][0] === xCoord && 
			gameState[playerIndex].battleShipPositions[index][1] === yCoord)
			result = index;
	return result;
}

exports.addPlayer = function(playerName, gameState){
	var result = false;
	if(gameState.length < 2){
		result = true;
		gameState.push(
			{'name': playerName, 
			'battleShipPositions': [], 
			'resultOfLastHit': false, 
			'locationsOfShots': []});
	}
	return result;
}

exports.checkLocationForShot = function(xCoord, yCoord, playerIndexShooting, gameState){
	var playerIndexHit = (playerIndexShooting + 1) % 2;
	return exports.indexOfBattleShipPosition(xCoord, yCoord, playerIndexHit, gameState);
}

exports.attemptShot = function(xCoord, yCoord, playerIndexShooting, gameState){
	var indexOfShipAtLocation = exports.checkLocationForShot(xCoord, yCoord, playerIndexShooting, gameState);
	if(indexOfShipAtLocation !== -1)
		exports.adjustBattleShipPositionsAfterHit(indexOfShipAtLocation, (playerIndexShooting + 1) % 2, gameState);
	gameState[playerIndexShooting].locationsOfShots.push([xCoord, yCoord]);
	gameState[playerIndexShooting].resultOfLastHit = indexOfShipAtLocation !== -1;
	return gameState[playerIndexShooting].resultOfLastHit;
}

exports.adjustBattleShipPositionsAfterHit = function(positionIndex, playerIndexHit, gameState){
	var newBattleShipPositions = [];
	for(index in gameState[playerIndexHit].battleShipPositions)
		if(index != positionIndex)
			newBattleShipPositions.push(gameState[playerIndexHit].battleShipPositions[index]);
	gameState[playerIndexHit].battleShipPositions = newBattleShipPositions;
}

exports.checkVictory = function(gameState){
	var result = -1;
	if(gameState[0].battleShipPositions.length === 0)
		result = 1;
	else if(gameState[1].battleShipPositions.length === 0)
		result = 0;
	return result;
}

exports.checkIfLocationHasBeenShot = function(xCoord, yCoord, playerIndex, gameState){
	var result = false;
	for(var index in gameState[playerIndex].locationsOfShots)
		if(gameState[playerIndex].locationsOfShots[index][0] === xCoord
			&& gameState[playerIndex].locationsOfShots[index][1] === yCoord)
			result = true;

	return result;
}

exports.setupGame = function(namePlayer1, namePlayer2){
	var gameState = [];
	exports.addPlayer(namePlayer1, gameState);
	exports.addPlayer(namePlayer2, gameState);
	return gameState;
}
