const mongoose = require('mongoose'),
    schema = mongoose.Schema

let formQuestionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link_personal_answer: {
        type: [schema.ObjectId]
    },
    answers: {
        type: [schema.ObjectId],
        required: true
    }
})

module.exports = mongoose.model('Form_Question', formQuestionSchema)