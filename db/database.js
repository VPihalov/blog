const config = require('../config/index');
const mongoose = require('mongoose');

module.exports = () => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.set('debug', true);  //будет писать в логе каждое обращение

        mongoose.connection   //слушаем события
            .on('error', error => reject(error))
            .on('close', () => console.log("\x1b[31mDatabase connection is closed\x1b[31m!"))
            .once('open', () => resolve(mongoose.connection));

        mongoose.connect(config.get('MONGO_URL'), {useNewUrlParser: true})
    })
}
