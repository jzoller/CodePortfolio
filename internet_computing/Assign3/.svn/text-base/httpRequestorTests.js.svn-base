var httpRequestor = require('./httpRequestor.js');

exports.canary = function(test){
	test.equal(true, true);
	test.done();
}

exports.testGenerateHttpOptionsForHttpRequest = function(test){
	test.deepEqual({
		host: 'dictionary-thesaurus.com',
	  	port: 80,
	  	path: '/wordlists/Nouns%285,449%29.txt'}, 
	  	httpRequestor.generateHttpOptionsForHttpRequest());
	test.done();
}

exports.testGetWordsFromWebResponse = function(test){
	var httpOptions = httpRequestor.generateHttpOptionsForHttpRequest();
	var httpResponseHandlerFunction = function(error, content){
		test.equal('a', content[0]);
		test.equal('w', content[content.length-7]);
		test.done();
	}
	httpRequestor.getHttpResponse(httpOptions, httpResponseHandlerFunction);
}