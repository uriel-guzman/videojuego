const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app
  .use(cors({ origin: true }))
  .use(bodyParser.json)
  .use(bodyParser.urlencoded({ extended: false }))
  //.use("/api", require("./routes"))
  .get("/auth", (req, res) => {
    console.log("hello");
    res.status(200).json({
      data: "okey"
    });
  })
  .get("*", (req, res) => {
    res.status(404).send("404");
  });

module.exports = app;
