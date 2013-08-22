var url = require("url");
var path = require("path");
var fs = require("fs");

exports.serveWebPage = function(request, response){
	var uri = url.parse(request.url).pathname, filename = path.join(process.cwd(), uri);

    var contentTypesByExtension = {
        '.html': "text/html",
        '.css':  "text/css",
        '.js':   "text/javascript",
        '.appcache': "text/cache-manifest"
    };

    var responseOnFilePathhandler = function(exists){
        if(!exists){
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()){
            filename += '/WorkOrderPage.html';
        }

        var responsePagehandler = function(err, file){
            if(err){        
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            var headers = {"Access-Control-Allow-Origin": "*"};
            var contentType = contentTypesByExtension[path.extname(filename)];
            if(contentType){
                headers["Content-Type"] = contentType;
            }

            response.writeHead(200, headers);
            response.write(file, "binary");
            response.end();
        }

        fs.readFile(filename, "binary", responsePagehandler);
    }

    path.exists(filename, responseOnFilePathhandler);
}