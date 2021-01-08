const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
    date: {
        type: String
    },
    time: {
        type: String
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String
    },
    text: {
        type: String
    }
});

module.exports = mongoose.model('Email', emailSchema);