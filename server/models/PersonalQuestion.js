const mongoose = require('mongoose'),
    schema = mongoose.Schema

let personalQuestionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    form_question_fk_id: {
        type: schema.ObjectId,
        required: true
    },
    answers: {
        type: [schema.ObjectId],
        required: true
    }
})

module.exports = mongoose.model('Personal_Question', personalQuestionSchema)