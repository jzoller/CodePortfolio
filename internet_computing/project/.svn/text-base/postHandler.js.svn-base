exports.receiveDataFromPostRequest = function(request, response){
	var body = '';

    var recieveData = function(data){
        body += data;
    }

    var processData = function(){
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write('', "binary");
        response.end();
        var POST = JSON.parse(body);
        if(POST.length !== 0){
            console.log('Receiving Work Orders From ' + request.connection.remoteAddress + '...\n');
            for(object in POST){
                console.log(POST[object]);
                console.log();
            }
            console.log('Recieved ' + POST.length + ' Work Order(s)');
        }
    }
    request.on('data', recieveData);
    request.on('end', processData);
}