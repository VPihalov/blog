require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require('./config');
const path = require('path');
const database = require('./db/database');
const staticAsset = require('static-asset');  //хэширование скриптов и стилей, подключаемых в индекс
const routes = require('./routes');
let isProduction = process.env.NODE_ENV === 'production';


global.dirProject = __dirname;

//sets and uses
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, config.get('dirweb'))));
app.use(
    '/javascripts',
    express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

//routers
app.get("/", (req, res) => {
    res.render('index')
});
app.use("/api/auth", routes.auth);


//catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err)
});

//all errors handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render('error', {
        message: error.message,
        error: !isProduction ? error : {},   //на продакше не должен выводится trace ошибки, а просто пустота
        title: 'Ooops...'
    })
});


//database
database().then(info => {
  console.log(`\x1b[34;1;40mConnected to Datebase ${info.host}:${info.port}/${info.name} with process.env.NODE_ENV: ${process.env.NODE_ENV }!\x1b[34;1;40m`);
  app.listen(config.get('port'), () => {
      console.log(`\x1b[34mServer started on port:\x1b[0m \x1b[1;34m${config.get('port')}!\x1b[0m`);
  });
}).catch(() => {
  console.log('\x1b[31mUnable to connect to database!\x1b[31m');
  process.exit(1)   //выход из node.js
});

