function signInGoogle() {
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(function(result) {
      console.log(result);
      console.log(result.credential.accessToken);
      if (result.credential.accessToken !== null) {
        localStorage.setItem("authentication", result.credential.accessToken);
        location.reload();
      }
    });
}

function onloader() {
  if (localStorage.getItem("authentication")) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "get",
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${localStorage.getItem(
        "authentication"
      )}`,
      false
    );
    xhr.send();
    if (xhr.status == 200) {
      var data = xhr.responseText;
      var jsonResponse = JSON.parse(data);
      console.log(jsonResponse["email"]);
      document.getElementById(
        "email"
      ).innerHTML = `Bienvenido ${jsonResponse["email"]}`;
    } else {
      console.log("No Estas Autenticado");
    }
  } else {
    console.log("No Estas Autenticado");
  }
}
