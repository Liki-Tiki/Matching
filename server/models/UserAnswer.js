const mongoose = require('mongoose'),
    schema = mongoose.Schema

let userAnswerSchema = mongoose.Schema({
    user_fk_id: {
        type: schema.ObjectId,
        required: true
    },
    form_fk_id: {
        type: schema.ObjectId,
        required: true
    },
    answers: {
        type: Map,
        of: schema.ObjectId,
        required: true
    },
    personal_answers: {
        type: Map,
        of: schema.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('User_Answer', userAnswerSchema)