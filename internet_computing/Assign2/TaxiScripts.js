var getGeoLocation = function(elementToUpdate){
	clearErrorLabels(['locationError', 'locationErrorDetails']);
	var locationInfo = function(position){
		locationResponseReceived = true;
		var latitude = position.coords.latitude;
    	var longitude = position.coords.longitude;
    	elementToUpdate.value = latitude + ", " + longitude;
    	document.getElementById('locationMap').src = "http://maps.google.com/maps/api/staticmap?center="+ latitude +","+longitude+"&zoom=15&size=300x300&markers=color:blue%7Clabel:A%7C"+latitude+","+longitude+"&sensor=false";
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
    	if(locationResponseReceived === false) {
    		document.getElementById('locationError').innerHTML = 'Geolocation response failed after 20 seconds.';
	   		document.getElementById('locationErrorDetails').innerHTML = 'Please enable location sharing and try again.';
    	}
  	}
  	setTimeout(checkNoResponseFromGeoLocation, 20000);

}

var registerDragDrop = function(dragSource) {
    dragSource.ondragstart = function(event) {
      var dataToCopy = this.getAttribute('vehicleType');
      event.dataTransfer.setData('Text', dataToCopy);
      return true;
    };

    dropTarget.ondragover = function(event) {
      event.preventDefault();
      return false;
    };

    dropTarget.ondragend = function(event) {
      event.preventDefault();
      return false;
    };
}

var registerDraggableElements = function() {
	var carsToSetDraggable = ['toyotaPrius', 'toyotaCamry', 'fordEscape', 'lincolnTownCar', 'crownVictoria'];
	for(var car in carsToSetDraggable){
		document.getElementById(carsToSetDraggable[car]).addEventListener('dragstart', startDrag, false);
	}

	document.getElementById('carDragArea').addEventListener('drop', dropOnSelect, false);
}

var startDrag = function(e){
	e.dataTransfer.setData('text', this.getAttribute('vehicleType'));
}

var dropOnSelect = function(e){
	e.preventDefault();
	clearErrorLabels(['carDragError']);
	var carToAdd = e.dataTransfer.getData('text');

	if($.inArray(carToAdd, getAttributeValuesFromElementsOfClass('vehicle', 'vehicleType')) >= 0){
		if(itemIsInList(carToAdd)){
			throwErrorMessage(document.getElementById('carDragArea'), 'carDragError', 'You have already selected ' + carToAdd + ' as a desired vehicle');
		}
		else{
			addCarToDesiredCarList(carToAdd);
		}
	}
	else{
		throwErrorMessage(document.getElementById('carDragArea'), 'carDragError', 'You can\'t be picked up by that!');
	}
}

var getAttributeValuesFromElementsOfClass = function(className, attributeName){
	var elementsOfClass = document.getElementsByClassName(className);
	var attributeValues = [];
	for(var i = 0; i<elementsOfClass.length; i++){
		attributeValues.push(elementsOfClass[i].getAttribute(attributeName));
	}
	return attributeValues;
}

var itemIsInList = function(carToAdd){
	var currentListOfCars = document.getElementById('desiredCarList').options;
	for(item in currentListOfCars){
		if(currentListOfCars[item].text === carToAdd.toString()){
			return true;
		}
	}
	return false;
}

var addCarToDesiredCarList = function(carToAdd){
	var selectTag = document.getElementById('desiredCarList');
	option = document.createElement("option");
	option.value = carToAdd;
	option.textContent = carToAdd;
	selectTag.appendChild(option);
	selectTag.size = selectTag.options.length + 1;
}

