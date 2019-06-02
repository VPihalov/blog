const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs'); //не работает с кирилицей, поэтому надо установить еще один модуль
const tr = require('transliter');

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "USER"
    }
}, {
    timestamps: true  //createdAt and updatedAt fields are added to the model DB
});

schema.plugin(URLSlugs('title', {
    field: 'url',
    generator: text => tr.slugify(text)
}));

schema.set("toJSON", {
    virtuals: true   //in ordet approach to the id without _id
});

module.exports = mongoose.model('POST', schema);