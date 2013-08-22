var hangman = this;
if($ === undefined){
	var $ = require('jquery');
	var http = require('http');
	hangman.exports = hangman;
}

if(typeof exports === 'undefined'){
    var exports = this['hangman'] = {};
}



exports.matchLetterInWord = function(word, letter){
	var indexesOfOccurrences = [];
	for(var i = 0; i < word.length; i++){
    	if (word[i].toUpperCase() === letter) indexesOfOccurrences.push(i);
	}
	return indexesOfOccurrences;
}

exports.guessLetter = function(word, letter, guessedLetters){
	guessedLetters[letter] = hangman.exports.matchLetterInWord(word, letter);
	return guessedLetters[letter];
}

exports.startGame = function(){
	var guessedLetters = {};
	return guessedLetters;
}

exports.numberOfWrongGuesses = function(guessedLetters){
	var numberOfIncorrectGuesses = 0;
	for(letter in guessedLetters){
		if(guessedLetters[letter].toString() === ''){
			numberOfIncorrectGuesses++;
		}
	}

	return numberOfIncorrectGuesses;
}

exports.isGameWon = function(word, guessedLetters){
	var correctlyGuessedLetters = [];
	for(letter in guessedLetters){
		if(guessedLetters[letter].toString() !== ''){
			correctlyGuessedLetters.push(letter);
		}
	}

	function isBigEnough(element, index, array) {
		if($.inArray(element, correctlyGuessedLetters) === -1){
			return false;
		}
		return true;
	}
	return word.toUpperCase().split('').every(isBigEnough);
}

exports.splitWordListIntoWords = function(listOfWords){
	var splitWords = [];
	var notAnEmptyWord = function(word){
		if(word !== ''){
			return true;
		}
		return false;
	}
	splitWords = listOfWords.split(/\n|\r/g).filter(notAnEmptyWord);
	return splitWords;
}