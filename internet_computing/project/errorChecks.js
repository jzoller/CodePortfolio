var throwErrorMessage = function(invalidElement, errorLabel, errorMessage){
	document.getElementById(errorLabel).innerHTML = errorMessage;
	$(invalidElement).effect( "shake", { times: 3 }, "fast" );
}

var inputIsInCorrectForm = function(regex, elementToCheck){
	return regex.test(elementToCheck);
}

var errorChecker = function(){
	var allValidationsPassFlag = true;

	var checkLocationIsSet = function(locationElement){
		if(locationElement.value === ''){
			throwErrorMessage(document.getElementById('locationError'), 'locationError', 'Please click button to get your location');
			document.getElementById('locationErrorDetails').innerHTML = '';
			allValidationsPassFlag = false;
		}
	}

	var checkNameUponSubmission = function(nameElement){
		var nameRegex = /^[A-Za-z][A-Za-z ]*$/;
		if(!inputIsInCorrectForm(nameRegex, nameElement.value)){
			throwErrorMessage(nameElement, nameElement.id+'Error', 'Please enter a valid name!');
			allValidationsPassFlag = false;
		}
	}

	var checkDescriptionUponSubmission = function(descriptionElement){
		if(descriptionElement.value.split(' ').length >= 300){
			throwErrorMessage(descriptionElement, descriptionElement.id+'Error', 'Max length is 300 words!');
			allValidationsPassFlag = false;
		}
		if(descriptionElement.value === ''){
			throwErrorMessage(descriptionElement, descriptionElement.id+'Error', 'Please enter a description!');
			allValidationsPassFlag = false;
		}
	}

	var checkDateIsInAcceptableFormUponSubmission = function(creationDateElement){
		var dateRegex = /^(0[1-9]|1[012]|[1-9])[- \/ .](0[1-9]|[12][0-9]|3[01]|[1-9])[- \/ .]\d{4}$/;
		if(!inputIsInCorrectForm(dateRegex, creationDateElement.value)){
			throwErrorMessage(creationDateElement, creationDateElement.id+'Error', 'Invalid date! (MM/DD/YYYY)');
			allValidationsPassFlag = false;
		}
	}

	var checkSeverityLevelIsChosenUponSubmission = function(severityElement){
		if(severityElement.value === 'Please Select One...'){
			throwErrorMessage(severityElement, severityElement.id+'Error', 'Please select a severity level!');
			allValidationsPassFlag = false;
		}
	}

	checkLocationIsSet(document.getElementById('location'));
	checkNameUponSubmission(document.getElementById('firstName'));
	checkNameUponSubmission(document.getElementById('lastName'));
	checkDescriptionUponSubmission(document.getElementById('description'));
	checkDateIsInAcceptableFormUponSubmission(document.getElementById('creationDate'));
	checkSeverityLevelIsChosenUponSubmission(document.getElementById('severity'));
	return allValidationsPassFlag;
}