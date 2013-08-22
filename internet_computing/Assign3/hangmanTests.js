var hangmanGame = require('./hangman.js');

exports.canary = function(test){
	test.equal(true, true);
	test.done();
}

exports.testStartGame = function(test){
	test.deepEqual({}, hangmanGame.startGame());
	test.done();
}

exports.testMatchOneLetterInAWord = function(test){
	var guessedLetters = hangmanGame.startGame();
	test.equal(1, hangmanGame.matchLetterInWord('word', 'O', guessedLetters));
	test.done();
}

exports.testMatchTwoLettersInAWord = function(test){
	var guessedLetters = hangmanGame.startGame();
	test.deepEqual([1, 2], hangmanGame.matchLetterInWord('beer', 'E', guessedLetters));
	test.done();
}

exports.testMatchFourLettersInAWord = function(test){
	var guessedLetters = hangmanGame.startGame();
	test.deepEqual([1, 3, 5, 8], hangmanGame.matchLetterInWord('balalaikas', 'A', guessedLetters));
	test.done();
}

exports.testMatchNoLettersInAWord = function(test){
	var guessedLetters = hangmanGame.startGame();
	test.deepEqual([], hangmanGame.matchLetterInWord('tough', 'L', guessedLetters));
	test.done();
}

exports.testGuessOneLetterInAWord = function(test){
	var guessedLetters = hangmanGame.startGame();
	hangmanGame.guessLetter('word', 'O', guessedLetters);
	test.deepEqual({'O':[1]}, guessedLetters);
	test.done();
}

exports.testGuessTwoLettersInAWord = function(test){
	var guessedLetters = hangmanGame.startGame();
	hangmanGame.guessLetter('beer', 'E', guessedLetters);
	test.deepEqual({'E':[1, 2]}, guessedLetters);
	test.done();
}

exports.testGuessFourLettersInAWord = function(test){
	var guessedLetters = hangmanGame.startGame();
	hangmanGame.guessLetter('balalaikas', 'A', guessedLetters);
	test.deepEqual({'A':[1, 3, 5, 8]}, guessedLetters);
	test.done();
}

exports.testGuessNoLettersInAWord = function(test){
	var guessedLetters = hangmanGame.startGame();
	hangmanGame.guessLetter('tough', 'L', guessedLetters);
	test.deepEqual({'L':[]}, guessedLetters);
	test.done();
}

exports.testGuessTwoLetters = function(test){
	var guessedLetters = hangmanGame.startGame();
	hangmanGame.guessLetter('interesting', 'I', guessedLetters);
	hangmanGame.guessLetter('interesting', 'J', guessedLetters);
	test.deepEqual({'I':[0, 8], 'J':[]}, guessedLetters);
	test.done();
}

exports.testGameIsWon = function(test){
	var guessedLetters = hangmanGame.startGame();
	var word = 'certificates';
	hangmanGame.guessLetter(word, 'C', guessedLetters);
	hangmanGame.guessLetter(word, 'E', guessedLetters);
	hangmanGame.guessLetter(word, 'R', guessedLetters);
	hangmanGame.guessLetter(word, 'T', guessedLetters);
	hangmanGame.guessLetter(word, 'I', guessedLetters);
	hangmanGame.guessLetter(word, 'F', guessedLetters);
	hangmanGame.guessLetter(word, 'A', guessedLetters);
	hangmanGame.guessLetter(word, 'S', guessedLetters);
	test.equal(true, hangmanGame.isGameWon(word, guessedLetters));
	test.done();
}

exports.testIsGameOverAndNotWonAfter6WrongGuesses = function(test){
	var guessedLetters = hangmanGame.startGame();
	word = 'Interesting';
	test.deepEqual([], hangmanGame.guessLetter(word, 'A', guessedLetters));
	test.deepEqual([3, 5], hangmanGame.guessLetter(word, 'E', guessedLetters));
	test.deepEqual([0, 8], hangmanGame.guessLetter(word, 'I', guessedLetters));
	test.deepEqual([], hangmanGame.guessLetter(word, 'O', guessedLetters));
	test.deepEqual([], hangmanGame.guessLetter(word, 'U', guessedLetters));
	test.deepEqual([6], hangmanGame.guessLetter(word, 'S', guessedLetters));
	hangmanGame.guessLetter(word, 'M', guessedLetters);
	hangmanGame.guessLetter(word, 'J', guessedLetters);
	hangmanGame.guessLetter(word, 'Z', guessedLetters);
	test.equal(6, hangmanGame.numberOfWrongGuesses(guessedLetters));
	test.equal(false, hangmanGame.isGameWon(word, guessedLetters));
	test.done();
}

exports.testGameIsNotOverAndWon = function(test){
	var guessedLetters = hangmanGame.startGame();
	var word = 'Cool';
	hangmanGame.guessLetter(word, 'C', guessedLetters);
	hangmanGame.guessLetter(word, 'O', guessedLetters);
	hangmanGame.guessLetter(word, 'L', guessedLetters);
	test.equal(0, hangmanGame.numberOfWrongGuesses(guessedLetters));
	test.equal(true, hangmanGame.isGameWon('Cool', guessedLetters));
	test.done();
}

exports.testGameIsNotOverAndNotWonAfter6GuessesOfSameLetters = function(test){
	var guessedLetters = hangmanGame.startGame();
	var word = 'Interesting';
	hangmanGame.guessLetter(word, 'A', guessedLetters);
	hangmanGame.guessLetter(word, 'E', guessedLetters);
	hangmanGame.guessLetter(word, 'I', guessedLetters);
	hangmanGame.guessLetter(word, 'O', guessedLetters);
	hangmanGame.guessLetter(word, 'O', guessedLetters);
	hangmanGame.guessLetter(word, 'S', guessedLetters);
	test.equal(2, hangmanGame.numberOfWrongGuesses(guessedLetters));
	test.equal(false, hangmanGame.isGameWon(word, guessedLetters));
	test.done();
}

exports.testSplitWordOfOneWordListIntoWords = function(test){
	test.deepEqual(['word'], hangmanGame.splitWordListIntoWords('word'));
	test.done();
}

exports.testSplitWordListIntoWords = function(test){
	test.deepEqual(['word', 'interesting', 'tough'], hangmanGame.splitWordListIntoWords('word\ninteresting\ntough'));
	test.done();
}

exports.testSplitWordListIntoWordsWithAnEmptyLine = function(test){
	test.deepEqual(['word', 'tough', 'item'], hangmanGame.splitWordListIntoWords('word\n\ntough\nitem'));
	test.done();
}

exports.testSplitWordListIntoWordsBeginningWithAnEmptyLine = function(test){
	test.deepEqual(['word', 'tough', 'time'], hangmanGame.splitWordListIntoWords('\nword\ntough\ntime'));
	test.done();
}

exports.testSplitWordListIntoWordsEndingWithAnEmptyLine = function(test){
	test.deepEqual(['this', 'weird', 'timer'], hangmanGame.splitWordListIntoWords('this\nweird\ntimer\n'));
	test.done();
}

exports.testSplitWordListIntoWordsUsingUnixNewLine = function(test){
	test.deepEqual(['how', 'fun', 'is', 'javascript'], hangmanGame.splitWordListIntoWords('how\rfun\ris\rjavascript'));
	test.done();
}