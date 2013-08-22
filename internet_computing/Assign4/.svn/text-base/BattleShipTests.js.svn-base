var battleShip = require('./BattleShip.js');

exports.canary = function(test){
	test.ok(true);
	test.done();
}

exports.setUp = function(callback){
	games = [];
	games.push(battleShip.setupGame('Jason', 'Corey'));
	callback();
}

exports.tearDown = function(callback){
	games = [];	
	callback();
}

exports.testPlaceSingleShipWithinRange = function(test){
	var resultOfPlacement = battleShip.placeShipsFromString('[1,2]', 0, games[0]);
	test.ok(resultOfPlacement);
	test.done();
}

exports.testPlaceShipBelowRange = function(test){
	var resultOfPlacement = battleShip.placeShipsFromString('[0, 0]', 0, games[0]);
	test.deepEqual([], games[0][0].battleShipPositions);
	test.ok(!resultOfPlacement);
	test.done();
}

exports.testPlaceShipAboveRange = function(test){
	var resultOfPlacement = battleShip.placeShipsFromString('[9, 9]', 1, games[0]);
	test.deepEqual([], games[0][1].battleShipPositions);
	test.ok(!resultOfPlacement);
	test.done();
}

exports.testPlaceTwoShipsWithinRange = function(test){
	var resultOfPlacement = battleShip.placeShipsFromString('[1,2][3,5]', 0, games[0]);
	test.deepEqual([[1, 2], [3, 5]], games[0][0].battleShipPositions);
	test.ok(resultOfPlacement);
	test.done();
}

exports.testFirstShipInSecondShipOut = function(test){
	var resultOfPlacement = battleShip.placeShipsFromString('[4,4][9,0]', 1, games[0]);
	test.deepEqual([], games[0][1].battleShipPositions);
	test.ok(!resultOfPlacement);
	test.done();
}

exports.testFirstShipOutSecondShipIn = function(test){
	var resultOfPlacement = battleShip.placeShipsFromString('[0,9][2,7]', 0, games[0]);
	test.deepEqual([], games[0][0].battleShipPositions);
	test.ok(!resultOfPlacement);
	test.done();
}

exports.testTwoShipsSamePlace = function(test){
	var resultOfPlacement = battleShip.placeShipsFromString('[2,3][2,3]', 0, games[0]);
	test.deepEqual([], games[0][0].battleShipPositions);
	test.ok(!resultOfPlacement);
	test.done();
}

exports.testAddFiveShipsIn = function(test){
	var resultOfPlacement = battleShip.placeShipsFromString('[4,3][7,8][7,7][8,7][8,8]', 0, games[0]);
	test.deepEqual([[4, 3], [7, 8], [7, 7], [8, 7], [8, 8]],  games[0][0].battleShipPositions);
	test.ok(resultOfPlacement);
	test.done();
}

exports.testAddSixShips = function(test){
	var resultOfPlacement = battleShip.placeShipsFromString('[4,3][7,8][7,7][8,7][8,8][2,4]', 0, games[0])
	test.deepEqual([], games[0][0].battleShipPositions);
	test.ok(!resultOfPlacement);
	test.done();
}

exports.testAddFirstPlayer = function(test){
	games[0] = [];
	battleShip.addPlayer('Corey', games[0]);
	test.deepEqual('Corey', games[0][0].name);
	test.ok(games[0].length === 1);
	test.done();
}

exports.testAddSecondPlayer = function(test){
	games[0] = [];
	battleShip.addPlayer('Corey', games[0]);
	battleShip.addPlayer('Jason', games[0]);
	test.deepEqual('Corey', games[0][0].name);
	test.deepEqual('Jason', games[0][1].name);
	test.ok(games[0].length === 2);
	test.done();
}

exports.addThirdPlayer = function(test){
	var resultOfAdd = battleShip.addPlayer('some jerk', games[0]);
	test.ok(!resultOfAdd);
	test.deepEqual('Jason', games[0][0].name);
	test.deepEqual('Corey', games[0][1].name);
	test.done();
}

exports.testCheckLocationForShot = function(test){
	battleShip.placeShip(2, 5, 0, games[0]);
	battleShip.placeShip(3, 3, 1, games[0]);
	test.ok(battleShip.checkLocationForShot(2, 5, 1, games[0]) > -1);
	test.ok(battleShip.checkLocationForShot(3, 3, 0, games[0]) > -1);
	test.ok(battleShip.checkLocationForShot(1, 1, 0, games[0]) === -1);
	test.ok(battleShip.checkLocationForShot(6, 6, 1, games[0]) === -1);
	test.done();
}

