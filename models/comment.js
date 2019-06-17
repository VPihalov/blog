const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        body: {
            type: String,
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "POST"
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: "COMMENT"
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "USER"
        },
        children: [
            {
                type: Schema.Types.ObjectId,
                ref: "COMMENT"
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: false  //false - not create automatically
    }
);

schema.set("toJSON", {
    virtuals: true   //in order to approach to the id without _id
});

module.exports = mongoose.model('COMMENT', schema);