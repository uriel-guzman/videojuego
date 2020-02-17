function signInGoogle() {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

function onload() {
  console.log(document.cookie);

  const xhr = new XMLHttpRequest();
  xhr.open("get", "api/messages");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // set the authorization HTTP header
  //xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
  xhr.responseType = "json";
  xhr.send();
}