var checkFormUponSubmission = function(){
	var allFormValiationsPass = 0;
	clearErrorLabels(getAttributeValuesFromElementsOfClass('errorMessage', 'id'));

	allFormValiationsPass += checkLocationIsSet(document.getElementById('location'));
	allFormValiationsPass += checkNameUponSubmission(document.getElementById('firstName'));
	allFormValiationsPass += checkNameUponSubmission(document.getElementById('lastName'));
	allFormValiationsPass += checkPhoneNumberUponSubmission(document.getElementById('phoneNumber'));
	allFormValiationsPass += checkEmailUponSubmission(document.getElementById('email'));
	allFormValiationsPass += checkStreetAddressUponSubmission(document.getElementById('destinationStreet'));
	allFormValiationsPass += checkCityAndStateUponSubmission(document.getElementById('destinationCityState'));
	allFormValiationsPass += checkZipUponSubmission(document.getElementById('destinationZip'));
	allFormValiationsPass += checkACarIsInListUponSubmission();

	if(allFormValiationsPass === 9){
		return true;
	}
	return false;
}

var checkLocationIsSet = function(locationElement){
	if(locationElement.value === ''){
		throwErrorMessage(document.getElementById('locationError'), 'locationError', 'Please click button to get pickup location');
		document.getElementById('locationErrorDetails').innerHTML = '';
		return false;
	}
	return true;
}

var inputIsInCorrectForm = function(regex, elementToCheck){
	return regex.test(elementToCheck);
}

var throwErrorMessage = function(invalidElement, errorLabel, errorMessage){
	document.getElementById(errorLabel).innerHTML = errorMessage;
	$(invalidElement).effect( "shake", { times: 3 }, "fast" );
}

var checkNameUponSubmission = function(nameElement){
	var nameRegex = /^[A-Za-z][A-Za-z ]*$/;
	if(!inputIsInCorrectForm(nameRegex, nameElement.value)){
		throwErrorMessage(nameElement, nameElement.id+'Error', 'Please enter a valid name!');
		return false;
	}
	return true;
}

var checkPhoneNumberUponSubmission = function(phoneNumberElement){
	var phoneRegex = /(^[0-9]{10}$)|(^\(\d{3}\)\d{3}\-\d{4}$)|(^\d{3}\-\d{3}\-\d{4}$)/;
	if(!inputIsInCorrectForm(phoneRegex, phoneNumberElement.value)){
		throwErrorMessage(phoneNumberElement, phoneNumberElement.id+'Error', 'Please enter a valid phone number!');
		return false;
	}
	return true;
}

var checkEmailUponSubmission = function(emailElement){
	var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mobi|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/;
	if(!inputIsInCorrectForm(emailRegex, emailElement.value)){
		throwErrorMessage(emailElement, 'emailError', 'Please enter a valid email!');
		return false;
	}
	return true;
}

var checkStreetAddressUponSubmission = function(streetAddressElement){
	var addressRegex = /\d{1,5}\s(\w.\s)*\w/;
	if(!inputIsInCorrectForm(addressRegex, streetAddressElement.value)){
		throwErrorMessage(streetAddressElement, 'destinationStreetError', 'Please enter a valid street address!');
		return false;
	}
	return true;
}

var checkCityAndStateUponSubmission = function(cityAndStateElement){
	var cityAndStateRegex = /\w+[,]\s\w+/;
	if(!inputIsInCorrectForm(cityAndStateRegex, cityAndStateElement.value)){
		throwErrorMessage(cityAndStateElement, 'destinationCityAndStateError', 'Please enter a valid city and state!');
		return false;
	}
	return true;
}

var checkZipUponSubmission = function(zipcodeElement){
	var zipcodeRegex = /\d{5}/;
	if(!inputIsInCorrectForm(zipcodeRegex, zipcodeElement.value)){
		throwErrorMessage(zipcodeElement, 'destinationZipError', 'Please enter a valid zip!');
		return false;
	}
	return true;
}

var checkACarIsInListUponSubmission = function(){
	if($('#desiredCarList option').length === 0){
		throwErrorMessage(document.getElementById('carDragArea'), 'carDragError', 'We can\'t pick you up without a vehicle! Please select at least one vehicle.');
		return false;
    }
    return true;
}

var clearErrorLabels = function(labelsToClear){
	for(label in labelsToClear){
		document.getElementById(labelsToClear[label]).innerHTML = '';
	}
}