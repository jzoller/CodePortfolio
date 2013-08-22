var http = require('http');

exports.generateHttpOptionsForHttpRequest = function(){
	httpOptions = {
	  	host: 'dictionary-thesaurus.com',
	  	port: 80,
	  	path: '/wordlists/Nouns%285,449%29.txt'
	}
	return httpOptions;
};

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
		callback(null, httpResponse);
	}

	var handleHttpGetErrors = function(error){
		callback(error);
	}

	http.get(httpOptions, httpGetFunction).on('error', handleHttpGetErrors);
}