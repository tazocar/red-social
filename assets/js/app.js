$(document).ready(function(){

});
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDSvVflrlmFfz7RoXlnuazwzh27ke82yfY",
  authDomain: "mi-proyecto-increible-cc477.firebaseapp.com",
  databaseURL: "https://mi-proyecto-increible-cc477.firebaseio.com",
  projectId: "mi-proyecto-increible-cc477",
  storageBucket: "mi-proyecto-increible-cc477.appspot.com",
  messagingSenderId: "549790688931"
};
firebase.initializeApp(config);

// Get Elements
const preObject = $("#object");

//Create References
const dbRefObject = firebase.database().ref().child("object");

//Sync Data on Real Time
//snap es un data snapshot, no es solo la data, este dbsnapshot tambien regresa el keyname, como iterar, que iterar, que no, entre otra info
//para obtener solo el value, agrega .val
// dbRefObject.on("value", snap => console.log(snap.val()));

//pasar data a la web (stringify)
dbRefObject.on('value', snap => {
  preObject.html(JSON.stringify(snap.val(), null, 2));
});
