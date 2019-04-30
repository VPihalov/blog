const express = require("express");
const bodyParser = require("body-parser");
const arr = ["hello", "world", "test"];
const app = express();
const config = require('./config');
const database = require('./db/database');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { arr: arr });
});

app.get("/create", (req, res) => {
  res.render("create");
  console.log('to the create')
});

app.post("/create", (req, res) => {
  arr.push(req.body.text);
  res.redirect("/");
  console.log('...sumbit')
});

database().then(info => {
  console.log(`\x1b[34;1;40mConnected to Datebase ${info.host}:${info.port}/${info.name}!\x1b[34;1;40m`);
  app.listen(config.get('port'), () =>
      console.log(`\x1b[34mServer started on port:\x1b[0m \x1b[1;34m${config.get('port')}!\x1b[0m`)
  );
}).catch(() => {
  console.log('\x1b[31mUnable to connect to database!\x1b[31m');
  process.exit(1)   //выход из node.js
});

