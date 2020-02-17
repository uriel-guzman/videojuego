"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // TODO: ADD YOUR DATABASE URL
  databaseURL: undefined
});

const language = require("@google-cloud/language");
const client = new language.LanguageServiceClient();
const express = require("express");
const app = express();

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const authenticate = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    res.status(403).send("Unauthorized");
    return;
  }
  const idToken = req.headers.authorization.split("Bearer ")[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (e) {
    res.status(403).send("Unauthorized");
    return;
  }
};

app.use(authenticate);

app.get("/", async (req, res) => {
  res.send("hola");
  console.log("hello");
});

// GET /api/message/{messageId}
// Get details about a message
app.get("/api/message/:messageId", async (req, res) => {
  const messageId = req.params.messageId;

  console.log(`LOOKING UP MESSAGE "${messageId}"`);

  try {
    const snapshot = await admin
      .database()
      .ref(`/users/${req.user.uid}/messages/${messageId}`)
      .once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({
        errorCode: 404,
        errorMessage: `message '${messageId}' not found`
      });
    }
    res.set("Cache-Control", "private, max-age=300");
    return res.status(200).json(snapshot.val());
  } catch (error) {
    console.log("Error getting message details", messageId, error.message);
    return res.sendStatus(500);
  }
});

// Expose the API as a function
exports.api = functions.https.onRequest(app);
