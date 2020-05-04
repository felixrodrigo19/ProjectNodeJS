var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    listComments: {
        type: String
    },
    idComments: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    reaction: {
       // type: String,
        enum: ['like', 'hate']
    },
    categories: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// const MyModel = mongoose.model('ModelName', mySchema);
const postModel = mongoose.model('PostModel', Post);

module.exports = postModel