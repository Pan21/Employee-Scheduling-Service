var _db = "";

function signout(){
    firebase.auth().signOut().then((error) => {
        console.log("Signed Out")

    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
}

function login(){

    let email = $("#lemail").val();
    let pw = $("#lpassword").val();

    firebase.auth().signInWithEmailAndPassword(email, pw)
    .then((userCredential) => {

        _db = firebase.firestore();
        let userID = userCredential.user.uid;
        var docRef = _db.collection("USERS").doc(userID);

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ..
          });

        console.log("Logged In", userCredential)
        $("#lemail").val("")
        $("#lpassword").val("")

        

        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });

}

function createAccount() {
  let imageFile = $("#cafile").prop("files")[0];

  if (imageFile != null) {
    let storageRef = firebase.storage().ref();
    let image = storageRef.child(imageFile.name);
    const metadata = { contentType: imageFile.type };
    let date = Date.parse(new Date());
    let fn = $("#fName").val();
    let ln = $("#lName").val();
    let email = $("#email").val();
    let pw = $("#password").val();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pw)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        let userID = user.id;
        _db = firebase.firestore();
        // this is uploading the image
        const task = storageRef
          .child("images/" + date + imageFile.name)
          .put(imageFile, metadata);
        task
          .then((snapshot) => snapshot.ref.getDownloadURL())
          .then((url) => {
            let userObj = {
              firstName: fn,
              lastName: ln,
              email: email,
              userImageName: date + imageFile.name,
              userImageURL: url,
            };
            //   this is where you would add everything to the database
            console.log(url);
            _db
              .collection("USERS")
              .doc(user.uid)
              .set(userObj)
              .then(function (doc) {
                console.log("User id ", user.uid);
              });
          });

        console.log("finished creating account");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  } else {
    alert("You need to add an image!");
  }
}

function deleteImage() {
  let storageRef = firebase.storage().ref();
  let desertRef = storageRef.child("images/" + imageURL);
  desertRef
    .delete()
    .then(() => {
      console.log("deleted");
    })
    .catch((error) => {
      console.log("NOPE");
    });
}

function uploadFile() {
  let storageRef = firebase.storage().ref();
  let imageFile = $("#file").prop("files")[0];
  let image = storageRef.child(imageFile.name);
  const metadata = { contentType: imageFile.type };
  let date = Date.parse(new Date());
  const task = storageRef
    .child("images/" + date + imageFile.name)
    .put(imageFile, metadata);
  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      console.log(url);
      imageURL = date + imageFile.name;
      $("#fbImage").attr("src", url);
    });

  console.log("upload ", imageFile);
}

function initFirebase() {
  firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      console.log("logged in");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
}

$(document).ready(function () {
  try {
    // initFirebase();
  } catch {
    console.log("error");
  }
});