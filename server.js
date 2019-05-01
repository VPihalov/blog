require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const Post = require('./models/post');
const app = express();
const config = require('./config');
const path = require('path');
const database = require('./db/database');

global.dirProject = __dirname;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    Post.find({}).then(posts => {
        res.render("index", { posts: posts });
    })
}
  // res.render("index", { arr: arr });
);

app.get("/create", (req, res) => {
  res.render("create");
  console.log('to the create Post')
});

app.post("/create", (req, res) => {
  const {title, body} = req.body;
  Post.create({
      title: title,
      body: body
  }).then(post => console.log(`post.id: ${post.id}`));
  res.redirect("/");
  console.log('...Post.create')
});

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

