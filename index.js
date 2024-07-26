const express = require("express"); // sab se pahly ham express ko requre kar ke ek server create karengi
const app = express(); //express ko app name ke varibale men save karengi
const path = require("path"); // kese be path ko join karni ke lei path ko require keya jata he

const fs = require("fs");
// const { title } = require("process");

app.set("views enjine", "ejs"); // ejs ko install kar ke us ko setup karen gi (app) men
app.use(express.json()); // / express.json middleware ko use karte hain taake incoming request body ko JSON format mein parse kiya ja sake
app.use(express.urlencoded({ extended: true })); // express.urlencoded middleware ko use karte hain taake incoming request body ko URL-encoded format mein parse kiya ja sake. 'extended: true' option ka matlab hai ki hum query string parsing mein qs library ka use kar rahe hain jo complex objects ko handle kar sakta hai.
app.use(express.static(path.join(__dirname, "public"))); // static ka matlb hota he ke koie be Html files ko add karni lei html csss javascript ye sab static file hen  public us folder ka name he jis men ham ni ye sab static file rakhe hen __dirname matlb us men file ko dhondo

app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, file) {
    // console.log(file);
    res.render("index.ejs", { file: file });
  });
});

app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.name.split(" ").join("")}.txt`,
    req.body.content,
    "utf8",
    function (err) {
      res.redirect("/");
    }
  );
});

app.get("/file/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.render("show.ejs", {
        filename: req.params.filename,
        filedata: filedata,
      });
    }
  );
});
app.listen(3000, function () {
  console.log("3000 port is ready");
});
