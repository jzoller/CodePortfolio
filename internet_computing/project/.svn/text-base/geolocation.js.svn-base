var getGeoLocation = function(elementToUpdate){
	clearErrorLabels(['locationError', 'locationErrorDetails']);
	var locationInfo = function(position){
		locationResponseReceived = true;
		var latitude = position.coords.latitude;
    	var longitude = position.coords.longitude;
    	var altitude = position.coords. altitude;
    	elementToUpdate.value = latitude + ', ' + longitude + ', ' + altitude;
    	var getLocationmap = function(){
    		document.getElementById('locationMap').src = "http://maps.google.com/maps/api/staticmap?center="+ latitude +","+longitude+"&zoom=15&size=300x300&markers=color:blue%7Clabel:A%7C"+latitude+","+longitude+"&sensor=false";
    	}

    	ifConnectedHandler(getLocationmap);
	}

	var locationInfoError = function(error){ 
		locationResponseReceived = true;     
	    var errorMessage = ['',
	     'Permission denied',
	     'Position unavailable',
	     'Timeout'];
	     
	    document.getElementById('locationError').innerHTML = 'Error receiving location info:';
	    document.getElementById('locationErrorDetails').innerHTML = errorMessage[error.code];
  	}

  	var locationResponseReceived = false;
	navigator.geolocation.getCurrentPosition(locationInfo, locationInfoError, {timeout: 10000});

  	var checkNoResponseFromGeoLocation = function() {
    	if(locationResponseReceived === false && elementToUpdate.value === '') {
    		document.getElementById('locationError').innerHTML = 'Automatic Geolocation response failed.';
	   		document.getElementById('locationErrorDetails').innerHTML = 'Please enable location sharing and update.';
    	}
  	}
  	setTimeout(checkNoResponseFromGeoLocation, 7000);

}