exports.testAttemptShot = function(test){
	battleShip.placeShip(2, 5, 0, games[0]);
	battleShip.placeShip(3, 3, 1, games[0]);
	battleShip.placeShip(7, 7, 0, games[0]);
	battleShip.placeShip(8, 7, 1, games[0]);
	test.ok(battleShip.attemptShot(2, 5, 1, games[0]));
	test.ok(battleShip.attemptShot(3, 3, 0, games[0]));
	test.ok(games[0][0].resultOfLastHit);
	test.deepEqual([[2, 5]],games[0][1].locationsOfShots);
	test.deepEqual([[3, 3]],games[0][0].locationsOfShots);
	test.ok(games[0][1].resultOfLastHit);
	test.ok(!battleShip.attemptShot(1, 1, 0, games[0]));
	test.ok(!battleShip.attemptShot(1, 1, 1, games[0]));
	test.ok(!games[0][0].resultOfLastHit);
	test.ok(!games[0][1].resultOfLastHit);
	test.deepEqual([[2, 5], [1, 1]],games[0][1].locationsOfShots);
	test.deepEqual([[3, 3], [1, 1]],games[0][0].locationsOfShots);
	test.done();
}

exports.testCheckIfLocationHasBeenShot = function(test){
	battleShip.placeShip(2, 5, 0, games[0]);
	battleShip.placeShip(3, 3, 1, games[0]);
	battleShip.placeShip(7, 7, 0, games[0]);
	battleShip.placeShip(8, 7, 1, games[0]);
	battleShip.attemptShot(2, 5, 1, games[0]);
	battleShip.attemptShot(3, 3, 0, games[0]);
	battleShip.attemptShot(1, 1, 1, games[0]);
	battleShip.attemptShot(1, 1, 0, games[0]);
	test.ok(battleShip.checkIfLocationHasBeenShot(2, 5, 1, games[0]));
	test.ok(battleShip.checkIfLocationHasBeenShot(3, 3, 0, games[0]));
	test.ok(battleShip.checkIfLocationHasBeenShot(1, 1, 1, games[0]));
	test.ok(battleShip.checkIfLocationHasBeenShot(1, 1, 0, games[0]));
	test.ok(!battleShip.checkIfLocationHasBeenShot(7, 7, 1, games[0]));
	test.ok(!battleShip.checkIfLocationHasBeenShot(8, 7, 0, games[0]));
	test.ok(!battleShip.checkIfLocationHasBeenShot(2, 2, 1, games[0]));
	test.ok(!battleShip.checkIfLocationHasBeenShot(4, 4, 0, games[0]));
	test.done();
}

exports.testCheckVictoryIndex1WinsShortGame = function(test){
	battleShip.placeShip(2, 5, 0, games[0]);
	battleShip.placeShip(3, 3, 1, games[0]);
	battleShip.placeShip(7, 7, 0, games[0]);
	battleShip.placeShip(8, 7, 1, games[0]);
	test.equal(-1, battleShip.checkVictory(games[0]));
	test.ok(battleShip.attemptShot(3, 3, 0, games[0]));
	test.ok(battleShip.attemptShot(2, 5, 1, games[0]));
	test.equal(-1, battleShip.checkVictory(games[0]));
	test.ok(!battleShip.attemptShot(1, 1, 0, games[0]));
	test.ok(battleShip.attemptShot(7, 7, 1, games[0]));
	test.equal(1, battleShip.checkVictory(games[0]));
	test.done();
}

exports.testCheckVictoryIndex0WinsFullGame = function(test){
	battleShip.placeShip(2, 5, 0, games[0]);
	battleShip.placeShip(3, 3, 1, games[0]);
	battleShip.placeShip(7, 7, 0, games[0]);
	battleShip.placeShip(8, 7, 1, games[0]);
	battleShip.placeShip(8, 8, 0, games[0]);
	battleShip.placeShip(3, 2, 1, games[0]);
	battleShip.placeShip(6, 4, 0, games[0]);
	battleShip.placeShip(6, 4, 1, games[0]);
	battleShip.placeShip(1, 6, 0, games[0]);
	battleShip.placeShip(1, 7, 1, games[0]);
	test.ok(battleShip.attemptShot(3, 3, 0, games[0]));
	test.ok(battleShip.attemptShot(2, 5, 1, games[0]));
	test.ok(!battleShip.attemptShot(1, 1, 0, games[0]));
	test.ok(battleShip.attemptShot(7, 7, 1, games[0]));
	test.ok(battleShip.attemptShot(8, 7, 0, games[0]));
	test.ok(!battleShip.attemptShot(1, 3, 1, games[0]));
	test.ok(battleShip.attemptShot(3, 2 , 0, games[0]));
	test.ok(battleShip.attemptShot(1, 6, 1, games[0]));
	test.ok(battleShip.attemptShot(1, 7, 0, games[0]));
	test.ok(!battleShip.attemptShot(2, 2, 1, games[0]));
	test.ok(battleShip.attemptShot(6, 4, 0, games[0]));
	test.equal(0, battleShip.checkVictory(games[0]));
	test.done();
}

