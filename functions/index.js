"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // TODO: ADD YOUR DATABASE URL
  databaseURL: undefined
});

exports.api = functions.https.onRequest((req, res) => {
  if (req.method == "GET") {
    //Verifica si es GET
    console.log(req);
  }
});
