var _db = "";

function signout(){
    firebase.auth().signOut().then((error) => {
        document.getElementById("login-button").style.display = "block";
        document.getElementById("logout").style.display = "none";
        document.getElementById("option-menu").style.visibility = "hidden";
        console.log("Signed Out")

    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
}





function signIn(){

    let email = $("#loginemail").val();
    let password = $("#loginpassword").val();
    
    console.log("Signed In")
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    _db = firebase.firestore();
    var user = userCredential.user;
    document.getElementById("login-button").style.display = "none";
    document.getElementById("logout").style.display = "block";
    document.getElementById("option-menu").style.visibility = "visible";
    
    // ...
    $("#liemail").val("");
    $("#lipw").val("");

    _db
    .collection("employees")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("working");

          $('#name-contain').append(`

          <div class="emp-schedule">

          <p>${doc.data().name}</p>
            <p>${doc.data().monday}</p>
            <p>${doc.data().tuesday}</p>
            <p>${doc.data().wendsday}</p>
            <p>${doc.data().thursday}</p>
            <p>${doc.data().friday}</p>
          
          </div>

          
          

          
                


        `)
          

          console.log(doc.id, " => ", doc.data());
      });
  });

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });


  
}


function updateSchedule () {

  var empID = $("#name-select").find('option:selected').attr('id');
  var dayName = $("#day-select").find('option:selected').attr('value');
  console.log(empID)
  console.log(dayName)

  _db.collection("employees").doc(empID).update({
    [dayName]: document.getElementById('schedChangeA').value + " to " + document.getElementById('schedChangeB').value

})
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});

}



$(document).ready(function() {
    try {
        initListiners();
        let app = firebase.app();
    } catch {
        console.log("Error on Try")
    }
}); 







//Modal section

var modal = document.querySelector("#modal");
var modalOverlay = document.querySelector("#modal-overlay");
var closeButton = document.querySelector("#close-button");
var openButton = document.querySelector("#login-button");
var closesignin = document.querySelector("#close-signin");

var openEditButton = document.querySelector("#edit-button");
var editmodal = document.querySelector("#edit-modal");
var closeEditButton = document.querySelector("#close-edit-button");
var submitedit = document.querySelector("#submit-edit-button");

closeButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

closesignin.addEventListener("click", function() {
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
  });
  

openButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

openEditButton.addEventListener("click", function() {
  editmodal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");

  _db
    .collection("employees")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("working");

          $('#name-select').append(`

              <option id="${doc.id}">${doc.data().name}</option>

        `)
          

          console.log(doc.id, " => ", doc.data());
      });

    })
    
});

closeEditButton.addEventListener("click", function() {
  editmodal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");

  $("#name-select").val("");
});

submitedit.addEventListener("click", function() {
  editmodal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");

  $("#name-select").val("");
});