exports.handleConcurrentGamesVenkatWins = function(test){
	games.push(battleShip.setupGame('Angelica', 'Venkat'));
	battleShip.placeShip(2, 5, 0, games[0]);
	battleShip.placeShip(3, 3, 1, games[0]);
	battleShip.placeShip(7, 7, 0, games[0]);
	battleShip.placeShip(8, 7, 1, games[0]);
	battleShip.placeShip(8, 8, 0, games[0]);
	battleShip.placeShip(3, 2, 1, games[0]);
	battleShip.placeShip(6, 4, 0, games[0]);
	battleShip.placeShip(6, 4, 1, games[0]);
	battleShip.placeShip(1, 6, 0, games[0]);
	battleShip.placeShip(1, 7, 1, games[0]);

	battleShip.placeShip(2, 3, 0, games[1]);
	battleShip.placeShip(1, 3, 1, games[1]);
	battleShip.placeShip(6, 7, 0, games[1]);
	battleShip.placeShip(8, 2, 1, games[1]);
	battleShip.placeShip(1, 1, 0, games[1]);
	battleShip.placeShip(4, 2, 1, games[1]);
	battleShip.placeShip(5, 6, 0, games[1]);
	battleShip.placeShip(6, 3, 1, games[1]);
	battleShip.placeShip(1, 4, 0, games[1]);
	battleShip.placeShip(1, 7, 1, games[1]);

	test.ok(battleShip.attemptShot(3, 3, 0, games[0]));
	test.ok(battleShip.attemptShot(2, 5, 1, games[0]));
	test.ok(!battleShip.attemptShot(1, 1, 0, games[0]));
	test.ok(battleShip.attemptShot(7, 7, 1, games[0]));
	test.ok(battleShip.attemptShot(8, 7, 0, games[0]));
	test.ok(!battleShip.attemptShot(1, 3, 1, games[0]));
	test.ok(battleShip.attemptShot(3, 2 , 0, games[0]));
	test.ok(battleShip.attemptShot(1, 6, 1, games[0]));
	test.ok(battleShip.attemptShot(1, 7, 0, games[0]));
	test.ok(!battleShip.attemptShot(2, 2, 1, games[0]));
	test.ok(battleShip.attemptShot(6, 4, 0, games[0]));
	test.equal(0, battleShip.checkVictory(games[0]));

	test.ok(!battleShip.attemptShot(2, 1, 0, games[1]));
	test.ok(!battleShip.attemptShot(3, 3, 1, games[1]));
	test.ok(battleShip.attemptShot(1, 3, 0, games[1]));
	test.ok(!battleShip.attemptShot(1, 2, 1, games[1]));
	test.ok(!battleShip.attemptShot(5, 5, 0, games[1]));
	test.equal(-1, battleShip.checkVictory(games[1]));
	test.equal(0, battleShip.checkVictory(games[0]));
	test.ok(battleShip.attemptShot(2, 3, 1, games[1]));
	test.ok(!battleShip.attemptShot(4, 7, 0, games[1]));
	test.ok(battleShip.attemptShot(6, 7, 1, games[1]));
	test.ok(battleShip.attemptShot(8, 2, 0, games[1])); 
	test.ok(battleShip.attemptShot(1, 1, 1, games[1]));
	test.equal(-1, battleShip.checkVictory(games[1]));
	test.ok(!battleShip.attemptShot(6, 6, 0, games[1]));
	test.ok(battleShip.attemptShot(5, 6, 1, games[1]));
	test.ok(battleShip.attemptShot(4, 2, 0, games[1]));
	test.ok(battleShip.attemptShot(1, 4, 1, games[1]));
	test.equal(1, battleShip.checkVictory(games[1]));
	test.done();
}