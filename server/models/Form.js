const mongoose = require('mongoose'),
    schema = mongoose.Schema

let formSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    personal_questions: {
        type: [schema.ObjectId]
    },
    form_questions: {
        type: [schema.ObjectId],
        required: true
    }
})

module.exports = mongoose.model('Form', formSchema)