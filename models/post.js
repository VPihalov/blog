const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    }
}, {
    timestamps: true  //createdAt and updatedAt fields are added to the model DB
});

schema.set("toJSON", {
    virtuals: true   //in ordet approach to the id without _id
})

module.exports = mongoose.model('Post', schema);