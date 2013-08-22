coffeeWeatherApp = require './CoffeeWeatherApp.coffee'

readFileAndPrintResults = (fileOfWOEIDS) ->
	numberOfCitiesRecieved = 0
	WOEIDSToTest = readFile fileOfWOEIDS
	numberOfCitiesSent = WOEIDSToTest.length
	weatherOutpuHandler = (error, content) ->
		numberOfCitiesRecieved++
		if numberOfCitiesSent == numberOfCitiesRecieved
			generateOutput content.sort()
	coffeeWeatherApp.getWeatherInfoFromWOEIDS WOEIDSToTest, weatherOutpuHandler

readFile = (fileName) ->
	fileStream = require 'fs'
	ciyCodes = fileStream.readFileSync fileName, 'utf8'
	ciyCodes.split('\n').filter isNotEmpty

isNotEmpty = (number) ->
	number != ''

generateOutput = (weatherInfoToPrint) ->
	console.log '    City, State                   Temperature'
	weatherInfoToPrint.forEach formatOutput

formatOutput = (content) ->
	stringOfWeatherData = "... #{content[0]}, #{content[1]}"
	stringOfWeatherData += addNumberOfWhiteSpaces(30 - stringOfWeatherData.length) + '...'
	stringOfWeatherData += addNumberOfWhiteSpaces (8 - content[2].length)
	stringOfWeatherData += content[2]
	console.log stringOfWeatherData

addNumberOfWhiteSpaces = (numberOfWhiteSpaces) ->
	whiteSpaces = ''
	for count in [0..numberOfWhiteSpaces]
		whiteSpaces += ' '
	whiteSpaces
		
readFileAndPrintResults 'WOEIDS'