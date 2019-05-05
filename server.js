require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require('./config');
const path = require('path');
const database = require('./db/database');
const staticAsset = require('static-asset');  //хэширование скриптов и стилей, подключаемых в индекс

global.dirProject = __dirname;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, config.get('dirweb'))));
app.use(
    '/javascripts',
    express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

app.get("/", (req, res) => {
    res.render('index')
}
  // res.render("index", { arr: arr });
);


database().then(info => {
  console.log(`\x1b[34;1;40mConnected to Datebase ${info.host}:${info.port}/${info.name}!\x1b[34;1;40m`);
  app.listen(config.get('port'), () => {
      console.log(`\x1b[34mServer started on port:\x1b[0m \x1b[1;34m${config.get('port')}!\x1b[0m`);
      console.log(`process.env: ${process.env}`);
  });
}).catch(() => {
  console.log('\x1b[31mUnable to connect to database!\x1b[31m');
  process.exit(1)   //выход из node.js
});

