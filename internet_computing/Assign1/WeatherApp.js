var http = require('http');
var jQuery = require('jquery');
var weatherApp = this;

exports.generatePathForHttpRequest = function(WOEID){
	return '/forecastrss?w=' + WOEID + '&u=f';
}

exports.generateHttpOptionsForHttpRequest = function(path){
	var httpOptions = {
	  	host: 'weather.yahooapis.com',
	  	port: 80,
	  	path: path
	};
	return httpOptions;
}

exports.parseDataFromWebRequest = function(httpRequest){
	var dataToReturn = [];
	dataToReturn.push(jQuery(httpRequest).find('yweather\\:location').attr('city'));
	dataToReturn.push(jQuery(httpRequest).find('yweather\\:location').attr('region'));
	dataToReturn.push(jQuery(httpRequest).find('yweather\\:condition').attr('temp'));
	if(dataToReturn[0] === undefined && dataToReturn[1] === undefined && dataToReturn[2] === undefined){
		setWeatherToUnavailable(dataToReturn);
	}
	return dataToReturn;
}

var setWeatherToUnavailable = function(dataToReturn){
	for(item in dataToReturn){
		dataToReturn[item] = 'Unavailable';
	}
}

exports.getHttpResponse = function (httpOptions, callback){
	var httpResponse = '';
	var httpGetFunction = function (response){
		response.on('data', handleResponseOnDataRecieved);
		response.on("error", handleResponseOnError);
		response.on("end", handleEndOfResponse);
	}

	var handleResponseOnDataRecieved = function (responseData){
		httpResponse += responseData;
	}

	var handleResponseOnError = function(error){
		callback(error);
	}

	var handleEndOfResponse = function(){
		callback(null, weatherApp.parseDataFromWebRequest(httpResponse));
	}

	http.get(httpOptions, httpGetFunction);
}

exports.getWeatherInfoFromWOEIDS = function(WOEIDSToTest, callback){
	var weatherResults = [];
	var callbackFromHttpResponse = function(error, content){
		weatherResults.push(content);
		callback(error, weatherResults);
	}
	for(WOEID in WOEIDSToTest){
		var path = weatherApp.generatePathForHttpRequest(WOEIDSToTest[WOEID]);
		var httpOptions = weatherApp.generateHttpOptionsForHttpRequest(path);
		weatherApp.getHttpResponse(httpOptions, callbackFromHttpResponse);
	}
}