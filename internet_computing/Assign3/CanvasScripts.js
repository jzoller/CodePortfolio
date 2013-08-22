var setUp = function(){
	var hangmanCanvas = document.getElementById('hangmanCanvas');
	var context = hangmanCanvas.getContext('2d');
	showLoadingText(hangmanCanvas);
	
	var giveFocus = function(event){
		hangmanCanvas.focus();
	}

	hangmanCanvas.addEventListener('mouseover', giveFocus, false);
	beginGame();
}

var showLoadingText = function(gameCanvas){
	var context = gameCanvas.getContext('2d');
	eraseAll(gameCanvas);
	context.fillStyle = 'black';
	addTextToCanvas(context, 'Loading...', gameCanvas.width/2, gameCanvas.height/2, 'center');
}

var beginGame = function(){
	var callback = function(data){
		eraseAll(hangmanCanvas);
		var listOfWords = hangman.exports.splitWordListIntoWords(data);
		var chosenWord = listOfWords[Math.floor(Math.random() * listOfWords.length)].toUpperCase();
		drawGameArea(hangmanCanvas, chosenWord);
		playGame(chosenWord);
	}

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				callback(xhr.response);
			}
			else{
				var context = hangmanCanvas.getContext('2d');
			context.clearRect (0, 0, 1150, 500);
		  	addTextToCanvas(hangmanCanvas.getContext('2d'), 'Sorry, We Couldn\'t load any words :(', 575, 250, 'center');
			}
		}
	}
	xhr.open("GET", 'http://localhost:9000');
	xhr.send();
}

var drawGameArea = function(gameCanvas, word){
	var context = gameCanvas.getContext('2d');
	var width = gameCanvas.width;
	var height = gameCanvas.height;	

	var drawScaffold = function(){
		var scaffoldTopRight = [width * 0.9, height * 0.05];
		var scaffoldColor = '#8B7355';

		var drawScaffoldLine = function(beginX, beginY, endX, endY, widthOfLine, color){
			context.beginPath();
			context.moveTo(beginX, beginY);
			context.lineTo(endX, endY);
			context.strokeStyle = color;
			context.lineWidth = widthOfLine;
			context.stroke();
		}

		var drawVerticalScaffoldBar = function(context){
			drawScaffoldLine(scaffoldTopRight[0], scaffoldTopRight[1], scaffoldTopRight[0], 
				scaffoldTopRight[1] + height * 0.8, 8, scaffoldColor);
		}

		var drawHorizontalScaffoldBar = function(){
			drawScaffoldLine(scaffoldTopRight[0] * 1.05, scaffoldTopRight[1], 
				scaffoldTopRight[0] * 0.77, scaffoldTopRight[1], 8, scaffoldColor);
		}

		var drawNoose = function(){
			drawScaffoldLine(scaffoldTopRight[0] * 0.8, scaffoldTopRight[1], 
				scaffoldTopRight[0] * 0.8, scaffoldTopRight[1] + height * 0.1, 4, '#FFEFD5');
		}

		var drawBaseOfScaffold = function(){
			context.beginPath();
			context.fillStyle = scaffoldColor;
			context.fillRect(scaffoldTopRight[0] - 0.35 * width, scaffoldTopRight[1] + height * 0.8,
			scaffoldTopRight[0] + 0.1 * width, scaffoldTopRight[1] + height * 0.9);
		}

		drawVerticalScaffoldBar();
		drawHorizontalScaffoldBar();
		drawNoose();
		drawBaseOfScaffold();
	}

	var drawWordArea = function(){
		context.fillStyle = '#000000';
		for(var letter in word){
			addTextToCanvas(context, '_', 50+(letter*38), height * 0.35);
		}
	}

	var drawGuessableLettersLabel = function(){
		context.fillStyle = 'Black';
		addTextToCanvas(context, 'Letter Status', 43, 280);
	}

	var drawGuessableLettersArea = function(){
		context.beginPath();
		context.fillStyle = 'white';
		context.fillRect(50, 290, 400, 200);
	}

	var drawGuessableLetters = function(){
		context.fillStyle = "black";
		var xAdjust = 0;
		var yAdjust = 340;

		var adjustXAndYForNextRow = function(){
			if(i%10 === 0){
				xAdjust += -10;
				yAdjust += 60;
			}
		}

		for(var i = 1; i <= 26; i++){
			var letterToDraw = String.fromCharCode(i + 64).toUpperCase();
			addTextToCanvas(context, letterToDraw, 22 + ((i + xAdjust) * 38), yAdjust);
			adjustXAndYForNextRow();
		}
	}

	drawScaffold();
	drawWordArea();
	drawGuessableLettersLabel();
	drawGuessableLettersArea();
	drawGuessableLetters();
}

var playGame = function(chosenWord){
	guessedLetters = hangman.exports.startGame();
	context = hangmanCanvas.getContext('2d');	

	var handleKeyPress = function(event){
		var keystroke = event.which;
		if(65<=keystroke && 90>=keystroke){

			var handleCorrectLetterGuesss = function(){
				addCorrectLetterToCanvas(keystroke, context, guessedLetters[pressedLetter]);
					if(hangman.exports.isGameWon(chosenWord, guessedLetters)){
						hangmanCanvas.removeEventListener('keyup', handleKeyPress, false);
						finishGame(context, chosenWord, true);
					}
			}

			var handleIncorrectLetterGuess = function(){
				drawHangman(context, hangman.exports.numberOfWrongGuesses(guessedLetters));
				if(hangman.exports.numberOfWrongGuesses(guessedLetters) === 6){
					hangmanCanvas.removeEventListener('keyup', handleKeyPress, false);
					finishGame(context, chosenWord, false);
				}
			}

			var pressedLetter = String.fromCharCode(keystroke).toUpperCase();
			var letterToCrossOut = pressedLetter.charCodeAt(0) - 65;
			crossOutLetter(context, letterToCrossOut);
			if(hangman.exports.guessLetter(chosenWord, pressedLetter, guessedLetters).toString()!==''){
				handleCorrectLetterGuesss();
			}
			else{
				handleIncorrectLetterGuess();
			}
		}
		return false;
	}
	
	hangmanCanvas.addEventListener('keyup', handleKeyPress, false);
}

