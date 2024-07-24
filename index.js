const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { title } = require("process");

app.set("views enjine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  fs.readdir(`./file`, function (err, file) {
    // console.log(file);
    res.render("index.ejs", { file: file });
  });
});

app.post("/create", function (req, res) {
  fs.writeFile(`./file/${req.body.title.txt}`, req.body.detail, function (err) {
    if (err) {
      console.log("error");
    } else {
      res.redirect("/");
    }
  });
});
 
app.listen(3000, function () {
  console.log("3000 port is ready");
});
