var httpRequestor = require('./httpRequestor.js');
var http = require('http');
var url = require("url");
var path = require("path");
var fs = require("fs");
var websiteServerPort = 8080;

var websiteServer = http.createServer(function(request, response){

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  var contentTypesByExtension = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript"
  };

  path.exists(filename, function(exists){
    if(!exists){
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file){
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      var headers = {
      };
      var contentType = contentTypesByExtension[path.extname(filename)];
      if (contentType) headers["Content-Type"] = contentType;
      response.writeHead(200, headers);
      response.write(file, "binary");
      response.end();
    });
  });
});

websiteServer.listen(parseInt(websiteServerPort, 10));

console.log("Website Server running at => http://localhost:" + websiteServerPort + "/");

var crossDomainRequestServerPort = 9000;

var crossDomainRequestHandler = function(req,resp){
    var callback = function(error, content){
      if(error){
        resp.writeHead(503,{"Content-Type":"text/plain"});
        resp.end();
      }
      else{
      resp.writeHead(200,{"Content-Type":"text/plain", "Access-Control-Allow-Origin": "*"});
      resp.write(content);
      resp.end();
    }
  }

  var httpOptions = httpRequestor.generateHttpOptionsForHttpRequest();
  httpRequestor.getHttpResponse(httpOptions, callback);
}

var crossDomainRequestServer = require("http").createServer(crossDomainRequestHandler);



crossDomainRequestServer.listen(crossDomainRequestServerPort, 'localhost');

console.log("Cross Domain Request Server running at => http://localhost:" + crossDomainRequestServerPort + "/\nin terminal type killall node to shutdown");