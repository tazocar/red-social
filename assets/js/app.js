$(document).ready(function(){
  $('.modal').modal();
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

var file = $("#file");
// mi storage en Firebase
var storageRef = firebase.storage().ref();
// Mi DB de Imagenes en Firebase
var imagesDb = firebase.database().ref().child("imagenesDB");
// Cuenta Posteos
var postCount = 0;

//funcion para mostrar imagenes
showImages();

function showImages(){
  imagesDb.on("value", function(snapshot){
    var data = snapshot.val();
    var result = "";
    // recorre imagenes en imagesDb (data de imagenes que cree en Firebase)
    for (var key in data){
      result += "<div class='col s6 self-post bg' style='background-image: url(" + data[key].url + ")'></div>"
    }
    // agrega nueva img
    $("#self-images").html(result);
    postCounting();
    // reemplaza antigua imagen por la nueva
    // $("#firebaseImages").html(result);
  })
}
file.change(function(){
  // Subir imagen a Firebase
  var imgToUpload = file[0].files[0];
  var uploadTask = storageRef.child('imagenes/' + imgToUpload.name).put(imgToUpload);

  // remuevo la clase que oculta
  $("#progress").removeClass("hide");
  uploadTask.on('state_changed', function(snapshot){
   // Se muestra progreso de subida de IMG
   var progressBar = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   $("#bar-charge").css("width", progressBar + "%");
  }, function(error) {
    // Handle unsuccessful uploads
    alert("no se pudo subir la imagen")
  }, function() {
    // Handle successful uploads on complete
    // url de la img en Firebase
    var downloadURL = uploadTask.snapshot.downloadURL;
    createNodeFirebase(imgToUpload.name, downloadURL);

    $(".postCount").html(postCount ++);

    // agrego la clase que oculta
    $("#progress").addClass("hide");
    postCounting();
  });
});

// creo obj en DB
function createNodeFirebase(imgName, url){
  imagesDb.push({
    nombre: imgName,
    url: url,
  });
};

// conteo de posteos
function postCounting(){
  var test = $(".self-post");
  for (var i = 0; i <= test.length ; i++) {
    postCount = i;
  }
  $("#postCount").html(postCount);
};

// toggle follow unfollow
$(".follower").click(function(){
  $("#follow").toggleClass("disabled");
  $("#follow").text($("#follow").text() == 'Follow' ? 'Unfollow' : 'Follow');
  $("#followers").text($("#followers").text() == '25' ? '24' : '25');
  $
});

$("#comment-input").keypress(function(e) {
    if(e.which == 13) {
      sendMessage();
    }
});

$("#send-comment").click(function(){
  sendMessage();
});

var sendMessage = function (){
 var comment = $("#comment-input").val();
 var container = $("#comments-section");
 if (comment.length > 0) {
   container.append("<div class='row comment'><div class='col s2'><div class='friend-img-bg personal-small-img'></div></div><div class='col s10 friend-comment-margin'><h5 class='friend-name'>Panda</h5><h6 class='friend-comment clear-margin'>" +
    comment + "</h6></div></div>");
   $("#comment-input").val("");
  }
};

$(".heart").click(function(){
  $(this).toggleClass("red-heart");
  $("#polar-post").text($("#polar-post").text() == '58 Hearts' ? '59 Hearts' : '58 Hearts');
})

/////////////// Vanilla JS - Registro
// log in with Firebase
var txtEmail = document.getElementById("txtEmail");
var txtPassword = document.getElementById("txtPassword");
var btnLogIn = document.getElementById("btnLogIn");
var btnSignUp = document.getElementById("btnSignUp");
var btnLogOut = document.getElementById("logOut");

// ¿como traducir "e => " a jQuery?
btnLogIn.addEventListener("click", e => {
  // get email and pass
  // const > una variable que n ose puede re declarar ni reasignar
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  // conserva el estado del logeo (mensajes de error)
  promise.catch(e => console.log(e.message));
});

btnSignUp.addEventListener("click", e => {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  //signUp
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

btnLogIn.addEventListener("click", function(){
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      self.location="https://tazocar.github.io/red-social/user-index.html";
    } else {
      console.log(false);
    }
  });
});

btnLogOut.addEventListener("click", e => {
  firebase.auth().signOut();
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (!firebaseUser) {
      self.location="https://tazocar.github.io/red-social/index.html";
    }
  });
});