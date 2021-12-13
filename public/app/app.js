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
      $('#name-contain').empty();
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



function addEmployee(){

  let nameV = $("#nameInp").val();
    let mondayV = $("#mondayInp").val();
    let tuesdayV = $("#tuesdayInp").val();
    let wendsdayV = $("#wendsdayInp").val();
    let thursdayV = $("#thursdayInp").val();
    let fridayV = $("#fridayInp").val();
    let aObj = { name: nameV, monday: mondayV, tuesday: tuesdayV, wendsday: wendsdayV, thursday: thursdayV, friday: fridayV};

    _db
      .collection("employees")
      .add(aObj)
      .then(function (doc) {
        console.log("added doc " + doc.id);
      });

}

function deleteEmployee(){

  var empDeleteID = $("#employee-delete-select").find('option:selected').attr('id');

  _db.collection("employees").doc(empDeleteID).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});

}



$(document).ready(function() {
    try {
      _db = firebase.firestore();

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
  var _db = "";

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



var openaddButton = document.querySelector("#button-add");
var addmodal = document.querySelector("#modal-add");
var closeAddButton = document.querySelector("#close-add-button");
var submitadd = document.querySelector("#submit-add-button");

openaddButton.addEventListener("click", function() {
  addmodal.classList.toggle("add-closed");
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

closeAddButton.addEventListener("click", function() {
  addmodal.classList.toggle("add-closed");
  modalOverlay.classList.toggle("closed");

  $("#name-select").val("");
});

submitadd.addEventListener("click", function() {
  addmodal.classList.toggle("add-closed");
  modalOverlay.classList.toggle("closed");

  $("#name-select").val("");
});


var opendeleteButton = document.querySelector("#button-delete");
var deletemodal = document.querySelector("#modal-delete");
var closedeleteButton = document.querySelector("#close-delete-button");
var submitdelete = document.querySelector("#submit-delete-button");

opendeleteButton.addEventListener("click", function() {
  deletemodal.classList.toggle("delete-closed");
  modalOverlay.classList.toggle("closed");

  _db
    .collection("employees")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("working");

          $('#employee-delete-select').append(`

              <option id="${doc.id}">${doc.data().name}</option>

        `)
        
          console.log(doc.id, " => ", doc.data());
      });

    })

  _db.collection("employees").doc("DC").delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});

    
});

closedeleteButton.addEventListener("click", function() {
  deletemodal.classList.toggle("delete-closed");
  modalOverlay.classList.toggle("closed");

  $("#name-select").val("");
});

submitdelete.addEventListener("click", function() {
  deletemodal.classList.toggle("delete-closed");
  modalOverlay.classList.toggle("closed");

  $("#name-select").val("");
});