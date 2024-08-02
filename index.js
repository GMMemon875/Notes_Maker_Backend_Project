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
  // app ko / route per call karengi our .files ko fs readfile ke help se files ko read karengi
  fs.readdir(`./files`, function (err, file) {
    // fs readfile men function jis men err and file argument pass keya he
    // console.log(file);
    res.render("index.ejs", { file: file }); // fer jab fs.readfile ke help se file read ho ke index .ejs per render karoo and object file ko pass karoo
  });
});

app.post("/create", function (req, res) {
  // post / create men fs. write file ke help se ek new file creat karengi
  fs.writeFile(
    `./files/${req.body.name.split(" ").join("")}.txt`, // .files ke location per file create hp our jo kuch waha input men inter ho text us ko req.body.name save he us ko split karoo ek alag alag array men fer us sab array ko .join ke help se join karoo to space katam ho jaien ge
    req.body.content, // same prosess content men be ho
    "utf8", // utf8 ham jab waha se data aie ga to wo buffur form men data hoga to text form men convert karni ke lei use hota he
    function (err) {
      // fer jab ye sab kam ho jaien to reirect karoo / route pe
      res.redirect("/");
    }
  );
});

// ab ham ni nots to lekh leya us nots ko hm kese ek new page per dekh sakte hen

app.get("/file/:filename", function (req, res) {
  // us ko ham / file route per dekh sakte hen
  fs.readFile(
    `./files/${req.params.filename}`, // same wohe tareka jese uper karte aa rahen hen text ko show karni ke lei
    "utf-8", // text buffur formate men a rahe he to text men convert krani ke lei
    function (err, filedata) {
      // wo jo data save ho aa he us ko hamm filedata men save keya fer us ko show.ejs file ke help se display keya
      res.render("show.ejs", {
        filename: req.params.filename,
        filedata: filedata,
      });
    }
  );
});

app.get("/edit/:filename", function (req, res) {
  // us ko ham /edit  route per dekh sakte hen
  res.render("edit.ejs", { filename: req.params.filename }); //jo be Route ka name title men show raha he wo mani edit.ejs file men as a props bejh deya value men
});

app.listen(3000, function () {
  // hamara app yani sarver 3000 port per chal raha he listen kar rahaa he
  console.log("3000 port is ready");
});
