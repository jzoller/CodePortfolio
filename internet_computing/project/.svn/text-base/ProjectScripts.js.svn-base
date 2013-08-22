var setUpDocumentWhenReady = function(){
	var setUpPageForUse = function(){
		$("#creationDate").mask("99-99-9999");
    	setToToday();
    	setWorkerNameIfExists();
    	getGeoLocation(document.getElementById('location'));
    	if(localStorage.getItem('workOrderList') === null){
			initializeLocalStorage();
    	}
    	if(localStorage.getItem('workOrderList') !== '[]'){
    		ifConnectedHandler(sendDataToServer);
    	}
	}

	$(document).ready(setUpPageForUse);
}

var setToToday = function(){
	var date = new Date();
	var day = date.getDate().toString();
	var month = (date.getMonth() + 1).toString();
	var year = date.getFullYear().toString();
	document.getElementById('creationDate').value = month + '-' + day + '-' + year;
}

var initializeLocalStorage = function(){
	localStorage.workOrderList = JSON.stringify([]);
}

var handleSubmission = function(){
	var workOrder = {};
	var populateWorkOrder = function(tag){
		workOrder[tag.id] = tag.value;
	}

	var orderTags = $("input, select, textarea");
	for(var i = 0; i < orderTags.length; i++){
		if(orderTags[i].type !== 'button')
			populateWorkOrder(orderTags[i]);
	}
	var resetForm = function(){
		document.getElementById('createWorkOrder').reset();
		document.getElementById('locationMap').src = "img/staticmap.png";
		setToToday();
		getGeoLocation(document.getElementById('location'));
		setWorkerNameIfExists();
	}
	saveOrder(workOrder);
	ifConnectedHandler(sendDataToServer);
	resetForm();
}



var setWorkerNameIfExists = function(){
	if(localStorage.getItem('workerName') !== null){
		document.getElementById('firstName').value = JSON.parse(localStorage.getItem('workerName')).firstName;
		document.getElementById('lastName').value = JSON.parse(localStorage.getItem('workerName')).lastName;
		document.getElementById('description').focus();
	}
}

var ifConnectedHandler = function(callback){
	var xhr = new XMLHttpRequest();
	var handler = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200){
				callback();
      		}
		}
	}
	xhr.onreadystatechange = handler;
	xhr.open("GET", "/?q=" + Math.random());
	xhr.send();
}

var getAttributeValuesFromElementsOfClass = function(className, attributeName){
	var elementsOfClass = document.getElementsByClassName(className);
	var attributeValues = [];
	for(var i = 0; i<elementsOfClass.length; i++){
		attributeValues.push(elementsOfClass[i].getAttribute(attributeName));
	}
	return attributeValues;
}
var saveButtonClicked = function(){
	checkFormUponSubmission(handleSubmission);
	return false;
}

var checkFormUponSubmission = function(callback){
	var allFormValiationsPass = 0;
	clearErrorLabels(getAttributeValuesFromElementsOfClass('errorMessage', 'id'));
	if(errorChecker()){
		callback();
		return true;
	}
	return false;
}

var clearErrorLabels = function(labelsToClear){
	for(label in labelsToClear){
		document.getElementById(labelsToClear[label]).innerHTML = '';
	}
}