

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAfxNhWEkvzG4Pyx7etr5LxOLVHc7RguS8",
    authDomain: "train-schedule-f6b0d.firebaseapp.com",
    databaseURL: "https://train-schedule-f6b0d.firebaseio.com",
    projectId: "train-schedule-f6b0d",
    storageBucket: "",
    messagingSenderId: "534891439364"
  };

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destInp = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "hh:mm").format("hh:mm");
  var freqInp = $("#frequency-input").val().trim();

  console.log(trainStart);

  var newTrain = {
    name: trainName,
    destination: destInp,
    start: trainStart,
    frequency: freqInp
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log("its working!");

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tStart = childSnapshot.val().start;
  var tFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(tName);
  console.log(tDestination);
  console.log(tStart);
  console.log(tFrequency);

  var firstTimeConverted = moment(tStart, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      var newVar = moment(nextTrain).format("hh:mm");

  // Add each train's data into the table
  $("#train-table").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
  tFrequency + "</td><td>" + newVar + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});