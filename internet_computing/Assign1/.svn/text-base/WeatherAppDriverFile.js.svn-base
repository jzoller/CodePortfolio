var weatherApp = require('./WeatherApp.js');
var fileStream = require('fs');

var readFileAndPrintResults = function(fileOfWOEIDS){
	var numberOfCitiesRecieved = 0;
	var WOEIDSToTest = readFile(fileOfWOEIDS);
	var numberOfCitiesSent = WOEIDSToTest.length;
	var weatherAppOutputHandler = function(error, content){
		numberOfCitiesRecieved++;
		if(numberOfCitiesSent === numberOfCitiesRecieved){
			generateOutput(content.sort());
		}
	}
	weatherApp.getWeatherInfoFromWOEIDS(WOEIDSToTest, weatherAppOutputHandler);
}

var readFile = function(fileName){
	var fileStream = require('fs');
	var cityCodes = fileStream.readFileSync(fileName, 'utf8');
	return cityCodes.split('\n').filter(isNotEmpty);
}

var isNotEmpty = function(number){
	return (number !== '');
}

var generateOutput = function(weatherInfoToPrint){
	console.log('    City, State                   Temperature');
	weatherInfoToPrint.forEach(formatOutput);
}

var formatOutput = function(content){
	var stringOfWeatherData = '... ';
	stringOfWeatherData += content[0]+', '+content[1];
	stringOfWeatherData += addNumberOfWhiteSpaces(30-stringOfWeatherData.length)
	stringOfWeatherData += '...';
	stringOfWeatherData += addNumberOfWhiteSpaces(8-content[2].length)
	stringOfWeatherData += content[2];
	console.log(stringOfWeatherData);
}

var addNumberOfWhiteSpaces = function(numberOfWhiteSpaces){
	var whiteSpaces = '';
	for(var i = 0; i<numberOfWhiteSpaces; i++)
		whiteSpaces += ' ';
	return whiteSpaces;
}

readFileAndPrintResults('WOEIDS');