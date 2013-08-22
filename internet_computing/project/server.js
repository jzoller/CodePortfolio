var http = require('http');
var postHandler = require('./postHandler.js');
var webPageServer = require('./webPageServer.js');
var websiteServerPort = 8080;

var requestAndResponseHandler = function(request, response){
    if(request.url.toString() === '/?Postq='){
        postHandler.receiveDataFromPostRequest(request, response);
    }

    webPageServer.serveWebPage(request, response);
}

var websiteServer = http.createServer(requestAndResponseHandler);

websiteServer.listen(parseInt(websiteServerPort, 10));

console.log("Website Server running at => http://localhost:" + websiteServerPort + "/\nin terminal type killall node to shutdown");