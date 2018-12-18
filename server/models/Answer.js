const mongoose = require('mongoose'),
    schema = mongoose.Schema

let answerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Answer', answerSchema)