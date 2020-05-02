var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    author: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// const MyModel = mongoose.model('ModelName', mySchema);
const commentModel = mongoose.model('CommentModel', Comment);

module.exports = commentModel