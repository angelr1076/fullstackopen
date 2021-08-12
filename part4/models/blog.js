const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
    },
    author: {
        type: String,
        required: true,
        minLength: 3,
    },
    url: {
        type: String,
        minLength: 5,
    },
    likes: {
        type: Number,
        default: 0,
    },
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('Blog', blogSchema);