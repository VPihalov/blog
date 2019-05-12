const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true  //createdAt and updatedAt fields are added to the model DB
});

schema.set("toJSON", {
    virtuals: true   //in ordet approach to the id without _id
})

module.exports = mongoose.model('USER', schema);