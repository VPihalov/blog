const config = require("../config");
const mongoose = require("mongoose");
const env_db_config = process.env.NODE_ENV || "develop";
// console.log(`env_db_config `, env_db_config);
let isProduction = process.env.NODE_ENV === 'production';
const mocks = require('../mocks');


module.exports = function () {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.set("debug", isProduction); //будет писать в логе каждое обращение

    mongoose.connection //слушаем события
      .on("error", error => reject(error))
      .on("close", () =>
        console.log("\x1b[31mDatabase connection is closed\x1b[31m!")
      )
      .once("open", () => {
        resolve(mongoose.connection);
        // mocks();
      });
      console.log(config.get("db:client"));
    mongoose.connect(config.get(`MONGO_URL`), { useNewUrlParser: true });
  });
};