var drawHangman = function(context, numberofWrongGuesses){
	var hangmanColor = '#003300';

	var drawHead = function(){
      	drawAnArc(827, 124, 50, 0, 2 * Math.PI, false, hangmanColor);
	}

	var drawBody = function(){
		drawALine(827,174, 0, 126, hangmanColor);
	}

	var drawLeftArm = function(){
		drawALine(827, 200, -42, 70, hangmanColor);
	}

	var drawRightArm = function(){
		drawALine(827, 200, 42, 70, hangmanColor);
	}

	var drawLeftLeg = function(){
		drawALine(827, 300, -42, 100, hangmanColor);
	}

	var drawRightLeg = function(){
		drawALine(827, 300, 42, 100, hangmanColor);
	}
	
	var drawHangmanComponent = [
		drawHead, drawBody, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg
	];
	drawHangmanComponent[numberofWrongGuesses - 1]();
}

var crossOutLetter = function(context, charCodeOfLetterToCrossOut){
	var xAdjust = 0;
	var yAdjust = 0;

	var adjustXAndYForNextRow = function(){
		if((i + 1) % 10 === 0){
			xAdjust += -10;
			yAdjust += 60;
		}
	}

	for(var i = 0; i <= 25; i++){
		if(i === charCodeOfLetterToCrossOut){
			drawCrossThroughLetter(context, (charCodeOfLetterToCrossOut + xAdjust) * 38, yAdjust);
		}
		adjustXAndYForNextRow();
	}
}

var drawCrossThroughLetter = function(context, x, y){
	drawALine(60 + x, 300 + y, 38, 40, '#FF0000');
}

var addCorrectLetterToCanvas = function(keystroke, context, positions){
	var firstPositionWidth = 50;
	context.fillStyle = '#FF4500';
	for(position in positions){
		var letterToDrawOnCanvas = String.fromCharCode(keystroke).toUpperCase();
		addTextToCanvas(context, letterToDrawOnCanvas, firstPositionWidth + (positions[position] * 38), 178);
	}
}

var addTextToCanvas = function(context, text, x, y, align){
	context.beginPath();
	context.font = '40pt Andale Mono';
	context.textAlign = 'left';
	if(align !==null)
		context.textAlign = align;
	context.fillText(text, x, y);
}

var drawAnArc = function(x, y, radius, beginAngle, endAngle, drawLeft, color){
	context.beginPath();
	context.arc(x, y, radius, beginAngle, endAngle, drawLeft);
	context.strokeStyle = color;
	context.stroke();
}

var drawALine = function(beginX, beginY, changeX, changeY, color){
	context.beginPath();
	context.moveTo(beginX, beginY);
	context.lineTo(beginX + changeX, beginY + changeY);
	context.strokeStyle = color;
	context.stroke();
}

var eraseAll = function(gameCanvas){
	var context = gameCanvas.getContext('2d');
	context.beginPath();
	context.fillStyle = '#1BC6E0';
	context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
}

var finishGame = function(context, chosenWord, isWon){
	var enableEnterToRestart = function(event){
		var keystroke = event.which;
		if(keystroke === 13){
			setUp();
			hangmanCanvas.removeEventListener('keyup', enableEnterToRestart, false);
		}
	}
	
	hangmanCanvas.addEventListener('keyup', enableEnterToRestart, false);

	var drawHappyHangmanOnWin = function(){
		context.lineWidth = 3;
		drawALine(800, 50, 60, 10,'Red');

		context.lineWidth = 4;
		for(var i = 1; i <= 6; i++){
			drawHangman(context, i);
		}

		context.lineWidth = 2;
		drawAnArc(845, 105, 10, 0, Math.PI, true, '#003300');
		drawAnArc(805, 105, 10, 0, Math.PI, true, '#003300');
		drawAnArc(827, 148, 20, 0.4 * Math.PI, 0.8 * Math.PI, false, '#003300');
	}

	var drawFaceOnLoose = function(){
		context.lineWidth = 2;
      	drawAnArc(827, 168, 20, -0.1 * Math.PI, -0.8 * Math.PI, true, '#003300');
  		var eyeColor = '#003300';
  		drawALine(840, 100, 10, 10, eyeColor);
  		drawALine(850, 100, -10, 10, eyeColor);
  		drawALine(800, 100, 10, 10, eyeColor)
  		drawALine(810, 100, -10, 10, eyeColor);
	}

	var gameFinishOptions = ['Red', 'Game Over!', 'The Word Was:', drawFaceOnLoose];
	if(isWon){
		gameFinishOptions = ['Green', 'You Won!', 'Good Job Guessing:', drawHappyHangmanOnWin];
	}
	context.beginPath();
	context.fillStyle = gameFinishOptions[0];
	context.fillRect(0, 0, 600, 500);
	context.fillStyle = 'Black';
	gameFinishOptions[3]();
	addTextToCanvas(context, gameFinishOptions[1], 300, 150, 'center');
	addTextToCanvas(context, gameFinishOptions[2], 300, 200, 'center');
	addTextToCanvas(context, chosenWord, 300, 250, 'center');
	addTextToCanvas(context, 'Press Enter', 300, 300, 'center');
	addTextToCanvas(context, 'To Restart', 300, 350, 'center');
}