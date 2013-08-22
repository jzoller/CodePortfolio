var saveOrder = function(workOrderData){
	if(localStorage.getItem('workerName') === null){
		localStorage.workerName = JSON.stringify([]);
		var nameOfWorker = {
			firstName: workOrderData.firstName,
			lastName: workOrderData.lastName
		};
		localStorage.workerName = JSON.stringify(nameOfWorker);
	}
	var workOrderList = JSON.parse(localStorage.workOrderList);
	workOrderList.push(workOrderData);
	localStorage.workOrderList = JSON.stringify(workOrderList);
}

var sendDataToServer = function(){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/?Postq=", true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(localStorage.workOrderList);
	initializeLocalStorage();
}