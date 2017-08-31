 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBkobGxnFlr6bhMWFLY5JF9uuUiab3_32w",
    authDomain: "homework7-4089e.firebaseapp.com",
    databaseURL: "https://homework7-4089e.firebaseio.com",
    projectId: "homework7-4089e",
    storageBucket: "",
    messagingSenderId: "907966856937"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$('#trainSubmit').on('click', function() {
	var name = $('#trainName').val().trim();
	var destination = $('#trainDest').val().trim();
	var firstTrain = $('#trainFirst').val().trim();
	var frequency = $('#trainFreq').val().trim();
	
	console.log(name);
	console.log(destination);
	console.log(firstTrain);
	console.log(frequency);
	// push data to the server.
	database.ref().push({
		name: name,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
		// firebase.database.ServerValue.TIMESTAMP
	})

	
	$("#trainName").val("");
	$("#trainDest").val("");
	$("#trainFirst").val("");
	$("#trainFreq").val("");	
	
	return false;

})

database.ref().on("child_added", function(childSnapshot) {
	var newRow = $('<tr>');
	var newName = $('<td>').text(childSnapshot.val().name);
	newRow.append(newName);

	var newDestination = $('<td>').text(childSnapshot.val().destination);
	newRow.append(newDestination);

	var newFrequency = $('<td>').text(childSnapshot.val().frequency);
	newRow.append(newFrequency);
	// time difference from first train to current time
	var nextTrainTime = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;
	console.log(frequency);
	var timeDifference = moment(nextTrainTime, 'HHmm').diff(moment())/1000/60;
	//while that difference is negative
	while(timeDifference <= 0) {
		// add frequency to the time to get time of the next train
		nextTrainTime = (moment(nextTrainTime, 'HHmm').add(frequency,'minutes').format('HHmm'));
		// take difference of that train time from current time
		timeDifference = moment(nextTrainTime, 'HHmm').diff(moment())/1000/60;
		console.log(timeDifference);
	}

	var displayTime = (moment(nextTrainTime, 'HHmm').format('h:mm a'));
	var newNextArrival = $('<td>').text(displayTime);
	newRow.append(newNextArrival);
	var newTimeDifference = $('<td>').text(Math.floor(timeDifference));
	newRow.append(newTimeDifference);

	
$('#tableBody').append(newRow);
 }), function (errorObject) {

console.log("The read failed: " + errorObject.code);
}
