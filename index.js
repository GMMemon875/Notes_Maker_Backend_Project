const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs")

app.set("views enjine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extand: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {

  res.render("index.ejs");
});

app.listen(3000, function () {
  console.log("3000 port is ready");
});
