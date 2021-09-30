const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", getHandler)
  .post("/", postHandler)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

function getHandler(req, res) {
  res.send("hello world");
}

function postHandler(req, res) {
  res.send("POST");
}
