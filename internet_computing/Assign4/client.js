var net = require('net');
var HOST = 'localhost';
var PORT = 8080;
var clientState;

function ask(question, format, callback){
    var stdin = process.stdin, stdout = process.stdout;
    stdin.resume();
    stdout.write(question);
    var checkInputIsInCorrectForm = function(data){
        data = data.toString().trim();
        if(format.test(data)){
            callback(data);
        }
        else{
            stdout.write("It should be in the form of the regex: "+ format +"\n");
            ask(question, format, callback);
        }
    }
    stdin.once('data', checkInputIsInCorrectForm);
}

var client = new net.Socket();
var usernameRegex = /^(\w||\d)+$/;
var handleConnectionToServer = function(){
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    var sendUserNameToServer = function(username){
        client.write(username);
    }
    ask("Please Enter A Username: ", usernameRegex, sendUserNameToServer);
}

client.connect(PORT, HOST, handleConnectionToServer);

var sendDataToServer = function(data){
    client.write(data);
}

var receiveData = function(data){
    clientState = JSON.parse(data);

    var noUserNameSet = function(){
        ask("Sorry! That Name Is Taken!\nPlease Enter A Username: ", usernameRegex, sendDataToServer);
    }

    var noOpponentSet = function(){
        console.log('Hello, '+ clientState.username);
        function askWhenUserDoesNotHaveOpponent(question, callback){
            var stdin = process.stdin, stdout = process.stdout;
            stdin.resume();
            stdout.write(question);
            var checkInputIsInCorrectForm = function(data){
                data = data.toString().trim();
                if(data !== ''){
                    if(clientState.opponent === undefined)
                        callback(data);
                    else
                        return;
                }
                else{
                    askWhenUserDoesNotHaveOpponent(question, callback);
                }
            }
            stdin.once('data', checkInputIsInCorrectForm);
        }
        askWhenUserDoesNotHaveOpponent(clientState.responseQuery, sendDataToServer);
    }

    var opponentSetAndNoPlayerNumber = function(){
        var messageToUserAfterPlacingShips = function(data){
            console.log('Waiting For Response...');
            sendDataToServer(data);
        }
        ask(clientState.responseQuery, /^(\[[1-8],[1-8]\]){5}$/, messageToUserAfterPlacingShips);
    }

    var playingGame = function(){
        if(clientState.isTurn === true){
            ask(clientState.responseQuery, /^(\[[1-8],[1-8]\]){1}$/, sendDataToServer);
        }
        else{
            console.log('Map:');
            console.log(clientState.map.toString());
            console.log(clientState.responseQuery.toString());
        }
    }

    var errorConnecting = function(){
        console.log(clientState.responseQuery.toString());
    }

    var functionsOnStates = [noUserNameSet, noOpponentSet, opponentSetAndNoPlayerNumber, playingGame, errorConnecting];
    functionsOnStates[clientState.stateNumber]();
}
client.on('data', receiveData);

var closeConnection = function(){
    console.log('\nGoodbye, Thanks For Playing BattleShip!');
    client.destroy();
    process.exit();
}
client.on('close', closeConnection);

var handleError = function(error){
    console.log('There was an error connecting to the server. Please try again later.\n' + error);
}

client.on('error', handleError);