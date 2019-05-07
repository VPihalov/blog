const config = require("../config");
const mongoose = require("mongoose");
const env_db_config = process.env.NODE_ENV || "develop";
console.log(`env_db_config `, config.get(`MONGO_URL`));

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.set("debug", true); //будет писать в логе каждое обращение

    mongoose.connection //слушаем события
      .on("error", error => reject(error))
      .on("close", () =>
        console.log("\x1b[31mDatabase connection is closed\x1b[31m!")
      )
      .once("open", () => resolve(mongoose.connection));

    mongoose.connect(config.get(`db:connection:${env_db_config}:MONGO_URL`), { useNewUrlParser: true });
  });
};
