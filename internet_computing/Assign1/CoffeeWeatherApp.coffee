http = require 'http'
jQuery = require 'jquery'
coffeeWeatherApp = this

exports.canary = -> 
	true

exports.generatePathForHttpRequest = (WOEID)-> 
	'/forecastrss?w=' + WOEID + '&u=f'

exports.generateHttpOptionsForHttpRequest = (path) ->
	httpOptions =
		host: 'weather.yahooapis.com',
		port: 80,
		path: path
	httpOptions

exports.parseDataFromWebRequest = (httpRequest) ->
	dataToReturn = []
	dataToReturn.push (jQuery(httpRequest).find('yweather\\:location').attr 'city')
	dataToReturn.push (jQuery(httpRequest).find('yweather\\:location').attr 'region')
	dataToReturn.push (jQuery(httpRequest).find('yweather\\:condition').attr 'temp')
	if dataToReturn[0] == undefined && dataToReturn[1] == undefined && dataToReturn[2] == undefined
		dataToReturn = ['Unavailable', 'Unavailable', 'Unavailable'] 
	dataToReturn

exports.getHttpResponse = (httpOptions, callback) ->
	httpResponse = ''
	httpGetFunction = (response) ->
		response.on 'data', handleResponseOnDataReceived
		response.on 'error', handleResonseOnError
		response.on 'end', handleEndOfResponse

	handleResponseOnDataReceived = (responseData) ->
		httpResponse += responseData

	handleResonseOnError = (error) ->
		callback(error)

	handleEndOfResponse = ->
		callback null, coffeeWeatherApp.parseDataFromWebRequest httpResponse 

	http.get httpOptions, httpGetFunction

exports.getWeatherInfoFromWOEIDS = (WOEIDSToTest, callback) ->
	weatherResults = []
	callbackFromHttpResponse = (error, content) ->
		weatherResults.push content
		callback error, weatherResults
	for WOEID in WOEIDSToTest
		path = coffeeWeatherApp.generatePathForHttpRequest WOEID
		httpOptions = coffeeWeatherApp.generateHttpOptionsForHttpRequest path
		coffeeWeatherApp.getHttpResponse(httpOptions, callbackFromHttpResponse);


