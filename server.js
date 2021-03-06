require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require('./config');
const path = require('path');
const database = require('./db/database');
const staticAsset = require('static-asset');  //хэширование скриптов и стилей, подключаемых в индекс
const mocks = require('./mocks');
const routes = require('./routes');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
let isProduction = process.env.NODE_ENV === 'production';

global.dirProject = __dirname;
// global.session;

//sessions (middleware)
app.use(
    session({
        secret: config.get('SESSION_SECRET'),
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    })
);

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

//routes
app.use("/", routes.archive);
app.use("/api/auth", routes.auth);
app.use("/post", routes.post);


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

