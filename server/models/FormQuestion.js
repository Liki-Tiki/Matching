const mongoose = require('mongoose'),
    schema = mongoose.Schema

let formQuestionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    personal_question_fk_id: {
        type: schema.ObjectId
    },
    answers: {
        type: [schema.ObjectId],
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Form_Question', formQuestionSchema)